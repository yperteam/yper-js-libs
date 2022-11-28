import React, { useEffect } from "react";
import styled, { css, useTheme } from "styled-components";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import {
  Column,
  Flexible,
  Row,
  Spacing,
} from "@yper-script/react/app/widget/generic";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { ButtonPrimary } from "@yper-script/react/app/widget/button";
import { joiResolver } from "@hookform/resolvers/joi";
import { Input, Textarea } from "@yper-script/react/app/widget/input";
import Joi from "joi";
import ReactSelect from "react-select";
import { useRecoilCallback, useRecoilState, useRecoilValue } from "recoil";
import { StepNotifier } from "@yper-script/react/app/notifiers/order/step_notifier";
import { PrebookNotifier } from "@yper-script/react/app/notifiers/order/prebook_notifier";
import {
  Mission,
  ReturnPolicy,
  TransportType,
} from "@yper-script/react/data/entity/mission.entity";
import { OrderDetailsNotifier } from "@yper-script/react/app/notifiers/order/order_details_notifier";
import TransportTypeCheck from "./transport_type_check";
import { DatePicker, ValueContainer } from "./date_picker";
import {
  ConfirmOrderModal,
  provider as modalProvider,
} from "../confirm_order_modal";
import { CurrentProNotifier } from "@yper-script/react/app/notifiers/pro/current_pro_notifier";
import moment from "moment";
import { ButtonLoader } from "@yper-script/react/app/widget/loader";
import { Pro } from "@yper-script/react/data/entity/pro.entity";

/** Images */
const DeliveryDetailIcon = "/img/react/order/delivery_detail_icon.svg";
const deleteCircleIcon = "/img/react/order/delete-circle-full.svg";

const schema = Joi.object({
  orderName: Joi.string().required(),
  date: Joi.date().required(),
  comment: Joi.string()
    .optional()
    .allow("")
    .allow(null),
  startTime: Joi.date().required(),
  endTime: Joi.date().required(),
  returnPolicy: Joi.string()
    .valid(...Object.values(ReturnPolicy))
    .required(),
  transportType: Joi.string()
    .valid(...Object.values(TransportType))
    .required(),
  ceremonyDate: Joi.date().optional(),
});

function getTimeConstraints({
  baseDate,
  isStarting,
  pro,
}: {
  baseDate?: Date;
  isStarting: boolean;
  pro: Pro;
}) {
  const now = moment();
  const startDate = moment(baseDate ?? now.toDate());
  const offset = pro.settings.delivery.minimumMinutesBeforeStart + 60;
  const interval = pro.settings.delivery.minimumMinutesBetweenStartAndEnd;
  // We check if the date cannot be booked
  if (startDate.hours() * 60 + offset + interval >= 1440) {
    const tomorrow = new Date(startDate.toDate());
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    return getTimeConstraints({
      baseDate: tomorrow,
      isStarting: isStarting,
      pro: pro,
    });
  }
  const endDate = moment(startDate);
  const isToday = now.isSame(startDate, "date");
  let minutes = !isToday ? 0 : now.hours() * 60 + offset;
  if (!isStarting) minutes += interval;
  minutes += minutes % 60;
  startDate.set("hours", minutes / 60);
  startDate.set("minutes", 0);
  endDate.set("hours", 23);
  if (isStarting) {
    endDate.add(-interval, "minutes");
  }
  return [startDate, endDate];
}

function getDefaultHours(date: Date, pro: Pro) {
  const start = getTimeConstraints({
    baseDate: date,
    isStarting: true,
    pro: pro,
  })[0].toDate();
  const end = getTimeConstraints({
    baseDate: date,
    isStarting: false,
    pro: pro,
  })[0].toDate();
  const diffDefaultStart = start.getHours() - 9;
  // If possible, set as 9h the default hour
  if (diffDefaultStart < 0) {
    start.setHours(start.getHours() - diffDefaultStart);
    end.setHours(end.getHours() - diffDefaultStart);
  }
  return [start, end];
}

function ThirdStep(props: { orderId: string; prebookId: string }) {
  const prebook = useRecoilValue(PrebookNotifier.provider(props.prebookId))
    .contents as Mission;
  const pro = useRecoilValue(CurrentProNotifier.provider);
  const theme = useTheme();
  const startDate = prebook.date?.deliveryStart ?? new Date();
  const defaultHours = getDefaultHours(startDate, pro);
  const defaultCeremonyHour = new Date(defaultHours[0]);
  defaultCeremonyHour.setMinutes(30);
  const methods = useForm({
    defaultValues: {
      orderName: prebook.order.id,
      date: prebook.date?.deliveryStart ?? defaultHours[0],
      comment: prebook.comment,
      startTime: prebook.date?.deliveryStart ?? defaultHours[0],
      endTime: prebook.date?.deliveryEnd ?? defaultHours[1],
      returnPolicy: prebook.returnPolicy,
      transportType: prebook.transportType,
      ceremonyDate: prebook.extra.ceremonyDate ?? defaultCeremonyHour,
    },
    resolver: joiResolver(schema),
  });
  const [modalConfirm, setModalConfirm] = useRecoilState(modalProvider);
  const selectedTemplate = useRecoilValue(
    PrebookNotifier.templateProvider(props.prebookId)
  );
  const showStep = useRecoilValue(StepNotifier.provider(props.prebookId));
  const state = useRecoilValue(OrderDetailsNotifier.provider(props.orderId));
  const notifier = useRecoilCallback(
    callback => async () => {
      await methods.handleSubmit(data => {
        const start = new Date(data.date);
        const end = new Date(data.date);
        const ceremony = new Date(data.date);
        start.setHours(
          data.startTime.getHours(),
          data.startTime.getMinutes(),
          0,
          0
        );
        end.setHours(data.endTime.getHours(), data.endTime.getMinutes(), 0);
        ceremony.setHours(
          data.ceremonyDate.getHours(),
          data.ceremonyDate.getMinutes(),
          0
        );
        // TODO move it to domain
        if (
          moment().isSame(start, "date") &&
          moment(start).diff(new Date(), "minutes") <
            pro.settings.delivery.minimumMinutesBeforeStart
        ) {
          methods.setError("startTime", {
            type: "manual",
            message: "invalid_too_early_prebook",
          });
        } else if (
          moment(end).diff(start, "minutes") <
          pro.settings.delivery.minimumMinutesBetweenStartAndEnd
        ) {
          methods.setError("startTime", {
            type: "manual",
            message: "invalid_too_short_prebook",
          });
        } else {
          return OrderDetailsNotifier.notifier({
            returnPolicy: data.returnPolicy,
            transportType: data.transportType,
            comment: data.comment,
            startDate: start,
            endDate: end,
            ceremonyDate: ceremony,
            prebookId: props.prebookId,
            orderId: props.orderId,
            orderName: data.orderName,
            callback: callback,
          });
        }
      })();
    },
    []
  );

  useEffect(() => {
    if (state?.state == "hasValue") {
      if (pro.settings.paymentMethod == "levy") {
        setModalConfirm(true);
      } else {
        window.location.replace(
          "/order/pay/" + window.location.pathname.split("/")[2]
        );
      }
    } else if (state?.state == "hasError") {
      // invalid_date
      // invalid_hours_prebook
      // invalid_too_early_prebook
      methods.setError("startTime", {
        type: "manual",
        message: state?.contents?.errorCode,
      });
    }
  }, [state]);

  return (
    <>
      <Card>
        <CardTitle justifyContent={"start"} alignItems={"center"}>
          <SvgPicture src={DeliveryDetailIcon} width="40px" height="40px" />
          <Text
            margin={{ left: "12px" }}
            textStyle={theme.textTheme.title.medium.copyWith({
              color: theme.color.primary["500"],
            })}
          >
            Détails de la livraison
          </Text>
        </CardTitle>
        <FormContainer showStep={showStep === 2}>
          <Column
            justifyContent={"start"}
            padding={{
              top: "16px",
              bottom: "16px",
              right: "40px",
              left: "40px",
            }}
          >
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(_ => {})}>
                <Text
                  textStyle={theme.textTheme.title.small.copyWith({
                    color: theme.color.primary["300"],
                  })}
                  margin={{ bottom: "16px" }}
                >
                  Date et heure de livraison
                </Text>
                <Row alignItems="center" justifyContent="start">
                  <Flexible size={3}>
                    <Controller
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          onChange={(value: Date) => {
                            const defaultHours = getDefaultHours(value, pro);
                            methods.setValue("startTime", defaultHours[0]);
                            methods.setValue("endTime", defaultHours[1]);
                            onChange(value, null);
                          }}
                          value={value}
                        />
                      )}
                      control={methods.control}
                      name="date"
                    />
                  </Flexible>
                  <Text margin={{ left: "16px", right: "16px" }}>Entre</Text>
                  <TimeSlotSelector
                    name="startTime"
                    onSelect={date => {
                      const endDate = methods.getValues("endTime") as Date;
                      const ceremonyDate = methods.getValues(
                        "ceremonyDate"
                      ) as Date;
                      const intervalMin =
                        pro.settings.delivery.minimumMinutesBetweenStartAndEnd /
                        60;
                      if (endDate.getHours() - date.getHours() < intervalMin) {
                        const newDate = new Date(date.getTime());
                        newDate.setHours(newDate.getHours() + intervalMin);
                        methods.setValue("endTime", newDate);
                      }
                      if (moment(ceremonyDate).isBefore(date)) {
                        ceremonyDate.setHours(date.getHours());
                        ceremonyDate.setMinutes(30); // TODO function ?
                        methods.setValue("ceremonyDate", ceremonyDate);
                      }
                    }}
                  />
                  <Text margin={{ left: "16px", right: "16px" }}>et</Text>
                  <Flexible size={4}>
                    <TimeSlotSelector
                      name="endTime"
                      onSelect={date => {
                        const startTime = methods.getValues(
                          "startTime"
                        ) as Date;
                        const ceremonyDate = methods.getValues(
                          "ceremonyDate"
                        ) as Date;
                        const intervalMin =
                          pro.settings.delivery
                            .minimumMinutesBetweenStartAndEnd / 60;
                        if (
                          date.getHours() - startTime.getHours() <
                          intervalMin
                        ) {
                          startTime.setHours(date.getHours() - intervalMin);
                          methods.setValue("startTime", startTime);
                        }
                        if (moment(ceremonyDate).isAfter(date)) {
                          ceremonyDate.setHours(startTime.getHours());
                          ceremonyDate.setMinutes(30); // TODO function ?
                          methods.setValue("ceremonyDate", ceremonyDate);
                        }
                      }}
                    />
                  </Flexible>
                </Row>
                {methods.formState.errors.startTime && (
                  <HourErrorRow
                    margin={{ top: "16px" }}
                    justifyContent="start"
                    padding={{
                      top: "16px",
                      bottom: "16px",
                      left: "16px",
                      right: "16px",
                    }}
                  >
                    <SvgPicture
                      src={deleteCircleIcon}
                      width="24px"
                      height="24px"
                    />
                    <Column margin={{ left: "18px" }}>
                      {methods.formState.errors.startTime.message ==
                      "invalid_too_short_prebook" ? (
                        <>
                          <Text>Durée de créneau trop courte</Text>
                          <Text>
                            Merci de définir un créneau de livraison d'une durée
                            de{" "}
                            {(pro.settings.delivery
                              .minimumMinutesBetweenStartAndEnd %
                              60) +
                              1}
                            h. (ex : 10h -{" "}
                            {11 +
                              (pro.settings.delivery
                                .minimumMinutesBetweenStartAndEnd %
                                60)}
                            h)
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text>Début du créneau trop tôt</Text>
                          <Text>
                            Merci de définir un horaire de début de livraison au
                            minimum{" "}
                            {(pro.settings.delivery.minimumMinutesBeforeStart %
                              60) +
                              1}
                            h après l'heure actuelle. (ex : s'il est 11h, votre
                            créneau doit commencer au plus tôt à{" "}
                            {12 +
                              (pro.settings.delivery.minimumMinutesBeforeStart %
                                60)}{" "}
                            h)
                          </Text>
                        </>
                      )}
                    </Column>
                  </HourErrorRow>
                )}
                {selectedTemplate?.isCeremony && (
                  <CeremonyHourRow
                    alignItems="center"
                    justifyContent="start"
                    margin={{ top: "16px" }}
                    padding={{
                      top: "8px",
                      bottom: "8px",
                      left: "8px",
                      right: "8px",
                    }}
                  >
                    <SvgPicture
                      src={"/img/react/order/product_celebration.svg"}
                      height="24px"
                      width="24px"
                    />
                    <Text
                      margin={{ left: "16px", right: "8px" }}
                      textStyle={theme.textTheme.title.small}
                    >
                      Heure de la cérémonie :
                    </Text>
                    <CeremonySelector name="ceremonyDate" onSelect={_ => {}} />
                  </CeremonyHourRow>
                )}
                {/*<Text
                  margin={{ top: "16px" }}
                  textStyle={theme.textTheme.title.small.copyWith({
                    color: theme.color.primary["300"],
                  })}
                >
                  Votre Livreur
                </Text>
                <Row margin={{ top: "5px" }} justifyContent={"flex-start"}>
                  <CheckboxMethod
                    alignItems={"center"}
                    justifyContent={"start"}
                    onClick={() => setChecked("shopper")}
                    selected={isChecked === "shopper"}
                  >
                    <CheckboxInput
                      type="checkbox"
                      checked={isChecked === "shopper"}
                      readOnly={true}
                    />
                    <Column>
                      <Text
                        textStyle={theme.textTheme.label.medium}
                        margin={{ left: "6px" }}
                      >
                        Shopper
                      </Text>
                      <Text
                        textStyle={theme.textTheme.body.medium.copyWith({
                          color: theme.color.primary["300"],
                        })}
                        margin={{ left: "6px" }}
                      >
                        Particulier
                      </Text>
                    </Column>
                  </CheckboxMethod>
                  <Spacing margin={{ left: "5px" }} />
                  <CheckboxMethod
                    alignItems={"center"}
                    justifyContent={"start"}
                    onClick={() => setChecked("rider")}
                    selected={isChecked === "rider"}
                  >
                    <CheckboxInput
                      type="checkbox"
                      checked={isChecked === "rider"}
                      readOnly={true}
                    />
                    <Column>
                      <Text
                        textStyle={theme.textTheme.label.medium}
                        margin={{ left: "6px" }}
                      >
                        Rider
                      </Text>
                      <Text
                        textStyle={theme.textTheme.body.medium.copyWith({
                          color: theme.color.primary["300"],
                        })}
                        margin={{ left: "6px" }}
                      >
                        Professionnel à vélo, scooter ou moto
                      </Text>
                    </Column>
                  </CheckboxMethod>
                  <Spacing margin={{ left: "5px" }} />
                  <CheckboxMethod
                    alignItems={"center"}
                    justifyContent={"start"}
                    onClick={() => setChecked("partner")}
                    selected={isChecked === "partner"}
                  >
                    <CheckboxInput
                      type="checkbox"
                      checked={isChecked === "partner"}
                      readOnly={true}
                    />
                    <Column>
                      <Text
                        textStyle={theme.textTheme.label.medium}
                        margin={{ left: "6px" }}
                      >
                        Partner
                      </Text>
                      <Text
                        textStyle={theme.textTheme.body.medium.copyWith({
                          color: theme.color.primary["300"],
                        })}
                        margin={{ left: "6px" }}
                      >
                        Professionnel en véhicule utilitaire
                      </Text>
                    </Column>
                  </CheckboxMethod>
                      </Row>*/}
                <Text
                  textStyle={theme.textTheme.title.small.copyWith({
                    color: theme.color.primary["300"],
                  })}
                  margin={{ top: "24px" }}
                >
                  Moyen de transport requis
                </Text>
                <Row wrap="wrap" justifyContent="start">
                  {Object.values(TransportType).map(type => {
                    return <TransportTypeCheck key={type} type={type} />;
                  })}
                </Row>
                <Text
                  textStyle={theme.textTheme.title.small.copyWith({
                    color: theme.color.primary["300"],
                  })}
                  margin={{ top: "24px" }}
                >
                  En cas d'absence du destinataire
                </Text>
                <Row margin={{ top: "16px" }} justifyContent={"flex-start"}>
                  <ReturnPolicyCheckbox policy={ReturnPolicy.back} />
                  <Spacing margin={{ left: "5px" }} />
                  <ReturnPolicyCheckbox policy={ReturnPolicy.neighbour} />
                  <Spacing margin={{ left: "5px" }} />
                  <ReturnPolicyCheckbox policy={ReturnPolicy.door} />
                </Row>
                <Text
                  textStyle={theme.textTheme.title.small.copyWith({
                    color: theme.color.primary["300"],
                  })}
                  margin={{ top: "16px", bottom: "16px" }}
                >
                  Numéro de commande
                </Text>
                <Row alignItems="center" justifyContent="flex-start">
                  <Flexible size={2}>
                    <Input {...methods.register("orderName")} />
                  </Flexible>
                  <Flexible size={4} margin={{ left: "24px" }}>
                    <Row alignItems="center">
                      <SvgPicture
                        src="/img/react/icon/ic_information_circle_full.svg"
                        color={theme.color.information[400]}
                      />
                      <Text margin={{ left: "8px" }}>
                        Ce numéro est celui que le livreur vous communiquera
                        lors du retrait de la commande
                      </Text>
                    </Row>
                  </Flexible>
                  <Flexible size={2} />
                </Row>
                <Text
                  textStyle={theme.textTheme.title.small.copyWith({
                    color: theme.color.primary["300"],
                  })}
                  margin={{ top: "16px", bottom: "16px" }}
                >
                  Commentaires à destination du livreur
                </Text>
                <InputComment {...methods.register("comment")} />
              </form>
            </FormProvider>
          </Column>
          <CardFooter justifyContent={"end"}>
            <ButtonPrimary onClick={notifier}>
              {state?.state != "loading" ? (
                <Text textStyle={theme.textTheme.label.medium}>Continuer</Text>
              ) : (
                <ButtonLoader />
              )}
            </ButtonPrimary>
          </CardFooter>
        </FormContainer>
      </Card>
      {modalConfirm && (
        <ConfirmOrderModal
          orderId={props.orderId}
          prebookId={props.prebookId}
        />
      )}
    </>
  );
}

function CeremonySelector({
  name,
  onSelect,
}: {
  name: string;
  onSelect: (DateTime) => void;
}) {
  const theme = useTheme();
  const { control, watch, setValue } = useFormContext();
  const styles = {
    valueContainer: base => ({
      ...base,
      paddingTop: 0,
    }),
  };
  const startDate = moment(watch("startTime") as Date);
  const endDate = moment(watch("endTime") as Date);
  startDate.set("minutes", 30);
  endDate.set("minutes", 0);
  const constraints = [startDate, endDate];
  const renderOption = (option: Date) =>
    `${option.getHours()}:${option
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ReactSelect
          isClearable={false}
          placeholder={null}
          styles={styles}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            ValueContainer,
          }}
          isOptionSelected={(option, selectValue) =>
            option.getHours() == selectValue[0]?.getHours()
          }
          getOptionLabel={renderOption}
          {...field}
          onChange={date => {
            setValue(name, date);
            onSelect(date);
          }}
          options={Array(constraints[1].diff(constraints[0], "minutes"))
            .fill("")
            .map((_, index) => {
              const newDate = moment(constraints[0]);
              newDate.add(index, "minutes");
              return newDate.toDate();
            })}
        />
      )}
    />
  );
}

function TimeSlotSelector({
  name,
  onSelect,
}: {
  name: string;
  onSelect: (DateTime) => void;
}) {
  const pro = useRecoilValue(CurrentProNotifier.provider);
  const { control, watch, setValue } = useFormContext();
  const styles = {
    valueContainer: base => ({
      ...base,
      paddingTop: 0,
    }),
  };
  const date = watch("date") as Date;
  const constraints = getTimeConstraints({
    baseDate: date,
    isStarting: name == "startTime",
    pro: pro,
  });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ReactSelect
          isClearable={false}
          placeholder={null}
          styles={styles}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            ValueContainer,
          }}
          isOptionSelected={(option, selectValue) =>
            option.getHours() == selectValue[0]?.getHours()
          }
          getOptionLabel={option => `${option.getHours()}:00`}
          {...field}
          onChange={date => {
            setValue(name, date);
            onSelect(date);
          }}
          options={Array(constraints[1].diff(constraints[0], "hours") + 1)
            .fill("")
            .map((_, index) => {
              const newDate = moment(constraints[0]);
              newDate.add(index, "hours");
              newDate.set("minutes", 0);
              return newDate.toDate();
            })}
        />
      )}
    />
  );
}

function ReturnPolicyCheckbox({ policy }: { policy: ReturnPolicy }) {
  const { watch, setValue } = useFormContext();
  const theme = useTheme();
  const selected = watch("returnPolicy");
  // TODO use trads
  const text =
    policy == ReturnPolicy.back
      ? " Retour en boutique"
      : policy == ReturnPolicy.door
      ? "Déposer devant la porte"
      : "Déposer chez le voisin";

  return (
    <CheckboxMethod
      alignItems={"center"}
      justifyContent={"start"}
      onClick={() => setValue("returnPolicy", policy)}
      selected={selected === policy}
    >
      <CheckboxInput
        type="checkbox"
        checked={selected === policy}
        readOnly={true}
      />
      <Text textStyle={theme.textTheme.label.medium} margin={{ left: "6px" }}>
        {text}
      </Text>
    </CheckboxMethod>
  );
}

export default ThirdStep;

/** Styled Component */
const InputComment = styled(Textarea)`
  width: 75%;
`;

const FormContainer = styled.div<{ showStep: boolean }>`
  display: block;
  width: 100%;
  ${props =>
    !props.showStep &&
    css`
      display: none;
    `}
`;

const Card = styled(Column)`
  margin-top: 19px;
  background-color: ${props => props.theme.color.grayscale["000"]};
  box-shadow: 0 2px 20px rgba(54, 80, 108, 0.1);
  border-radius: 10px;
`;

const CardTitle = styled(Row)`
  border-bottom: 1px solid ${props => props.theme.color.grayscale["200"]};
  padding: 12px 24px;
`;

const CardFooter = styled(Row)`
  border-top: 1px solid ${props => props.theme.color.grayscale["200"]};
  padding: 12px 24px;
`;

const CheckboxMethod = styled(Row)<any>`
  cursor: pointer;
  border: 1px solid #c0d0e2;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 10px 13px;
  width: fit-content;

  ${props =>
    props.selected &&
    css`
      background-color: ${props => props.theme.color.secondary["100"]};
      border-color: ${props => props.theme.color.secondary["400"]};
      box-shadow: 0 0 9px rgba(54, 80, 108, 0.1);
    `}
`;

const CheckboxInput = styled.input`
  position: relative;
  width: 15px !important;
  height: 15px !important;
  min-width: 15px;
  float: left;
  margin: 4px 10px 2px 1px;
  border-radius: 50%;
  vertical-align: middle;
  border: 1px solid ${props => props.theme.color.primary["200"]};
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  transition: 0.5s;
  padding: 6px;
  background-color: ${props => props.theme.color.grayscale["000"]};
  box-shadow: inset 0 0 0 2px ${props => props.theme.color.grayscale["000"]};
  &:checked {
    background-color: ${props => props.theme.color.grayscale["000"]};
    border-color: ${props => props.theme.color.transparent};
    box-shadow: inset 0 0 0 4px ${props => props.theme.color.secondary["400"]};
    transition: 0.5s;
    padding: 3px;
  }
`;

const HourErrorRow = styled(Row)`
  background-color: ${props => props.theme.color.error["100"]};
  border: 1px solid ${props => props.theme.color.error["400"]};
`;

const CeremonyHourRow = styled(Row)`
  background: ${props => props.theme.color.information["100"]};
  border: 1px solid ${props => props.theme.color.information["400"]};
`;

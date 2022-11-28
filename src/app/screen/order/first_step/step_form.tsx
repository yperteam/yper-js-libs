import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import { Column, Row } from "@yper-script/react/app/widget/generic";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "@yper-script/react/app/widget/button";
import { FormProvider, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import {
  atom,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { OrderAddressNotifier } from "@yper-script/react/app/notifiers/order/order_address_notifier";
import { customMessage } from "../error_field";
import MissionClientInput from "./mission_client_input";
import { FormContainer } from "@yper-script/react/app/widget/input";
import { PrebookNotifier } from "@yper-script/react/app/notifiers/order/prebook_notifier";
import {
  Mission,
  MissionClientType,
} from "@yper-script/react/data/entity/mission.entity";
import { CurrentProNotifier } from "@yper-script/react/app/notifiers/pro/current_pro_notifier";
import { ButtonLoader } from "@yper-script/react/app/widget/loader";
import { addressSchema } from "@yper-script/react/app/widget/address/address_input";
import Joi from "@yper-script/react/app/widget/helper/extended_joi";

/** Images */
const ButtonClose = "/img/react/order/ic_close.svg";

/** Form */
export const missionClientSchema = Joi.object({
  address: Joi.object().when("type", {
    is: MissionClientType.user,
    then: addressSchema,
    otherwise: Joi.optional(),
  }),
  firstname: Joi.string()
    .empty(["", null])
    .when("type", {
      is: MissionClientType.user,
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
  lastname: Joi.string()
    .empty(["", null])
    .when("type", {
      is: MissionClientType.user,
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
  phone: Joi.phoneNumber()
    .defaultRegion("FR")
    .required(),
  email: Joi.string()
    .empty(["", null])
    .optional()
    .email({ tlds: { allow: false } }),
  comment: Joi.string()
    .empty(["", null])
    .optional(),
  id: Joi.string()
    .empty(["", null])
    .optional(),
  setAsFavorite: Joi.boolean().default(false),
  type: Joi.string().required(),
  businessName: Joi.string()
    .empty(["", null])
    .when("type", {
      not: MissionClientType.user,
      then: Joi.required(),
      otherwise: Joi.optional(),
    }),
}).messages(customMessage());

const schema = Joi.object({
  sender: missionClientSchema,
  receiver: missionClientSchema,
});

export const editProvider = atom<boolean>({
  key: "edit_first_form_provider",
  default: false,
});

function handleApiErrors(errorCode: string, setError) {
  if (errorCode === "delivery_address_too_far") {
    setError("receiver.address.formattedAddress", {
      type: "manual",
      message: "L'adresse de livraison est trop éloignée du point de retrait.",
    });
  }
  if (errorCode === "distance_not_set") {
    setError("deliveryAddress.address.formattedAddress", {
      type: "manual",
      message: "L'adresse est introuvable",
    });
  }
  if (errorCode === "invalid_phone_number") {
    setError("deliveryAddress.phone", {
      type: "manual",
      message: "Format incorrect",
    });
  }
}

function StepForm(props: { orderId: string; prebookId: string }) {
  const theme = useTheme();
  const prebook = useRecoilValue(PrebookNotifier.provider(props.prebookId))
    .contents as Mission;
  const pro = useRecoilValue(CurrentProNotifier.provider);
  const [editForm, setEditForm] = useRecoilState(editProvider);
  const methods = useForm({
    reValidateMode: "onSubmit",
    resolver: joiResolver(schema, {
      stripUnknown: true,
      abortEarly: false,
    }),
  });

  /** Recoil */
  const orderAddressProvider = useRecoilValue(
    OrderAddressNotifier.provider(props.orderId)
  );
  const previewOrderAddressProvider = useRecoilValue(
    OrderAddressNotifier.previewProvider(props.orderId)
  );
  const notifier = useRecoilCallback(
    callback => async () => {
      await methods.handleSubmit(data =>
        OrderAddressNotifier.notifier(
          data.receiver,
          data.sender,
          data.receiver.setAsFavorite,
          data.sender.setAsFavorite,
          props.prebookId,
          props.orderId,
          callback
        )
      )();
    },
    []
  );

  useEffect(() => {
    if (previewOrderAddressProvider?.state === "hasError") {
      handleApiErrors(
        previewOrderAddressProvider.contents.errorCode,
        methods.setError
      );
    }
  }, [previewOrderAddressProvider]);

  useEffect(() => {
    methods.setValue("sender", prebook.sender);
    methods.setValue("receiver", prebook.receiver);
  }, []);

  useEffect(() => {
    if (orderAddressProvider?.state === "hasError") {
      handleApiErrors(
        orderAddressProvider.contents.errorCode,
        methods.setError
      );
    }
  }, [orderAddressProvider]);

  return (
    <>
      <Column justifyContent={"start"}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(_ => {})}>
            <Row>
              <FormContainer bgColor={theme.color.grayscale["100"]}>
                <MissionClientInput
                  field="sender"
                  placeholder="Rechercher une adresse ou un magasin"
                  types={[
                    ...(pro.settings.delivery.p2pAllowed
                      ? [MissionClientType.user]
                      : []),
                    MissionClientType.retailpoint,
                  ]}
                />
              </FormContainer>
              <FormContainer size={1}>
                <MissionClientInput
                  field="receiver"
                  placeholder="Rechercher une adresse ou un client"
                  types={[
                    MissionClientType.user,
                    ...(pro.settings.delivery.p2pAllowed
                      ? [MissionClientType.retailpoint]
                      : []),
                  ]}
                />
              </FormContainer>
            </Row>
          </form>
        </FormProvider>
      </Column>
      <CardFooter justifyContent={"end"} alignItems="center">
        {editForm && (
          <ButtonSecondary onClick={() => setEditForm(false)}>
            <SvgPicture width="16px" height="16px" src={ButtonClose} />
            <Text
              margin={{ left: "10px" }}
              textStyle={theme.textTheme.label.medium}
            >
              Annuler les modifications
            </Text>
          </ButtonSecondary>
        )}
        <ButtonPrimary onClick={notifier} margin={{ left: "8px" }}>
          {orderAddressProvider?.state != "loading" ? (
            <Text textStyle={theme.textTheme.label.medium}>Continuer</Text>
          ) : (
            <ButtonLoader />
          )}
        </ButtonPrimary>
      </CardFooter>
    </>
  );
}

export default StepForm;

/** Styled Component */
const CardFooter = styled(Row)`
  border-top: 1px solid ${props => props.theme.color.grayscale["200"]};
  padding: 12px 24px;
`;

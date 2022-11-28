import React, { useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import {
  Label,
  MaterialIcon,
  SvgPicture,
  Text,
} from "@yper-script/react/app/widget/mixins";
import {
  Column,
  Flexible,
  Row,
  Spacing,
} from "@yper-script/react/app/widget/generic";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Controller, useFormContext } from "react-hook-form";
import { Menu, MenuItem, Typeahead } from "react-bootstrap-typeahead";
import Select from "react-select";
import ErrorField from "@yper-script/react/app/screen/order/error_field";
import { ProRetailpointsNotifier } from "@yper-script/react/app/notifiers/retailpoint/pro_retailpoints_notifier";
import {
  atomFamily,
  useRecoilCallback,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { Retailpoint } from "@yper-script/react/data/entity/retailpoint.entity";
import { Input, Textarea } from "@yper-script/react/app/widget/input";
import {
  MissionClient,
  MissionClientType,
} from "@yper-script/react/data/entity/mission.entity";
import { Tooltip } from "@yper-script/react/app/widget/tooltip";
import { OrderAddressNotifier } from "@yper-script/react/app/notifiers/order/order_address_notifier";
import { FavoriteAddressNotifier } from "@yper-script/react/app/notifiers/pro/favorite_address_notifier";
import { FavoriteAddress } from "@yper-script/react/data/entity/favorite_address";
import { firstValueFrom, Subject } from "rxjs";

/** Images */
const searchIcon = "/img/icon/search_icon.svg";
const starIcon = "/img/react/icon/ic_star.svg";
const shopIcon = "/img/react/order/shop_icon.svg";
const infoIcon = "/img/icon/info_icon.svg";
const userIcon = "/img/react/icon/ic_pin_location.svg";
const plusIcon = "/img/react/icon/ic_add_circle.svg";
const minusIcon = "/img/react/icon/ic_subtract_circle.svg";
const DeliveryAddressImg = "/img/react/order/delivery_form.svg";
const rpAddressImg = "/img/react/order/rp_icon.svg";

const disabledFieldsProvider = atomFamily<{ [key: string]: boolean }, string>({
  key: "disabled_fields_provider",
  default: {
    businessName: false,
    phone: false,
    email: false,
  },
});

function MissionClientInput(props: {
  field: string;
  placeholder: string;
  types: MissionClientType[];
}) {
  const typeaheadRef = useRef(null);
  const { setValue, clearErrors, getValues, watch } = useFormContext();
  const setDisabledFields = useSetRecoilState(
    disabledFieldsProvider(props.field)
  );
  const watchClient = watch(props.field);
  const theme = useTheme();
  const showUsers =
    props.types.find(t => t == MissionClientType.user) != undefined;
  const showRps =
    props.types.find(t => t == MissionClientType.retailpoint) != undefined;

  useEffect(() => {
    setDisabledFields({
      businessName: getValues(`${props.field}.businessName`) != null,
      phone: getValues(`${props.field}.phone`) != null,
      email: getValues(`${props.field}.email`) != null,
    });
  }, []);

  const convertRp = (value: Retailpoint): MissionClient => {
    return {
      id: value.id,
      address: value.address,
      businessName: value.companyName ?? value.name,
      phone: value.phone?.public,
      email: null, // TODO,
      type: MissionClientType.retailpoint,
    };
  };

  const convertFavorite = (value: FavoriteAddress): MissionClient => {
    // TODO add id for favorite
    return {
      address: {
        ...value.address,
        favoriteAddressId: value.id,
      },
      businessName: null,
      firstname: value.firstname,
      lastname: value.lastname,
      phone: value.phone,
      email: value.email,
      type: MissionClientType.user,
    };
  };

  const retailPointAddress = showRps
    ? useRecoilValue(ProRetailpointsNotifier.provider)?.contents?.data
    : [];

  const favoriteAddress = showUsers
    ? useRecoilValue(FavoriteAddressNotifier.provider).contents
    : [];

  const previewNotifier = useRecoilCallback(
    callback => async () => {
      const data = getValues();
      // TODO reuse
      const orderId = window.location.pathname.split("/")[2];
      const prebookId = window.location.pathname.split("/")[3];
      await OrderAddressNotifier.previewNotifier(
        data.receiver,
        data.sender,
        prebookId,
        orderId,
        callback
      );
    },
    []
  );

  const convertPrediction = (
    item: google.maps.places.AutocompletePrediction
  ): Promise<MissionClient> => {
    const subject = new Subject<MissionClient>();
    placesService.getDetails(
      {
        placeId: item.place_id,
      },
      place => {
        subject.next({
          address: {
            favoriteAddressId: null,
            additional: "",
            additionalNumber: null,
            floor: null,
            apartment: null,
            streetNumber: place.address_components.find(i =>
              i.types.includes("street_number")
            )?.short_name,
            formattedAddress: place.formatted_address,
            city: place.address_components.find(i =>
              i.types.includes("locality")
            )?.short_name,
            street: place.address_components.find(i =>
              i.types.includes("route")
            )?.short_name,
            country: place.address_components.find(i =>
              i.types.includes("country")
            )?.short_name,
            zip: place.address_components.find(i =>
              i.types.includes("postal_code")
            )?.short_name,
            location: {
              type: "Point",
              coordinates: [
                place.geometry.location.lng(),
                place.geometry.location.lat(),
              ],
            },
          },
          businessName: null,
          firstname: null,
          lastname: null,
          phone: null,
          email: null,
          type: MissionClientType.user,
        });
      }
    );
    return firstValueFrom(subject);
  };

  const defaultCoord = watch(props.field == "sender" ? "receiver" : "sender")
    ?.address?.location?.coordinates;
  const location =
    defaultCoord != null
      ? new google.maps.LatLng(defaultCoord[1], defaultCoord[0])
      : null;
  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    //Todo : stock as env var ?
    apiKey: "AIzaSyBG82w7Bo4aDwTJ5NNjsb3SqhuPuf3eN64", //process.env.REACT_APP_GOOGLE,
    options: {
      input: "",
      componentRestrictions: { country: ["fr", "be", "lu", "de"] },
      ...(location ? { location: location, radius: 50000 } : {}),
    },
  });

  return (
    <CustomColumn justifyContent={"flex-start"} width="100%">
      <Text textStyle={theme.textTheme.body.large}>
        {props.field == "sender"
          ? "Adresse de retrait"
          : "Adresse de livraison"}
      </Text>
      <TypeaheadContainer>
        <Typeahead
          id="basic-typeahead-single"
          labelKey={option =>
            //@ts-ignore
            `${option.address?.formattedAddress ?? option.description}${
              //@ts-ignore
              option.name ? ` ${option.name}` : ""
            }`
          }
          filterBy={(option: any, props) => {
            const text = props.text.toLowerCase();
            return (
              option.description != null ||
              option.address?.formattedAddress
                ?.replaceAll(",", "")
                ?.toLowerCase()
                ?.includes(text) ||
              `${option.firstname ?? ""} + ${option.lastname ?? ""}`
                ?.toLowerCase()
                ?.includes(text) ||
              option.businessName?.toLowerCase()?.includes(text) ||
              option.name?.toLowerCase()?.includes(text)
            );
          }}
          defaultSelected={
            getValues(`${props.field}`) ? [getValues(`${props.field}`)] : []
          }
          // TODO this is a quickfix for a label missing on edit of these field
          placeholder={
            getValues(`${props.field}.address.formattedAddress`) ??
            props.placeholder
          }
          emptyLabel={<Text>Aucun résultat trouvé</Text>}
          options={[
            ...(favoriteAddress != undefined && favoriteAddress != null
              ? favoriteAddress.map(convertFavorite)
              : []),
            ...retailPointAddress.map(convertRp),
            ...placePredictions,
          ]}
          onChange={async selected => {
            if (selected.length > 0) {
              const option = selected[0];
              const isClient = (option as MissionClient).type ? true : false;
              const client = !isClient
                ? await convertPrediction(
                    option as google.maps.places.AutocompletePrediction
                  )
                : (option as MissionClient);
              setDisabledFields({
                businessName: client.businessName != null,
                phone: client.phone != null,
                email: client.email != null,
              });
              setValue(props.field, JSON.parse(JSON.stringify(client)));
              previewNotifier();
              clearErrors([`${props.field}`]);
            } else {
              setValue(`${props.field}.address`, null);
            }
          }}
          onInputChange={(query, _) => {
            if (showUsers)
              getPlacePredictions({
                input: query,
                componentRestrictions: { country: ["fr", "be", "lu", "de"] },
                ...(location
                  ? {
                      location: location,
                      radius: 50000,
                    }
                  : {}),
              });
          }}
          ref={typeaheadRef}
          renderInput={({ inputRef, referenceElementRef, ...inputProps }) => (
            <TypeaheadInputContainer
              justifyContent={"center"}
              alignItems={"center"}
            >
              <SvgPicture
                height="16px"
                width="16px"
                src={
                  watchClient?.address?.formattedAddress == null
                    ? searchIcon
                    : watchClient?.address?.favoriteAddressId != undefined
                    ? starIcon
                    : watchClient?.type == MissionClientType.retailpoint
                    ? shopIcon
                    : userIcon
                }
              />
              <CustomInput
                {...inputProps}
                ref={input => {
                  inputRef(input);
                  referenceElementRef(input);
                }}
              />
            </TypeaheadInputContainer>
          )}
          renderMenu={(results, menuProps) => {
            Object.keys(menuProps).forEach(
              key => menuProps[key] === undefined && delete menuProps[key]
            );
            return (
              <Menu {...menuProps}>
                {results.map((option, index) => (
                  <MenuItem
                    option={option}
                    position={index}
                    key={`menu-item-${index}`}
                  >
                    {(option as MissionClient).type ? (
                      <ResultMissionClient client={option as MissionClient} />
                    ) : (
                      <ResultUser
                        option={
                          option as google.maps.places.AutocompletePrediction
                        }
                      />
                    )}
                  </MenuItem>
                ))}
                {placePredictions.length > 0 && (
                  <Row justifyContent="end">
                    <img src="/img/react/powered_by_google_on_white.png" />
                  </Row>
                )}
              </Menu>
            );
          }}
        />
      </TypeaheadContainer>
      <ErrorField field={`${props.field}.address.formattedAddress`} />
      {watchClient?.address?.formattedAddress == null ? (
        <Column height="100%" justifyContent={"center"} alignItems={"center"}>
          <SvgPicture
            src={props.field == "sender" ? rpAddressImg : DeliveryAddressImg}
            height="64px"
            width="64px"
          />
        </Column>
      ) : watchClient?.type == "retailpoint" ? (
        <RetailpointForm field={props.field} />
      ) : (
        <UserForm
          field={props.field}
          addFavorite={watchClient.address?.favoriteAddressId == undefined}
        />
      )}
    </CustomColumn>
  );
}

export default MissionClientInput;

function ResultUser(props: {
  option: google.maps.places.AutocompletePrediction;
}) {
  const theme = useTheme();
  return (
    <Row justifyContent={"start"} alignItems={"center"}>
      <SvgPicture
        height="16px"
        width="16px"
        margin={{ right: "16px" }}
        src={userIcon}
      />
      <Text
        textStyle={theme.textTheme.body.small.copyWith({
          color: theme.color.primary["300"],
        })}
      >
        {props.option.description}
      </Text>
    </Row>
  );
}

function ResultMissionClient(props: { client: MissionClient }) {
  const theme = useTheme();
  return (
    <Row justifyContent={"start"} alignItems={"center"}>
      <SvgPicture
        height="16px"
        width="16px"
        margin={{ right: "16px" }}
        src={
          props.client.address?.favoriteAddressId == null ? shopIcon : starIcon
        }
      />
      <Column>
        <Text>
          {props.client.businessName ??
            `${props.client.firstname} ${props.client.lastname}`}
        </Text>
        <Text
          textStyle={theme.textTheme.body.small.copyWith({
            color: theme.color.primary["300"],
          })}
        >
          {props.client.address?.formattedAddress}
        </Text>
      </Column>
    </Row>
  );
}

function RetailpointForm(props: { field: string }) {
  const theme = useTheme();
  const disabledFields = useRecoilValue(disabledFieldsProvider(props.field));
  const { register } = useFormContext();

  return (
    <>
      <InputContainer>
        <Label
          textStyle={theme.textTheme.body.small.copyWith({
            color: theme.color.primary["300"],
          })}
        >
          Société
        </Label>
        <Input
          {...register(`${props.field}.businessName`)}
          disabled={disabledFields["businessName"]}
        />
        <ErrorField field={`${props.field}.businessName`} />
      </InputContainer>
      <Row justifyContent={"space-between"} alignItems={"start"}>
        <InputContainer margin={{ right: "15px" }}>
          <Label
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            Téléphone
          </Label>
          <Input
            {...register(`${props.field}.phone`)}
            disabled={disabledFields["phone"]}
          />
          <ErrorField field={`${props.field}.phone`} />
        </InputContainer>
        <InputContainer>
          <Row justifyContent={"space-between"} alignItems={"start"}>
            <Label
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary["300"],
              })}
            >
              Adresse email
            </Label>
            <Text
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary["200"],
              })}
            >
              Facultatif
            </Text>
          </Row>
          <Input
            {...register(`${props.field}.email`)}
            disabled={disabledFields["email"]}
          />
          <ErrorField field={`${props.field}.email`} />
        </InputContainer>
      </Row>
      {/* TODO renable this when back can accept a comment*/}
      <InputContainer>
        <Row justifyContent={"space-between"} alignItems={"start"}>
          <Label
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            Informations complémentaires
          </Label>
          <Text
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.primary["200"],
            })}
          >
            Facultatif
          </Text>
        </Row>
        <Textarea
          {...register(`${props.field}.address.additional`)}
          disabled={true}
        />
      </InputContainer>
    </>
  );
}

function UserForm(props: { field: string; addFavorite: boolean }) {
  const theme = useTheme();
  const [showMore, setShowMore] = useState(false);
  const { register, control, setValue, getValues } = useFormContext();

  return (
    <>
      <MoreInfoRow
        onClick={() => setShowMore(!showMore)}
        alignItems="center"
        justifyContent="start"
        margin={{ top: "4px" }}
      >
        <SvgPicture
          src={showMore ? minusIcon : plusIcon}
          width="13px"
          height="13px"
          color={theme.color.information["400"]}
        />
        <Text
          textStyle={theme.textTheme.body.small.copyWith({
            color: theme.color.information["400"],
          })}
          margin={{ left: "4px" }}
        >
          Ajouter des informations (étage, appartement ...)
        </Text>
      </MoreInfoRow>
      {showMore && (
        <Row justifyContent={"space-between"} alignItems={"start"}>
          <Flexible size={2}>
            <InputContainer width="100%">
              <Label
                textStyle={theme.textTheme.body.small.copyWith({
                  color: theme.color.primary["300"],
                })}
              >
                Bis, Ter
              </Label>
              <Controller
                render={({ field: { onChange } }) => {
                  // TODO for some reason, controller is not working
                  const options = ["BIS", "TER", "QUATER"];
                  // We add getValues here here
                  const value = getValues(
                    `${props.field}.address.additionalNumber`
                  );
                  return (
                    <Select
                      components={{ IndicatorSeparator: () => null }}
                      isClearable={value != null}
                      isSearchable={false}
                      isMulti={false}
                      maxMenuHeight={380}
                      placeholder={<Text>Choisir</Text>}
                      defaultValue={{ label: value, value: value }}
                      onChange={d => {
                        // We add setValue here
                        setValue(
                          `${props.field}.address.additionalNumber`,
                          d?.value
                        );
                        return onChange(d?.value, null);
                      }}
                      options={options.map(v => ({
                        label: v,
                        value: v,
                      }))}
                      value={{ label: value, value: value }}
                    />
                  );
                }}
                control={control}
                name={`${props.field}.address.additionalNumber}`}
              />
              <ErrorField field={`${props.field}.address.additionalNumber`} />
            </InputContainer>
          </Flexible>
          <Flexible size={3}>
            <InputContainer width="100%" padding={{ left: "16px" }}>
              <Label
                textStyle={theme.textTheme.body.small.copyWith({
                  color: theme.color.primary["300"],
                })}
              >
                Appartement
              </Label>
              <Input {...register(`${props.field}.address.apartment`)} />
              <ErrorField field={`${props.field}.address.apartment`} />
            </InputContainer>
          </Flexible>
        </Row>
      )}
      {showMore && (
        <Row justifyContent={"space-between"} alignItems={"start"}>
          <Flexible>
            <InputContainer>
              <Label
                textStyle={theme.textTheme.body.small.copyWith({
                  color: theme.color.primary["300"],
                })}
              >
                Étage
              </Label>
              <Controller
                render={({ field: { onChange } }) => {
                  let options = Array(16);
                  for (var i = 0; i < Array(16).length; i++) {
                    options[i] = {
                      label: i == 0 ? "RDC" : i.toString(),
                      value: i.toString(),
                    };
                  }
                  // TODO for some reason, controller is not working
                  const value = getValues(`${props.field}.address.floor`);
                  return (
                    <div style={{ width: "100%" }}>
                      <Select
                        defaultValue={
                          options.find(o => o.value.toString() == value) ??
                          options[0]
                        }
                        components={{ IndicatorSeparator: () => null }}
                        isSearchable={false}
                        isMulti={false}
                        maxMenuHeight={380}
                        onChange={d => {
                          setValue(`${props.field}.address.floor`, d?.value);
                          return onChange(d?.value, null);
                        }}
                        options={options}
                        value={
                          options.find(o => o.value.toString() == value) ??
                          options[0]
                        }
                      />
                    </div>
                  );
                }}
                control={control}
                name={`${props.field}.address.floor}`}
              />
              <ErrorField field={`${props.field}.address.floor`} />
            </InputContainer>
          </Flexible>
          <Flexible size={2} />
        </Row>
      )}
      <Row justifyContent={"space-between"} alignItems={"start"}>
        <InputContainer margin={{ right: "15px" }}>
          <Label
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            Prénom
          </Label>
          <Input {...register(`${props.field}.firstname`)} />
          <ErrorField field={`${props.field}.firstname`} />
        </InputContainer>
        <InputContainer>
          <Label
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            Nom
          </Label>
          <Input {...register(`${props.field}.lastname`)} />
          <ErrorField field={`${props.field}.lastname`} />
        </InputContainer>
      </Row>
      <Row justifyContent={"space-between"} alignItems={"start"}>
        <InputContainer margin={{ right: "15px" }}>
          <Label
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            Téléphone
          </Label>
          <Input {...register(`${props.field}.phone`)} />
          <ErrorField field={`${props.field}.phone`} />
        </InputContainer>
        <InputContainer>
          <Row justifyContent={"space-between"} alignItems={"start"}>
            <Label
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary["300"],
              })}
            >
              Adresse email
            </Label>
            <Text
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary["200"],
              })}
            >
              Facultatif
            </Text>
          </Row>
          <Input {...register(`${props.field}.email`)} />
          <ErrorField field={`${props.field}.email`} />
        </InputContainer>
      </Row>
      <InputContainer>
        <Row justifyContent={"space-between"} alignItems={"start"}>
          <Label
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.primary["300"],
            })}
          >
            Informations complémentaires
          </Label>
          <Text
            textStyle={theme.textTheme.body.small.copyWith({
              color: theme.color.primary["200"],
            })}
          >
            Facultatif
          </Text>
        </Row>
        <Textarea {...register(`${props.field}.address.additional`)} />
      </InputContainer>
      {props.addFavorite && (
        <Row
          alignItems="center"
          justifyContent="start"
          margin={{ top: "16px" }}
        >
          <CheckboxInput
            id={`${props.field}_checkbox_favorite`}
            type="checkbox"
            {...register(`${props.field}.setAsFavorite`)}
          />
          <Spacing margin={{ left: "8px", right: "5px" }}>
            <FavoriteLabel
              htmlFor={`${props.field}_checkbox_favorite`}
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary["400"],
              })}
            >
              Ajouter au carnet d'adresses
            </FavoriteLabel>
          </Spacing>
          <InfoIcon
            name="info"
            color={theme.color.information["400"]}
            data-tip
            data-for={`${props.field}_tooltip_favorite`}
          />
          <Tooltip
            maxWidth="280px"
            id={`${props.field}_tooltip_favorite`}
            place={"bottom"}
            backgroundColor={"white"}
          >
            <Text textStyle={theme.textTheme.body.medium}>
              On vous conseille de cocher cette case si le destinataire est un
              de vos clients récurrents. Ses coordonnées seront enregistrées,
              plus besoin de les saisir à chaque fois !
            </Text>
          </Tooltip>
        </Row>
      )}
    </>
  );
}

/** Styled Component */
const CustomInput = styled.input`
  border: none;
  padding: 0 0 0 7px;
  height: auto;
  &&:focus-visible {
    outline: none;
  }
`;

const MoreInfoRow = styled(Row)`
  cursor: pointer;
`;

const TypeaheadInputContainer = styled(Row)`
  height: 41px;
  border: 1px solid #dce3e8;
  border-radius: 2px;
  padding: 0 10px;
  width: 100%;
  background-color: ${props => props.theme.color.grayscale["000"]};

  &&:focus-within {
    border: 1px solid ${props => props.theme.color.information["400"]};
  }

  &&:hover {
    border: 1px solid ${props => props.theme.color.information["400"]};
  }
`;

const TypeaheadContainer = styled.div`
  margin-top: 16px;
  position: relative;

  .rbt {
    width: 100%;
    position: unset !important;

    input::placeholder {
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: ${props => props.theme.color.primary["300"]};
    }

    .dropdown-item {
      padding: 8px 16px;
    }
  }

  .rbt-menu {
    width: inherit !important;
    padding: 0 !important;
    margin: 0 !important;
    transform: translate3d(0, 40px, 0) !important;
  }
`;

const InputContainer = styled(Column)`
  margin-top: 16px;
`;

const CustomColumn = styled(Column)`
  height: 100%;
  min-height: 400px;
`;

const CheckboxInput = styled.input`
  width: 15px !important;
  height: 15px !important;
  border: 1px solid ${props => props.theme.color.primary["200"]};
  transition: 0.5s;
  accent-color: ${props => props.theme.color.secondary["400"]};
  cursor: pointer;
  &:checked {
    width: 15px !important;
    height: 15px !important;
    transition: 0.5s;
  }
  &:before {
    position: relative;
    display: block;
    transition: 0.5s;
    content: "";
    accent-color: ${props => props.theme.color.secondary["400"]};
  }
`;

const InfoIcon = styled(MaterialIcon)`
  cursor: help;
`;

const FavoriteLabel = styled(Label)`
  cursor: pointer;
`;

const VisibleContainer = styled.div<{ visible: boolean }>`
  display: ${props => (props.visible ? "block" : "block")};
`;

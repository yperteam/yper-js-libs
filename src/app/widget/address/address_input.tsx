import React, { useEffect, useRef } from "react";
import Joi from "../../../app/widget/helper/extended_joi";
import { useFormContext } from "react-hook-form";
import styled, { useTheme } from "styled-components";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { Column, Row } from "../generic";
import { Text, SvgPicture } from "../../../app/widget/mixins";
import { Typeahead } from "react-bootstrap-typeahead";
import { Address } from "../../../data/entity/address.entity";
import { customMessage } from "../error_field";
import CustomLoader from "../../../app/widget/loader";

// TODO here we do not make it a requirement to have street, streetNumber and city for special cases
export const addressSchema = Joi.object({
  formattedAddress: Joi.string().required(),
  location: Joi.object({
    coordinates: Joi.array().items(Joi.number()),
  }),
  favoriteAddressId: Joi.string()
    .empty(["", null])
    .optional(),
  streetNumber: Joi.string()
    .empty(["", null])
    .optional(), // TODO .required(),
  street: Joi.string()
    .empty(["", null])
    .optional(), // TODO .required(),
  country: Joi.string().required(),
  city: Joi.string()
    .empty(["", null])
    .optional(), // TODO .required(),
  zip: Joi.string()
    .empty(["", null])
    .optional(), // TODO required ?
  additionalNumber: Joi.string()
    .empty(["", null])
    .optional(),
  apartment: Joi.string()
    .empty(["", null])
    .optional(),
  floor: Joi.string()
    .empty(["", null])
    .default("0")
    .optional(),
  additional: Joi.string()
    .empty(["", null])
    .optional(),
}).messages(customMessage("address"));

/** Icons */
const searchIcon = "/img/icon/search_icon.svg";
const userIcon = "/img/react/icon/ic_pin_location.svg";

function AddressInput(props: {
  field: string;
  placeholder: string;
  formattedAddress: string;
}) {
  const typeaheadRef = useRef(null);
  const { setValue, clearErrors, getValues, watch } = useFormContext();
  const watchClient = watch(props.field);

  const setValues = (item: google.maps.places.AutocompletePrediction) => {
    placesService?.getDetails(
      {
        placeId: item.place_id,
      },
      place => {
        place.address_components?.map(info => {
          if (info.types.includes("street_number")) {
            setValue(props.field + ".streetNumber", info.short_name);
          }
          if (info.types.includes("route")) {
            setValue(props.field + ".street", info.short_name);
          }
          if (info.types.includes("locality")) {
            setValue(props.field + ".city", info.short_name);
          }
          if (info.types.includes("country")) {
            setValue(props.field + ".country", info.short_name);
          }
          if (info.types.includes("postal_code")) {
            setValue(props.field + ".zip", info.short_name);
          }
        });
        setValue(props.field + ".formattedAddress", place.formatted_address);
        setValue(`${props.field}.apartment`, null);
        setValue(`${props.field}.floor`, null);
        setValue(props.field + ".location.coordinates", [
          place.geometry?.location.lng(),
          place.geometry?.location.lat(),
        ]);
      }
    );
  };

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    //Todo : stock as env var ?
    apiKey: "AIzaSyBG82w7Bo4aDwTJ5NNjsb3SqhuPuf3eN64", //process.env.REACT_APP_GOOGLE,
    debounce: 800,
    options: {
      input: "",
      types: ["address"],
      componentRestrictions: { country: ["fr", "be", "lu"] },
    },
  });

  useEffect(() => {
    props.formattedAddress &&
      getPlacePredictions({
        input: props.formattedAddress,
        types: ["address"],
        componentRestrictions: { country: ["fr", "be", "lu"] },
      });
  }, [props.formattedAddress]);

  return (
    <Column justifyContent={"flex-start"} width="100%">
      <TypeaheadContainer>
        <Typeahead
          id="basic-typeahead-single"
          labelKey={option => {
            const prediction = option as google.maps.places.AutocompletePrediction;
            const address = option as Address;
            if (prediction.description) {
              return prediction.description;
            } else {
              return address.formattedAddress ?? "";
            }
          }}
          defaultSelected={
            getValues(`${props.field}`) ? [getValues(`${props.field}`)] : []
          }
          placeholder={props.placeholder}
          emptyLabel={
            isPlacePredictionsLoading ? (
              <CustomLoader />
            ) : (
              <Text>Aucun résultat trouvé</Text>
            )
          }
          options={[...placePredictions]}
          onChange={selected => {
            if (selected.length > 0) {
              const option = selected[0];
              setValues(option as google.maps.places.AutocompletePrediction);
              clearErrors([`${props.field}`]);
            } else {
              setValue(`${props.field}.formattedAddress`, null);
            }
          }}
          onInputChange={(query, _) => {
            getPlacePredictions({
              input: query,
              types: ["address"],
              componentRestrictions: { country: ["fr", "be", "lu"] },
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
                  watchClient?.formattedAddress == null ? searchIcon : userIcon
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
          renderMenuItemChildren={(option, _) => (
            <ResultUser
              option={option as google.maps.places.AutocompletePrediction}
            />
          )}
        />
      </TypeaheadContainer>
    </Column>
  );
}

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

export default AddressInput;

/** Styled Component */
const CustomInput = styled.input`
  border: none;
  padding: 0 0 0 7px;
  height: auto;
  &&:focus-visible {
    outline: none;
  }
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

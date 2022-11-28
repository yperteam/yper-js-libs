import React, { useEffect, useState } from "react";
import {
  CardHeader,
  MainCard,
  CardTitle,
  CardBody,
} from "@yper-script/react/app/widget/card";
import {
  Column,
  Flexible,
  Row,
  Spacing,
} from "@yper-script/react/app/widget/generic";
import {
  Label,
  MaterialIcon,
  Text,
} from "@yper-script/react/app/widget/mixins";
import styled, { useTheme } from "styled-components";
import { Input } from "@yper-script/react/app/widget/input";
import { FormProvider, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import ErrorField, { customMessage } from "../../order/error_field";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "@yper-script/react/app/widget/button";
import Joi from "@yper-script/react/app/widget/helper/extended_joi";
import CustomLoader, {
  ButtonLoader,
} from "@yper-script/react/app/widget/loader";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { SearchSocietyNotifier } from "@yper-script/react/app/notifiers/society/search_society_notifier";
import { EditSocietyNotifier } from "@yper-script/react/app/notifiers/society/edit_society_notifier";
import { GetSocietyNotifier } from "@yper-script/react/app/notifiers/society/get_society_notifier";
import AddressInput, {
  addressSchema,
} from "@yper-script/react/app/widget/address/address_input";
import SocietySiretField from "./society_siret_field";

export default function SocietyScreen() {
  document.title = "Yper.shop | Ma société";
  const theme = useTheme();
  const searchLoadable = useRecoilValue(SearchSocietyNotifier.provider);
  const editLoadable = useRecoilValue(EditSocietyNotifier.provider);
  const getLoadable = useRecoilValue(GetSocietyNotifier.provider);
  const initialSiret = getLoadable.contents.identificationNumber
    ? `${getLoadable.contents.identificationNumber}00000`
    : "";
  const [formattedAddress, setFormattedAddress] = useState(null);

  const methods = useForm({
    reValidateMode: "onSubmit",
    resolver: joiResolver(
      Joi.object({
        name: Joi.string().required(),
        activityTypeId: Joi.string()
          .regex(/^[0-9]{2}\.[0-9]{2}[A-Z]$/)
          .required(),
        identificationNumber: Joi.string()
          .regex(/^[0-9]{9}$/)
          .required(),
        address: addressSchema,
        owner: Joi.object({
          lastname: Joi.string().required(),
          firstname: Joi.string().required(),
          phone: Joi.object({
            number: Joi.phoneNumber()
              .defaultRegion("FR")
              .required(),
          }),
        }),
      }).messages(customMessage()),
      {
        stripUnknown: true,
        abortEarly: false,
      }
    ),
    defaultValues: {
      name: getLoadable.contents.name,
      activityTypeId: getLoadable.contents.activityTypeId,
      identificationNumber: getLoadable.contents.identificationNumber,
      address: getLoadable.contents.address,
      owner: {
        lastname: getLoadable.contents.owner?.lastName,
        firstname: getLoadable.contents.owner?.firstName,
        phone: {
          number: getLoadable.contents.owner?.phone?.number,
        },
      },
    },
  });

  const editNotifier = useRecoilCallback(
    callback => async () => {
      methods.handleSubmit(data => {
        return EditSocietyNotifier.notifier(
          {
            name: data.name,
            activityType: data.activityTypeId,
            identificationNumber: data.identificationNumber,
            ownerFirstname: data.owner.firstname,
            ownerLastname: data.owner.lastname,
            ownerPhone: data.owner.phone?.number,
            address: data.address,
          },
          callback
        );
      })();
    },
    []
  );

  useEffect(() => {
    if (getLoadable?.state === "hasValue") {
      setFormattedAddress(getLoadable.contents.address.formattedAddress);
    }
  }, [getLoadable]);

  useEffect(() => {
    if (searchLoadable?.state === "hasValue") {
      methods.setValue("name", searchLoadable.contents.brand);
      methods.setValue("activityTypeId", searchLoadable.contents.activityType);
      methods.setValue("identificationNumber", searchLoadable.contents.siren);
      methods.setValue("address", searchLoadable.contents.address);
      methods.setValue("owner.lastname", searchLoadable.contents.name);
      methods.setValue("owner.phone.number", searchLoadable.contents.phone);
      setFormattedAddress(searchLoadable.contents.address.formattedAddress);
    }
  }, [searchLoadable]);

  return (
    <>
      <MainCard>
        <CardHeader>
          <Row justifyContent={"space-between"}>
            <CardTitle alignItems="center">
              <MaterialIcon color={theme.color.primary[400]} name="style" />
              <span>Ma societé</span>
            </CardTitle>
          </Row>
        </CardHeader>
        <CardBody>
          <Spacing
            padding={{
              top: "24.5px",
              left: "59.5px",
              bottom: "41px",
              right: "59.5px",
            }}
          >
            <Column>
              <SocietySiretField initialSiret={initialSiret} />
              <Divider
                margin={{
                  top: "16px",
                  left: "16px",
                  bottom: "24.5px",
                  right: "16px",
                }}
              />
              <FormContainer>
                {searchLoadable?.state === "loading" && (
                  <LoaderContainer alignItems="center">
                    <CustomLoader />
                  </LoaderContainer>
                )}
                <FormProvider {...methods}>
                  <form
                    onSubmit={event => {
                      event.preventDefault();
                      editNotifier();
                    }}
                  >
                    <Row alignItems="start">
                      <Column size={1} margin={{ right: "29.5px" }}>
                        <Label>NOM DE L'ENTREPRISE</Label>
                        <Input {...methods.register("name")} />
                        <ErrorField field="name" />
                      </Column>
                      <Column size={1}>
                        <Label>SECTEUR D'ACTIVITÉ / CODE APE</Label>
                        <Input {...methods.register("activityTypeId")} />
                        <ErrorField field="activityTypeId" />
                      </Column>
                    </Row>
                    <Spacing margin={{ top: "22px" }}>
                      <Label>NUMÉRO DE SIREN</Label>
                      <Input {...methods.register("identificationNumber")} />
                      <ErrorField field="identificationNumber" />
                    </Spacing>
                    <Spacing margin={{ top: "22px" }}>
                      <Label>ADRESSE</Label>
                      <AddressInput
                        field="address"
                        placeholder=""
                        formattedAddress={formattedAddress}
                      />
                      <ErrorField field="address.formattedAddress" />
                    </Spacing>
                    <Row margin={{ top: "22px" }}>
                      <Column size={1} margin={{ right: "29.5px" }}>
                        <Label>NOM DU GÉRANT</Label>
                        <Input {...methods.register("owner.lastname")} />
                        <ErrorField field="owner.lastname" />
                      </Column>
                      <Column size={1}>
                        <Label>PRÉNOM DU GÉRANT</Label>
                        <Input {...methods.register("owner.firstname")} />
                        <ErrorField field="owner.firstname" />
                      </Column>
                    </Row>
                    <Row margin={{ top: "22px" }}>
                      <Column size={1} margin={{ right: "29.5px" }}>
                        <Label>TÉLÉPHONE ENTREPRISE</Label>
                        <Input {...methods.register("owner.phone.number")} />
                        <ErrorField field="owner.phone.number" />
                      </Column>
                      <Flexible size={1}></Flexible>
                    </Row>

                    <Row justifyContent="flex-end" margin={{ top: "35px" }}>
                      <ButtonSecondary
                        type="button"
                        onClick={event => {
                          event.preventDefault;
                          setFormattedAddress(
                            getLoadable.contents.address.formattedAddress
                          );
                          methods.reset({
                            name: getLoadable.contents.name,
                            activityTypeId: getLoadable.contents.activityTypeId,
                            identificationNumber:
                              getLoadable.contents.identificationNumber,
                            address: getLoadable.contents.address,
                            owner: {
                              lastname: getLoadable.contents.owner?.lastName,
                              firstname: getLoadable.contents.owner?.firstName,
                              phone: {
                                number:
                                  getLoadable.contents.owner?.phone?.number,
                              },
                            },
                          });
                        }}
                      >
                        <Text>Annuler les modifications</Text>
                      </ButtonSecondary>
                      <ButtonPrimary type="submit">
                        {editLoadable?.state === "loading" ? (
                          <ButtonLoader />
                        ) : (
                          <Text>Enregistrer</Text>
                        )}
                      </ButtonPrimary>
                    </Row>
                  </form>
                </FormProvider>
              </FormContainer>
            </Column>
          </Spacing>
        </CardBody>
      </MainCard>
    </>
  );
}

const FormContainer = styled.div`
  position: relative;
`;

const LoaderContainer = styled(Column)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1;
`;

const Divider = styled(Spacing)`
  height: 1px;
  background: ${props => props.theme.color.grayscale["200"]};
`;

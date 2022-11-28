import { joiResolver } from "@hookform/resolvers/joi";
import { Column, Flexible, Row } from "@yper-script/react/app/widget/generic";
import { Label, SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import ErrorField, { customMessage } from "../../order/error_field";
import Joi from "@yper-script/react/app/widget/helper/extended_joi";
import { useRecoilCallback } from "recoil";
import { Input } from "@yper-script/react/app/widget/input";
import { debounceTime, Subject } from "rxjs";
import { SearchSocietyNotifier } from "@yper-script/react/app/notifiers/society/search_society_notifier";
const infoIcon = "/img/react/icon/ic_information_circle_full.svg";

function SocietySiretField(props: { initialSiret: string }) {
  const methods = useForm({
    reValidateMode: "onSubmit",
    resolver: joiResolver(
      Joi.object({
        siret: Joi.string()
          .regex(/^[0-9]{14}$/)
          .optional()
          .allow(""),
      }).messages(customMessage())
    ),
    defaultValues: {
      siret: props.initialSiret,
    },
  });

  const searchNotifier = useRecoilCallback(
    callback => async () => {
      methods.handleSubmit(data => {
        return SearchSocietyNotifier.notifier(data.siret, callback);
      })();
    },
    []
  );

  const inputSiretChanges$ = new Subject();
  useEffect(() => {
    const subscription = inputSiretChanges$
      .pipe(debounceTime(800))
      .subscribe(() => {
        searchNotifier();
      });

    return () => {
      return subscription.unsubscribe();
    };
  });

  return (
    <>
      <FormProvider {...methods}>
        <Row>
          <Column size={1} margin={{ right: "29.5px" }}>
            <Label>NUMÉRO DE SIRET</Label>
            <Input
              {...methods.register("siret")}
              onChange={event => {
                methods.setValue("siret", event.target.value);
                inputSiretChanges$.next("");
              }}
            />
            <ErrorField field="siret" />
          </Column>
          <Flexible size={1}></Flexible>
        </Row>
      </FormProvider>
      <Row justifyContent="flex-start" margin={{ top: "16px" }}>
        <SvgPicture src={infoIcon} />
        <Text padding={{ left: "5px" }}>
          Renseignez votre SIRET, nous nous chargons de remplir le formulaire à
          votre place !
        </Text>
      </Row>
    </>
  );
}

export default React.memo(SocietySiretField);

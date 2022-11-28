import React from "react";
import styled, { useTheme } from "styled-components";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import { Column, Row } from "@yper-script/react/app/widget/generic";
import {
  atom,
  useRecoilCallback,
  useRecoilState,
  useRecoilValue,
} from "recoil";
import { MissionTemplateNotifier } from "@yper-script/react/app/notifiers/order/mission_template_notifier";
import { ButtonLoader } from "@yper-script/react/app/widget/loader";
import { FormProvider, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "@yper-script/react/app/widget/button";
import Product from "@yper-script/react/app/screen/order/second_step/products";
import ContentInfos from "@yper-script/react/app/screen/order/second_step/content_infos";
import { OrderContentNotifier } from "@yper-script/react/app/notifiers/order/order_content_notifier";
import { customMessage } from "@yper-script/react/app/screen/order/error_field";
import { PrebookNotifier } from "@yper-script/react/app/notifiers/order/prebook_notifier";
import { Mission } from "@yper-script/react/data/entity/mission.entity";
import ProductOptions from "@yper-script/react/app/screen/order/second_step/product_options";
import Products from "@yper-script/react/app/screen/order/second_step/products";
import { CurrentRetailpointNotifier } from "@yper-script/react/app/notifiers/retailpoint/current_retailpoint_notifier";
import { CurrentProNotifier } from "@yper-script/react/app/notifiers/pro/current_pro_notifier";
import { RetailpointSettingsNotifier } from "@yper-script/react/app/notifiers/retailpoint/retailpoint_settings_notifier";

/** Images */
const ButtonClose = "/img/react/order/ic_close.svg";

export const editProvider = atom<boolean>({
  key: "edit_second_form_provider",
  default: false,
});

function StepForm(props: { orderId: string; prebookId: string }) {
  const theme = useTheme();
  const prebook = useRecoilValue(PrebookNotifier.provider(props.prebookId))
    .contents as Mission;
  const maxDeliveryValue = useRecoilValue(
    RetailpointSettingsNotifier.maxDeliveryValueProvider
  );
  const methods = useForm({
    reValidateMode: "onSubmit",
    resolver: joiResolver(
      Joi.object({
        nbArticles: Joi.number()
          .empty(["", null])
          .min(1)
          .required()
          .messages(customMessage()),
        price: Joi.number()
          .empty(["", null])
          .required()
          .min(0)
          .max(maxDeliveryValue)
          .messages(customMessage("orderMax")),
        product: Joi.string(),
        options: Joi.array().items(Joi.string()),
      })
    ),
    defaultValues: {
      product: prebook.missionTemplate?.id,
      options: prebook.options,
      nbArticles: prebook.extra.nbItems ?? 1,
      price: prebook.extra.price ?? 0,
    },
  });
  const [editForm, setEditForm] = useRecoilState(editProvider);
  const orderContentProvider = useRecoilValue(
    OrderContentNotifier.provider(props.orderId)
  );
  const products = useRecoilValue(MissionTemplateNotifier.provider);
  const notifier = useRecoilCallback(
    callback => async () => {
      await methods.handleSubmit(
        data => {
          // TODO we should add it to domain layer
          const template = products.find(p => p.id == data.product);
          const options = template.option
            .filter(o => o.forced || data.options.includes(o.name))
            .map(o => o.name);
          return OrderContentNotifier.notifier(
            props.orderId,
            props.prebookId,
            data.product,
            options,
            data.nbArticles,
            data.price,
            callback
          );
        },
        error => {
          //Do nothing
        }
      )();
    },
    []
  );

  return (
    <>
      <CardBody justifyContent={"start"}>
        <FormProvider {...methods}>
          <form id="order-contains" onSubmit={methods.handleSubmit(_ => {})}>
            <Text
              textStyle={theme.textTheme.title.small.copyWith({
                color: theme.color.primary["300"],
              })}
            >
              Type de produit
            </Text>
            <Products />
            <Text
              textStyle={theme.textTheme.title.small.copyWith({
                color: theme.color.primary["300"],
              })}
              margin={{ top: "16px" }}
            >
              Caractéristiques du produit
            </Text>
            <ProductOptions />
            <ContentInfos />
          </form>
        </FormProvider>
      </CardBody>
      <CardFooter justifyContent={"end"}>
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
        <ButtonPrimary onClick={notifier} margin={{ left: "4px" }}>
          {orderContentProvider?.state != "loading" ? (
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

const CardBody = styled(Column)`
  padding: 16px 40px;
  display: block;
`;

const CardFooter = styled(Row)`
  border-top: 1px solid ${props => props.theme.color.grayscale["200"]};
  padding: 12px 24px;
`;

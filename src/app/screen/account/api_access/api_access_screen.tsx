import React, { MouseEventHandler, useEffect, useState } from "react";
import {
  CardHeader,
  MainCard,
  CardTitle,
  CardBody,
} from "@yper-script/react/app/widget/card";
import { Column, Row, Spacing } from "@yper-script/react/app/widget/generic";
import {
  Label,
  MaterialIcon,
  Text,
} from "@yper-script/react/app/widget/mixins";
import styled, { useTheme } from "styled-components";
import { Input } from "@yper-script/react/app/widget/input";
import { FormProvider, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { ButtonPrimary } from "@yper-script/react/app/widget/button";
import Joi from "@yper-script/react/app/widget/helper/extended_joi";
import { ButtonLoader } from "@yper-script/react/app/widget/loader";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { Tooltip } from "@yper-script/react/app/widget/tooltip";
import { CurrentProNotifier } from "@yper-script/react/app/notifiers/pro/current_pro_notifier";
import { CurrentRetailpointNotifier } from "@yper-script/react/app/notifiers/retailpoint/current_retailpoint_notifier";
import { ResetProSecretNotifier } from "@yper-script/react/app/notifiers/api_access/reset_pro_secret_notifier";

export default function ApiAccessScreen() {
  document.title = "Yper.shop | Accès API";
  const theme = useTheme();
  const resetLoadable = useRecoilValue(ResetProSecretNotifier.provider);
  const pro = useRecoilValue(CurrentProNotifier.provider);
  const getRpLoadable = useRecoilValue(CurrentRetailpointNotifier.idProvider);

  const methods = useForm({
    reValidateMode: "onSubmit",
    resolver: joiResolver(
      Joi.object({
        proId: Joi.string().required(),
        proSecret: Joi.string().required(),
        retailpointId: Joi.string().required(),
      }).messages()
    ),
    defaultValues: {
      proId: pro.id,
      proSecret: pro.securityToken,
      retailpointId: getRpLoadable.contents,
    },
  });

  const resetNotifier = useRecoilCallback(
    callback => async () => {
      return ResetProSecretNotifier.notifier(callback);
    },
    []
  );

  useEffect(() => {
    methods.setValue("proSecret", pro.securityToken);
  }, [pro]);

  useEffect(() => {
    if (getRpLoadable.state == "hasValue") {
      methods.setValue("retailpointId", getRpLoadable.contents);
    }
  }, [getRpLoadable]);

  return (
    <>
      <MainCard>
        <CardHeader>
          <Row justifyContent={"space-between"}>
            <CardTitle alignItems="center">
              <MaterialIcon color={theme.color.primary[400]} name="extension" />
              <span>Accès API</span>
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
              <FormProvider {...methods}>
                <Row alignItems="start">
                  <Column size={1} margin={{ right: "29.5px" }}>
                    <Label>PRO ID</Label>
                    <Stack>
                      <Input readOnly {...methods.register("proId")} />
                      <InputCopyIcon
                        name="proIdCopy"
                        getText={() => methods.getValues().proId}
                      />
                    </Stack>
                  </Column>
                  <Column size={1}>
                    <Label>PRO SECRET</Label>
                    <Stack>
                      <Input
                        readOnly
                        type="password"
                        {...methods.register("proSecret")}
                      />
                      <InputCopyIcon
                        name="proSecretCopy"
                        getText={() => methods.getValues().proSecret}
                      />
                    </Stack>
                    <Spacing margin={{ top: "10px" }}>
                      <ButtonPrimary onClick={resetNotifier}>
                        {resetLoadable?.state === "loading" ? (
                          <ButtonLoader />
                        ) : (
                          <Text>
                            {pro.securityToken == null
                              ? "Créer"
                              : "Réinitialiser"}
                          </Text>
                        )}
                      </ButtonPrimary>
                    </Spacing>
                  </Column>
                </Row>
                <Row margin={{ top: "22px" }}>
                  <Column size={1} margin={{ right: "29.5px" }}>
                    <Label>RETAIL POINT ID</Label>
                    <Stack>
                      <Input readOnly {...methods.register("retailpointId")} />
                      <InputCopyIcon
                        name="retailpointIdCopy"
                        getText={() => methods.getValues().retailpointId}
                      />
                    </Stack>
                  </Column>
                  <Column size={1} />
                </Row>
              </FormProvider>
            </Column>
          </Spacing>
        </CardBody>
      </MainCard>
    </>
  );
}

function InputCopyIcon(props: { name: string; getText }) {
  const theme = useTheme();
  const [isCopied, setIsCopied] = useState(false);

  return (
    <>
      <CopyIcon
        onClick={_ => {
          navigator.clipboard.writeText(props.getText());
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1000);
        }}
        data-tip
        data-for={props.name}
        name="content_copy"
      />
      <Tooltip id={props.name} place={"bottom"} offset={{ top: 0 }}>
        <Text
          textStyle={theme.textTheme.body.medium.copyWith({ color: "white" })}
        >
          Copier l'ID
        </Text>
      </Tooltip>
      {isCopied && (
        <CopyText
          textStyle={theme.textTheme.body.small.copyWith({
            color: theme.color.success[400],
          })}
        >
          Copié dans le presse-papier
        </CopyText>
      )}
    </>
  );
}

const CopyIcon = styled(MaterialIcon)`
  cursor: pointer;
  position: absolute;
  right: 0%;
  top: 50%;
  padding-right: 8px;
  transform: translateY(-50%);
`;

const CopyText = styled(Text)`
  position: absolute;
  right: 0%;
  top: 85%;
  background: #ffffff;
  border: 1px solid #31c2aa;
  border-radius: 29px;
  padding: 3px 8px 3px 8px;
`;

const Stack = styled.div`
  position: relative;
`;

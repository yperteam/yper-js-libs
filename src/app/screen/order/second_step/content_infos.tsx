import styled, { useTheme } from "styled-components";
import {
  Column,
  Expanded,
  Flexible,
  Row,
} from "@yper-script/react/app/widget/generic";
import React, { useState } from "react";
import { Input } from "@yper-script/react/app/widget/input";
import { useFormContext } from "react-hook-form";
import Modal, { ModalProvider } from "styled-react-modal";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import ErrorField from "@yper-script/react/app/screen/order/error_field";

/** Images */
const addIcon = `/img/react/order/add_icon.svg`;
const removeIcon = `/img/react/icon/ic_substract_circle_full.svg`;
const modalIcon = `/img/react/order/question_logo.svg`;

function ContentInfos() {
  const theme = useTheme();
  const [modalInfos, setModalInfos] = useState(false);
  const { register, setValue, getValues, watch } = useFormContext();

  const nbArticles = parseInt(watch("nbArticles") ?? 1);

  return (
    <>
      <Row margin={{ top: "16px" }} justifyContent={"flex-start"}>
        <Flexible>
          <Column justifyContent={"flex-start"} alignItems={"flex-start"}>
            <Text
              textStyle={theme.textTheme.body.small.copyWith({
                color: theme.color.primary["300"],
              })}
            >
              Nombre d'articles
            </Text>
            <Row alignItems={"center"} margin={{ top: "8px" }}>
              <ArticleIcon
                disabled={nbArticles <= 1}
                onClick={() => {
                  const nbArticles = parseInt(getValues("nbArticles"));
                  if (nbArticles > 1) {
                    setValue("nbArticles", nbArticles - 1);
                  }
                }}
                src={removeIcon}
                alt={"remove"}
                height={20}
              />
              <Flexible>
                <Input
                  margin={{ left: "10px", right: "10px" }}
                  {...register("nbArticles")}
                  defaultValue={1}
                  size={1}
                  textAlign="center"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </Flexible>
              <ArticleIcon
                disabled={false}
                onClick={() =>
                  setValue("nbArticles", parseInt(getValues("nbArticles")) + 1)
                }
                src={addIcon}
                alt={"add"}
                height={20}
              />
            </Row>
            <ErrorField field={"nbArticles"} />
          </Column>
        </Flexible>
        <Flexible>
          <Column
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
            margin={{ left: "32px" }}
          >
            <Row alignItems={"inherit"} margin={{ bottom: "8px" }}>
              <Text
                textStyle={theme.textTheme.body.small.copyWith({
                  color: theme.color.primary["300"],
                })}
              >
                Valeur totale
              </Text>
              <ModalIconFlexible
                margin={{ left: "10px" }}
                justifyContent={"flex-start"}
              >
                <SvgPicture
                  src={modalIcon}
                  width="15px"
                  onClick={() => setModalInfos(true)}
                />
              </ModalIconFlexible>
            </Row>
            <Input
              {...register("price")}
              defaultValue={0}
              size={1}
              pattern="[0-9]*"
            />
            <ErrorField field={"price"} />
          </Column>
        </Flexible>
        <Flexible size={3} />
      </Row>
      <ModalProvider>
        <ModalContainer
          isOpen={modalInfos}
          onBackgroundClick={() => setModalInfos(!modalInfos)}
          onEscapeKeydown={() => setModalInfos(!modalInfos)}
          opacity={1}
        >
          <ModalContent>
            <Column justifyContent={"center"} alignItems={"center"}>
              <SvgPicture width="26px" src={modalIcon} />
              <Text
                margin={{ top: "10px" }}
                textStyle={theme.textTheme.title.medium}
              >
                Pourquoi dois-je donner tant de détails ?
              </Text>
              <Text
                margin={{ top: "8px" }}
                textStyle={theme.textTheme.body.small}
                textAlign={"center"}
              >
                Nous avons besoin d'un maximum d'informations sur votre commande
                afin de solliciter le shopper le plus compatible avec votre
                demande. Merci de nous fournir ces informations avec un maximum
                d'exactitude, ce qui augmentera la probabilité que votre
                commande soit correctement prise en charge.
              </Text>
            </Column>
          </ModalContent>
        </ModalContainer>
      </ModalProvider>
    </>
  );
}

export default ContentInfos;

/** Styled Component */
const ModalContainer = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.opacity};
  transition: all 0.3s ease-in-out;
`;

const ModalContent = styled.div`
  background-color: ${props => props.theme.color.grayscale["000"]};
  max-width: 500px;
  border-radius: 8px;
  padding: 32px 48px 32px 48px;
`;

const ArticleIcon = styled.img<{ disabled: boolean }>`
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
`;

const ModalIconFlexible = styled(Flexible)`
  cursor: pointer;
`;

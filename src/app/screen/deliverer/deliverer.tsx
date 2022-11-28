import React from "react";
import styled, { css, useTheme } from "styled-components";
import {
  Loadable,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import CustomLoader from "@yper-script/react/app/widget/loader";
import DelivererCard from "@yper-script/react/app/screen/deliverer/deliverer_card";
import {
  Column,
  Flexible,
  Row,
  Spacing,
  SpacingProps,
  SpacingStyle,
} from "@yper-script/react/app/widget/generic";
import { FormattedProDelivererNotifier } from "@yper-script/react/app/notifiers/deliverer/formatted_pro_deliverer_notifier";
import { Text } from "@yper-script/react/app/widget/mixins";
import {
  DelivererFilterEnum,
  DelivererFilterNotifier,
} from "@yper-script/react/app/notifiers/deliverer/deliverer_filter_notifier";
import DelivererError from "@yper-script/react/app/screen/deliverer/deliverer_error";
import { FormattedProDeliverer } from "@yper-script/react/domain/model/formated_deliverer.model";
import FavoriteModal from "@yper-script/react/app/screen/deliverer/modal/favorite_shopper_modal";
import ErrorModal from "@yper-script/react/app/screen/deliverer/modal/error_modal";
import SuccessModal from "@yper-script/react/app/screen/deliverer/modal/success_modal";
import { DelivererDialogProvider } from "@yper-script/react/app/notifiers/deliverer/deliverer_dialog_notifier";
import CancelDeprecateShopperModal from "@yper-script/react/app/screen/deliverer/modal/cancel_deprecate_shopper_modal";
import DeprecateShopperModal from "@yper-script/react/app/screen/deliverer/modal/deprecate_shopper_modal";

/** Images */
const favoriteFilterLogo = "/img/react/deliverer/favorite_empty_icon.svg";
const lastFilterIcon = "/img/react/deliverer/last_filter_icon.svg";
const topFilterIcon = "/img/react/deliverer/top_filter_icon.svg";
const userClock = "img/react/deliverer/user_clock_icon.svg";
const userFavorite = "img/react/deliverer/user_favorite_icon.svg";

function Deliverer() {
  const theme = useTheme();

  /** Recoil State */
  const loadable = useRecoilValueLoadable(
    FormattedProDelivererNotifier.provider
  );
  const [filter, setFilter] = useRecoilState(DelivererFilterNotifier.provider);

  return (
    <Container>
      <Row justifyContent={"flex-start"} width={"fit-content"}>
        <Flexible>
          <Filter
            onClick={() => {
              setFilter(DelivererFilterEnum.last);
            }}
            active={filter === DelivererFilterEnum.last}
          >
            <Row alignItems={"center"}>
              <Icon
                margin={{ right: "5px" }}
                src={lastFilterIcon}
                alt={"last_filter"}
              />
              <Text textStyle={theme.textTheme.label.large}>
                10 derniers livreurs venus
              </Text>
            </Row>
          </Filter>
        </Flexible>
        <Flexible>
          <Filter
            onClick={() => {
              setFilter(DelivererFilterEnum.top);
            }}
            active={filter === DelivererFilterEnum.top}
          >
            <Row alignItems={"center"}>
              <Icon
                margin={{ right: "5px" }}
                src={topFilterIcon}
                alt={"top_filter"}
              />
              <Text textStyle={theme.textTheme.label.large}>Top 10</Text>
            </Row>
          </Filter>
        </Flexible>
        <Flexible>
          <Filter
            onClick={() => {
              setFilter(DelivererFilterEnum.favorite);
            }}
            active={filter === DelivererFilterEnum.favorite}
          >
            <Row alignItems={"center"}>
              <Icon
                margin={{ right: "5px" }}
                src={favoriteFilterLogo}
                alt={"favorite_filter"}
              />
              <Text textStyle={theme.textTheme.label.large}>Mes favoris</Text>
            </Row>
          </Filter>
        </Flexible>
      </Row>
      <DelivererDetails loadableState={loadable} />
    </Container>
  );
}

export default Deliverer;

function DelivererDetails(props: {
  loadableState: Loadable<FormattedProDeliverer[]>;
}) {
  const theme = useTheme();

  /** Recoil State */
  const filter = useRecoilValue(DelivererFilterNotifier.provider);
  const modalFavorite = useRecoilValue(
    DelivererDialogProvider.dialogFavoriteProvider
  );
  const modalCancelDeprecated = useRecoilValue(
    DelivererDialogProvider.dialogCancelDeprecatedProvider
  );
  const modalError = useRecoilValue(
    DelivererDialogProvider.dialogErrorProvider
  );
  const [modalSuccess] = useRecoilState(
    DelivererDialogProvider.dialogDeprecatedSuccessProvider
  );
  const modalDeprecated = useRecoilValue(
    DelivererDialogProvider.dialogDeprecatedProvider
  );

  if (props.loadableState.state == "loading") {
    return (
      <CustomLoaderContainer>
        <CustomLoader />
      </CustomLoaderContainer>
    );
  } else if (props.loadableState.state == "hasError") {
    return <DelivererError />;
  }

  /** Vars */
  const deliverers = props.loadableState.contents;
  return (
    <>
      {deliverers.length > 0 ? (
        <>
          <Row
            wrap={"wrap"}
            justifyContent={"flex-start"}
            margin={{ top: "10px" }}
          >
            {deliverers.map(deliverer => {
              return <DelivererCard key={deliverer.id} {...deliverer} />;
            })}
          </Row>
          {modalFavorite.show && <FavoriteModal />}
          {modalCancelDeprecated && <CancelDeprecateShopperModal />}
          {modalError.show && <ErrorModal />}
          {modalSuccess.show && <SuccessModal />}
          {modalDeprecated.show && <DeprecateShopperModal />}
        </>
      ) : (
        <EmptyDeliverer margin={{ top: "30px" }}>
          {filter !== DelivererFilterEnum.favorite ? (
            <Column alignItems={"center"}>
              <ImgCustom src={userClock} alt={"user_clock"} />
              <Text textStyle={theme.textTheme.title.medium}>
                Vous n’avez pas encore réservé de livraison
              </Text>
              <Text textStyle={theme.textTheme.body.medium}>
                Une fois vos premières livraisons réservées et terminées, vous
                trouverez ici les 10 dernières personnes qui ont livré pour
                vous.
              </Text>
            </Column>
          ) : (
            <Column alignItems={"center"}>
              <ImgCustom src={userFavorite} alt={"user_favorite"} />
              <Text textStyle={theme.textTheme.title.medium}>
                Aucun livreur favori
              </Text>
              <Text textStyle={theme.textTheme.body.medium}>
                Une fois enregistré, votre livreur favori sera sollicité en
                priorité pour réaliser vos livraisons. Votre offre Start vous
                permet d’enregistrer 1 livreur favori.
              </Text>
            </Column>
          )}
        </EmptyDeliverer>
      )}
    </>
  );
}

/** Styled Component */
const CustomLoaderContainer = styled.div`
  margin-top: 40px;
`;

const Container = styled.div`
  max-width: 1128px;
  width: 100%;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
`;

const EmptyDeliverer = styled.div`
  ${(props: SpacingProps) => SpacingStyle(props)}
  background-color: ${props => props.theme.color.primary["100"]};
  border-radius: 8px;
  padding: 32px;
`;

const ImgCustom = styled.img`
  height: 48px;
  width: 48px;
`;

const Icon = styled.img`
  ${(props: SpacingProps) => SpacingStyle(props)}
  width: 16px;
  height: 16px;
`;

const Filter = styled.div<any>`
  cursor: pointer;
  white-space: nowrap;
  padding: 8px;
  margin-right: 10px;
  color: ${props => props.theme.color.primary["300"]};

  ${props =>
    props.active &&
    css`
      background-color: ${props => props.theme.color.grayscale["000"]};
      color: ${props => props.theme.color.primary["400"]};
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
      border-radius: 4px;
    `}
`;

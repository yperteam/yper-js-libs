import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { Text } from "@yper-script/react/app/widget/mixins";
import { Column, Flexible, Row } from "@yper-script/react/app/widget/generic";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "styled-dropdown-component";
import { FormattedProDeliverer } from "@yper-script/react/domain/model/formated_deliverer.model";
import { useRecoilCallback, useSetRecoilState } from "recoil";
import CustomTooltipIcon from "@yper-script/react/app/widget/tooltip";
import { DislikeDelivererFamilyNotifier } from "@yper-script/react/app/notifiers/deliverer/dislike_deliverer_family_notifier";
import { LikeDelivererNotifier } from "@yper-script/react/app/notifiers/deliverer/like_deliverer_notifier";
import { DelivererDialogProvider } from "@yper-script/react/app/notifiers/deliverer/deliverer_dialog_notifier";

/** Images */
const icon = "/img/react/deliverer/navigation_horizontal_icon.svg";
const delivererIconRoute = "/img/react/deliverer/";
const deprecateShopperIcon = "/img/react/deliverer/deprecate_shopper_icon.svg";
const addFavoriteShopperIcon = "/img/react/deliverer/add_favorite_icon.svg";
const favoriteShopperIcon = "/img/react/deliverer/favorite_icon.svg";
const warningIcon = "/img/react/deliverer/warning_icon.svg";
const defaultAvatar = "/img/react/deliverer/default_avatar.svg";

/** Data */
const DelivererTooltipContent = {
  shopper: "Livreur particulier",
  partner: "Livreur professionnel en véhicule utilitaire",
  rider: "Livreur professionnel en 2 roues",
};

function DelivererCard(deliverer: FormattedProDeliverer) {
  const theme = useTheme();

  /** Recoil State */
  const setModalDeprecated = useSetRecoilState(
    DelivererDialogProvider.dialogDeprecatedProvider
  );
  const setModalCancelDeprecated = useSetRecoilState(
    DelivererDialogProvider.dialogCancelDeprecatedProvider
  );

  /** States */
  const [dropdown, setDropdown] = useState(true);

  /** Modal Setters */
  const displayDeprecateModal = () => {
    setDropdown(true);
    setModalDeprecated({ show: true, deliverer: deliverer });
  };

  const displayCancelDeprecateModal = () => {
    setDropdown(true);
    setModalCancelDeprecated(true);
  };

  return (
    <>
      <CustomCol margin={{ right: "10px", left: "10px", top: "10px" }}>
        <Card>
          <Row>
            <Flexible justifyContent={"flex-start"}>
              {deliverer.favorite && (
                <CustomTooltipIcon
                  id="favorite_logo-help"
                  content="Ce livreur fait partie de vos favoris"
                  image={favoriteShopperIcon}
                  textContentStyle={theme.textTheme.body.small.copyWith({
                    color: theme.color.grayscale["000"],
                  })}
                  place="bottom"
                />
              )}
              {deliverer.blocked && (
                <Label>
                  <Text textStyle={theme.textTheme.body.small}>Dépriorisé</Text>
                </Label>
              )}
            </Flexible>
            <Flexible justifyContent={"flex-end"}>
              <Dropdown>
                <div onClick={() => setDropdown(false)}>
                  <DropdownImg src={icon} alt="horizontal_navigation_icon" />
                </div>
                <CustomDropdownMenu
                  hidden={dropdown}
                  toggle={() => setDropdown(!dropdown)}
                >
                  {!deliverer.blocked ? (
                    <CustomDropdownItem>
                      <Row
                        onClick={displayDeprecateModal}
                        direction={"row"}
                        justifyContent={"flex-start"}
                      >
                        <Icon
                          src={deprecateShopperIcon}
                          alt={"deprecate_shopper"}
                        />
                        <Flexible size={4} justifyContent={"flex-start"}>
                          <Text textStyle={theme.textTheme.body.medium}>
                            Déprioriser le shopper
                          </Text>
                        </Flexible>
                      </Row>
                    </CustomDropdownItem>
                  ) : (
                    <CustomDropdownItem>
                      <Row
                        onClick={displayCancelDeprecateModal}
                        direction={"row"}
                        justifyContent={"flex-start"}
                      >
                        <Icon
                          src={warningIcon}
                          alt={"deprecate_shopper_cancel"}
                        />
                        <Flexible size={4} justifyContent={"flex-start"}>
                          <Text textStyle={theme.textTheme.body.medium}>
                            Annuler dépriorisation
                          </Text>
                        </Flexible>
                      </Row>
                    </CustomDropdownItem>
                  )}
                  {!deliverer.favorite ? (
                    <CustomDropdownItem>
                      <AddToFavorite
                        deliverer={deliverer}
                        setDropdown={setDropdown}
                      />
                    </CustomDropdownItem>
                  ) : (
                    <CustomDropdownItem>
                      <RemoveFromFavorite
                        deliverer={deliverer}
                        setDropdown={setDropdown}
                      />
                    </CustomDropdownItem>
                  )}
                </CustomDropdownMenu>
              </Dropdown>
            </Flexible>
          </Row>
          <Column alignItems={"center"}>
            <Flexible>
              <ImageContainer>
                <CustomTooltipIcon
                  id={deliverer.id + "__logo-help"}
                  content={DelivererTooltipContent[deliverer.type]}
                  image={delivererIconRoute + deliverer.type + "_icon.svg"}
                  custom={true}
                  textContentStyle={theme.textTheme.body.small.copyWith({
                    color: theme.color.grayscale["000"],
                  })}
                  place="bottom"
                />
                <Img
                  color={deliverer.type}
                  src={deliverer.avatar ? deliverer.avatar : defaultAvatar}
                  alt={deliverer.nickname}
                />
              </ImageContainer>
            </Flexible>
            <Text textStyle={theme.textTheme.label.large}>
              {deliverer.nickname}
            </Text>
          </Column>
        </Card>
      </CustomCol>
    </>
  );
}

export default DelivererCard;

function RemoveFromFavorite(props: {
  deliverer: FormattedProDeliverer;
  setDropdown: any;
}) {
  const theme = useTheme();

  const dislikeNotifier = useRecoilCallback(
    callback => async () => {
      props.setDropdown(true);
      await DislikeDelivererFamilyNotifier.notifier(props.deliverer, callback);
    },
    []
  );

  return (
    <Row
      onClick={dislikeNotifier}
      direction={"row"}
      justifyContent={"flex-start"}
    >
      <Icon src={addFavoriteShopperIcon} alt={"add_to_favorite"} />
      <Flexible size={4} justifyContent={"flex-start"}>
        <Text textStyle={theme.textTheme.body.medium}>Retirer des favoris</Text>
      </Flexible>
    </Row>
  );
}

function AddToFavorite(props: {
  deliverer: FormattedProDeliverer;
  setDropdown: any;
}) {
  const theme = useTheme();

  const likeNotifier = useRecoilCallback(
    callback => async () => {
      props.setDropdown(true);
      await LikeDelivererNotifier.notifier(props.deliverer, callback);
    },
    []
  );

  return (
    <Row onClick={likeNotifier} direction={"row"} justifyContent={"flex-start"}>
      <Icon src={addFavoriteShopperIcon} alt={"add_to_favorite"} />
      <Flexible size={4} justifyContent={"flex-start"}>
        <Text textStyle={theme.textTheme.body.medium}>Ajouter aux favoris</Text>
      </Flexible>
    </Row>
  );
}

/** Styled Component */
const CustomCol = styled(Flexible)`
  width: 205px;
  min-width: 205px;
  max-width: 20%;
`;

const Card = styled.div<any>`
  background-color: ${props => props.theme.color.grayscale["000"]};
  padding: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  width: 100%;
`;

const Img = styled.img<any>`
  width: 100%;
  height: 100%;
  max-width: 72px;
  min-height: 72px;
  border-radius: 50%;
  border: 3px solid transparent;
  ${props =>
    props.color == "shopper" &&
    `
      border-color: #FA6666
      `}
  ${props =>
    props.color == "rider" &&
    `
      border-color: #44A4EA
      `}
  ${props =>
    props.color == "partner" &&
    `
      border-color: #5E55D3
      `}
`;

const Label = styled.div<any>`
  cursor: pointer;
  background-color: ${props => props.theme.color.warning["100"]};
  border: 1px solid ${props => props.theme.color.warning["400"]};
  padding: 4px 8px;
  border-radius: 15px;
`;

const ImageContainer = styled.div<any>`
  position: relative;
  padding: 4px;
`;

// Dropdown
const CustomDropdownItem = styled(DropdownItem)`
  padding: 8px;
  &:hover {
    background-color: ${props => props.theme.color.primary["100"]};
    border-radius: 4px;
    margin: auto;
  }
`;

const CustomDropdownMenu = styled(DropdownMenu)`
  padding: 8px;
`;

const DropdownImg = styled.img<any>`
  cursor: pointer;
`;

const Icon = styled.img<any>`
  margin-right: 10px;
`;

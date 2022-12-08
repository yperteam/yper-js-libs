import React, { useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";
import { Column, Row } from "./generic";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { SvgPicture, Text } from "./mixins";
import { ButtonFullWidth } from "./button";
import {
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { PhoneCallRequestNotifier } from "../notifiers/support/phone_call_request_notifier";
import { GetUnreadNotificationNotifier } from "../notifiers/notification/get_unread_notification_notifier";
import { CurrentProNotifier } from "../notifiers/pro/current_pro_notifier";
import { MainCard } from "./card";
import { LoggedNotifier } from "../notifiers/auth/logged_notifier";
import { useOutsideAlerter } from "../hooks/use_outside_alerter";
import { SideBar, sideBarProvider } from "./side_bar";

const addCircleSolidIcon = "/img/react/icon/ic_add_circle_solid.svg";

function MainNavigation(props: { hasBookReachedLimit: string }) {
  const pro = useRecoilValue(CurrentProNotifier.provider);
  const theme = useTheme();
  const activateNavLink = () => {
    const pathname = window.location.pathname;
    if (pathname === "/") {
      document
        .querySelectorAll(`[href="${pathname}"]`)[1]
        .classList.add("active");
    } else {
      const splittedPathname = pathname.split("/");
      const navLinkEl = document.querySelectorAll(
        `[href="/${splittedPathname[1]}"]`
      )[0];
      if (navLinkEl) {
        navLinkEl.classList.add("active");
      }
    }
  };

  useEffect(() => {
    activateNavLink();
  }, []);

  useRecoilValue(LoggedNotifier.provider);
  let [opened, setOpened] = useRecoilState(sideBarProvider);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setOpened(false));

  return (
    <AppBarHolder ref={wrapperRef}>
      <Row height="100%" width="100%">
        <Row justifyContent="left">
          <MainMenuItem>
            <CustomNavLink href="/">
              <Text
                textStyle={theme.textTheme.body.medium.copyWith({
                  color: theme.color.primary["200"],
                })}
              >
                Accueil
              </Text>
            </CustomNavLink>
          </MainMenuItem>
          <MainMenuItem>
            <CustomNavLink href="/deliveries">
              <Text
                textStyle={theme.textTheme.body.medium.copyWith({
                  color: theme.color.primary["200"],
                })}
              >
                Livraisons
              </Text>
            </CustomNavLink>
          </MainMenuItem>
          {pro.settings.canAccess.reportingStats && (
            <MainMenuItem>
              <CustomNavLink href="/statistics">
                <Text
                  textStyle={theme.textTheme.body.medium.copyWith({
                    color: theme.color.primary["200"],
                  })}
                >
                  Statistiques
                </Text>
              </CustomNavLink>
            </MainMenuItem>
          )}
          {pro.settings.canAccess.deliverer && (
            <MainMenuItem>
              <CustomNavLink href="/deliverer">
                <Text
                  textStyle={theme.textTheme.body.medium.copyWith({
                    color: theme.color.primary["200"],
                  })}
                >
                  Livreurs
                </Text>
              </CustomNavLink>
            </MainMenuItem>
          )}
          {/*<MainMenuItem>
            <CustomNavLink href="/repertory">
              <Text
                textStyle={theme.textTheme.body.medium.copyWith({
                  color: theme.color.primary["200"],
                })}
              >
                Carnet d'adresses
              </Text>
            </CustomNavLink>
              </MainMenuItem>*/}
        </Row>
        <Row alignItems="center" justifyContent="end">
          <IconRow />
          <Row display="block" width="initial" margin={{ right: "20px" }}>
            {props.hasBookReachedLimit === "1" ? (
              <ButtonFullWidth
                data-toggle="modal"
                data-target="#subscription_limit_modal"
              >
                <SvgPicture
                  src={addCircleSolidIcon}
                  color={theme.color.primary["400"]}
                  width="20px"
                  height="20px"
                  margin={{ right: "10px" }}
                />
                <Text textStyle={theme.textTheme.label.medium}>
                  RÉSERVER UNE LIVRAISON
                </Text>
              </ButtonFullWidth>
            ) : (
              <a href="/order">
                <ButtonFullWidth>
                  <SvgPicture
                    src={addCircleSolidIcon}
                    color={theme.color.primary["400"]}
                    width="20px"
                    height="20px"
                    margin={{ right: "10px" }}
                  />
                  <Text textStyle={theme.textTheme.label.medium}>
                    RÉSERVER UNE LIVRAISON
                  </Text>
                </ButtonFullWidth>
              </a>
            )}
          </Row>
        </Row>
      </Row>
      <SideBar />
    </AppBarHolder>
  );
}

function IconRow() {
  let navigate = useNavigate();
  let setOpened = useSetRecoilState(sideBarProvider);

  return (
    <Row>
      <HelpIcon
        onClick={() => {
          navigate("/help", { replace: true });
          setOpened(true);
        }}
      />
      <NotificationMenu
        size="1"
        className="wrapper-icon-circle"
        alignItems="center"
        id="estimate-price"
        data-toggle="modal"
        data-target="#modal-estimate"
      >
        <i className="material-icons mb-1">euro_symbol</i>
        <span className="legend--picto">Estimer</span>
      </NotificationMenu>
      <NotificationMenu
        size="1"
        alignItems="center"
        className="wrapper-icon-circle"
        onClick={() => (window.location.href = "/planning")}
      >
        <i className="material-icons mb-1">date_range</i>
        <span className="legend--picto">Planning</span>
      </NotificationMenu>
      {
        <NotificationIcon
          onClick={() => {
            navigate("/notification", { replace: true });
            setOpened(true);
          }}
        />
      }
    </Row>
  );
}

function HelpIcon(props: { onClick: any }) {
  const phoneCallState = useRecoilValue(PhoneCallRequestNotifier.provider);
  return (
    <NotificationMenu
      alignItems="center"
      size="1"
      className="wrapper-icon-circle"
      onClick={() => props.onClick()}
    >
      <UnreadIcon
        isUnread={
          phoneCallState?.contents && phoneCallState.contents.length > 0
        }
        className="material-icons mb-1"
      >
        help
      </UnreadIcon>
      <span className="legend--picto">Aide</span>
    </NotificationMenu>
  );
}

function NotificationIcon(props: { onClick: any }) {
  const unreadState = useRecoilValue(GetUnreadNotificationNotifier.provider);
  return (
    <NotificationMenu
      alignItems="center"
      size="1"
      className="wrapper-icon-circle"
      onClick={() => props.onClick()}
    >
      <UnreadIcon
        isUnread={unreadState?.contents && unreadState.contents > 0}
        className="material-icons mb-1"
      >
        notifications
      </UnreadIcon>
      <span className="legend--picto">Notif.</span>
    </NotificationMenu>
  );
}

export function AppBar(props: { hasBookReachedLimit: string }) {
  return (
    <MemoryRouter>
      <MainNavigation hasBookReachedLimit={props.hasBookReachedLimit} />
    </MemoryRouter>
  );
}

const MainMenuItem = styled.li`
  min-width: 115px;
`;

const CustomNavLink = styled.a`
  &::after {
    content: "";
    position: absolute;
    width: 0;
    display: block;
    bottom: 0;
    right: 0;
    height: 4px;
    background-color: ${props => props.theme.color.grayscale["000"]};
    transition: all 0.2s ease-in-out;
  }

  &:hover,
  &.active {
    p {
      color: ${props => props.theme.color.primary["100"]} !important;
    }

    ::after {
      opacity: 1;
      left: 0;
      width: 100%;
    }
  }
`;

interface SideBarProps {
  isOpened: Boolean;
}

interface NotificationMenuProps {
  isUnread?: boolean;
}

const NotificationMenu = styled(Column)`
  cursor: pointer;
`;

const UnreadIcon = styled.i<NotificationMenuProps>`
  position: relative;
  &:after {
    content: "";
    display: ${props => (props.isUnread ? "" : "none")};
    background-color: ${props => props.theme.color.warning["400"]};
    border-radius: 50%;
    width: 10px;
    height: 10px;
    position: absolute;
    right: 0px;
  }
`;

const SideCard = styled(MainCard) <SideBarProps>`
  border-radius: 20px;
  margin-top: 10px;
  min-width: 420px;
  height: calc(100vh - 90px);
  position: absolute;
  right: 15px;
  transform: ${(props: SideBarProps) =>
    props.isOpened ? "translateX(0)" : "translateX(420px)"};
  transition: all 0.5s ease-in-out;
  visibility: ${(props: SideBarProps) =>
    props.isOpened ? "visible" : "hidden"};
  width: 420px;
  z-index: 28;
`;

const AppBarHolder = styled.div`
  height: 100%;
`;

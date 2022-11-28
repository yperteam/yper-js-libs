import React, { useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import {
  Column,
  Container,
  Flexible,
  Row,
  Spacing,
} from "@yper-script/react/app/widget/generic";
import { SvgPicture, Text } from "@yper-script/react/app/widget/mixins";
import { useRecoilValue } from "recoil";
import { ProRetailpointsNotifier } from "@yper-script/react/app/notifiers/retailpoint/pro_retailpoints_notifier";
import { CurrentRetailpointNotifier } from "@yper-script/react/app/notifiers/retailpoint/current_retailpoint_notifier";
import { theme } from "@yper-script/react/app/widget/theme";
import { device } from "@yper-script/react/app/widget/breakpoints";
import {
  CustomAccordionCollapse,
  CustomAccordionToggle,
} from "@yper-script/react/app/widget/custom_accordion";
import { CurrentProNotifier } from "../../notifiers/pro/current_pro_notifier";

const chevronRightIcon = "/img/react/icon/ic_chevron_right.svg";
const unfoldMoreIcon = "/img/react/icon/ic_unfold_more.svg";
const societyIcon = "/img/react/icon/ic_society.svg";
const storeIcon = "/img/react/icon/ic_store.svg";
const subscriptionIcon = "/img/react/icon/ic_subscription.svg";
const creditCardIcon = "/img/react/icon/ic_credit_card.svg";
const ticketIcon = "/img/react/icon/ic_ticket.svg";
const pluginIcon = "/img/react/icon/ic_plugin.svg";

export default function AccountScreen() {
  return (
    <Spacing padding={{ top: "16px", bottom: "40px" }}>
      <Container>
        <Layout>
          <AccountNavigation />
          <Divider />
          <Column size={1}>
            <Outlet />
          </Column>
        </Layout>
      </Container>
    </Spacing>
  );
}

function AccountNavigation() {
  const currentPro = useRecoilValue(CurrentProNotifier.provider);
  const currentRp = useRecoilValue(CurrentRetailpointNotifier.provider);
  const { pathname } = useLocation();

  let currentRouteLabel = "";
  if (pathname.includes("/account/society")) {
    currentRouteLabel = "Ma société";
  } else if (pathname.includes("/account/retailpoint")) {
    currentRouteLabel = "Mes points de vente";
  } else if (pathname.includes("/account/subscription")) {
    currentRouteLabel = "Mon abonnement";
  } else if (pathname.includes("/account/payment-method")) {
    currentRouteLabel = "Mes moyens de paiement";
  } else if (pathname.includes("/account/api")) {
    currentRouteLabel = "Accès API";
  } else {
    currentRouteLabel = "Mes factures";
  }

  return (
    <NavigationContainer>
      <NavigationTitle>
        <Text
          textStyle={theme.textTheme.headline.small.copyWith({
            color: theme.color.grayscale["000"],
          })}
        >
          mon compte société
        </Text>
        <Flexible alignItems="center">
          <SvgPicture
            src={chevronRightIcon}
            color={theme.color.secondary["400"]}
          />
          <Text
            textStyle={theme.textTheme.body.medium.copyWith({
              color: theme.color.grayscale["000"],
            })}
          >
            {currentRp?.companyName}
          </Text>
        </Flexible>
      </NavigationTitle>
      <NavigationContent>
        <NavigationMobileSelector
          alignItems="center"
          justifyContent="space-between"
          padding={{ top: "10px", bottom: "10px" }}
        >
          <Text
            textStyle={theme.textTheme.label.medium.copyWith({
              color: theme.color.grayscale["500"],
            })}
          >
            {currentRouteLabel}
          </Text>
          <CustomAccordionToggle>
            <SvgPicture src={unfoldMoreIcon} width="18px" />
          </CustomAccordionToggle>
        </NavigationMobileSelector>
        <CustomAccordionCollapse>
          <NavigationAccordion>
            <nav>
              <ul>
                <SidebarItem>
                  <CustomNavLink to="society">
                    <Flexible
                      alignItems="center"
                      padding={{
                        top: "14px",
                        bottom: "14px",
                        right: "16px",
                        left: "16px",
                      }}
                    >
                      <SvgPicture
                        src={societyIcon}
                        width="18px"
                        margin={{ right: "5px" }}
                        color={theme.color.grayscale["500"]}
                      />
                      <Text
                        textStyle={theme.textTheme.body.medium.copyWith({
                          color: theme.color.grayscale["500"],
                        })}
                      >
                        Ma société
                      </Text>
                    </Flexible>
                  </CustomNavLink>
                </SidebarItem>
                <SidebarItem>
                  <CustomNavLink to="retailpoint">
                    <Flexible
                      alignItems="center"
                      padding={{
                        top: "14px",
                        bottom: "14px",
                        right: "16px",
                        left: "16px",
                      }}
                    >
                      <SvgPicture
                        src={storeIcon}
                        width="18px"
                        margin={{ right: "5px" }}
                        color={theme.color.grayscale["500"]}
                      />
                      <Text
                        textStyle={theme.textTheme.body.medium.copyWith({
                          color: theme.color.grayscale["500"],
                        })}
                      >
                        Mes points de vente
                      </Text>
                    </Flexible>
                  </CustomNavLink>
                </SidebarItem>
                <SidebarItem>
                  <CustomNavLink to="subscription">
                    <Flexible
                      alignItems="center"
                      padding={{
                        top: "14px",
                        bottom: "14px",
                        right: "16px",
                        left: "16px",
                      }}
                    >
                      <SvgPicture
                        src={subscriptionIcon}
                        margin={{ right: "5px" }}
                        color={theme.color.grayscale["500"]}
                      />
                      <Text
                        textStyle={theme.textTheme.body.medium.copyWith({
                          color: theme.color.grayscale["500"],
                        })}
                      >
                        Mon abonnement
                      </Text>
                    </Flexible>
                  </CustomNavLink>
                </SidebarItem>
                <SidebarItem>
                  <CustomNavLink to="payment-method">
                    <Flexible
                      alignItems="center"
                      padding={{
                        top: "14px",
                        bottom: "14px",
                        right: "16px",
                        left: "16px",
                      }}
                    >
                      <SvgPicture
                        src={creditCardIcon}
                        margin={{ right: "5px" }}
                        color={theme.color.grayscale["500"]}
                      />
                      <Text
                        textStyle={theme.textTheme.body.medium.copyWith({
                          color: theme.color.grayscale["500"],
                        })}
                      >
                        Mes moyens de paiement
                      </Text>
                    </Flexible>
                  </CustomNavLink>
                </SidebarItem>
                <SidebarItem>
                  <CustomNavLink to="invoice">
                    <Flexible
                      alignItems="center"
                      padding={{
                        top: "14px",
                        bottom: "14px",
                        right: "16px",
                        left: "16px",
                      }}
                    >
                      <SvgPicture
                        src={ticketIcon}
                        margin={{ right: "5px" }}
                        color={theme.color.grayscale["500"]}
                      />
                      <Text
                        textStyle={theme.textTheme.body.medium.copyWith({
                          color: theme.color.grayscale["500"],
                        })}
                      >
                        Mes factures
                      </Text>
                    </Flexible>
                  </CustomNavLink>
                </SidebarItem>
                {currentPro.settings.canAccess.securityToken && (
                  <SidebarItem>
                    <CustomNavLink to="api">
                      <Flexible
                        alignItems="center"
                        padding={{
                          top: "14px",
                          bottom: "14px",
                          right: "16px",
                          left: "16px",
                        }}
                      >
                        <SvgPicture
                          src={pluginIcon}
                          margin={{ right: "5px" }}
                          height="15px"
                          width="15px"
                          color={theme.color.grayscale["500"]}
                        />
                        <Text
                          textStyle={theme.textTheme.body.medium.copyWith({
                            color: theme.color.grayscale["500"],
                          })}
                        >
                          Accès API
                        </Text>
                      </Flexible>
                    </CustomNavLink>
                  </SidebarItem>
                )}
              </ul>
              <Spacing margin={{ top: "30px", bottom: "10px" }}>
                <Row alignItems="center" justifyContent="start">
                  <a
                    href="/pdf/yper_cpu_10-03-2022.pdf"
                    title="Conditions Particulières d'Utilisation - PDF"
                    target="_blank"
                  >
                    <TextLink
                      textStyle={theme.textTheme.body.small.copyWith({
                        color: theme.color.grayscale["400"],
                      })}
                    >
                      CPU
                    </TextLink>
                  </a>
                  &nbsp;-&nbsp;
                  <a
                    href="/pdf/yper_cgu_10-03-2022.pdf"
                    title="Conditions Générales d’Utilisation - PDF"
                    target="_blank"
                  >
                    <TextLink
                      textStyle={theme.textTheme.body.small.copyWith({
                        color: theme.color.grayscale["400"],
                      })}
                    >
                      CGU
                    </TextLink>
                  </a>
                  &nbsp;-&nbsp;
                  <a
                    href="/pdf/yper_rgpd.pdf"
                    title="Politique de Protection des Données personnelles - PDF"
                    target="_blank"
                  >
                    <TextLink
                      textStyle={theme.textTheme.body.small.copyWith({
                        color: theme.color.grayscale["400"],
                      })}
                    >
                      RGPD
                    </TextLink>
                  </a>
                </Row>
              </Spacing>
            </nav>
          </NavigationAccordion>
        </CustomAccordionCollapse>
      </NavigationContent>
    </NavigationContainer>
  );
}

const Layout = styled(Row)`
  flex-direction: column;
  @media ${device.tabletL} {
    flex-direction: row;
  }
`;

const Divider = styled.div`
  display: none;
  height: 100%;
  border-left: 1px solid ${props => props.theme.color.grayscale["200"]};
  height: inherit;
  width: 2px;
  margin: 0 32px 0 16px;
  @media ${device.tabletL} {
    display: block;
  }
`;

const NavigationContainer = styled.div`
  background-color: ${props => props.theme.color.primary["100"]};
  border-radius: 5px;
  margin-bottom: 30px;
  @media ${device.tabletL} {
    background-color: transparent;
  }
`;

const NavigationTitle = styled.div`
  background-color: ${props => props.theme.color.primary["400"]};
  border-radius: 5px;
  padding: 5px 15px;
`;

const NavigationContent = styled.div`
  padding: 8px 16px;
`;

const NavigationMobileSelector = styled(Flexible)`
  @media ${device.tabletL} {
    display: none;
  }
`;

const NavigationAccordion = styled.div`
  @media ${device.tabletL} {
    visibility: visible;
  }
`;

const SidebarItem = styled.li`
  border-radius: 5px;
  margin: 10px 0;
  :hover {
    background-color: ${props => props.theme.color.grayscale["200"]};
    p {
      font-weight: ${props => props.theme.fontWeight.semiBold};
    }
  }
`;

const CustomNavLink = styled(NavLink)`
  &.active {
    background-color: ${props => props.theme.color.primary["200"]};
    border-radius: 5px;
    display: block;
    svg {
      path {
        fill: ${props => props.theme.color.primary["400"]};
      }
    }
    p {
      font-weight: ${props => props.theme.fontWeight.semiBold};
      color: ${props => props.theme.color.primary["400"]} !important;
    }
  }
`;

const TextLink = styled(Text)`
  color: ${props => props.theme.color.grayscale["400"]};
  &:hover {
    font-weight: ${props => props.theme.fontWeight.semiBold};
  }
`;

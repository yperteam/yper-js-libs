import React, { Suspense } from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { atom, useRecoilValue } from "recoil";
import { MainCard } from "./card";
import { CallHelpScreen } from "./help/call_help_center";
import { CancelCallScreen } from "./help/cancel_call";
import { HelpCenter } from "./help/help_center";
import { LoginHelpScreen } from "./help/login_help_center";
import { RegisterHelpScreen } from "./help/register_help_center";
import { NotificationCenter } from "./notification/notification_center";
import { RequiresAuth } from "./requires_auth";
import { CustomLoader } from "./loader";
import { device } from "./breakpoints";

export const sideBarProvider = atom<boolean | null>({
  key: "side-bar-opened",
  default: false,
});

export function SideBar() {
  let opened = useRecoilValue(sideBarProvider);

  return (
    <SideCard isOpened={opened == true}>
      <Suspense fallback={<CustomLoader />}>
        <Routes>
          <Route path="/" element={<div />} />
          <Route path="/login" element={<LoginHelpScreen />} />
          <Route path="/register" element={<RegisterHelpScreen />} />
          <Route path="/notification" element={<NotificationCenter />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route
            path="/help/call/:reasonId"
            element={
              <RequiresAuth>
                <CallHelpScreen />
              </RequiresAuth>
            }
          />
          <Route
            path="/help/cancel/:callId"
            element={
              <RequiresAuth>
                <CancelCallScreen />
              </RequiresAuth>
            }
          />
        </Routes>
      </Suspense>
    </SideCard>
  );
}

interface SideBarProps {
  isOpened: Boolean;
}

const SideCard = styled(MainCard) <SideBarProps>`
  border-radius: 20px;
  margin-top: 10px;
  height: calc(100vh - 90px);
  position: fixed;
  right: 15px;
  transform: ${(props: SideBarProps) =>
    props.isOpened ? "translateX(0)" : "translateX(420px)"};
  transition: all 0.5s ease-in-out;
  visibility: ${(props: SideBarProps) =>
    props.isOpened ? "visible" : "hidden"};
  z-index: 28;
  
  @media ${device.mobileXS} {
    width: calc(100vw - 30px);
    min-width: calc(100vw - 30px);
  }

  @media ${device.mobile} {
    width: 420px;
    min-width: 420px;
  }

`;

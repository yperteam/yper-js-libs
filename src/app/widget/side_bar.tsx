import React, { } from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import {
  atom,
  useRecoilState,
} from "recoil";
import NotificationCenter from "./notification/notification_center";
import HelpCenter from "./help/help_center";
import { MainCard } from "./card";
import CallHelpScreen from "./help/call_help_center";
import CancelCallScreen from "./help/cancel_call";
import RegisterHelpScreen from "./help/register_help_center";
import LoginHelpScreen from "./help/login_help_center";
import RequiresAuth from "./requires_auth";

export const sideBarProvider = atom<boolean | null>({
  key: "side-bar-opened",
  default: false,
});

export default function SideBar() {
  let [opened, setOpened] = useRecoilState(sideBarProvider);

  return (
    <SideCard isOpened={opened == true}>
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
    </SideCard>
  );
}

interface SideBarProps {
  isOpened: Boolean;
}

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

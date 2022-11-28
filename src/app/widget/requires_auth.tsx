import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LoggedNotifier } from "../notifiers/auth/logged_notifier";

export default function RequiresAuth({ children }) {
  const authed = useRecoilValue(LoggedNotifier.provider);
  const location = useLocation();

  return authed.contents === true ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

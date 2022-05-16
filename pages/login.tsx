import * as React from "react";
import { AuthAPI } from "../api-client";

export interface ILoginProps {}

export default function Login(props: ILoginProps) {
  const handleLoginClick = async () => {
    try {
      const payload = {
        username: "namnguyen",
        password: "123456789",
      };
      await AuthAPI.login(payload);
    } catch (error) {
      console.log("failed to login", error);
    }
  };

  const handleGetProfileClick = async () => {
    try {
      await AuthAPI.getProfile();
    } catch (error) {
      console.log("failed to get profile", error);
    }
  };

  const handleLogoutClick = async () => {
    try {
      await AuthAPI.logout();
    } catch (error) {
      console.log("failed to logout", error);
    }
  };
  return (
    <div>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleGetProfileClick}>Get Profile</button>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

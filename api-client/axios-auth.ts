import { LoginPayload } from "../models";
import http from "./axios-client";

export const AuthAPI = {
  login: (payload: LoginPayload) => {
    return http.post("/login", payload);
  },
  getProfile: () => {
    return http.get("/profile");
  },
  logout: () => {
    return http.post("/logout");
  },
};

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method !== "POST") {
    res.status(404).json({ message: "Method is not supported" });
  }
  return new Promise((resolve) => {
    req.headers.cookie = "";

    const handleProxyLogin: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";
      proxyRes.on("data", function (chunk) {
        body += chunk;
      });
      proxyRes.on("end", function () {
        try {
          const { accessToken, expiredAt } = JSON.parse(body);
          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== "development",
          });
          cookies.set("access_token", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            expires: expiredAt,
          });
          (res as NextApiResponse)
            .status(200)
            .json({ message: "Login success" });
        } catch (error) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: "Something wrong" });
        }
      });
    };

    proxy.on("proxyRes", handleProxyLogin);

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
    proxy.once("proxyRes", () => {
      resolve(true);
    });
  });
}

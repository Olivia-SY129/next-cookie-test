import { getCookie, hasCookie } from "cookies-next";
import React from "react";
import { API } from "../services/api";

const Authorized = ({ userInfo }) => {
  return <div>{userInfo}</div>;
};

export default Authorized;

export async function getServerSideProps({ req, res }) {
  if (!hasCookie("loginData", { req, res })) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  API.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
    "loginData",
    {
      req,
      res,
    }
  )}`;

  const userData = await API.get("/user");

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      userInfo: JSON.stringify(userData.data.data),
    },
  };
}

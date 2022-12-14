import Head from "next/head";
import styles from "../styles/Home.module.css";
import axios from "axios";
import { useState } from "react";
import { getCookie, hasCookie } from "cookies-next";
import Link from "next/link";
import { API } from "../services/api";

export default function Home({ initUserInfo }) {
  const [userInfo, setUserInfo] = useState(initUserInfo);
  const [isLogin, setIsLogin] = useState(
    initUserInfo === "None" ? "None" : "Exists"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      });
      setIsLogin("Exists");
      console.log("login success");
    } catch (e) {
      console.log("login failed");
      throw new Error(e);
    }
  };

  const handleUser = async () => {
    try {
      const res = await axios.get("/api/user");
      setUserInfo(JSON.stringify(res.data));
    } catch (e) {
      console.log("user failed");
      throw new Error(e);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          이메일
          <input type="text" name="email" id="email" />
        </label>
        <label htmlFor="password">
          비밀번호
          <input type="password" name="password" id="password" />
        </label>

        <button>로그인</button>
      </form>
      <div>
        유저정보<span>{isLogin}</span>
        <div>{userInfo}</div>
      </div>

      <button onClick={handleUser}>유저정보 가져오기</button>
      <div>
        <Link href="/auth">유저 페이지 바로가기</Link>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  if (!hasCookie("loginData", { req, res })) {
    return {
      props: {
        initUserInfo: "None",
      },
    };
  }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      initUserInfo: "Exists",
    },
  };
}

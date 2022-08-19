import { hasCookie, setCookie } from "cookies-next";
import { API } from "@/src/services/api";

export default async function login(req, res) {
  const { email, password } = req.body;
  try {
    const response = await API.post("/common/login", {
      email,
      password,
    });

    setCookie("loginData", response.data.data, {
      req,
      res,
      maxAge: 60 * 60 * 2,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({ message: "ok" });
  } catch (e) {
    console.log("login api req failed");
    throw new Error(e);
  }
}

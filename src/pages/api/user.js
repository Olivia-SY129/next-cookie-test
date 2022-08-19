import { API } from "@/src/services/api";
import { getCookie } from "cookies-next";

export default async function user(req, res) {
  try {
    const response = await API.get("/user", {
      headers: {
        Authorization: `Bearer ${getCookie("loginData", { req, res })}`,
      },
    });

    res.send(response.data.data);
    return res.status(200).json({ message: "ok" });
  } catch (e) {
    console.log("login api req failed");
    throw new Error(e);
  }
}

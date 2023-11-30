import axios from "./axios";
import { setCacheStorage, removeCacheStorage } from "../utils/storage";

const login = async (email, password, device_id) => {
  // console.log(email, password, device_id);
  try {
    const res = await axios.post("/login", {
      email,
      password,
      uuid: device_id,
    });
    // console.log(res.data.data.token);
    await setCacheStorage("access-token", res.data.data.token);
    // await setCacheStorage("logged", "true");
    // const access_token = await getCacheStorage("access-token");
    // console.log(access_token);
    return res;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

const logout = async () => {
  try {
    const res = await axios.post("/logout");
    // console.log(res.data.code);
    await removeCacheStorage("access-token");
    // await setCacheStorage("logged", "");
  } catch (err) {
    console.log(err.response.data.message);
  }
};

const signup = async (email, password, device_id) => {
  try {
    const res = await axios.post("/signup", {
      email,
      password,
      uuid: device_id,
    });
    return res;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

const getVerifyCode = async (email) => {
  try {
    const res = await axios.post("/get_verify_code", {
      email,
    });
    return res;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

const checkVerifyCode = async (email, verifyCode) => {
  try {
    const res = await axios.post("/check_verify_code", {
      email,
      code_verify: verifyCode,
    });
    return res;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

const resetPassword = async (email, verifyCode, newPass) => {
  try {
    const res = await axios.post("/reset_password", {
      email,
      code: verifyCode,
      password: newPass,
    });
    return res;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

const changeProfileAfterSignup = async (formData) => {
  try {
    const res = await axios.post("/change_profile_after_signup", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const auth = {
  login,
  logout,
  signup,
  getVerifyCode,
  checkVerifyCode,
  resetPassword,
  changeProfileAfterSignup,
};

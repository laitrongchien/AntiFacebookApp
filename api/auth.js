import axios from "./axios";
import { setCacheStorage, removeCacheStorage } from "../utils/storage";

const login = async (email, password, device_id) => {
  const res = await axios.post("/login", {
    email,
    password,
    uuid: device_id,
  });
  await setCacheStorage("access-token", res.data.data.token);
  return res;
};

const logout = async () => {
  try {
    const res = await axios.post("/logout");
    await removeCacheStorage("access-token");
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

const changePassword = async (pass, newPass) => {
  try {
    const res = await axios.post("/change_password", {
      password: pass,
      new_password: newPass,
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

const checkEmail = async (email) => {
  return await axios.post("/check_email", { email });
};

export const auth = {
  login,
  logout,
  signup,
  getVerifyCode,
  checkVerifyCode,
  changePassword,
  resetPassword,
  changeProfileAfterSignup,
  checkEmail,
};

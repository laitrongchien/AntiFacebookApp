import axios from "./axios";

const setDevToken = async (devType, devToken) => {
  return await axios.post("/set_devtoken", {
    devtype: devType,
    devtoken: devToken,
  });
};

export const setting = { setDevToken };

import axios from "./axios";

const setDevToken = async (devType, devToken) => {
  return await axios.post("/set_devtoken", {
    devtype: devType,
    devtoken: devToken,
  });
};

const buyCoins = async (code, coins) => {
  return await axios.post("/buy_coins", {
    code,
    coins,
  });
};

const checkNewItems = async (lastId, categoryId) => {
  return await axios.post("/check_new_items", {
    last_id: lastId,
    category_id: categoryId,
  });
};

export const setting = { setDevToken, checkNewItems, buyCoins };

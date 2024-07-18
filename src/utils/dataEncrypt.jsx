import CryptoJS from "crypto-js";
import { secretKey } from "../constants/secretKey";

export const encryptStorage = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptStorage = (data) => {
  if (!data) return null;
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

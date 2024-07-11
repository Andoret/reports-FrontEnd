import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const useConfig = () => {
  const { tkn } = useContext(UserContext);

  return {
    headers: {
      Authorization: tkn ? `Bearer ${tkn}` : "",
      "Cache-Control": "no-cache",
    },
  };
};

export default useConfig;

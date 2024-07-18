import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const useConfig = () => {
  const { access_token } = useContext(UserContext);

  return {
    headers: {
      "Authorization": `Bearer ${access_token}`
    },
  };
};

export default useConfig;

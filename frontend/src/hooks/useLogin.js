import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { addUser } from "../actions";

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const url = process.env.REACT_APP_SERVER_URL;
  const loadingElement = document.querySelector(".loading-container");

  const login = async (user) => {
    try {
      loadingElement.style.display = "block";
      const tokenResp = await axios.post(`${url}/login`, user);
      const token = tokenResp.data.token;
      sessionStorage.setItem("token", token);

      const userResp = await axios.get(`${url}/${user.username}`);
      const userData = userResp.data;
      const { password, ...rest } = userData;

      dispatch(addUser({ ...rest }));
      navigate(`/map/${user.username}`);
      loadingElement.style.display = "none";
      return true;
    } catch (error) {
      loadingElement.style.display = "none";
      return false;
    }
  };

  return { login };
};

export default useLogin;

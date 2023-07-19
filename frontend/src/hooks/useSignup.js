import { useNavigate } from "react-router-dom";
import axios from "axios";

const useSignup = () => {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_SERVER_URL;
  const loadingElement = document.querySelector(".loading-container");

  const signup = async (user) => {
    try {
      loadingElement.style.display = "block";
      const newUser = {
        email: user.email,
        username: user.username,
        password: user.password,
        fav_countries: {
          main: "",
          relatives: [],
        },
      };

      const resp = await axios.post(`${url}/signup`, newUser);
      navigate("/login");
      loadingElement.style.display = "none";
      return [true, resp.data];
    } catch (error) {
      loadingElement.style.display = "none";
      return [false, error.response.data.error];
    }
  };

  return { signup };
};

export default useSignup;

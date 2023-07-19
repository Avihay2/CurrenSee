import { useNavigate } from "react-router-dom";
import axios from "axios";

const useLogout = () => {
  const navigate = useNavigate();
  const url = process.env.REACT_APP_SERVER_URL;

  const logout = async (username, obj) => {
    try {
      sessionStorage.setItem("token", "");
      const resp = await axios.patch(`${url}/${username}`, obj);
      alert("User's data saved successfully!");
    } catch (error) {
      alert("Error: User's data couldn't be save!");
    }

    document.querySelector("body").classList.remove("dark-mode");
    navigate("/login", { replace: true });
  };

  return { logout };
};

export default useLogout;

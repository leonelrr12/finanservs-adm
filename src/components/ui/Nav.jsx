import { useContext } from "react";
import { LoginContext } from "../../context/loginContext";
import { useNavigate } from "react-router-dom";
import { FinanservsHorizontalLogoWhiteImg } from "../images";
import MenuOptions from "./MenuOptions";

export const Nav = () => {
  const { userInfo: user, setUserInfo } = useContext(LoginContext);

  let navigate = useNavigate();

  if (user) {
    if (!Object.keys(user).length) return navigate("/", { replace: true });
  } else return navigate("/", { replace: true });

  const handleLogout = () => {
    window.localStorage.removeItem("ctx-api");
    setUserInfo(null)
    navigate("/", { replace: true });
  };

  // eslint-disable-next-line
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <FinanservsHorizontalLogoWhiteImg />
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
        >
          <MenuOptions />
          <div className="d-flex">
            <button
              onClick={handleLogout}
              className="btn btn-info mt-2"
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

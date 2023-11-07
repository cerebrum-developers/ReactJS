import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { registerApi } from "src/app/apiServices";
import ButtonShow from "../../components/Button";
import styles from "./header.module.scss";
import {
  arrow,
  blackarrowIcon,
  close,
  closegrayIcon,
  copyIcon,
  navbarlogo,
  profile,
} from "../../assets/icon";
import { buttonStyle } from "../../globalStyle";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { mutate: mutateRegister } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: registerApi,
  });

  useEffect(() => {
    mutateRegister();
  }, [mutateRegister]);

  const token = localStorage.getItem("auth");

  return (
    <div>
      {location.pathname === "/" ? (
        <div className={styles.loginBtnHugging}>
          <span id="minimize-button">{arrow}</span>
          <span id="close-button" className={styles.closeButton}>
            {close}
          </span>
        </div>
      ) : (
        <div className={styles.headerShadowHugging}>
          <Link to={token ? "/dashboardupload" : ""}>{navbarlogo}</Link>
          <div className={styles.headerButton}>
            {token ? (
              <ButtonShow
                styleClass={styles.profileLogo}
                action={() => navigate("/profile")}
                name={profile}
                type=""
                style={null}
              />
            ) : (
              <ButtonShow
                action={() => navigate("/login")}
                style={buttonStyle.border}
                name="Log in"
                type=""
                styleClass=""
              />
            )}
            <span>{copyIcon}</span>
            <span id="minimize-button">{blackarrowIcon}</span>
            <span id="close-button">{closegrayIcon}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { email } from "../../assets/icon";
import ButtonShow from "../../components/Button";
import InputFeild from "../../components/input";
import { input, buttonStyle } from "../../globalStyle";
import styles from "./login.module.scss";

const Eamil = () => {
  const [emailInput, setEmailInput] = useState<string>("");

  const navigate = useNavigate();
  const submitFunc = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
  };
  return (
    <div className={styles.loginPageHugging}>
      <div className={styles.formAll}>
        <form className={styles.form} onSubmit={submitFunc}>
          <div className={styles.signupBtnHugging}>Forgot Password</div>
          <div className={styles.relativeSVG}>
            <span className={styles.absoluteSVG}>{email}</span>
            <InputFeild
              style={input}
              type="email"
              placeholder="Enter Email"
              name="email"
              id=""
              addValue={handleChange}
              value={emailInput}
            />
          </div>
          <ButtonShow
            name="SUBMIT"
            action={() => {}}
            styleClass=""
            style={buttonStyle.fill}
            type="submit"
          />
        </form>
      </div>

      <div className={styles.loginButtons}>
        <span className="iuevlkmso">
          Already know password?
          <ButtonShow
            action={() => navigate("/login")}
            name="Log In"
            style={buttonStyle.transparent}
            type="submit"
            styleClass=""
          />
        </span>
      </div>
    </div>
  );
};

export default Eamil;

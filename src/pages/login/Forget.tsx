import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { passwordicon } from "../../assets/icon";
import ButtonShow from "../../components/Button";
import InputFeild from "../../components/input";
import { input, buttonStyle } from "../../globalStyle";
import styles from "./login.module.scss";

const Forget = () => {
  const navigate = useNavigate();

  interface Forgot {
    password: string;
    cpassword: string;
  }

  interface Error {
    password?: string;
    cpassword?: string;
  }

  const [forgot, setForgot] = useState<Forgot>({
    password: "",
    cpassword: "",
  });
  const [error, setError] = useState<Error>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForgot({ ...forgot, [name]: value });
  };

  const validation = () => {
    const err: Error = {};
    if (!forgot.password || !forgot.cpassword) {
      err.password = "Password is required";
    } else if (forgot.cpassword !== forgot.password) {
      err.cpassword = "Password doesn't match";
    }
    return err;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(validation());
  };
  return (
    <div className={styles.loginPageHugging}>
      <div className={styles.formAll}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.signupBtnHugging}>Forgot Password</div>
          <div className={styles.relativeSVG}>
            <span className={styles.absoluteSVG}>{passwordicon}</span>
            <InputFeild
              style={input}
              type="password"
              placeholder="Enter New Password"
              name="password"
              value={forgot.password}
              addValue={handleChange}
              id=""
            />
          </div>
          <div className={styles.errors}>{error?.password}</div>
          <div className={styles.relativeSVG}>
            <span className={styles.absoluteSVG}>{passwordicon}</span>
            <InputFeild
              type="password"
              placeholder=" Confirm Password"
              name="cpassword"
              value={forgot.cpassword}
              addValue={handleChange}
              style={input}
              id=""
            />
          </div>
          <div className={styles.errors}>{error?.cpassword}</div>

          <ButtonShow
            type="submit"
            name="SUBMIT"
            style={buttonStyle.fill}
            action={() => {}}
            styleClass=""
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
            type=""
            styleClass=""
          />
        </span>
      </div>
    </div>
  );
};

export default Forget;

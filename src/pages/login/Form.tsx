import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginApi, registerUserApi } from "src/app/apiServices";
import { buttonStyle, input } from "../../globalStyle";
import InputFeild from "../../components/input";
import ButtonShow from "../../components/Button";
import styles from "./login.module.scss";
import { email, passwordicon, FullName } from "../../assets/icon";

const InputForm = () => {
  const location = useLocation();

  interface Login {
    username: string;
    fullname: string;
    email: string;
    password: string;
  }

  interface Error {
    username?: string;
    fullname?: string;
    email?: string;
    password?: string;
  }

  const [login, setLogin] = useState<Login>({
    username: "",
    fullname: "",
    email: "",
    password: "",
  });

  const { mutate: signIn } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: registerUserApi,
  });

  const { mutate: logIn } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: loginApi,
  });

  const [error, setError] = useState<Error>();
  const navigate = useNavigate();

  const path = location?.pathname.replace(/[^a-z0-9-]/g, "");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  useEffect(() => {
    localStorage.setItem("username", login.username);
  }, [login.username]);

  const validation = () => {
    const err: Error = {};
    const passregex =
      /^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!login.username) {
      err.username = "Username is required";
    }
    if (path === "register") {
      if (!login.fullname) {
        err.fullname = "Full name is required";
      }
      if (!login.email) {
        err.email = "Email is required";
      }
      if (!passregex.test(login.password)) {
        err.password =
          "Password should be atleast one upper case and one special character or a number and minimum 8 character";
      }
    }
    if (!login.password) {
      err.password = "Password is required";
    }

    return err;
  };
  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validation();
    setError(err);
    if (Object.keys(err)?.length === 0) {
      logIn(login);
      localStorage.setItem("auth", "true");
      navigate("/dashboardupload");
    }
  };

  useEffect(() => {
    const clearLocalStorage = () => {
      localStorage.clear();
    };
    window.onbeforeunload = clearLocalStorage;
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validation();
    setError(err);
    if (Object.keys(err)?.length === 0) {
      signIn(login);
      navigate("/login");
    }
  };

  return (
    <div className={styles.loginPageHugging}>
      <div className={styles.formAll}>
        <form
          onSubmit={path === "register" ? handleSubmit : handleSubmitLogin}
          className={styles.form}
        >
          <div className={styles.signupBtnHugging}>
            {path === "register" ? "SIGN UP" : "LOGIN"}
          </div>
          <div className={styles.formInputHead}>
            <div className={styles.relativeSVG}>
              <span className={styles.absoluteSVG}>{FullName}</span>
              <InputFeild
                style={input}
                type="text"
                placeholder="Enter Username"
                name="username"
                value={login.username}
                addValue={handleChange}
                id=""
              />
            </div>
            <div className={styles.errors}>{error?.username}</div>
          </div>
          {path === "register" ? (
            <div className={styles.formInputHead}>
              <div className={styles.relativeSVG}>
                <span className={styles.absoluteSVG}>{FullName}</span>
                <InputFeild
                  style={input}
                  type="text"
                  placeholder="Enter Full Name"
                  name="fullname"
                  value={login.fullname}
                  addValue={handleChange}
                  id=""
                />
              </div>
              <div className={styles.errors}>{error?.fullname}</div>
            </div>
          ) : (
            ""
          )}

          {path === "register" ? (
            <div className={styles.formInputHead}>
              <div className={styles.relativeSVG}>
                <span className={styles.absoluteSVG}>{email}</span>
                <InputFeild
                  style={input}
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={login.email}
                  addValue={handleChange}
                  id=""
                />
              </div>
              <div className={styles.errors}>{error?.email}</div>
            </div>
          ) : (
            ""
          )}

          <div className={styles.formInputHead}>
            <div className={styles.relativeSVG}>
              <span className={styles.absoluteSVG}>{passwordicon}</span>
              <InputFeild
                style={input}
                type="password"
                placeholder="Password"
                name="password"
                value={login.password}
                addValue={handleChange}
                id=""
              />
            </div>
            <div className={styles.errors}>{error?.password}</div>
          </div>
          <div className={styles.loginButtons}>
            <ButtonShow
              type="submit"
              name={path === "register" ? "SUBMIT" : "SUBMIT"}
              style={buttonStyle.fill}
              styleClass=""
              action={() => {}}
            />
          </div>
        </form>
      </div>
      <div className={styles.account}>
        {path !== "register" ? (
          <span>
            Don&apos;t have an account yet?
            <ButtonShow
              action={() => {
                navigate("/register");
              }}
              name="Sign Up"
              style={buttonStyle.transparent}
              styleClass=""
              type=""
            />
            <span className={styles.forgot}>
              <ButtonShow
                action={() => navigate("/email")}
                name="Fortgot Password "
                style={buttonStyle.transparent}
                styleClass=""
                type=""
              />
            </span>
          </span>
        ) : (
          <span>
            Already have an account yet?
            <ButtonShow
              action={() => navigate("/login")}
              name="Sign In"
              style={buttonStyle.transparent}
              styleClass=""
              type=""
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default InputForm;

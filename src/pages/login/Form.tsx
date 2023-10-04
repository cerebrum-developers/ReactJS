import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { email, passwordicon, FullName } from '../../assets/icon';
import { buttonStyle, input } from '../../globalStyle';
import InputFeild from '../../components/input';
import ButtonShow from '../../components/Button';
import styles from './login.module.scss';
import {
  loginData,
  registerUserData,
} from '../../app/reducer/loginSlice';

const InputForm = () => {
  const location = useLocation();
  const [login, setLogin] = useState({
    username: '',
    fullname: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path: any = location?.pathname.replace(/[^a-z0-9-]/g, '');
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  const validation = () => {
    const err: any = {};
    const passregex = /^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    if (!login.username) {
      err.username = 'Username is required';
    }
    if (path === 'register') {
      if (!login.fullname) {
        err.fullname = 'Full name is required';
      }
      if (!login.email) {
        err.email = 'Email is required';
      }
      if (!passregex.test(login.password)) {
        err.password = 'Password should be atleast one upper case and one special character or a number and minimum 8 character';
      }
    }
    if (!login.password) {
      err.password = 'Password is required';
    }

    return err;
  };
  const handleSubmitLogin = (e: any) => {
    e.preventDefault();
    const err = validation();
    setError(err);
    if (Object.keys(err)?.length === 0) {
      dispatch(loginData(login));
      navigate('/dashboardupload');
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const err = validation();
    setError(err);
    if (Object.keys(err)?.length === 0) {
      dispatch(registerUserData(login));
      navigate('/login');
    }
  };

  return (
    <div className={styles.loginPageHugging}>
      <div className={styles.formAll}>
        <form
          onSubmit={path === 'register' ? handleSubmit : handleSubmitLogin}
          className={styles.form}
        >
          <div className={styles.signupBtnHugging}>
            {path === 'register' ? 'SIGN UP' : 'LOGIN'}
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
              />
            </div>
            <div className={styles.errors}>{error?.username}</div>
          </div>
          {path === 'register' ? (
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
                />
              </div>
              <div className={styles.errors}>{error?.fullname}</div>
            </div>
          ) : (
            ''
          )}

          {path === 'register' ? (
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
                />
              </div>
              <div className={styles.errors}>{error?.email}</div>
            </div>
          ) : (
            ''
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
              />
            </div>
            <div className={styles.errors}>{error?.password}</div>
          </div>
          <div className={styles.loginButtons}>
            <ButtonShow
              type="submit"
              name="SUBMIT"
              style={buttonStyle.fill}
            >
              {path === 'register' ? 'SUBMIT' : 'SUBMIT'}
            </ButtonShow>
          </div>
        </form>
      </div>
      <div className={styles.account}>
        {path !== 'register' ? (
          <span>
            Don&apos;t have an account yet?
            <ButtonShow
              action={() => {
                navigate('/register');
              }}
              name="Sign Up"
              style={buttonStyle.transparent}
            />
          </span>
        ) : (
          <span>
            Already have an account yet?
            <ButtonShow
              action={() => navigate('/login')}
              name="Sign In"
              style={buttonStyle.transparent}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default InputForm;

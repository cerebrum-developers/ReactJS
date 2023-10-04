import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { passwordicon } from '../../assets/icon';
import ButtonShow from '../../components/Button';
import InputFeild from '../../components/input';
import { input, buttonStyle } from '../../globalStyle';
import styles from './login.module.scss';

const Forget = () => {
  const navigate = useNavigate();

  const [forgot, setForgot] = useState<any>({
    password: '',
    cpassword: '',
  });
  const [error, setError] = useState<any>();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForgot({ ...forgot, [name]: value });
  };

  const validation = () => {
    const err: any = {};
    if (!forgot.password || !forgot.cpassword) {
      err.password = 'Password is required';
    } else if (forgot.cpassword !== forgot.password) {
      err.cpassword = "Password doesn't match";
    }
    return err;
  };

  const handleSubmit = () => {
    setError(validation());
    // if (Object.keys(error)?.length === 0) {
    //   ("");
    // }
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
              className="form-input-hugging save-lib-hugging"
              type="password"
              placeholder="Enter New Password"
              name="password"
              value={forgot.password}
              onChange={handleChange}
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
              onChange={handleChange}
              style={input}
            />
          </div>
          <div className={styles.errors}>{error?.cpassword}</div>

          <ButtonShow
            className="login-Btn-hugging"
            type="submit"
            size="md"
            name="SUBMIT"
            style={buttonStyle.fill}
          >
            SUBMIT
          </ButtonShow>
        </form>
      </div>

      <div className={styles.loginButtons}>
        <span className="iuevlkmso">
          Already know password?
          <ButtonShow
            action={() => navigate('/login')}
            name="Sign In"
            style={buttonStyle.transparent}
          >
            Sign In
          </ButtonShow>
        </span>
      </div>
    </div>
  );
};

export default Forget;

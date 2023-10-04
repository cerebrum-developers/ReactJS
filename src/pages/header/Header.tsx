import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { buttonStyle } from '../../globalStyle';
import { registerData } from '../../app/reducer/loginSlice';
import {
  arrow,
  blackarrowIcon,
  close,
  closegrayIcon,
  copyIcon,
  navbarlogo,
  profile,
} from '../../assets/icon';
import styles from './header.module.scss';
import ButtonShow from '../../components/Button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(registerData());
  }, [dispatch]);
  const token = localStorage.getItem('auth');

  return (
    <div>
      {location.pathname === '/' ? (
        <div className={styles.loginBtnHugging}>
          <span id="minimize-button">{arrow}</span>
          <span id="close-button" className={styles.closeButton}>
            {close}
          </span>
        </div>
      ) : (
        <div className={styles.headerShadowHugging}>
          <Link to={token ? '/dashboardupload' : ''}>{navbarlogo}</Link>
          <div className={styles.headerButton}>
            {(() => {
              if (token) {
                return (
                  <ButtonShow
                    styleClass={styles.profileLogo}
                    action={() => navigate('/profile')}
                    name={profile}
                  />
                );
              }
              return (
                <ButtonShow
                  action={() => navigate('/login')}
                  style={buttonStyle.border}
                  name="Log in"
                />
              );
            })()}
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

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  downloadlanding,
  landingcopy,
  landingIcon,
  landingPlay,
  run,
} from '../../assets/icon';
import styles from './landing.module.scss';

const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.login_huggingface}>
      <div>
        <div className={styles.landingIcon}>{landingIcon}</div>
        <div className={styles.landing_all_icon}>
          <div>
            <button
              type="button"
              className={styles.signupBtnHugging}
              onClick={() => navigate('/login')}
            >
              Run Summary
              <span>{run}</span>
            </button>
          </div>
          <div className={styles.playIcon}>
            <div className={styles.landingButtons}>
              <button type="button" className={styles.landPlayBtn}>
                {landingPlay}
              </button>
              <div className={styles.landPlayText}>Play</div>
            </div>
            <div className={styles.landingButtons}>
              <button type="button" className={styles.landCopyBtn}>
                {landingcopy}
              </button>
              <div className={styles.landLinkText}>Link</div>
            </div>
            <div className={styles.landingButtons}>
              <button type="button" className={styles.landDownloadBtn}>
                {downloadlanding}
              </button>
              <div className={styles.landDownloadText}>Save</div>
            </div>
          </div>
        </div>
        <div className={styles.fontHugging}>
          <Link to="/register">Create your account</Link>
          <span className={styles.or}>or</span>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;

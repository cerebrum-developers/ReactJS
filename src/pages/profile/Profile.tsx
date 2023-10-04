import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteData, updateData, viewData } from '../../app/reducer/loginSlice';
import { profileIcon } from '../../assets/icon';
import styles from './profile.module.scss';

const ViewProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { viewProfile } = useSelector((state: any) => state.login);
  const [viewprofiles, setViewProfiles] = useState({
    id: '',
    uname: '',
    lname: '',
    text: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setViewProfiles({ ...viewprofiles, [name]: value });
  };

  useEffect(() => {
    dispatch(viewData());
  }, [dispatch]);
  useEffect(() => {
    setViewProfiles({
      ...viewprofiles,
      id: viewProfile?.data?.[0]?.id,
      uname: viewProfile?.data?.[0]?.uname,
      lname: viewProfile?.data?.[0]?.lname,
      text: viewProfile?.data?.[0]?.text,
    });
  }, [viewProfile]);

  const handleUpdate = () => {
    dispatch(updateData(viewprofiles));
  };

  const data = viewProfile?.data?.[0];
  const handleDelete = () => {
    dispatch(deleteData(data));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className={styles.viewFormHugging}>
      <form className={styles.profileForm}>
        <div>
          <div className={styles.profileheight}>
            <div className={styles.profileHugging}>{profileIcon}</div>
          </div>
          <div>
            <div>
              <input
                className={styles.profile_name}
                type="text"
                placeholder="Firstname"
                name="uname"
                value={viewprofiles.uname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div>
              <input
                className="profile-text-hugging"
                type="text"
                placeholder="Lastname"
                name="lname"
                value={viewprofiles.lname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <div>
              <input
                className=" profile-text-hugging"
                type="text"
                placeholder="Text"
                name="text"
                value={viewprofiles.text}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.profileButtons}>
            <div>
              <button type="button" className={styles.editprofile} onClick={handleUpdate}>
                Edit Account
              </button>
              <button type="button" className={styles.deleteprofile} onClick={handleDelete}>
                Delete Account
              </button>
            </div>
            <div>
              <button type="button" className={styles.editprofile} onClick={handleLogout}>
                LogOut
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ViewProfile;

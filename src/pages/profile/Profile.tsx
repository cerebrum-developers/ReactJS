import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileIcon } from "../../assets/icon";
import styles from "./profile.module.scss";

const ViewProfile = () => {
  const navigate = useNavigate();
  const [viewprofiles, setViewProfiles] = useState<ViewProfile>({
    id: "",
    uname: "",
    lname: "",
    text: "",
  });

  interface ViewProfile {
    id: string;
    uname: string;
    lname: string;
    text: string;
  }

  const [file, setFile] = useState("");
  const [user, setUser] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storeUser: string =
      localStorage.getItem("username") !== null
        ? (localStorage.getItem("username") as string)
        : "";
    setUser(storeUser);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setViewProfiles({ ...viewprofiles, [name]: value });
    setUser(e.target.value);
  };

  const inputElement = useRef<HTMLInputElement>(null);
  const imageElement = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputElement.current) {
      inputElement.current.style.display = "block";
      inputElement.current.focus();
    }
  }, [inputElement, isEditing]);

  const handleUpdate = () => {
    setIsEditing(!isEditing);
    if (!isEditing && imageElement.current) {
      imageElement.current.disabled = false;
    } else if (imageElement.current && isEditing) {
      imageElement.current.disabled = true;
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className={styles.viewFormHugging}>
      <form className={styles.profileForm}>
        <div>
          <div>
            <div className={styles.profileheight}>
              <div className={styles.profileHugging}>
                <div className={styles.profileIcon}>{profileIcon}</div>
                <input
                  ref={imageElement}
                  disabled
                  type="file"
                  className={styles.handleImage}
                  onChange={handleImage}
                />
                <img src={file} alt="profile" className={styles.setImg} />
              </div>
            </div>
            <div>
              <div>
                {isEditing ? (
                  <input
                    className={styles.profile_name}
                    type="text"
                    name="name"
                    value={user}
                    onChange={handleChange}
                    ref={inputElement}
                    autoComplete="off"
                  />
                ) : (
                  <div className={styles.divElement}>{user}</div>
                )}
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className={styles.LibraryItem}>208 Saved Library Items</div>
            </div>
          </div>
          <div>
            <div>
              <div className={styles.LibraryItem}>Subscription Plan : Free</div>
            </div>
          </div>
          <div className={styles.profileButtons}>
            <div>
              {isEditing ? (
                <button
                  type="button"
                  className={styles.editprofile}
                  onClick={handleUpdate}
                >
                  Save Account
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.editprofile}
                  onClick={handleUpdate}
                >
                  Edit Account
                </button>
              )}
              <button type="button" className={styles.deleteprofile}>
                Delete Account
              </button>
            </div>
          </div>
        </div>
        <div className={styles.logoutBG}>
          <button
            type="button"
            className={styles.editprofile2}
            onClick={handleLogout}
          >
            LogOut
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewProfile;

import mixpanel from "mixpanel-browser";
// import { UserContext } from "../components/app/UserContext";
import { getUserProfile } from "../../services/pateintWeb/user.js";
import { history } from "./history";

// static contextType = UserContext;

/**
 * @function getUser
 * @desc This returns user info if the user is logged in
 */
export const getUser = function() {
  let user = localStorage.getItem("user");
  let authToken = localStorage.getItem("authToken");
  return user && authToken ? JSON.parse(user) : null;
};

/**
 * @function getUserId
 * @desc returns User id
 */
export const getUserId = () => {
  let userId = null;
  const user = localStorage.getItem("user");
  if (user) {
    userId = JSON.parse(user).id;
  }
  return userId;
};

/**
 * @function isLoggedIn
 * @desc This checks whether user is logged in or not
 */
export const isLoggedIn = () => {
  let user = localStorage.getItem("user");
  let authToken = localStorage.getItem("authToken");
  return user && authToken ? true : false;
};

/**
 * @function capitalize
 * @desc This capitalizes the string
 */
export const capitalize = s => {
  if (s === "" || s === null) {
    return;
  }
  return s.toLowerCase().replace(/\b./g, function(a) {
    return a.toUpperCase();
  });
};

/**
 * @function getCookie
 * @param "cname"
 * @desc This function get a cookie value
 */
export const getCookie = cname => {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
};

/**
 * @function setCookie
 * @param "cname", "cvalue"
 * @desc This function sets the cookie
 */
export const setCookie = (cname, cvalue) => {
  let expires = "";
  const exdays = 30; // exdays -> number of days after which cookie will expire

  const date = new Date();
  date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
  expires = `; expires=${date.toGMTString()}`;

  document.cookie = `${cname}=${cvalue}${expires};domain=.kulcare.com;path=/;`;
};

export const deleteCookie = name => {
  document.cookie = `${name}=; path=/; domain=.kulcare.com;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

/**
 * @function getAppEnv
 * @desc This returns the current application environment:
 * @retuns dev, stg or prod
 */
export const getAppEnv = () => {
  let appEnv = "";
  if (window && window.location) {
    const winProtocol = window.location.protocol;
    const winHostname = window.location.hostname;
    
    if (winHostname === import.meta.env.VITE_APP_DEV_HOST_NAME) {
      appEnv = winProtocol === "http:" ? "dev" : "stg";
    }
    if (winHostname === import.meta.env.VITE_APP_PROD_HOST_NAME) {
      appEnv = "prod";
    } else {
      appEnv = import.meta.env.VITE_APP_Pateint_Web_ENV;
    }
  } 
  // else {
  //   appEnv = import.meta.env.VITE_APP_Pateint_Web_ENV;
  // }
  return appEnv;
};

/**
 * @function setMixpanelProfileInfo
 * @desc This function sets the user for mixpanel
 */
export const setMixpanelProfileInfo = user => {
  if (user) {
    mixpanel.people.set({
      $user_id: user.id,
      $name: user?.name,
      $email: user?.email,
      $phone: `+${user?.country_code}-${user?.phone_number}`,
      "Patient Name": user?.name,
      "Phone Number": user?.phone_number,
      "Email address": user?.email
    });
    mixpanel.identify(user.id);
  }
};

/**
 * @function getPatientId
 * @desc returns patient id
 */
export const getPatientId = () => {
  let patientAccount = [];
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
    patientAccount = user?.user_accounts?.filter(obj => {
      if (obj.account_type === "patient") return obj;
    });
  }
  if (patientAccount.length > 0) return patientAccount[0].patient_id;
  else return null;
};

/**
 * @function getPatientId
 * @desc returns patient id
 */
export const getPatientAccount = () => {
  let patientAccount = [];
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
    patientAccount = user?.user_accounts?.filter(
      account => account.account_type === "patient"
    );
  }
  if (patientAccount.length > 0) return patientAccount[0];
  else return null;
};

/**
 * @function deleteAllCookies
 * @desc This function deletes all cookies
 */
export const deleteAllCookies = () => {
  const appEnv = getAppEnv();
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    if (
      name &&
      name.trim() !== `${appEnv}_current_language` &&
      name.trim() !== `${appEnv}_return_url`
    ) {
      document.cookie = `${name}=; path=/; domain=.kulcare.com;expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  }
};

export const setCookieRelatedData = (
  responseObj,
  handleSettingLocalStorage,
  redirectUrl,
  contextType
) => {
  const { user } = responseObj.data;
  const appEnv = getAppEnv();

  setCookie(`${appEnv}_is_patient`, true);
  setCookie(`${appEnv}_authToken`, `Bearer ${responseObj.auth_token}`);
  setCookie(`${appEnv}_id_tkn`, `${responseObj.refresh_token}`);

  // check if current language is being selected by the user, hence store it in cookies
  const selectedLanguage = getCookie(`${appEnv}_current_language`)
    ? getCookie(`${appEnv}_current_language`)
    : "en";

  setCookie(`${appEnv}_current_language`, selectedLanguage);
  setCookie(`${appEnv}_user`, JSON.stringify({ id: user.id }));
  // setCookie(`${getAppEnv()}_is_provider`, true);
  if (handleSettingLocalStorage)
    setUserLocalStorage(appEnv, redirectUrl, contextType);
};

export const setUserLocalStorage = async (appEnv, redirectUrl, contextType) => {
  let userObj = getCookie(`${appEnv}_user`);
  const authToken = getCookie(`${appEnv}_authToken`);
  let userResponse = null;
  const refreshToken = getCookie(`${appEnv}_id_tkn`);

  if (userObj && authToken) {
    // get user data
    localStorage.setItem("authToken", authToken);
    if (refreshToken) localStorage.setItem("idt", refreshToken);
    // start loading
    // this.props.showLoaderAtStart(true);
    userResponse = await getUserProfile();
    // stop loading
    // this.props.showLoaderAtStart(false);
    if (userResponse?.data?.success) {
      // show loader at start, and hide it once localstorage is set, i.e. once setAuthDetails() method is done executing
      // userObj = userResponse.data.data;
      userObj = userResponse?.data?.data?.user;
      setMixpanelProfileInfo(userObj);
      // if (userObj.signed_up_as === "patient") {
      localStorage.setItem("user", JSON.stringify(userObj));

      contextType.setUserPhoto(getPatientAccount()?.photo_url);
      contextType.setUserName(getPatientAccount()?.patient_name);

      // const isUserJustOnboarded = getCookie(`${appEnv}_patient_onboard`);

      // if (isUserJustOnboarded) history.push("/profile");
      // else
      history.push(`/${redirectUrl}`);
      // } else {
      //   window.open(import.meta.env.VITE_APP_CMS_SITE_BASE_URL, "_self");
      // }

      // this.props.setUserInfo(userObj, pageName, null, sendgridCategory);
    } else {
      this.handleLoggedOutUsers();
    }
  }
};

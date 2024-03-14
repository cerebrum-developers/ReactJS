import Hashids from "hashids";
import {
  browserName,
  fullBrowserVersion,
  osName,
  osVersion,
  isMobile,
  mobileVendor,
  mobileModel,
  isAndroid,
  isChrome,
  isMobileSafari,
  isIOS,
} from "react-device-detect";
import mixpanel from "mixpanel-browser";
import maleDocImage from "../components/Appointments/images/male_default_image.png";
import femaleDocImage from "../components/Appointments/images/female_default_image.png";
import neutralDocPhoto from "../components/Appointments/images/gender_neutral_photo.svg";
import { Skeleton } from "antd";
import andriodCrome from "../images/andriod-crome.png";
import iosSafari from "../images/ios-safari.png";
import iosCrome from "../images/ios-crome.png";
import moment from "moment";

var key = import.meta.env.VITE_APP_PUBLIC_URL_ENCODE_KEY;
var hashids = new Hashids(key, 9);

export const myLoader = ({ src }) => {
  return src;
};

/**
 * @function encryptId
 * @param id
 * @param encrypted_id
 * @desc This handles encryption of an id using Hashids
 */
export const encryptId = (id) => {
  var encrypted_id = id;
  if (parseInt(id, 10)) {
    encrypted_id = hashids.encode(id);
  }
  return encrypted_id;
};

/**
 * @function decryptId
 * @param id
 * @param decrypted_id
 * @desc This handles decryption of an id using Hashids
 */
export const decryptId = (id) => {
  var decrypted_id = hashids.decode(id);
  return decrypted_id[0];
};

/* @function getDocImage
 * @desc This function handles getting doctor photo url
 */
export const getDocImage = (doctorDetails = null) => {
  let photoUrl = maleDocImage;
  photoUrl =
    doctorDetails && doctorDetails.photo && doctorDetails.photo.trim()
      ? doctorDetails.photo
      : doctorDetails && doctorDetails.gender === "Male"
      ? maleDocImage
      : femaleDocImage;

  if (doctorDetails && !doctorDetails.gender) photoUrl = neutralDocPhoto;

  return photoUrl;
};

/**
 * @function getBrowserDetails
 * @desc this function returns the browser details
 * */
export const getBrowserDetails = () => {
  return {
    browser_name: browserName,
    browser_version: fullBrowserVersion,
    os_name: osName,
    os_version: osVersion,
    screen_width: window.innerWidth,
    screen_height: window.innerHeight,
    device_name: isMobile ? `${mobileVendor} ${mobileModel}` : null,
    url: window.location.href,
    platform: isMobile ? `patient_web` : `patient_mobile`,
  };
};

/**
 * @function logMixpanelEvent
 * @params event
 * @description  sends mixpanel data to api
 */
export const logMixpanelEventBasic = (
  eventName,
  typeOfEvent = null,
  fromParam = null,
  taskParam = null
) => {
  const mixpanelData = getBrowserDetails();
  if (typeOfEvent) mixpanelData.type = typeOfEvent;
  if (fromParam) mixpanelData.from = fromParam;
  if (taskParam) mixpanelData.task = taskParam;
  mixpanel.track(eventName, mixpanelData);
};

export const setAddressLineFromDoctor = (doctor) => {
  const loc = [];
  if (doctor?.location?.clinic_name) loc.push(doctor?.location?.clinic_name);
  if (doctor?.location?.address_line_1)
    loc.push(doctor?.location?.address_line_1);
  if (doctor?.location?.city) loc.push(doctor?.location?.city);
  if (doctor?.location?.state) loc.push(doctor?.location?.state);
  if (doctor?.location?.zipcode) loc.push(doctor?.location?.zipcode);

  return loc.join(", ");
};

export const handleSetLocationFeeFromDoc = (doctor) => {
  return doctor.takes_in_clinic && doctor.fees
    ? doctor.fees
    : doctor.fixed_appt_fees;
};

/**
 * @function removeDuplicates
 * @param myArr
 * @param prop
 * @description it will remove duplicate values from array
 */
export const removeDuplicates = (arr, prop) => {
  const result = arr.reduce((unique, o) => {
    if (!unique.some((obj) => obj[prop] === o[prop])) {
      unique.push(o);
    }
    return unique;
  }, []);
  return result;
};

/**
 * @function getInitials
 * @param string
 * @description it will return initials out of string passed in the function
 */
export const getInitials = (stringText) => {
  if (!stringText) return false;
  let names = stringText.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

/* @function getDocImage
 * @desc This function handles getting doctor photo url
 */
export const getDocDefaultImage = (doctorDetails = null) => {
  let photoUrl =
    doctorDetails && doctorDetails.gender === "Male"
      ? maleDocImage
      : femaleDocImage;

  if (doctorDetails && !doctorDetails.gender) photoUrl = neutralDocPhoto;

  return photoUrl;
};

export const groupByKey = (array, key) => {
  return array.reduce((hash, obj) => {
    if (obj[key] === undefined) return hash;
    return Object.assign(hash, {
      [obj[key]]: (hash[obj[key]] || []).concat(obj),
    });
  }, {});
};

export const getDiscountedSlots = (timeSlots) => {
  let discountedSlots = null;
  const onlyDiscounted = timeSlots.filter(
    (slot) => slot.schedule_type === "discount"
  );
  discountedSlots = groupByKey(onlyDiscounted, "percentage");
  return discountedSlots;
};

export const getMessageListSkelton = (num, containerClass, skeletonClass) => {
  return (
    <>
      {[...Array(num)].map((num, index) => (
        <div className={containerClass ? containerClass : ""} key={index}>
          <Skeleton
            key={index}
            className={skeletonClass}
            loading={true}
            avatar
            active
            paragraph={{ rows: 2 }}
          ></Skeleton>
        </div>
      ))}
    </>
  );
};
export const getMessageDetailSkelton = (num, containerClass, skeletonClass) => {
  return (
    <>
      {[...Array(num)].map((num, index) => (
        <div className={containerClass ? containerClass : ""} key={index}>
          <Skeleton
            key={index}
            className={skeletonClass}
            loading={true}
            active
            paragraph={{ rows: 2 }}
          ></Skeleton>
        </div>
      ))}
    </>
  );
};

export const generateRange = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
};

export const cityName = (locationName) => {
  if (
    locationName === "Sahibzada Ajit Singh Nagar" ||
    locationName === "S.A.S Nagar"
  )
    return "Mohali";
  else return locationName;
};

/** *
 * @function keyLocallyPresent
 * @param key
 * @desc This method checks if value presents
 * in local storage or session storage
 */
export const keyLocallyPresent = (key) => {
  const keyPresent =
    sessionStorage.getItem(key) &&
    sessionStorage.getItem(key) != "undefined" &&
    sessionStorage.getItem(key) !== null &&
    sessionStorage.getItem(key) !== "null";
  return keyPresent;
};

export const generateDevicePermissionImage = () => {
  let image = "";
  if (isAndroid && isChrome) {
    image = andriodCrome;
  } else if (isMobileSafari) {
    image = iosSafari;
  } else if (isIOS && isChrome) {
    image = iosCrome;
  } else {
    image = andriodCrome;
  }
  return image;
};

// fetch user's timezone
export const userTimezone = () => {
  return localStorage.getItem("current_timezone");
};

/** *
 * @function convertUTCDateToLocalTime
 * @param utcDate
 * @desc This method converts utcDate to user time in its timezone
 */
export const convertUTCDateToLocalTime = (utcDate) => {
  if (!utcDate) utcDate = new Date();
  // const tzString = userTimezone(); // do the coversion according to current timezone of user

  // if current time could not be detected, then convert according to saved user timezone
  const localTime = new Date(
    (typeof utcDate === "string" ? new Date(utcDate) : utcDate).toLocaleString(
      "en-US",
      { timeZone: "Asia/Calcutta" }
    )
  ); // Fri Jun 18 2021 16:10:51 GMT+0530 (India Standard Time)

  return localTime;
};

/**
 * @function handleShowAddToCal
 * @params appointment
 * @description It will check if to show add to calender button
 */

export const handleShowAddToCal = (appoinment) => {
  let join = false;
  const appointmentTime = moment(
    convertUTCDateToLocalTime(appoinment.appointment_time)
  ).toISOString();
  const currentTime = moment(
    convertUTCDateToLocalTime(new Date())
  ).toISOString();
  join = moment(currentTime).isBefore(moment(appointmentTime));
  return join;
};

export const dataURItoBlob = (dataURI) => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);

  // create a view into the buffer
  var ia = new Uint8Array(ab);

  // set the bytes of the buffer to the correct values
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  // write the ArrayBuffer to a blob, and you're done
  var blob = new Blob([ab], { type: mimeString });
  return blob;
};

/**
 * @function encodePhoneNumber
 * @param countryCode
 * @param  phoneNumber
 * @description It will encode phone number
 */
export const encodePhoneNumber = (countryCode, phoneNumber) => {
  let arr = phoneNumber.toString().split("");
  const concatNum =
    "+" +
    `${countryCode}` +
    " " +
    `${arr[0]}` +
    `${arr[1]}` +
    "x" +
    "x" +
    "x" +
    "x" +
    "x" +
    "x" +
    `${arr[arr.length - 2]}` +
    `${arr[arr.length - 1]}`;
  return concatNum;
};

export const showDiscountedTag = (day, doctor) => {
  if (doctor?.spl_schedules?.length > 0) {
    const percentages = [];
    doctor?.spl_schedules.map((schedule) => {
      if (
        schedule.days.includes(day) &&
        schedule.schedule_type === "discount"
      ) {
        percentages.push(schedule.percentage);
      }
    });

    if (percentages.length > 0) {
      const showPercent = Math.max(...percentages);
      return (
        <span className="outer-slot-discount">{`${showPercent}% off`}</span>
      );
    } else {
      return null;
    }
  }
};

export const showDiscountedRange = (doctor) => {
  if (doctor?.spl_schedules?.length > 0) {
    const percentages = [];
    doctor?.spl_schedules.map((schedule) => {
      if (schedule.schedule_type === "discount") {
        percentages.push(schedule.percentage);
      }
    });

    if (percentages.length > 0) {
      const minPercent = Math.min(...percentages);
      const maxPercent = Math.max(...percentages);

      return (
        <span className="outer-slot-discount left">{`${
          minPercent === maxPercent
            ? `${minPercent}% off`
            : `${minPercent}-${maxPercent}% off`
        }`}</span>
      );
    } else {
      return null;
    }
  }
};

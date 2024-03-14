import React from "react";
import moment from "moment";
import {
  browserName,
  fullBrowserVersion,
  osName,
  osVersion,
  isMobile,
  mobileVendor,
  mobileModel,
  isAndroid,
  isMobileSafari,
  isChrome,
  isIOS
} from "react-device-detect";
import { Select, Skeleton, Button } from "antd";
import _ from "lodash";
// import { sendMixpanelData, sendMixpanelDataBasic } from "../services";
import iosCrome from "../../images/pateintWeb/ios-crome.png";
import iosSafari from "../../images/pateintWeb/ios-safari.png";
import andriodCrome from "../../images/pateintWeb/andriod-crome.png";
import { getUserId,getUser } from "./user";
// import { getUserId, getUser, getPatientId } from "../helpers";


const { Option } = Select;

const supportLinks = {
  androidCrome:
    "https://support.google.com/chrome/answer/2693767?hl=en&co=GENIE.Platform%3DAndroid&oco=1",
  iosCrome:
    "hhttps://support.google.com/chrome/answer/2693767?hl=en&co=GENIE.Platform%3DiOS&oco=1",
  iosSafari: "https://www.youtube.com/watch?v=D6GO2KKLpI4"
};

// declare global perPage value for listing view
export const perPage = 10;

export const timeSlotMinutes = 30;

/**
 * @function formatedTime
 * @param date
 * @desc this function will formated time (05:40 PM)
 */
export const formatedTime = date => {
  return moment(date).format("hh:mm A");
};

/**
 * @function formatedDate
 * @param date
 * @desc this function will formated Date 15 Jan, 2019 */
export const formatedDate = date => {
  return moment(date).format("DD MMM, YYYY");
};

/**
 * @function formatedTimeBefore
 * @param currentTime
 * @param timetoMinus
 * @param format
 * @desc this function will formated Date 15 Jan, 2019 */
export const formatedTimeBefore = (currentTime, timetoMinus, format) =>
  moment(convertUTCDateToLocalTime(currentTime))
    .subtract(timetoMinus, format)
    .format("hh:mm a");

/**
 * @function calculateCountdown
 * @param endDate
 * @desc this function calculates the countdown/ time remaining, relative to endDate
 * */
export const calculateCountdown = endDate => {
  let diff = (Date.parse(new Date(endDate)) - Date.parse(new Date())) / 1000;

  const timeLeft = {
    years: 0,
    hours: 0,
    min: 0,
    sec: 0
  };

  // clear countdown when date is reached
  if (diff <= 0) return timeLeft;

  // calculate time difference between now and expected date
  if (diff >= 365.25 * 86400) {
    // 365.25 * 24 * 60 * 60
    timeLeft.years = Math.floor(diff / (365.25 * 86400));
    diff -= timeLeft.years * 365.25 * 86400;
  }
  if (diff >= 3600) {
    // 60 * 60
    timeLeft.hours = Math.floor(diff / 3600);
    diff -= timeLeft.hours * 3600;
  }
  if (diff >= 60) {
    timeLeft.min = Math.floor(diff / 60);
    diff -= timeLeft.min * 60;
  }
  timeLeft.sec = diff;
  return timeLeft;
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
    user_id: getUserId() || null,
    role: "patient",
    platform: "patient_web"
  };
};

/**
 * @function handleShowJoinBtn
 * @params appointment
 * @description It will check if to show join button or not
 */
export const handleShowJoinBtn = (appointment, isCovidClinic) => {
  let showJoinVideoCall = false;
  if (!isCovidClinic) {
    const currentDateTime = moment().format("LT");
    const currentDateTime24 = moment(currentDateTime, "LT").format("HH:mm");

    const beforeTenMin = moment(appointment.appointment_time).subtract(
      660,
      "seconds"
    );
    const afterTenMin = moment(appointment.appointment_time).add(
      1800,
      "seconds"
    );
    const newBefore = moment(beforeTenMin).format("LT");
    const newAfter = moment(afterTenMin).format("LT");
    const newBefore24 = moment(newBefore, "LT").format("HH:mm");
    const newAfter24 = moment(newAfter, "LT").format("HH:mm");

    if (
      currentDateTime24 > newBefore24 &&
      currentDateTime24 < newAfter24 &&
      appointment.appointment_status !== "CHECKED_OUT" &&
      appointment.appointment_status !== "REMOVED"
    ) {
      showJoinVideoCall = true;
    } else {
      showJoinVideoCall = false;
    }
  } else {
    showJoinVideoCall = true;
  }

  if (!appointment.appointment_time) showJoinVideoCall = true;

  return showJoinVideoCall;
};

/**
 * @function handleShowAddToCal
 * @params appointment
 * @description It will check if to show add to calender button
 */

export const handleShowAddToCal = appointment => {
  let join = false;
  const appointmentTime = moment(
    convertUTCDateToLocalTime(appointment.appointment_time)
  ).toISOString();
  const currentTime = moment(
    convertUTCDateToLocalTime(new Date())
  ).toISOString();
  join = moment(currentTime).isBefore(moment(appointmentTime));
  return join;
};

/**
 * @function logMixpanelEvent
 * @params event
 * @description  sends mixpanel data to api
 */
export const logMixpanelEvent = (
  eventName,
  patientId,
  typeOfEvent = null,
  fromParam = null,
  taskParam = null,
  app = null,
  role = null,
  familyMemberId = null
) => {
  const mixpanelData = getBrowserDetails();
  if (typeOfEvent) mixpanelData.type = typeOfEvent;
  if (fromParam) mixpanelData.from = fromParam;
  if (taskParam) mixpanelData.task = taskParam;
  if (app) mixpanelData.app = app;
  if (role) mixpanelData.role = role;
  if (familyMemberId) mixpanelData.family_member_id = familyMemberId;
  // sendMixpanelData(
  //   eventName,
  //   patientId ? patientId : getPatientId(),
  //   mixpanelData
  // );
};

/**
 * @function logMixpanelEvent
 * @params event
 * @description  sends mixpanel data to api
 */
export const logMixpanelEventBasic = (
  eventName,
  eventId,
  typeOfEvent = null,
  type = null,
  fromParam = null,
  taskParam = null,
  app = null,
  role = null,
  familyMemberId = null
) => {
  const mixpanelData = getBrowserDetails();
  if (type) {
    mixpanelData.type = type;
  }
  if (fromParam) {
    mixpanelData.from = fromParam;
  }
  if (taskParam) {
    mixpanelData.task = taskParam;
  }
  if (app) {
    mixpanelData.app = app;
  }
  if (role) {
    mixpanelData.role = role;
  }
  if (familyMemberId) {
    mixpanelData.family_member_id = familyMemberId;
  }
  // sendMixpanelDataBasic(eventName, eventId, typeOfEvent, mixpanelData);
};

/**
 * @function getCallDuration
 * @param startime
 * @param endtime
 * @description It will return call duration
 */
export const getCallDuration = (startTime, endTime) => {
  return moment.utc(moment(endTime).diff(moment(startTime))).format("HH:mm:ss");
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

export const dataURItoBlob = dataURI => {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  var byteString = atob(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];

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

// fetch user's timezone
export const userTimezone = () => {
  return localStorage.getItem("current_timezone");
};

/** *
 * @function convertUTCDateToLocalTime
 * @param utcDate
 * @desc This method converts utcDate to user time in its timezone
 */


export const convertUTCDateToLocalTime = utcDate => {
  if (!utcDate) {
    utcDate = new Date();
  }

  const tzString = userTimezone(); // do the coversion according to current timezone of user

  // if current time could not be detected, then convert according to saved user timezone
  const localTime = new Date(
    (typeof utcDate === "string"
      ? new Date(utcDate)
      : utcDate
    ).toLocaleString("en-US", { timeZone: tzString })
  ); // Fri Jun 18 2021 16:10:51 GMT+0530 (India Standard Time)

  return localTime;
};

export const generateDevciePermissionImage = () => {
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

export const generateDevciePermissionLink = () => {
  let link = "";
  if (isAndroid && isChrome) {
    link = supportLinks.androidCrome;
  } else if (isMobileSafari) {
    link = supportLinks.iosSafari;
  } else if (isIOS && isChrome) {
    link = supportLinks.iosCrome;
  } else {
    link = supportLinks.androidCrome;
  }
  return link;
};

export const bytesToSize = bytes => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Byte";
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
  return `${Math.round(bytes / Math.pow(1024, i), 2)}${sizes[i]}`;
};

/**
 * @function showFormattedAmount
 * @param amount
 * @desc This returns formatted amount
 */
export const showFormattedAmount = amount => {
  let formattedAmount = null;
  if (amount) {
    formattedAmount = amount.toLocaleString(navigator.language, {
      minimumFractionDigits: 2
    });
    formattedAmount = `₹${formattedAmount}`;
  }
  return formattedAmount;
};

/**
 * @function parsePlace
 * @param addressComponents
 * @desc This function handles fetching state and city from
 * location selected from the google place dropdown
 */
export const parseCity = addressComponents => {
  return { city: addressComponents[0].long_name };
};

/**
 * @function parsePlace
 * @param addressComponents
 * @desc This function handles fetching state and city from
 * location selected from the google place dropdown
 */
export const parsePlace = addressComponents => {
  const parsedResult = {};
  for (let i = 0; i < addressComponents.length; i++) {
    for (let b = 0; b < addressComponents[i].types.length; b++) {
      if (addressComponents[i].types[b] === "locality") {
        // this is the object you are looking for city
        parsedResult.city = addressComponents[i].long_name;
        break;
      } else if (
        addressComponents[i].types[b] === "administrative_area_level_1"
      ) {
        // this is the object you are looking for state
        parsedResult.state = addressComponents[i].long_name;
        break;
      }
    }
  }
  return parsedResult;
};

/** *
 * @function isValidDateString
 * @param date
 * @desc This method will validate the date
 * and returns true or false
 */
export const isValidDateString = date => {
  let valid = false;
  const userDob = date && moment(new Date(date), "DD/MM/YYYY", true);
  const isValid = userDob ? userDob.isValid() : false;
  if (isValid) {
    valid = true;
  }
  return valid;
};

/** *
 * @function getBulletlist
 * @desc This method returns bullet list based on character in the string
 */
export const getBulletList = (text, char) => {
  const textArr = text.split(char);
  if (textArr.length > 0) {
    return textArr.map(item =>
      item !== "" ? <div>{`${char} ${item}`}</div> : null
    );
  } else {
    return text;
  }
};

/**
 * @function formatedShortDate
 * @param date
 * @desc this function will return the formated short date like- 08 Aug 2020
 */
export const formatedShortDate = date =>
  moment(convertUTCDateToLocalTime(date)).format("Do MMM YYYY");

/**
 * @function getPrintDoc
 * @desc This method will check and return the document to print
 */
export const getPrintDoc = (documents, languageId, printType) => {
  return documents.filter(
    doc => doc.language.id === languageId && doc.format_type === printType
  );
};

export const appointmentType = {
  WALK_IN: "WALKIN",
  ON_CALL: "ONCALL",
  TELEMEDICINE: "TELEMEDICINE"
};

// defining helper functions: start
// converts 12 hour format time to 24 hour format
export const convertTime12to24 = time12h => {
  const [time, modifier] = time12h.split(" ");
  let [hours, minutes] = time.split(":");
  if (hours === "12") {
    hours = "00";
  }
  if (modifier === "PM" || modifier === "pm") {
    hours = parseInt(hours, 10) + 12;
  }
  return `${hours}:${minutes}:00`;
};

/**
 * @function updateLocalStorage
 * @desc This function handles updating user object in local storage, and updating "did"
 */
export const updateLocalStorage = userAccountsObj => {
  const userObj = getUser();
  delete userObj.user_accounts;
  userObj.user_accounts = userAccountsObj;
  localStorage.setItem("user", JSON.stringify(userObj));
};

// export const getPatientAccount = () => {
//   let patientAccount = [];
//   let user = localStorage.getItem("user");
//   if (user) {
//     user = JSON.parse(user);
//     patientAccount = user?.user_accounts?.filter(obj => {
//       if (obj.account_type === "patient") return obj;
//     });
//   }
//   if (patientAccount.length > 0) return patientAccount[0];
//   else return null;
// };

export const replaceEnterWithBR = text => {
  return text.replace(/\n/g, "<br/>");
};

export const getMessageContentDesc = (
  category,
  payload,
  handleOpenAttachmentModal
) => {
  if (payload.findIndex(msg => msg.type === "text") !== -1) {
    return payload[payload.findIndex(msg => msg.type === "text")].content;
  }
  if (payload.findIndex(msg => msg.type === "image") !== -1) {
    const link = payload[payload.findIndex(msg => msg.type === "image")].link;
    return (
      <a
        href="#"
        className="inbox-image-thumb"
        onClick={e => handleOpenAttachmentModal(link, e)}
      >
        <img src={link} />
      </a>
    );
  }
};

export const generateInboxContentType = (
  msg,
  selectedMessage,
  selfMsg,
  handleAcknowledge,
  referralAcknowledeProcessing,
  handleOpenAttachmentModal
) => {
  // simple text message
  if (
    msg.category === "client_internal_communication" ||
    msg.category === "surgery_chat"
  ) {
    return (
      <div className="inbox-content-block">
        <div className={`inbox-text-content ${selfMsg ? "user-msg" : ""}`}>
          <div className={`chat-date-time ${selfMsg ? "right" : "left"}`}>
            {formatedDate(msg.created_at)}
          </div>
          <div className={`inbox-chat-bubble ${selfMsg ? "right" : "left"}`}>
            {getMessageContentDesc(
              msg.category,
              msg.message_payload,
              handleOpenAttachmentModal
            )}
          </div>
        </div>
      </div>
    );
  }
  // referral
  if (msg.category === "new_referral_from_doctor") {
    return (
      <div className="inbox-feature-block">
        <div className="inbox-content-top">
          <div className="content-subject">
            {selectedMessage &&
              getMessageContentHeading(msg.category, msg.message_payload)}
          </div>
          <div className="content-date">
            {selectedMessage && formatedDate(msg.created_at)}
          </div>
        </div>
        <div className="inbox-content-block">
          {selfMsg ? (
            <>
              {" "}
              <div className="inbox-text-content">
                You referred{" "}
                <span className="font-weight-semibold">
                  {msg?.event_details?.clinic_patient?.name}
                </span>{" "}
                to{" "}
                <span className="font-weight-semibold">
                  {`Dr. ${msg?.event_details?.referred_to_doctor?.name}`}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="inbox-text-content">
                <span className="font-weight-semibold">{`Dr. ${msg?.event_details?.referred_by_doctor?.name}`}</span>{" "}
                has referred{" "}
                <span className="font-weight-semibold">
                  {msg?.event_details?.clinic_patient?.name}
                </span>
                .{" "}
                {!msg?.event_details?.inbox_acknowledged &&
                  `click acknowledge to see details`}
              </div>
              {msg?.event_details?.inbox_acknowledged ? (
                <div className="mt-5">
                  <a
                    href={
                      msg.message_payload[
                        msg.message_payload.findIndex(
                          msg => msg.type === "action"
                        )
                      ].redirect_link
                    }
                    target="_blank"
                  >
                    View details
                  </a>
                </div>
              ) : (
                <div className="mb-10 mt-10">
                  {handleAcknowledge && (
                    <Button
                      type="primary"
                      size="small"
                      loading={referralAcknowledeProcessing}
                      onClick={() => handleAcknowledge(msg)}
                    >
                      Acknowledge
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        {msg.event_details.notes && (
          <div className="inbox-content-block">
            <div className="heading">Notes</div>
            <div className="inbox-text-content">
              {msg?.event_details?.notes}
            </div>
          </div>
        )}
      </div>
    );
  }
  if (msg.category === "referral_update") {
    return (
      <div className="inbox-feature-block">
        <div className="inbox-content-top">
          <div className="content-subject">
            {selectedMessage &&
              getMessageContentHeading(msg.category, msg.message_payload)}
          </div>
          <div className="content-date">
            {selectedMessage && formatedDate(msg.created_at)}
          </div>
        </div>
        {selfMsg ? (
          <div className="inbox-content-block">
            {" "}
            <div className="inbox-text-content">
              You referred back{" "}
              <span className="font-weight-semibold">
                {msg?.event_details?.clinic_patient?.name}
              </span>{" "}
              to{" "}
              <span className="font-weight-semibold">
                {`Dr. ${msg?.event_details?.referred_by_doctor?.name}`}
              </span>
            </div>
          </div>
        ) : (
          <div className="inbox-content-block">
            <div className="inbox-text-content">
              <span className="font-weight-semibold">{`Dr. ${msg?.event_details?.referred_to_doctor?.name}`}</span>{" "}
              has referred back{" "}
              <span className="font-weight-semibold">
                {msg?.event_details?.clinic_patient?.name}
              </span>{" "}
              to you .{" "}
              {!msg?.event_details?.inbox_acknowledged &&
                `click acknowledge to see details`}
            </div>

            <div className="mt-5">
              <a
                href={
                  msg.message_payload[
                    msg.message_payload.findIndex(msg => msg.type === "action")
                  ].redirect_link
                }
                target="_blank"
              >
                View details
              </a>
            </div>
          </div>
        )}

        {msg.event_details.notes && (
          <div className="inbox-content-block">
            <div className="heading">{selfMsg ? "Notes" : "Your Notes"}</div>
            <div className="inbox-text-content">
              {msg?.event_details?.notes}
            </div>
          </div>
        )}
        {msg.event_details.referred_back_notes &&
          msg.event_details.inbox_acknowledged && (
            <div className="inbox-content-block">
              <div className="heading">Refer back notes</div>
              <div className="inbox-text-content">
                {msg.event_details.referred_back_notes}
              </div>
            </div>
          )}
      </div>
    );
  }
};

export const getMessageDetailSkelton = (num, containerClass, skeletonClass) => {
  return (
    <>
      {[...Array(num)].map((num, index) => (
        <div className={containerClass ? containerClass : ""}>
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

export const getMessageContentHeading = (category, payload) => {
  if (category === "client_internal_communication") {
    return "";
  }
  if (
    category === "new_referral_from_doctor" ||
    category === "referral_update"
  ) {
    return payload[payload.findIndex(msg => msg.type === "title")].content;
  }
};

/* * @function getInitials
 * @param string
 * @description it will return initials out of string passed in the function
 */
export const getInitials = stringText => {
  if (!stringText) return false;
  let names = stringText.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const checkProposalExpiry = (startDate, endDate) => {
  let isExpired = false;
  if (!startDate || !endDate) {
    return isExpired;
  }
  const today = moment().format("YYYY-MM-DD");
  if (moment(today).isAfter(endDate)) {
    isExpired = true;
  } else {
    isExpired = false;
  }

  return isExpired;
};

export const timesAgo = date => moment(date).fromNow();

// export const getTruncatedHtmlText = (
//   text,
//   isTruncated,
//   lines,
//   handleClick,
//   stateName
// ) => {
//   if (isTruncated) {
//     return (
//       <>
//         <Truncate
//           lines={lines}
//           dangerouslySetInnerHTML={{
//             __html: replaceEnterWithBR(text)
//           }}
//         />{" "}
//         <a href="#" onClick={e => handleClick(stateName, false, e)}>
//           Show more..
//         </a>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <div
//           dangerouslySetInnerHTML={{
//             __html: replaceEnterWithBR(text)
//           }}
//         ></div>{" "}
//         <a href="#" onClick={e => handleClick(stateName, true, e)}>
//           Show less..
//         </a>
//       </>
//     );
//   }
// };

/** *
 * @function keyLocallyPresentInStorage
 * @param key
 * @desc This method checks if value presents
 * in local storage or session storage
 */
export const keyLocallyPresentInStorage = key => {
  const keyPresent =
    localStorage.getItem(key) &&
    localStorage.getItem(key) != "undefined" &&
    localStorage.getItem(key) !== null &&
    localStorage.getItem(key) !== "null";
  return keyPresent;
};

export const getFamilyMemberText = appointment => {
  let text = "hello";
  if (appointment.family_member) {
    // is invited but not verified and apointment not completed
    if (
      !appointment.family_member.verified &&
      appointment?.session_details?.session_status !== "COMPLETE"
    ) {
      text = (
        <div>{appointment.family_member.name} is invited to join the call.</div>
      );
    } else if (
      // is invited and verified but call not completed yet
      appointment.family_member.verified &&
      appointment?.session_details?.session_status !== "COMPLETE"
    ) {
      text = (
        <div>{appointment.family_member.name} will also join the call.</div>
      );
    }

    // if member joined the call and appoitment is completed
    else if (
      appointment.family_member.verified &&
      appointment?.session_details?.session_status === "COMPLETE" &&
      appointment?.session_details.family_joined
    ) {
      text = <div>{appointment.family_member.name} also joined the call.</div>;
    } else if (
      // member was invited but did not join.
      !appointment.family_member.verified &&
      appointment?.session_details?.session_status === "COMPLETE"
    ) {
      text = (
        <div>
          {appointment.family_member.name} was invited to join the call but did
          not.
        </div>
      );
    }
  }

  return text;
};

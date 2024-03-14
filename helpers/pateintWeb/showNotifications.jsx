import { notification } from "antd";
// import { strings } from "../locales";

/**
 * @function showInfoNotification
 * @param title
 * @param description
 * @description Show Notification for showing info
 */
export const showInfoNotification = (description, title) => {
  notification.info({
    message: title || "Info",
    placement: "topLeft",
    description
  });
};

/**
 * @function showSuccessNotification
 * @param description
 * @description Show Notification for showing success message to user
 */
export const showSuccessNotification = description => {
  notification.success({
    message: "Success",
    placement: "topLeft",
    description
  });
};

/**
 * @function showErrorNotification
 * @param description
 * @description Show Notification for showing error message to user
 */
export const showErrorNotification = description => {
  notification.error({
    message: "Error",
    placement: "topLeft",
    description
  });
};

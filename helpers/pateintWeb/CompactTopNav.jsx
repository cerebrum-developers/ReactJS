import React, { Component } from "react";
import { Avatar, Menu, Drawer, Button, Row, Col, Dropdown } from "antd";
import { isAndroid } from "react-device-detect";
import Pusher from "react-pusher";
import { strings } from "./locales/index";
import KulcareLogo from "../../images/pateintWeb/kulcare_logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import LeftNav from "../../components/patientWeb/app/LeftNav";

import {
  getUser,
  logMixpanelEvent,
  getPatientId,
  history,
  timesAgo,
  encryptId,
} from "../../helpers/pateintWeb/";
import UserAvator from "../../assets/avator.f62d8d1f.svg";
import { VscBell } from "react-icons/vsc";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationAsRead,
} from "../../services/pateintWeb";
import InfiniteScroll from "react-infinite-scroll-component";
import UserContext from "../../components/patientWeb/app/UserContext";
// import { timesAgo } from "./utilities";
// import { encryptId } from "./encryptValues";

class CompactTopNav extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      showMobileLeftNav: false,
      visibleMenu: false,
      unreadMsgCount: 0,
      activities: [],
      activityType: "surgery",
      hasMore: true,
      totalPages: 0,
      pageNo: 1,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.fetchNotifications();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState({
      windowWidth: window.innerWidth,
    });
  };

  /**
   * @function fetchClinicNotifications
   * @params clinicId
   * @desc This function fetches clinic notifications
   */
  fetchNotifications = () => {
    if (!getPatientId()) return false;
    const { activityType, activities, pageNo } = this.state;
    getNotifications(getPatientId(), activityType, pageNo).then((response) => {
      if (response?.data?.success) {
        const activitiesResp = response.data.data.activities;
        const allActivities = [];
        activitiesResp.map((obj) => {
          allActivities.push(obj);
        });

        const { unread_activities_count, total_pages } = response.data.data;
        this.setState({
          unreadMsgCount: unread_activities_count,
          totalPages: total_pages,
          activities: [...activities, ...allActivities],
        });
      }
    });
  };

  /**
   * @function handleAppDownload
   * @description When user click on download
   */
  handleAppDownload = (e) => {
    e.preventDefault();

    if (isAndroid) {
      window.open(
        "https://play.google.com/store/apps/details?id=com.patient_healthcare_app&hl=en_IN",
        "_blank"
      );
    } else {
      window.open(
        "https://apps.apple.com/us/app/kulcare/id1253938993",
        "_blank"
      );
    }
  };

  /**
   * @function menuClick
   * @return nothing
   * @desc This function handles redirections when user clicks on top right user menu
   */
  menuClick = (e) => {
    switch (e.key) {
      case "2":
        this.props.logout();
        break;
      default:
        break;
    }
  };

  /**
   * @function showLeftNavDrawer
   * @desc This function handles showing left nav drawer/menu in mobile screen
   */
  showLeftNavDrawer = (val, activeKey) => {
    this.setState({
      showMobileLeftNav: val,
    });
    if (activeKey == "6") logMixpanelEvent("Change Password Initiated");
  };

  /**
   * @function handleVisibleChange
   * @params "flag"
   * @desc This function handles dropdown visible change
   */
  handleVisibleChange = (flag) => {
    this.setState({ visibleMenu: flag });
  };

  handleMarkAllNotificationsAsRead = (e) => {
    if (e) e.preventDefault();
    if (!getPatientId()) return false;
    markAllNotificationAsRead(getPatientId()).then((response) => {
      if (response?.data?.success) {
        this.fetchNotifications();
      }
      this.setState({ visibleMenu: false });
    });
  };

  /**
   * @function handleNotificationClick
   * @params activityObj
   * @desc This function handles notification click
   */
  handleNotificationClick = (activityObj) => {
    let redirectUrl = "/";
    switch (activityObj.key) {
      case "surgery_proposal.create":
        redirectUrl = "/case-files";
        break;
      case "surgery_inbox":
        redirectUrl = `/enquiry-inbox?clid=${encryptId(
          activityObj?.owner?.id
        )}&pid=${encryptId(activityObj?.recipient?.id)}`;
        break;
      default:
        break;
    }
    this.markNotificationAsRead(activityObj, redirectUrl);
  };

  /**
   * @function markNotificationAsRead
   * @params "id", "activityObj", "userType"
   * @desc This function handles marking notifications as read
   */
  markNotificationAsRead = (activityObj, redirectUrl) => {
    if (!getPatientId()) return false;
    const { activityType } = this.state;
    markNotificationAsRead(getPatientId(), activityObj.id, activityType).then(
      (response) => {
        if (response && response.data && response.data.success) {
          // this.loadNotifications();
          this.fetchNotifications();
          if (redirectUrl) history.push(redirectUrl);
        }
        this.setState({ visibleMenu: false });
      }
    );
  };

  /**
   * @function getMoreArticles
   * @desc This function gets more Data
   */
  getMoreArticles = () => {
    const { pageNo, totalPages } = this.state;
    const nextPage = pageNo + 1;
    if (nextPage > totalPages) {
      this.setState({ hasMore: false });
      return false;
    } else {
      this.setState({ pageNo: nextPage }, () => {
        this.fetchNotifications();
      });
    }
  };

  render() {
    const { userPhoto } = this.context;
    const {
      showMobileLeftNav,
      activities,
      visibleMenu,
      unreadMsgCount,
      hasMore,
    } = this.state;

    const isMobile = this.state.windowWidth < 769;
    const menu = [
      <Menu className="top-user-menu" onClick={this.menuClick}>
        <Menu.Item key="2" className="blue-link">
          <span>{"Logout"}</span>
        </Menu.Item>
      </Menu>,
    ];

    const items = [
      {
        key: "1",
        label: (
          <div className="top-user-menu">
            <div className="notification-title-block">
              <div className="notification-title">
                {strings.notificationsText}
              </div>
              <a href="#" onClick={this.handleMarkAllNotificationsAsRead}>
                {strings.markAsRead}
              </a>
            </div>

            {/* notifications */}
            <div className="notification-wrapper">
              <ul id="scrollingBlock">
                <InfiniteScroll
                  dataLength={activities.length}
                  next={this.getMoreArticles}
                  hasMore={hasMore}
                  scrollableTarget="scrollingBlock"
                >
                  {activities &&
                    activities.length > 0 &&
                    activities.map((activityObj) => {
                      return (
                        <>
                          {(activityObj.key.includes(
                            "surgery_proposal.create"
                          ) ||
                            activityObj.key.includes("surgery_inbox")) && (
                            <li
                              onClick={() =>
                                this.handleNotificationClick(activityObj)
                              }
                            >
                              <div
                                className={`notification-block ${
                                  activityObj.actioned
                                    ? "visited-notification-block"
                                    : ""
                                }`}
                              >
                                <div className="notification-content">
                                  <div className="notification-time">
                                    {timesAgo(activityObj.created_at)}
                                  </div>

                                  {/* KEY == surgery_proposal.create */}
                                  {activityObj.key ===
                                    "surgery_proposal.create" && (
                                    <div>
                                      You have received a new surgery propasal
                                      for{" "}
                                      <span className="text-bold">
                                        {
                                          activityObj?.data?.surgery_case_file
                                            ?.name
                                        }
                                      </span>{" "}
                                      from
                                      <span className="text-bold">
                                        &nbsp;{activityObj?.owner?.name}
                                      </span>
                                    </div>
                                  )}
                                  {/* KEY == surgery_inbox */}
                                  {activityObj.key === "surgery_inbox" && (
                                    <div>
                                      Message from
                                      <span className="text-bold">
                                        &nbsp;{activityObj?.owner?.name}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </li>
                          )}
                        </>
                      );
                    })}

                  {activities && activities.length === 0 && (
                    <li>
                      <div className="empty-notification">
                        {strings.noNotification}
                      </div>
                    </li>
                  )}
                </InfiniteScroll>
              </ul>
            </div>
          </div>
        ),
      },
    ];

    return (
      <div className="verification-top-header">
        <Pusher
          channel={import.meta.env.VITE_APP_PUSHER_CHANNEL}
          event={`new_notification_${getUser() && getUser().id}`}
          onUpdate={this.fetchNotifications}
        />
        <img src={KulcareLogo} alt="" className="kc-logo" />
        <div className="header_right_options">
          {getUser() &&
            import.meta.env.VITE_APP_Pateint_Web_ENVIRONMENT !==
              "production" && (
              <div id="notification-bell">
                <Dropdown
                  menu={{ items }}
                  trigger={["click"]}
                  className="dropdown-spacing-top"
                  overlayClassName="notification-menu"
                  getPopupContainer={() =>
                    document.getElementById("notification-bell")
                  }
                  onOpenChange={this.handleVisibleChange}
                  open={visibleMenu}
                >
                  <a
                    className="ant-dropdown-link top-user-avatar bell_icon"
                    // href="javascript:;"
                  >
                    <VscBell size={19} color="#353949" />
                    {/* if length of notification is greater then 2 then, add "noti-square" class to it */}
                    {unreadMsgCount && unreadMsgCount != 0 ? (
                      <span>&nbsp;</span>
                    ) : (
                      ""
                    )}
                  </a>
                </Dropdown>
              </div>
            )}
          {getUser() && (
            <div className="user-block-top" id="avator">
              <span
                className="ant-dropdown-link top-user-avatar no-bg"
                // href="javascript:;"
              >
                {userPhoto ? (
                  <Avatar size="small" src={userPhoto} />
                ) : (
                  <Avatar size="small" src={UserAvator} />
                )}
              </span>
            </div>
          )}
          {getUser() && isMobile && (
            <div>
              <Button
                type="link"
                onClick={() => this.showLeftNavDrawer(true)}
                className="mobile-leftnav-btn pr-0 trny-5"
              >
                <GiHamburgerMenu size={18} color="#353949" className="trny-1" />
              </Button>

              <Drawer
                placement="right"
                closable
                onClose={() => this.showLeftNavDrawer(false)}
                open={showMobileLeftNav}
                className="drawer_control"
                getContainer={false}
              >
                <LeftNav
                  logout={this.props.logout}
                  showLeftNavDrawer={this.showLeftNavDrawer}
                />
              </Drawer>
            </div>
          )}
          {!getUser() && (
            <Row type="flex" align="middle" gutter={16}>
              <Col>
                <a
                  href={`${
                    import.meta.env.VITE_APP_Pateint_Web_AUTH_SITE_BASE_URL
                  }/sign-up?acc=patient`}
                  className="font-size-14 text-bold"
                >
                  Sign up
                </a>
              </Col>
              <Col>
                <Button
                  type="primary"
                  size="small"
                  onClick={this.handleAppDownload}
                >
                  {strings.downloadApp}
                </Button>
              </Col>
            </Row>
          )}
        </div>
      </div>
    );
  }
}

export default CompactTopNav;

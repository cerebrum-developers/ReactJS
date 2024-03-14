import React, { useEffect, useState } from "react";
// import {
//   DesktopOutlined,
//   FileOutlined,
//   PieChartOutlined,
//   TeamOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
// import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { set } from "lodash";
import { logoutAction } from "../../components/patientWeb/login/loginActions";
import { useDispatch } from "react-redux";
import { getUser, setInitialLanguage } from "../../helpers/pateintWeb";
import moment from "moment";
import momentTZ from "moment-timezone";
import { FaUserAlt } from "react-icons/fa";
import { MdHome, MdHistory } from "react-icons/md";
import {
  BsFillCalendarEventFill,
  BsFileEarmarkMedicalFill,
  BsFillFileEarmarkMedicalFill,
} from "react-icons/bs";
import { BiLogOutCircle } from "react-icons/bi";
import { RiLockPasswordFill } from "react-icons/ri";
import { AppHeaderLg } from "../../components/patientWeb/app/AppHeaderLg";
import "./pateintWebLayout.scss";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Profile", "1", <FaUserAlt size={14} />),
  getItem("Dashboard", "2", <MdHome size={20} />),
  getItem("Appointments", "3", <BsFillCalendarEventFill size={14} />),
  getItem("History", "4", <MdHistory size={20} />),
  getItem("Surgical Case files", "5", <BsFillFileEarmarkMedicalFill size={20} />),
  getItem("Change password", "6", <RiLockPasswordFill size={20} />),
  getItem("Logout", "7", <BiLogOutCircle size={20} />),
];

const PateintWebLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const [showWebUpgradePrompt, setShowWebUpgradePrompt] = useState(false);
  const [showLoggedInNav, setShowLoggedInNav] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [showFullWidth, setShowFullWidth] = useState(false);
  const [whiteBackground, setWhiteBackground] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  useEffect(() => {
    setInitialLanguage(); // Initialize languages

    const currentUser = getUser();
    setShowLoggedInNav(!!currentUser);

    // Detect user's timezone
    const currentTz = moment.tz.guess();
    const localCurrentTz = localStorage.getItem("current_timezone");
    if (currentTz !== localCurrentTz) {
      localStorage.setItem("current_timezone", currentTz);
    }
  }, []);

  const changeLanguage = (value) => {
    strings.setLanguage(value);
    localStorage.setItem("current_language", value);
  };

  const handleWebUpgradePrompt = () => {
    setShowWebUpgradePrompt(!showWebUpgradePrompt);
  };

  // useEffect(() => {
  //   const pathName = window.location.pathname;
  //   const pathStr = (pathName.match(new RegExp("/", "g")) || []).length;
  //   if (pathStr === 1) {
  //     setCurrentPage(pathName.replace("/", ""));
  //   }
  //   if (currentPage === "surgery") {
  //     setShowFullWidth(true);
  //   }

  // }, [currentPage]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const { pathname } = window.location;
    const path = pathname.split("/")[1];
    switch (path) {
      case "profile":
        setActiveKey("1");
        break;
      case "dashboard":
        setActiveKey("2");
        break;
      case "appointments":
        setActiveKey("3");
        break;
      case "history":
        setActiveKey("4");
        break;
      case "case-files":
        setActiveKey("5");
        break;
      case "change-password":
        setActiveKey("6");
        break;
      case "logout":
        setActiveKey("7");
        break;
      default:
        setActiveKey("2");
    }
  }, [window.location]);

  const handleMenuItemClick = (info) => {
    const { key } = info;
    setActiveKey(key);

    switch (key) {
      case "1":
        navigate("/profile");
        break;
      case "2":
        navigate("/dashboard");
        break;
      case "3":
        navigate("/appointments");
        break;
      case "4":
        navigate("/history");
        break;
      case "5":
        navigate("/case-files");
        break;
      case "6":
        navigate("/change-password");
        break;
      case "7":
        logoutAction(dispatch);
        break;
      default:
        navigate("/dashboard");
    }
  };

  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        <Layout style={{ flexDirection: "column" }}>
          <AppHeaderLg />

          <Layout style={{ width: "100%" }}>
            {windowWidth > 768 && (
              <Sider
                collapsible
                breakpoint="lg"
                collapsed={collapsed}
                width={240}
                onCollapse={(value) => setCollapsed(value)}
                className="mysider"
              >
                <div className="demo-logo-vertical" />
                <Menu
                  theme="dark"
                  defaultSelectedKeys={["1"]}
                  selectedKeys={activeKey}
                  mode="inline"
                  items={items}
                  onClick={handleMenuItemClick}
                />
              </Sider>
            )}

            <Content
              style={{
                // minWidth:"600px",
                width: "100%",
                maxWidth: "600px",
                margin: "0 auto",
                backgroundColor: "#fff",
              }}
            >
              {/* <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                <Outlet />
              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

export default PateintWebLayout;

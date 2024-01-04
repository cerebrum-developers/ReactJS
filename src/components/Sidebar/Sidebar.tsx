import { useState } from "react";
import { Navbar, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { menu } from "utils/icons";
import Submenu from 'components/Submenu/Submenu';
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "store/reducers";
import { setSideToggle } from "store/reducers/ToggleSideBar";
import { SideMenu } from "configure";

const Sidebar = () => {
    const { REACT_APP_ORGANISATION } = process.env;
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { toggle } = useSelector((state: RootState) => state.ToggleSideBar)
    // const [toggle, setToggle] = useState(false);
    const [submenu, setSubmenu] = useState(false)

    const menuToggle = () => {
        dispatch(setSideToggle(!toggle))
        setSubmenu(false)
    }
    const handleSubmenu = () => {
        setSubmenu(!submenu)
    }
    const location = useLocation();

    return (
        <>
            <aside className={toggle ? "aside-flexible sidebar-wrapper" : "sidebar-wrapper"}>
                <Navbar.Brand>
                    {SideMenu && Object.entries(SideMenu).map(([key, value]) => {
                        if (key == REACT_APP_ORGANISATION) {
                            return <img key={1} src={value?.logo} alt={`${REACT_APP_ORGANISATION} logo`} onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
                        }
                    })}
                    <span className="menu-icon" onClick={menuToggle}>{menu}</span>
                </Navbar.Brand>
                <Navbar>
                    <Nav className="nav flex-column" defaultActiveKey="/home">
                        {SideMenu && Object.entries(SideMenu).map(([key, value]) => {
                            if (key == REACT_APP_ORGANISATION) {
                                return value?.data?.map((item, index) => {
                                    return (
                                        <Nav.Item key={index}>
                                            <OverlayTrigger placement="right" overlay={toggle ? <Tooltip id="tooltip">{item.name}</Tooltip> : <></>}>
                                                <Nav.Link href="#" onClick={() => { navigate(`${item.link}`); }} className={`${item.link === location.pathname ? "activeLink" : ""}`}>
                                                    <span className="icon">
                                                        {item.icon}
                                                    </span>
                                                    <span>{item.name} </span>
                                                </Nav.Link>
                                            </OverlayTrigger>
                                        </Nav.Item>
                                    )
                                })
                            }
                        })}
                    </Nav>
                </Navbar>
                {submenu ?
                    <Submenu setSubmenu={handleSubmenu} />
                    : ""}
            </aside>
        </>
    )
}
export default Sidebar;



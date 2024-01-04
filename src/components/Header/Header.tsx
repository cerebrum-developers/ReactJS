import React, { useEffect } from "react";
import { Navbar, Nav, Container, ProgressBar, Dropdown } from "react-bootstrap";
import user from "assets/user.png";
import { questionIcon, settingICon, historyIcon } from "utils/icons";
import { useDispatch, useSelector } from "react-redux"
import { setInfo } from "store/reducers/userSlice";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDocumentSets } from "pages/Extract/ExtractDocumentSlice";
import { getTableSets } from "pages/ManageDocuments/getTableSetsSlice";
import { getImageSets } from "store/actions/getImageSets";
import { getPageSets } from "store/actions/getPageSets";
import { getTableCells } from "store/actions/saveTableCells";
import { getDocuments } from "store/actions/documents";
import { RootState } from "store/reducers";
import { reset } from "pages/Extract/ExtractDocumentSlice";
import { Link } from "react-router-dom";


import { useNavigate } from 'react-router-dom';
const Header = () => {

    const headerData = useSelector((state: RootState) => state)
    const { data } = useSelector((state: RootState) => state.documentSet)
    const dispatch = useDispatch();

    useEffect(() => {
        if (data.status == 401) {
            dispatch(setInfo())
            dispatch(reset())
        }
    }, [data])

    useEffect(() => {
        window.addEventListener('error', e => {
            if (e.message === 'ResizeObserver loop limit exceeded') {
                const resizeObserverErrDiv = document.getElementById(
                    'webpack-dev-server-client-overlay-div'
                );
                const resizeObserverErr = document.getElementById(
                    'webpack-dev-server-client-overlay'
                );
                if (resizeObserverErr) {
                    resizeObserverErr.setAttribute('style', 'display: none');
                }
                if (resizeObserverErrDiv) {
                    resizeObserverErrDiv.setAttribute('style', 'display: none');
                }
            }
        });
    }, []);

    useEffect(() => {

        dispatch(getDocumentSets())
        dispatch(getDocuments());
        dispatch(getTableSets())
        dispatch(getPageSets())
        dispatch(getImageSets())
        dispatch(getTableCells())
        // callSearchDataGetApi()
    }, [dispatch])

    const navigate = useNavigate();

    return (
        <>
            <Navbar expand="lg" className="top-nav">
                <Container fluid>
                    <ToastContainer style={{ zIndex: "9999999" }} />
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* <div className="prog">
                            <span>Processing Dataset</span> <ProgressBar now={60}/>
                        </div> */}
                        <Nav className="ms-auto">
                            {/* <Nav.Link >{settingICon} Setting</Nav.Link> */}
                            <Link to={'/Setting'} className="nav-link">{settingICon} Settings</Link>
                            <Nav.Link href="#">{historyIcon} History</Nav.Link>
                            <Nav.Link href="#">{questionIcon}</Nav.Link>
                            <Dropdown className="d-inline mx-2" align="end">
                                <Dropdown.Toggle id="dropdown-autoclose-true" className="drop-btn" variant="light">
                                    <span className="user-image">
                                        <img src={user} alt="user" />
                                    </span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {/* <Dropdown.Item  >Menu Item</Dropdown.Item>
                                        <Dropdown.Item >Menu Item</Dropdown.Item> */}
                                    <Dropdown.Item onClick={(e: any) => dispatch(setInfo())}>Logout</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { navigate('/ChangePassword') }}>Change Password</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header;
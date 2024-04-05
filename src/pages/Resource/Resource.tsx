import DashboardHeader from "../components/Header/DashboardHeader";
import SiteHero from "../components/SiteHero/SiteHero";
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoArrowRight } from "react-icons/go";
import Search from "../assets/img/searchArrowSmall.svg";
import { CiSearch } from "react-icons/ci";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../Redux/Hook";
import { getResourcesAsync } from "../Redux/slices/HomePageSlice";
import UserCard from "../components/User/UserCard";
interface Tab {
  title: string;
  content: React.ReactNode;
}

interface CustomTabsProps {
  tabs: Tab[];
  loading: boolean;
}

const CustomTabs: React.FC<CustomTabsProps> = ({ tabs, loading }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const dispatch: ThunkDispatch<any, void, any> = useDispatch();
  const changeTab = (index: number) => {
    setActiveTab(index);
    let type;
    switch (index) {
      case 0:
        type = "real_estate";
        break;
      case 1:
        type = "investers_realtors";
        break;
      case 2:
        type = "mortgage_broker";
        break;
      case 3:
        type = "home_inspectors";
        break;
      case 4:
        type = "property_managers";
        break;
      case 5:
        type = "general_contractors";
        break;
      case 6:
        type = "real_state_accountants";
        break;
      default:
        type = "";
        break;
    }

    dispatch(getResourcesAsync({ type }));
  };

  return (
    <>
      {loading && (
        <div className="custom-spinner-container">
          <Spinner />
        </div>
      )}

      <div className="custom-tabs my-5">
        <Row>
          <Col lg="3">
            <div className="tabs">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`tab d-flex justify-content-between align-items-center ${index === activeTab ? "active" : ""
                    }`}
                  onClick={() => changeTab(index)}
                >
                  {tab.title} <MdKeyboardArrowRight size="32" />
                </div>
              ))}
            </div>
            <div className="register mt-3">
              <div className="font-24 fw-light text-white">Want to register</div>
              <div className="font-40 fw-bold text-white mb-4">
                As a Resource?
              </div>
              <button className="font-16 bg-white signUpBtn d-flex align-items-center gap-2">
                Sign up Now <GoArrowRight size="22" />
              </button>
            </div>
          </Col>
          <Col lg="9" className="position-relative">
            {" "}
            <div className="tab-content">{tabs[activeTab].content}</div>
            <div className="searchBox mt-0 bg-transparent d-flex align-items-center justify-content-end gap-4 w-100">
              <div className="position-relative">
                <input
                  type="text"
                  placeholder="Resource / Services"
                />
                <div className="search position-absolute">
                  <CiSearch size="24" />
                </div>
                <div className="searchBtnGo position-absolute">
                  <img src={Search} alt="Go" />
                </div>
              </div>

              {/* <div className="d-flex align-items-center gap-2 ">
              <div className="nowrap font-20 fw-medium">Sort by</div>
              <Form.Select
                aria-label="Default select example"
                className="py-3 px-3 rounded-xl"
                style={{ width: "150px" }}
              >
                <option>Popularity</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div> */}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};
const Resource = () => {
  const dispatch: ThunkDispatch<any, void, any> = useDispatch();

  useEffect(() => {
    let payload = {
      type: "real_estate"
    };

    dispatch(getResourcesAsync(payload));

  }, []);
  const { loading, resourcesData } = useAppSelector((state: any) => state?.homePage);
  const tabs: Tab[] = [
    {
      title: "Real Estate ",
      content: (
        <div className="mt-4">
          <h2 className="blueDark font-32 fw-medium">Real Estate Lawyers </h2>
          <div className="userCardList mt-4">
            <Row>
              {resourcesData ? resourcesData?.map((ele: any, index: any) => {
                return (
                  <Col key={index} xl={4} lg={4} md={6} sm={6} xs={12}>
                    <UserCard
                      firstName={ele?.firstName}
                      lastName={ele?.lastName}
                      email={ele?.email}
                      phoneNumber={ele?.phoneNumber}
                      company={ele?.company}
                      experience={ele?.experience}
                      services={ele?.services}
                    />
                  </Col>
                );
              }) : "No data available"}
            </Row>
          </div>
        </div>
      ),
    },
    {
      title: "Investors Realtors",
      content: (
        <div className="mt-4">
          <h2 className="blueDark font-32 fw-medium">Investors Realtors </h2>
          <div className="userCardList mt-4">
            <Row>
              {resourcesData ? resourcesData?.map((ele: any, index: any) => {
                return (
                  <Col key={index} xl={4} lg={4} md={6} sm={6} xs={12}>
                    <UserCard
                      firstName={ele?.firstName}
                      lastName={ele?.lastName}
                      email={ele?.email}
                      phoneNumber={ele?.phoneNumber}
                      company={ele?.company}
                      experience={ele?.experience}
                      services={ele?.services}
                    />
                  </Col>
                );
              }) : "No data available"}
            </Row>
          </div>
        </div>
      ),
    },
    {
      title: "Mortgage Brokers",
      content: (<div className="mt-4">
        <h2 className="blueDark font-32 fw-medium">Mortgage Brokers </h2>
        <div className="userCardList mt-4">
          <Row>
            {resourcesData ? resourcesData?.map((ele: any, index: any) => {
              return (
                <Col key={index} xl={4} lg={4} md={6} sm={6} xs={12}>
                  <UserCard
                    firstName={ele?.firstName}
                    lastName={ele?.lastName}
                    email={ele?.email}
                    phoneNumber={ele?.phoneNumber}
                    company={ele?.company}
                    experience={ele?.experience}
                    services={ele?.services}
                  />
                </Col>
              );
            }) : "No data available"}
          </Row>
        </div>
      </div>),
    },
    {
      title: "Home Inspectors/Agents",
      content: (<div className="mt-4">
        <h2 className="blueDark font-32 fw-medium">Home Inspectors/Agents </h2>
        <div className="userCardList mt-4">
          <Row>
            {resourcesData ? resourcesData?.map((ele: any, index: any) => {
              return (
                <Col key={index} xl={4} lg={4} md={6} sm={6} xs={12}>
                  <UserCard
                    firstName={ele?.firstName}
                    lastName={ele?.lastName}
                    email={ele?.email}
                    phoneNumber={ele?.phoneNumber}
                    company={ele?.company}
                    experience={ele?.experience}
                    services={ele?.services}
                  />
                </Col>
              );
            }) : "No data available"}
          </Row>
        </div>
      </div>),
    },
    {
      title: "Property Managers",
      content: (<div className="mt-4">
        <h2 className="blueDark font-32 fw-medium">Property Managers </h2>
        <div className="userCardList mt-4">
          <Row>
            {resourcesData ? resourcesData?.map((ele: any, index: any) => {
              return (
                <Col key={index} xl={4} lg={4} md={6} sm={6} xs={12}>
                  <UserCard
                    firstName={ele?.firstName}
                    lastName={ele?.lastName}
                    email={ele?.email}
                    phoneNumber={ele?.phoneNumber}
                    company={ele?.company}
                    experience={ele?.experience}
                    services={ele?.services}
                  />
                </Col>
              );
            }) : "No data available"}
          </Row>
        </div>
      </div>),
    },
    {
      title: "General Contractors",
      content: (<div className="mt-4">
        <h2 className="blueDark font-32 fw-medium">General Contractors </h2>
        <div className="userCardList mt-4">
          <Row>
            {resourcesData ? resourcesData?.map((ele: any, index: any) => {
              return (
                <Col key={index} xl={4} lg={4} md={6} sm={6} xs={12}>
                  <UserCard
                    firstName={ele?.firstName}
                    lastName={ele?.lastName}
                    email={ele?.email}
                    phoneNumber={ele?.phoneNumber}
                    company={ele?.company}
                    experience={ele?.experience}
                    services={ele?.services}
                  />
                </Col>
              );
            }) : "No data available"}
          </Row>
        </div>
      </div>),
    },
    {
      title: "Real Estate Accountants",
      content: (<div className="mt-4">
        <h2 className="blueDark font-32 fw-medium">Real Estate Accountants </h2>
        <div className="userCardList mt-4">
          <Row>
            {resourcesData ? resourcesData?.map((ele: any, index: any) => {
              return (
                <Col key={index} xl={4} lg={4} md={6} sm={6} xs={12}>
                  <UserCard
                    firstName={ele?.firstName}
                    lastName={ele?.lastName}
                    email={ele?.email}
                    phoneNumber={ele?.phoneNumber}
                    company={ele?.company}
                    experience={ele?.experience}
                    services={ele?.services}
                  />
                </Col>
              );
            }) : "No data available"}
          </Row>
        </div>
      </div>),
    },
  ];
  return (
    <div className="resource">
      <DashboardHeader />
      <SiteHero pageName="Resources" />
      <div className="siteSpace">
        <CustomTabs tabs={tabs} loading={loading} />
      </div>
      <Footer />
    </div>
  );
};

export default Resource;
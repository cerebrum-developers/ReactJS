import { ThunkDispatch } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "react";
import { Breadcrumb, Nav, Tab } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { BsInfoCircle } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../Redux/Hook";
import { propertyByIdAsync } from "../Redux/slices/userSlice";
import { default as pBath, default as pBed, default as pHome, default as pKi, default as pbu } from "../assets/img/pHome.png";
import Footer from "../components/Footer/Footer";
import DashboardHeader from "../components/Header/DashboardHeader";
import PropertyDetailCard from "../components/Property/PropertyDetailCard";
import Spinner from "../components/Spinner/Spinner";
import { reviewTabs, evaluateTabs, inspectTabs, closeTabs } from "../helpers/propertyDetail";
import RentEstimator from "./PropertyDetail/RentEstimator";
interface Tab {
  id: number;
  title: string;
  content: React.ReactNode;
}
interface PropertiesProps {
  propertyData: any; // Adjust the type as per your actual data structure
}
const CustomTabs: React.FC<PropertiesProps> = (propertyData) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const [activeReviewTabs, setActiveReviewTabs] = useState<string>("tab1");
  const [activeEvaluationTabs, setActiveEvaluationTabs] = useState<string>("tab1");
  const [activeInspectTabs, setActiveInspectTabs] = useState<string>("tab1");
  const [activeCloseTabs, setActiveCloseTabs] = useState<string>("tab1");

  const [imagePreview, setImagePreview] = useState([]);
  const [imagePreviewScreen, setImagePreviewScreen] = useState<any[]>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTabChange = (tabKey: string, tabType: string) => {
    switch (tabType) {
      case 'review':
        setActiveReviewTabs(tabKey);
        break;
      case 'evaluation':
        setActiveEvaluationTabs(tabKey);
        break;
      case 'inspect':
        setActiveInspectTabs(tabKey);
        break;
      case 'close':
        setActiveCloseTabs(tabKey);
        break;
      default:
        break;
    }
  };

  const [loadingImages, setLoadingImages] = useState(true);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    propertyData.propertyData?.data?.propertyDetails?.responsivePhotos?.forEach(
      (ele: any) => {
        let test: any = imagePreview;
        test.push(ele?.mixedSources[0]);

        setImagePreview(test);
      }
    );
  }, [propertyData]);

  useEffect(() => {
    propertyData.propertyData?.data?.propertyDetails?.responsivePhotos?.forEach(
      (ele: any) => {
        let test: any = imagePreviewScreen;
        test.push(ele?.mixedSources[5]);

        setImagePreviewScreen(test);
      }
    );
  }, [propertyData]);

  const handleImageLoad = useCallback(() => {
    setLoadingImages(false); // Set loading state to false
    setLoadingImage(false); // Set loading state to false when image in Tab 1 finishes loading
  }, []);

  useEffect(() => {
    // Simulate image loading completion after 3 seconds (replace this with your actual image loading logic)
    const timeoutId = setTimeout(() => {
      setLoadingImages(false);
    }, 500);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timeoutId);
  }, []);

  const openImageViewer = useCallback((index: any) => {
    setLoadingImage(true); // Set loading state to true

    // Simulate loading for 15 seconds
    setTimeout(() => {
      setLoadingImage(false); // Set loading state to false after 15 seconds
      if (index < 4) {
        setCurrentIndex(index);
      }
      if (index === 4) {
        setCurrentImage(index);
        setIsViewerOpen(true);
      }
    }, 500);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const tabs: Tab[] = [
    {
      id: 0,
      title: "Review",
      content: (
        <div>
          <PropertyDetailCard
            propertyData={propertyData}
            imagePreviewScreen={imagePreviewScreen}
            currentIndex={currentIndex}
            loadingImage={loadingImage}
            loadingImages={loadingImages}
            handleImageLoad={handleImageLoad}
            openImageViewer={openImageViewer}
            closeImageViewer={closeImageViewer}
            isViewerOpen={isViewerOpen}
            currentImage={currentImage}
            imagePreview={imagePreview}
          />
          <div className="my-5 w-75">
            <Nav variant="tabs" defaultActiveKey="tab1">
              {reviewTabs.map((tab: any) => (
                <Nav.Item key={tab.key}>
                  <Nav.Link
                    className="text-center position-relative pb-3"
                    eventKey={tab.key}
                    active={activeTab === tab.key}
                    onClick={() => handleTabChange(tab.key, 'review')}
                  >
                    <div className="mb-2">
                      <img src={tab.icon} alt="icon" />
                    </div>
                    {tab.title}
                    <div className="dotss position-absolute"></div>
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
            <Tab.Content className="mt-4">
              <Tab.Pane eventKey="tab1" active={activeReviewTabs === "tab1"}>
                <div className="p-4 tabOneContent">
                  <div className="font-24 fw-bold blueDark mb-3">
                    Property Details
                  </div>
                  <div className="types mb-3">
                    <div className="item">
                      <img src={pHome} alt="icon" className="mb-2" />
                      <div className="title">Property Type</div>
                      <div className="subTitle">
                        {propertyData?.propertyData?.data?.property_type ??
                          "Furnished"}
                      </div>
                    </div>
                    <div className="item">
                      <img src={pBed} alt="icon" className="mb-2" />
                      <div className="title">Bedrooms</div>
                      <div className="subTitle">
                        0{propertyData?.propertyData?.data?.bathrooms ?? 2}
                      </div>
                    </div>
                    <div className="item">
                      <img src={pBath} alt="icon" className="mb-2" />
                      <div className="title">Bathrooms</div>
                      <div className="subTitle">
                        0{propertyData?.propertyData?.data?.bathrooms ?? 2}
                      </div>
                    </div>
                    <div className="item">
                      <img src={pKi} alt="icon" className="mb-2" />
                      <div className="title">Kitchen & Dining</div>
                      <div className="subTitle">NA</div>
                    </div>
                    <div className="item">
                      <img src={pbu} alt="icon" className="mb-2" />
                      <div className="title">Lot Area</div>
                      <div className="subTitle">
                        {
                          propertyData?.propertyData?.data?.propertyDetails
                            ?.lotAreaValue
                        }{" "}
                        {propertyData?.propertyData?.data?.propertyDetails
                          ?.lotAreaValue
                          ? propertyData?.propertyData?.data?.propertyDetails
                            ?.lotAreaUnits
                          : "NA"}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          Parking Availability
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="content d-flex gap-5">
                            <div className="d-flex gap-1 item">
                              <span className="font-18">Garage Spaces:</span>
                              <span className="font-18 fw-bold">02</span>
                            </div>
                            <div className="d-flex gap-1 item">
                              <span className="font-18">Parking Features:</span>
                              <div>
                                <span className="font-18 fw-bold">
                                  {propertyData?.propertyData?.data
                                    ?.parking_type ?? "attached garage"}
                                </span>
                              </div>
                            </div>
                            <div className="d-flex gap-1 item">
                              <span className="font-18">Garage Sqft:</span>
                              <span className="font-18 fw-bold">476</span>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>
                          Exterior and Lot Info
                        </Accordion.Header>
                        <Accordion.Body>
                          <p>
                            Latitude:
                            {
                              propertyData?.propertyData?.data?.propertyDetails
                                ?.latitude
                            }
                          </p>
                          <p>
                            Longitude:
                            {
                              propertyData?.propertyData?.data?.propertyDetails
                                ?.longitude
                            }
                          </p>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>Land Info</Accordion.Header>
                        <Accordion.Body>NA</Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="3">
                        <Accordion.Header>
                          Building Construction
                        </Accordion.Header>
                        <Accordion.Body>NA</Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="4">
                        <Accordion.Header>Utilities</Accordion.Header>
                        <Accordion.Body>NA</Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
                <div className="map mt-5">
                  <div className="font-32">View on Map</div>
                  <div className="mapItem mt-3">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6860.550749132046!2d76.70896300000001!3d30.710658000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fef997f7a7ef5%3A0x21b1fed9449bd39f!2sChennai%20Maratha%20-%20Best%20South%20Indian%20Restaurant!5e0!3m2!1sen!2sin!4v1710842880353!5m2!1sen!2sin"
                      height="450"
                      width="100%"
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="tab2" active={activeReviewTabs === "tab2"}>
                <h1>Content of Tab 2</h1>
              </Tab.Pane>
              <Tab.Pane eventKey="tab3" active={activeReviewTabs === "tab3"}>
                <h1>Content of Tab 3</h1>
              </Tab.Pane>
              <Tab.Pane eventKey="tab4" active={activeReviewTabs === "tab4"}>
                <div className="tabFourContent">
                  <div className="font-24 fw-bold blueDark mb-4">
                    Connect with our Realtors
                  </div>
                  <p className="mb-4 font-18">
                    We have a group of realtors associated with us to provide
                    you best guidance toward your research, add your query in
                    the query box below and our system will share it with the
                    realtors that are top three match with your profile and
                    property.
                  </p>
                  <textarea
                    className="w-100"
                    placeholder="Add your query here..."
                    rows={5}
                  ></textarea>
                  <div className="text-end mt-3">
                    <button className="sq">Submit Query</button>
                  </div>
                </div>
                <div className="realtors my-5">
                  <div className="blueDark font-24 fw-bold mb-4">
                    Realtors available with us
                  </div>
                  <div className="userCards d-flex gap-3">
                    <div className="item flex-grow-1">
                      <div className="text-center mb-4">
                        <img
                          src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="userImage"
                          className="userImage"
                        />
                      </div>
                      <div className="d-flex">
                        <div className="name font-18 fw-medium blueDark flex-grow-1 pe-3 border-end">
                          Fred Smith
                        </div>
                        <div className="exp font-18 fw-light flex-grow-1 ps-3">
                          12 years Exp.
                        </div>
                      </div>
                      <div className="text-center mt-4">
                        <button className="connect">Connect</button>
                      </div>
                    </div>
                    <div className="item flex-grow-1">
                      <div className="text-center mb-4">
                        <img
                          src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="userImage"
                          className="userImage"
                        />
                      </div>
                      <div className="d-flex">
                        <div className="name font-18 fw-medium blueDark flex-grow-1 pe-3 border-end">
                          Fred Smith
                        </div>
                        <div className="exp font-18 fw-light flex-grow-1 ps-3">
                          12 years Exp.
                        </div>
                      </div>
                      <div className="text-center mt-4">
                        <button className="connect">Connect</button>
                      </div>
                    </div>
                    <div className="item flex-grow-1">
                      <div className="text-center mb-4">
                        <img
                          src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="userImage"
                          className="userImage"
                        />
                      </div>
                      <div className="d-flex">
                        <div className="name font-18 fw-medium blueDark flex-grow-1 pe-3 border-end">
                          Fred Smith
                        </div>
                        <div className="exp font-18 fw-light flex-grow-1 ps-3">
                          12 years Exp.
                        </div>
                      </div>
                      <div className="text-center mt-4">
                        <button className="connect">Connect</button>
                      </div>
                    </div>
                    <div className="item flex-grow-1">
                      <div className="text-center mb-4">
                        <img
                          src="https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt="userImage"
                          className="userImage"
                        />
                      </div>
                      <div className="d-flex">
                        <div className="name font-18 fw-medium blueDark flex-grow-1 pe-3 border-end">
                          Fred Smith
                        </div>
                        <div className="exp font-18 fw-light flex-grow-1 ps-3">
                          12 years Exp.
                        </div>
                      </div>
                      <div className="text-center mt-4">
                        <button className="connect">Connect</button>
                      </div>
                    </div>
                  </div>
                  <div className="infos d-flex align-items-center gap-2 mt-3 font-18">
                    <BsInfoCircle size={20} />
                    You can check more realtors in our{" "}
                    <Link to="">resources</Link> section.
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      ),
    },
    {
      id: 1, title: "Evaluate", content: (<div>
        <PropertyDetailCard
          propertyData={propertyData}
          imagePreviewScreen={imagePreviewScreen}
          currentIndex={currentIndex}
          loadingImage={loadingImage}
          loadingImages={loadingImages}
          handleImageLoad={handleImageLoad}
          openImageViewer={openImageViewer}
          closeImageViewer={closeImageViewer}
          isViewerOpen={isViewerOpen}
          currentImage={currentImage}
          imagePreview={imagePreview}
        />
        <div className="my-5 w-75">
          <Nav variant="tabs" defaultActiveKey="tab1">
            {evaluateTabs.map((tab: any) => (
              <Nav.Item key={tab.key}>
                <Nav.Link
                  className="text-center position-relative pb-3"
                  eventKey={tab.key}
                  active={activeTab === tab.key}
                  onClick={() => handleTabChange(tab.key, 'evaluation')}
                >
                  <div className="mb-2">
                    <img src={tab.icon} alt="icon" />
                  </div>
                  {tab.title}
                  <div className="dotss position-absolute"></div>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <Tab.Content className="mt-4">
            <Tab.Pane eventKey="tab1" active={activeEvaluationTabs === "tab1"}>
              <h1>Content of Tab 1</h1>
            </Tab.Pane>
            <Tab.Pane eventKey="tab2" active={activeEvaluationTabs === "tab2"}>
              <h1>Content of Tab 2</h1>
            </Tab.Pane>
            <Tab.Pane eventKey="tab3" active={activeEvaluationTabs === "tab3"}>

              <RentEstimator propertyData={propertyData} />
            </Tab.Pane>
            <Tab.Pane eventKey="tab4" active={activeEvaluationTabs === "tab4"}>
              <Tab.Pane eventKey="tab4" active={activeEvaluationTabs === "tab4"}>
                <h1>Content of Tab 4</h1>
              </Tab.Pane>
            </Tab.Pane>
          </Tab.Content>
        </div>
      </div>
      )
    },
    {
      id: 2, title: "Inspect", content: (<div>
        <PropertyDetailCard
          propertyData={propertyData}
          imagePreviewScreen={imagePreviewScreen}
          currentIndex={currentIndex}
          loadingImage={loadingImage}
          loadingImages={loadingImages}
          handleImageLoad={handleImageLoad}
          openImageViewer={openImageViewer}
          closeImageViewer={closeImageViewer}
          isViewerOpen={isViewerOpen}
          currentImage={currentImage}
          imagePreview={imagePreview}
        />
        <div className="my-5 w-75">
          <Nav variant="tabs" defaultActiveKey="tab1">
            {inspectTabs.map((tab: any) => (
              <Nav.Item key={tab.key}>
                <Nav.Link
                  className="text-center position-relative pb-3"
                  eventKey={tab.key}
                  active={activeTab === tab.key}
                  onClick={() => handleTabChange(tab.key, 'inspect')}
                >
                  <div className="mb-2">
                    <img src={tab.icon} alt="icon" />
                  </div>
                  {tab.title}
                  <div className="dotss position-absolute"></div>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <Tab.Content className="mt-4">
            <Tab.Pane eventKey="tab1" active={activeInspectTabs === "tab1"}>
              <h1>Content of Tab 1</h1>
            </Tab.Pane>
            <Tab.Pane eventKey="tab2" active={activeInspectTabs === "tab2"}>
              <h1>Content of Tab 2</h1>
            </Tab.Pane>
            <Tab.Pane eventKey="tab3" active={activeInspectTabs === "tab3"}>
              <h1>Content of Tab 3</h1>
            </Tab.Pane>
          </Tab.Content>
        </div>
      </div>
      )
    },
    {
      id: 3, title: "Close", content: (<div>
        <PropertyDetailCard
          propertyData={propertyData}
          imagePreviewScreen={imagePreviewScreen}
          currentIndex={currentIndex}
          loadingImage={loadingImage}
          loadingImages={loadingImages}
          handleImageLoad={handleImageLoad}
          openImageViewer={openImageViewer}
          closeImageViewer={closeImageViewer}
          isViewerOpen={isViewerOpen}
          currentImage={currentImage}
          imagePreview={imagePreview}
        />
        <div className="my-5 w-75">
          <Nav variant="tabs" defaultActiveKey="tab1">
            {closeTabs.map((tab: any) => (
              <Nav.Item key={tab.key}>
                <Nav.Link
                  className="text-center position-relative pb-3"
                  eventKey={tab.key}
                  active={activeTab === tab.key}
                  onClick={() => handleTabChange(tab.key, 'close')}
                >
                  <div className="mb-2">
                    <img src={tab.icon} alt="icon" />
                  </div>
                  {tab.title}
                  <div className="dotss position-absolute"></div>
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          <Tab.Content className="mt-4">
            <Tab.Pane eventKey="tab1" active={activeCloseTabs === "tab1"}>
              <h1>Content of Tab 1</h1>
            </Tab.Pane>
            <Tab.Pane eventKey="tab2" active={activeCloseTabs === "tab2"}>
              <h1>Content of Tab 2</h1>
            </Tab.Pane>
            <Tab.Pane eventKey="tab3" active={activeCloseTabs === "tab3"}>
              <h1>Content of Tab 3</h1>
            </Tab.Pane>
          </Tab.Content>
        </div>
      </div>
      )
    },
  ];

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      {loadingImages && <Spinner />}

      <div className="tabs d-flex align-items-center mb-3">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.title}
          </div>
        ))}
      </div>
      <div className="tab-content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-pane ${activeTab === tab.id ? "active" : ""}`}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

const PropertyDetails = () => {
  const dispatch: ThunkDispatch<any, void, any> = useDispatch();

  const { id } = useParams();
  // const navigate = useNavigate();
  const { loading, propertyByID } = useAppSelector((state: any) => state?.user);

  useEffect(() => {
    dispatch(propertyByIdAsync(id));
  }, [dispatch]);

  return (
    <>
      {loading && (
        <div className="custom-spinner-container">
          <Spinner />
        </div>
      )}
      <div className="propertyDetails">
        <DashboardHeader />
        <div className="searchArea"></div>
        <div className="d-flex siteSpace align-items-center justify-content-between my-4">
          <div className="back   d-flex align-items-center gap-3">
            <Link
              to="/searchproperty"
              className="font-18 d-flex align-items-center gap-2 text-muted"
            >
              <FaArrowLeft color="#2495FF" />
              Back to Listing
            </Link>
            <Breadcrumb>
              <Breadcrumb.Item href="#">For Sale</Breadcrumb.Item>
              <Breadcrumb.Item href="#">GA</Breadcrumb.Item>
              <Breadcrumb.Item href="#">Atlanta</Breadcrumb.Item>
              <Breadcrumb.Item href="#">30324</Breadcrumb.Item>
              <Breadcrumb.Item href="#">1247 Mayfair Dr</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <Link
              to="/"
              className="font-18 d-flex align-items-center gap-2 text-muted"
            >
              View All
              <FaArrowRight color="#2495FF" />
            </Link>
          </div>
        </div>

        <div className="siteSpace">
          <CustomTabs propertyData={propertyByID} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default PropertyDetails;
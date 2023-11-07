import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Parent from "./Parent";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./pages/landing/Landing";
import Login from "./pages/login/Login";
import Register from "./pages/login/Register";
import ViewProfile from "./pages/profile/Profile";
import Forgot from "./pages/login/Forget";
import Email from "./pages/login/Email";
import styles from "./App.module.scss";
import "./main.scss";
import Library from "./pages/summary/Library";
import Summary from "./pages/summary/Summary";
import DashboardUpload from "./pages/dashboard/DashboardUpload";
import Pastelink from "./components/Pastelink";
import Pastetext from "./components/Pastetext";

function App() {
  return (
    <div className={styles.container1}>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Parent component={Landing} />} />
        <Route path="/login" element={<Parent component={Login} />} />
        <Route path="/register" element={<Parent component={Register} />} />
        <Route path="/profile" element={<Parent component={ViewProfile} />} />
        <Route path="/forgot" element={<Parent component={Forgot} />} />
        <Route path="/library" element={<Parent component={Library} />} />
        <Route path="/email" element={<Parent component={Email} />} />
        <Route path="/summary" element={<Parent component={Summary} />} />
        <Route
          path="/dashboardupload"
          element={<Parent component={DashboardUpload} />}
        />
        <Route path="/pastelink" element={<Parent component={Pastelink} />} />
        <Route path="/pastetext" element={<Parent component={Pastetext} />} />
      </Routes>
    </div>
  );
}

export default App;

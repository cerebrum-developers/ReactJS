import { useNavigate } from "react-router-dom";
import { smile } from "src/assets/icon";
import styles from "../pages/dashboard/dashboard.module.scss";

export default function Landing2() {
  const navigate = useNavigate();

  const handleButton = () => {
    const result = document.getElementsByTagName("p");
    for (let i = 0; i < result.length; i += 1) {
      console.log(result[i].innerHTML, "getdata");
    }
    navigate("/summary");
  };
  return (
    <div className={styles.landing2}>
      <div className={styles.smile}>{smile}</div>
      <div className={styles.signupBtnHugging}>
        <button type="button" onClick={handleButton}>
          Run Summary
        </button>
      </div>
      <div className={styles.Library}>
        <button type="button">Save to Library</button>
      </div>
    </div>
  );
}

import { Loreum } from "./Card";
import { Buttons, vectorIcon, downloadIcon } from "../../assets/icon";
import ButtonShow from "../../components/Button";
import styles from "./summary.module.scss";

const Summary = () => (
  <div className={styles.landing4bghugging}>
    <div className={styles.SummaryHead}>
      <div className={styles.hGoesHere}>The Heading Goes Here</div>
      <div className={styles.SummaryButtons}>
        <ButtonShow
          styleClass={styles.playbtn}
          name={Buttons}
          style={null}
          type="button"
          action={() => {}}
        />
        <ButtonShow
          styleClass={styles.vectorIcon}
          name={vectorIcon}
          style={null}
          type="button"
          action={() => {}}
        />
        <ButtonShow
          styleClass={styles.vectorIcon}
          name={downloadIcon}
          style={null}
          type="button"
          action={() => {}}
        />
      </div>
    </div>
    <Loreum />
  </div>
);

export default Summary;

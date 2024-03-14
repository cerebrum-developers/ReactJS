import React from "react";
import {
  formatedTimeBefore,
  getCallDuration,
  handleShowJoinBtn,
  strings
} from "../../helpers/pateintWeb";
// import { Icon } from "antd";
// import PrescriptionThumbnail from "../components/PatientVideoCallAppointment/PresciptionThumbnail";
import PrescriptionThumbnail from "../../components/patientWeb/PatientVideoCallAppointment/PresciptionThumbnail";
/**
 * @function generateStepHeading
 * @params appointment,step
 * @desc This function generates card heading
 */

export const generateStepHeading = (appointment, step) => {
  let heading = "";
  // step 1
  if (step === 1) {
    if (
      (appointment.payment_option === "BEFORE" ||
        appointment.payment_option === "AFTER") &&
      !appointment.payment_complete &&
      appointment.doctor_details.telemedicine_fees != 0
    ) {
      heading = "Complete Payment";
    } else if (appointment.payment_option === "NO") {
      heading = "Payment Complete";
    } else if (
      (appointment.payment_option === "BEFORE" ||
        appointment.payment_option === "AFTER") &&
      appointment.payment_complete
    ) {
      heading = "Payment Complete";
    } else if (appointment.doctor_details.telemedicine_fees == 0) {
      heading = "Payment Complete";
    }
  }
  // step 2
  else if (step === 2) {
    if (appointment.session_details.session_status === "COMPLETE") {
      heading = "Consultation Complete";
    } else {
      heading = "Join Waiting Room";
    }
  }
  // step 3
  else if (step === 3) {
    if (appointment.telemedicine_prescription || appointment.careplan) {
      heading = "Prescription Ready";
    } else {
      heading = "View Prescription";
    }
  }
  return heading;
};

/**
 * @function generateStepText
 * @params appointment,step
 * @desc This function generates card text
 */

export const generateStepText = (appointment, step) => {
  const isCovidClinic =
    appointment.clinic_details.covid_clinic ||
    appointment.clinic_details.private_clinic;
  let text = "";
  // step 1
  if (step === 1) {
    if (
      (appointment.payment_option === "BEFORE" ||
        appointment.payment_option === "AFTER") &&
      !appointment.payment_complete &&
      appointment.doctor_details.telemedicine_fees != 0
    ) {
      text = `by ${formatedTimeBefore(
        appointment.appointment_time,
        15,
        "minutes"
      )}`;
    } else if (
      appointment.payment_complete &&
      (appointment.appointment_status === "CHECKED_OUT" ||
        appointment.appointment_status === "REMOVED") &&
      appointment.session_details.session_status !== "COMPLETE" &&
      appointment.doctor_details.telemedicine_fees != 0
    ) {
      text = `paid ₹${appointment.doctor_details.telemedicine_fees} - You will receive a refund`;
    } else if (appointment.payment_complete) {
      text = `paid ₹${appointment.doctor_details.telemedicine_fees}`;
    } else if (
      appointment.payment_option === "NO" ||
      appointment.doctor_details.telemedicine_fees == 0
    ) {
      text = "Not required";
    }
  }
  // step 2
  else if (step === 2) {
    if (
      appointment.session_details.session_status === "COMPLETE" &&
      appointment.session_details.patient_joined &&
      appointment.session_details.doctor_joined
    ) {
      text = `${strings.callDuration}:
      ${getCallDuration(
        appointment.session_details.started_at,
        appointment.session_details.completed_at
      )}`;
    } else if (
      handleShowJoinBtn(appointment, isCovidClinic) &&
      appointment.appointment_status !== "CHECKED_OUT" &&
      appointment.appointment_status !== "REMOVED" &&
      appointment.session_details &&
      appointment.session_details.session_status !== "COMPLETE"
    ) {
      text = "open now";
    } else {
      text = `opens at ${formatedTimeBefore(
        appointment.appointment_time,
        10,
        "minutes"
      )}`;
    }
  }
  // step 3
  else if (step === 3) {
    // BEFORE
    if (appointment.payment_option === "BEFORE") {
      // payment not completed
      if (
        !appointment.payment_complete &&
        appointment.doctor_details.telemedicine_fees !== 0
      ) {
        text = "available after consultation";
      }
      // payment completed but consultation is not
      else if (
        (appointment.payment_complete ||
          appointment.doctor_details.telemedicine_fees == 0) &&
        appointment.session_details.session_status !== "COMPLETE"
      ) {
        text = "available after consultation";
      } else if (
        (appointment.payment_complete ||
          appointment.doctor_details.telemedicine_fees == 0) &&
        appointment.session_details.session_status == "COMPLETE" &&
        !appointment.telemedicine_prescription &&
        !appointment.careplan
      ) {
        text = "available when doctor uploads";
      } else if (
        (appointment.payment_complete ||
          appointment.doctor_details.telemedicine_fees == 0) &&
        appointment.session_details.session_status == "COMPLETE" &&
        (appointment.telemedicine_prescription || appointment.careplan)
      ) {
        text = "tap to download";
      } else {
        text = "available when doctor uploads";
      }
    }

    // AFTER
    else if (appointment.payment_option === "AFTER") {
      // payment not completed
      if (
        !appointment.payment_complete &&
        appointment.doctor_details.telemedicine_fees !== 0
      ) {
        text = "after consultation & payment";
      }
      // payment completed but consultation is not
      else if (
        appointment.payment_complete &&
        appointment.session_details.session_status !== "COMPLETE"
      ) {
        text = "after consultation & payment";
      } else if (
        (appointment.payment_complete ||
          appointment.doctor_details.telemedicine_fees == 0) &&
        appointment.session_details.session_status === "COMPLETE" &&
        !appointment.telemedicine_prescription &&
        !appointment.careplan
      ) {
        text = "available when doctor uploads";
      } else if (
        (appointment.payment_complete ||
          appointment.doctor_details.telemedicine_fees == 0) &&
        appointment.session_details.session_status === "COMPLETE" &&
        (appointment.telemedicine_prescription || appointment.careplan)
      ) {
        text = "tap to download";
      } else {
        text = "available when doctor uploads";
      }
    }
    // NO
    else {
      if (appointment.session_details.session_status !== "COMPLETE") {
        text = "available after consultation";
      } else if (
        appointment.session_details.session_status == "COMPLETE" &&
        !appointment.telemedicine_prescription &&
        !appointment.careplan
      ) {
        text = "available when doctor uploads";
      } else if (
        appointment.session_details.session_status === "COMPLETE" &&
        (appointment.telemedicine_prescription || appointment.careplan)
      ) {
        text = "tap to download";
      } else {
        text = "available when doctor uploads";
      }
    }
  }
  return text;
};

export const cardStatus = (appointment, step) => {
  let status = "";

  if (step === 1) {
    // BEFORE
    if (appointment.payment_option === "BEFORE") {
      if (
        !appointment.payment_complete &&
        appointment.appointment_status !== "REMOVED" &&
        appointment.appointment_status !== "CHECKED_OUT" &&
        appointment.doctor_details.telemedicine_fees != 0
      ) {
        status = "active";
      } else if (
        (appointment.payment_complete &&
          appointment.appointment_status !== "REMOVED" &&
          appointment.appointment_status !== "CHECKED_OUT") ||
        (appointment.session_details.session_status === "COMPLETE" &&
          appointment.payment_complete)
      ) {
        status = "complete";
      } else if (appointment.doctor_details.telemedicine_fees == 0) {
        status = "complete";
      } else {
        status = "inactive";
      }
    }
    // AFTER
    else if (appointment.payment_option === "AFTER") {
      if (!appointment.payment_complete) {
        status = "active";
      } else if (
        (appointment.payment_complete &&
          appointment.appointment_status !== "REMOVED" &&
          appointment.appointment_status !== "CHECKED_OUT") ||
        (appointment.session_details.session_status === "COMPLETE" &&
          appointment.payment_complete)
      ) {
        status = "complete";
      } else if (appointment.doctor_details.telemedicine_fees == 0) {
        status = "complete";
      } else {
        status = "inactive";
      }
    }
    //NO
    else if (appointment.payment_option === "NO") {
      if (appointment.session_details.session_status !== "REMOVED") {
        status = "complete";
      } else {
        status = "inactive";
      }
    }
  } else if (step === 2) {
    // BEFORE
    if (appointment.payment_option === "BEFORE") {
      if (
        appointment.appointment_status !== "REMOVED" &&
        appointment.appointment_status !== "CHECKED_OUT" &&
        appointment.doctor_details.telemedicine_fees == 0
      ) {
        status = "active";
      } else if (appointment.session_details.session_status === "COMPLETE") {
        status = "complete";
      } else if (
        (appointment.session_details.session_status !== "COMPLETE" &&
          !appointment.payment_complete) ||
        (appointment.payment_complete &&
          (appointment.appointment_status === "REMOVED" ||
            appointment.appointment_status === "CHECKED_OUT"))
      ) {
        status = "inactive";
      } else if (
        appointment.payment_complete &&
        appointment.appointment_status !== "REMOVED" &&
        appointment.appointment_status !== "CHECKED_OUT"
      ) {
        status = "active";
      }
    }
    //AFTER
    else if (appointment.payment_option === "AFTER") {
      if (
        appointment.appointment_status !== "REMOVED" &&
        appointment.appointment_status !== "CHECKED_OUT" &&
        appointment.doctor_details.telemedicine_fees == 0
      ) {
        status = "active";
      } else if (appointment.session_details.session_status === "COMPLETE") {
        status = "complete";
      } else if (
        appointment.session_details.session_status !== "COMPLETE" &&
        appointment.appointment_status !== "REMOVED" &&
        appointment.appointment_status !== "CHECKED_OUT"
      ) {
        status = "active";
      } else {
        status = "inactive";
      }
    }

    //NO
    else if (appointment.payment_option === "NO") {
      if (
        appointment.appointment_status !== "REMOVED" &&
        appointment.appointment_status !== "CHECKED_OUT" &&
        appointment.session_details.session_status !== "COMPLETE"
      ) {
        status = "active";
      } else if (appointment.session_details.session_status === "COMPLETE") {
        status = "complete";
      } else {
        status = "inactive";
      }
    }
  } else if (step === 3) {
    if (
      appointment.payment_option !== "NO" &&
      (appointment.payment_complete ||
        appointment.doctor_details.telemedicine_fees == 0) &&
      (appointment.telemedicine_prescription || appointment.careplan)
    ) {
      status = "complete";
    } else if (
      appointment.payment_option === "NO" &&
      (appointment.telemedicine_prescription || appointment.careplan)
    ) {
      status = "complete";
    } else {
      status = "inactive";
    }
  }
  return status;
};

export const cardRightContent = (appointment, step, handleClick) => {
  const isCovidClinic =
    appointment.clinic_details.covid_clinic ||
    appointment.clinic_details.private_clinic;

  let content = "";
  if (step === 1) {
    if (
      (appointment.payment_option === "AFTER" ||
        appointment.payment_option === "BEFORE") &&
      (appointment.appointment_status !== "REMOVED" ||
        appointment.appointment_status !== "CHECKED_OUT") &&
      !appointment.payment_complete
    ) {
      content = (
        <div className="teleconsultation-right-content" onClick={handleClick}>
          <div className="amount">
            ₹{`${appointment.doctor_details.telemedicine_fees}`}
          </div>
          <div className="teleconsultation-card-right-caret">
            {/* <Icon type="right" /> */}
          </div>
        </div>
      );
    }
  } else if (step === 2) {
    if (
      (handleShowJoinBtn(appointment, isCovidClinic) &&
        appointment.payment_option === "BEFORE" &&
        appointment.payment_complete &&
        appointment.appointment_status !== "CHECKED_OUT" &&
        appointment.appointment_status !== "REMOVED" &&
        appointment.session_details &&
        appointment.session_details.session_status !== "COMPLETE") ||
      (handleShowJoinBtn(appointment, isCovidClinic) &&
        (appointment.payment_option === "NO" ||
          appointment.payment_option === "AFTER") &&
        appointment.appointment_status !== "CHECKED_OUT" &&
        appointment.appointment_status !== "REMOVED" &&
        appointment.session_details &&
        appointment.session_details.session_status !== "COMPLETE") ||
      (handleShowJoinBtn(appointment, isCovidClinic) &&
        appointment.doctor_details.telemedicine_fees == 0 &&
        appointment.appointment_status !== "CHECKED_OUT" &&
        appointment.appointment_status !== "REMOVED" &&
        appointment.session_details &&
        appointment.session_details.session_status !== "COMPLETE")
    ) {
      content = (
        <div className="teleconsultation-right-content" onClick={handleClick}>
          <div className="amount">Join</div>
          <div className="teleconsultation-card-right-caret">
            {/* <Icon type="right" /> */}
          </div>
        </div>
      );
    }
  } else if (step === 3) {
    if (
      (appointment.payment_option === "BEFORE" ||
        appointment.payment_option === "AFTER") &&
      (appointment.payment_complete ||
        appointment.doctor_details.telemedicine_fees == 0) &&
      appointment.session_details.session_status === "COMPLETE" &&
      (appointment.telemedicine_prescription || appointment.careplan)
    ) {
      content = (
        <div className="teleconsultation-right-content">
          {generatePrescription(appointment)}
        </div>
      );
    } else if (
      appointment.payment_option === "NO" &&
      appointment.session_details.session_status === "COMPLETE" &&
      (appointment.telemedicine_prescription || appointment.careplan)
    ) {
      content = (
        <div className="teleconsultation-right-content">
          {generatePrescription(appointment)}
        </div>
      );
    }
  }
  return content;
};

export const generatePrescription = appointment => {
  let prescription = "";
  const patientLanguage =
    (appointment &&
      appointment.patient_details &&
      appointment.patient_details.language &&
      appointment.patient_details.language.id) ||
    null;
  if (
    appointment.telemedicine_prescription &&
    appointment.telemedicine_prescription.documents.length > 0
  ) {
    prescription = appointment.telemedicine_prescription.documents.map(doc => {
      return (
        <PrescriptionThumbnail
          url={doc.urls.thumb}
          fileType={doc.file_type}
          fullUrl={doc.urls.original}
          patientId={appointment.patient_details.id}
        />
      );
    });
  } else {
    if (
      appointment.careplan &&
      appointment.careplan.medical_record &&
      appointment.careplan.medical_record.documents.length > 0
    ) {
      prescription = appointment.careplan.medical_record.documents
        .filter(
          record =>
            record.format_type === "KULCARE" &&
            (patientLanguage ? patientLanguage === record.language.id : true)
        )
        .map(doc => {
          return (
            <PrescriptionThumbnail
              url={doc.urls.pdf}
              fileType={doc.file_type}
              patientId={appointment.patient_details.id}
            />
          );
        });
    }
  }
  return prescription;
};

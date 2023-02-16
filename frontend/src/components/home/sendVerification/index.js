import "./style.css";
import { useState } from "react";
import axios from "axios";
const SendVerification = ({ user }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendVerificationLink = async (e) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendVerification`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSuccess(data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="send_verification">
      <span>
        Your account is not verified, verify your account before it gets deleted
        after a month from creating.
      </span>
      <a
        onClick={() => {
          sendVerificationLink();
        }}
      >
        Click here to resend verification email.
      </a>
      {success && <div className="success_text">{success}</div>}
      {success && <div className="success_error">{error}</div>}
    </div>
  );
};

export default SendVerification;

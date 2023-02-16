import { Link } from "react-router-dom";
import axios from "axios";

const SendEmail = ({
  userInfos,
  error,
  setError,
  setUserInfos,
  setVisible,
  loading,
  setLoading,
  email,
}) => {
  const sendEmail = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,
        {
          email,
        }
      );
      setError("");
      setVisible(2);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.response.data.message);
    }
  };

  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset Your Password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            How do you want receive the code to reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send code via Email </span>
              <span>{userInfos?.email}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={userInfos?.picture} alt="" />
          <span>{userInfos?.email}</span>
          <span>Facebook user</span>
        </div>
      </div>
      {error && <div className="error_text">{error}</div>}
      <div className="reset_form_btns">
        <Link to="/login" className="grey_btn">
          Not You?
        </Link>
        <button
          className="blue_btn"
          onClick={() => {
            sendEmail(userInfos?.email);
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SendEmail;

import { Form, Formik } from "formik";
import LoginInput from "../../components/inputs/loginInput";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const ChangePassword = ({
  password,
  setPassword,
  conf_password,
  setConf_password,
  error,
  setError,
  setLoading,
  loading,
  userInfos,
}) => {
  const { email } = userInfos;
  const navigate = useNavigate();
  const changePassword = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/changePassword`,
        {
          email,
          password,
        }
      );
      setError("");
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  const validatePassword = Yup.object({
    password: Yup.string()
      .required(
        "Enter a combunation of at least six numbers, letters and punctuation marks (like ! and &)."
      )
      .min(6, "Password must be at least 6 characters")
      .max(36, "Password can't be longer than 36 characters"),

    conf_password: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
  });
  return (
    <div className="reset_form" style={{ height: "320px" }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">
        Pick a strong password to change your password.
      </div>
      <Formik
        enableReinitialize
        initialValues={{ password, conf_password, error }}
        validationSchema={validatePassword}
        onSubmit={() => {
          changePassword();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
            <LoginInput
              type="password"
              name="conf_password"
              onChange={(e) => setConf_password(e.target.value)}
              placeholder="Confirm New Password"
            />
            {error && <div className="error">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="grey_btn">
                Cancel
              </Link>
              <button className="blue_btn" type="submit">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;

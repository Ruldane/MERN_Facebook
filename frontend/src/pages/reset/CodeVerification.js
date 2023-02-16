import { Form, Formik } from "formik";
import LoginInput from "../../components/inputs/loginInput";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

const CodeVerification = ({
  code,
  setCode,
  error,
  loading,
  setError,
  setLoading,
  setVisible,
  userInfos,
}) => {
  const { email } = userInfos;
  const verifyCode = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/validateResetCode`,
        {
          email,
          code,
        }
      );
      setVisible(3);
      setLoading(false);
      setError("");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const validateCode = Yup.object({
    code: Yup.string()
      .required("Code is required")
      .min("5", "Code must be 5 characters")
      .max("5", "Code must be 5 characters"),
  });
  return (
    <div className="reset_form">
      <div className="reset_form_header">Code Verification</div>
      <div className="reset_form_text">
        Please enter code that been sent to your email!
      </div>
      <Formik
        enableReinitialize
        initialValues={{ code }}
        validationSchema={validateCode}
        onSubmit={() => verifyCode()}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="text"
              name="code"
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code Verification"
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

export default CodeVerification;

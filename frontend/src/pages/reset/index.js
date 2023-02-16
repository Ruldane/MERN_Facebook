import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useState } from "react";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import CodeVerification from "./CodeVerification";
import Footer from "../../components/login/Footer";
import ChangePassword from "./ChangePassword";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(0);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [conf_password, setConf_password] = useState("");
  const [userInfos, setUserInfos] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    Cookies.set("user", "");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  console.log(userInfos);

  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="" />
        {user ? (
          <div className="right_reset">
            <Link to="/profile">
              <img src={user.picture} alt="avatar" />
            </Link>
            <button className="blue_btn" onClick={() => logout()}>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount
            setUserInfos={setUserInfos}
            setLoading={setLoading}
            email={email}
            setEmail={setEmail}
            error={error}
            setError={setError}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && userInfos && (
          <SendEmail
            email={email}
            loading={loading}
            setLoading={setLoading}
            userInfos={userInfos}
            error={error}
            setError={setError}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            userInfos={userInfos}
            setLoading={setLoading}
            loading={loading}
            code={code}
            setCode={setCode}
            error={error}
            setError={setError}
            setUserInfos={setUserInfos}
            setVisible={setVisible}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            setLoading={setLoading}
            password={password}
            conf_passwod={conf_password}
            setConf_password={setConf_password}
            setPassword={setPassword}
            error={error}
            setError={setError}
            userInfos={userInfos}
            loading={loading}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Reset;

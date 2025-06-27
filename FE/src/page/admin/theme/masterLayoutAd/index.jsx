import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header";
import { jwtDecode } from "jwt-decode";

const MasterLayoutAdmin = ({ children, ...props }) => {
  const navigate = useNavigate();
  // const access_token = localStorage.getItem("access_token");
  // console.log("access_token", access_token);
  // const decoded = jwtDecode(access_token);
  // console.log(decoded?.role);
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      navigate("/");
      return;
    }

    try {
      const decoded = jwtDecode(access_token);
      if (decoded.role !== "admin") {
        navigate("/");
      }
    } catch (error) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <div {...props}>
        <Header />
        {children}
      </div>
    </>
  );
};

export default memo(MasterLayoutAdmin);

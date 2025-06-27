import { memo, useEffect, useState } from "react";
import logo from "../../assets/img/Login/appStoreViet.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSelector } from "react-redux";
import { useMutationHooks } from "../../hooks/useMutation";
import * as userServices from "../../services/userService";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const OtpForm = ({ onClose, onOpenAuthen }) => {
  const { email, passWord } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState("");

  const mutation = useMutationHooks((data) => userServices.verifyOTP(data), {
    onSuccess: (data) => {
      if (data.status === "Ok") {
        handleLogin();
        onClose();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    },
    onError: () => {
      const errMsg =
        error?.response?.data?.message || "Có lỗi xảy ra vui lòng thử lại sau!";
      toast.error(errMsg);
    },
  });

  const mutationLogin = useMutationHooks(
    (data) => userServices.loginUser(data),
    {
      onSuccess: (data) => {
        if (data.status === "Ok") {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          localStorage.setItem(
            "access_token",
            JSON.stringify(data?.access_token)
          );
          const access_token = localStorage.getItem("access_token");
          const token = JSON.parse(access_token);
          const decoded = jwtDecode(token);
          setRole(decoded?.role);
          console.log(role);
          if (decoded?.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        }
      },
    }
  );

  const handleVerify = () => {
    mutation.mutate({ otp, email });
  };

  const handleLogin = () => {
    mutationLogin.mutate({ email, passWord });
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white/40 backdrop-blur-md h-[470px] w-[448px] rounded-[16px]"
        >
          <div className="px-[32px]">
            <img
              src={logo}
              alt=""
              className="w-[200px] h-[100px] mx-auto object-cover"
            />
            <div
              className="flex items-center gap-[8px] cursor-pointer"
              onClick={() => {
                onClose();
                onOpenAuthen();
              }}
            >
              <Icon
                icon="mdi-light:arrow-left-circle"
                className="w-[36px] h-[36px] text-white"
              />
              <p className="text-[16px] leading-[22px] tracking-[0] text-white">
                Quay lại
              </p>
            </div>
            <div className="flex flex-col gap-[8px] mt-[20px] items-center">
              <h2 className="text-[30px] leading-[38px] font-semibold text-center text-white">
                Nhập mã OTP
              </h2>
              <p className="font-normal text-[15px] leading-[20px] tracking-[0] text-center text-white">
                Chúng tôi đã gửi một mã xác minh đến email của bạn. Vui lòng
                nhập mã đó ở đây để đăng nhập vào hệ thống.
              </p>
            </div>
            <div className="flex flex-col mt-[24px] ">
              <h3 className="text-[14px] leading-[20px] font-medium text-white ">
                Nhập mã OTP
              </h3>
              <input
                type="text"
                className="bg-white w-[384px] h-[44px] mt-[10px] focus:outline-none rounded-[10px] px-[12px] py-[10px] border border-[#D1D5DB] shadow-[0px_1px_2px_0px_#121A2B0D]"
                placeholder="Nhập mã OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              type="password"
              style={{ boxShadow: "0px 1px 2px 0px #121A2B0D" }}
              className="mt-[24px] w-[384px] h-[44px] focus:outline-none bg-[#0072DE] rounded-[8px] gap-[8px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] text-white"
              onClick={handleVerify}
              //   onClick={handleLogin}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default memo(OtpForm);

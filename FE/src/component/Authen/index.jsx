import { memo, useState } from "react";
import logo from "../../assets/img/Login/appStoreViet.png";
import * as userServices from "../../services/userService";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
import { toast, ToastContainer } from "react-toastify";
import { useMutationHooks } from "../../hooks/useMutation";
const Authen = ({ onClose, onOpenLogin, onOpenOtpForm }) => {
  const [selected, setSetlected] = useState("authenticator");
  const { email } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const mutation = useMutationHooks((data) => userServices.sendOTP(data), {
    onSuccess: (data) => {
      if (data.status === "Ok") {
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

  const handleSendOtp = async () => {
    mutation.mutate({ email });
  };
  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white/40 backdrop-blur-md h-[600px] w-[448px] rounded-[16px]"
        >
          <div className="px-[32px] gap-[24px] ">
            <img
              src={logo}
              alt=""
              className="w-[200px] h-[100px] mx-auto object-cover"
            />
            <div
              className="flex items-center gap-[8px] cursor-pointer"
              onClick={() => {
                onClose();
                onOpenLogin();
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
              <h2 className="font-semibold text-[24px] leading-[38px] tracking-[0] text-center text-white">
                Chọn Phương pháp Xác thực
              </h2>
              <p className="font-normal text-[15px] leading-[20px] tracking-[0] text-center text-white">
                Bạn cũng cần chọn một phương pháp mà proxy xác thực với máy chủ
                thư mục.
              </p>
            </div>
            <div className="flex flex-col mt-[36px] gap-[16px]">
              {/* Authenticator */}
              <div
                onClick={() => setSetlected("authenticator")}
                className={`w-[384px] gap-[8px] rounded-[10px] border-2 p-[24px] flex items-center justify-between bg-white ${
                  selected === "authenticator"
                    ? "border-[#0072DE] opacity-100"
                    : "border-gray-200 opacity-50"
                }`}
              >
                <Icon
                  icon="ph:qr-code-light"
                  className="text-[#0072DE] font-bold w-[40px] h-[40px] bg-[#DBEEFF] rounded-full p-[8px]"
                />
                <div className="flex flex-col flex-1 mx-4">
                  <h2 className="font-medium text-[14px] leading-[20px] tracking-[0]">
                    Authenticator Apps
                  </h2>
                  <p className="font-normal text-[14px] leading-[20px] tracking-[0]">
                    Google Authentication, Microsoft,...
                  </p>
                </div>
                {selected === "authenticator" && (
                  <input
                    type="radio"
                    checked={true}
                    className="w-[20px] h-[20px] accent-[#0072DE]"
                  />
                )}
              </div>
              {/* EmailOTP */}
              <div
                onClick={() => setSetlected("emailOTP")}
                className={`w-[384px] gap-[8px] rounded-[10px] border-2 p-[24px] flex items-center justify-between bg-white ${
                  selected === "emailOTP"
                    ? "border-[#0072DE] opacity-100"
                    : "border-gray-200 opacity-50"
                }`}
              >
                <Icon
                  icon="mage:email"
                  className="text-[#0072DE] font-bold w-[40px] h-[40px] bg-[#DBEEFF] rounded-full p-[8px]"
                />
                <div className="flex flex-col flex-1 mx-4">
                  <h2 className="font-medium text-[14px] leading-[20px] tracking-[0]">
                    Email OTP
                  </h2>
                  <p className="font-normal text-[14px] leading-[20px] tracking-[0]">
                    Tin nhắn sẽ được gửi qua email đăng ký tài khoản
                  </p>
                </div>
                {selected === "emailOTP" && (
                  <input
                    type="radio"
                    checked={true}
                    className="w-[20px] h-[20px] accent-[#0072DE]"
                  />
                )}
              </div>
            </div>
            <button
              type="password"
              style={{ boxShadow: "0px 1px 2px 0px #121A2B0D" }}
              className="mt-[24px] w-[384px] h-[44px] focus:outline-none bg-[#0072DE] rounded-[8px] gap-[8px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] text-white"
              onClick={() => {
                if (selected === "emailOTP") {
                  // toast.success("Đã gửi mã OTP về mail của bạn")
                  handleSendOtp();
                  setTimeout(() => {
                    onClose();
                    onOpenOtpForm();
                  }, [2000]);
                }
              }}
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default memo(Authen);

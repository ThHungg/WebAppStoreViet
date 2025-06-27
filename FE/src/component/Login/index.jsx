import { memo, useEffect, useState } from "react";
import logo from "../../assets/img/Login/appStoreViet.png";
import { useMutationHooks } from "../../hooks/useMutation";
import * as userServices from "../../services/userService";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";

const LoginModal = ({ onClose, onOpenRegister, onOpenAuthen }) => {
  const [errors, setErrors] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    passWord: "",
  });
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const mutation = useMutationHooks((data) => userServices.checkAccount(data), {
    onSuccess: (data) => {
      if (data.status === "Ok") {
        toast.success(data.message);
        dispatch(
          updateUser({
            email: formData.email,
            passWord: formData.passWord,
          })
        );
        setTimeout(() => {
          onClose();
          onOpenAuthen();
        }, [1000]);
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message || "Lỗi hệ thống, vui lòng thử lại sau";
      toast.error(message);
      console.error(error);
    },
  });

  const handleCheckAccount = () => {
    mutation.mutate({ email: formData.email, passWord: formData.passWord });
  };

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white/40 backdrop-blur-md h-[578px] w-[448px] py-[32px] rounded-[16px]"
        >
          <div className="px-[32px] gap-[24px] ">
            <img
              src={logo}
              alt=""
              className="w-[200px] h-[100px] mx-auto object-cover"
            />
            <div className="">
              <h2 className="font-inter font-semibold text-[30px] leading-[38px] tracking-[0] text-center text-white">
                Đăng nhập vào hệ thống
              </h2>
              <p className="text-white mt-[8px] font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-center">
                Vui lòng nhập các thông tin để đăng nhập
              </p>
            </div>

            {/* <form onSubmit={handleCheckAccount}> */}
            <div className="mt-[24px]">
              <h3 className="font-inter font-medium text-[14px] leading-[20px] tracking-[0] text-white">
                Tài khoản
              </h3>
              <input
                type="text"
                name="email"
                style={{ boxShadow: "0px 1px 2px 0px #121A2B0D" }}
                className="w-[384px] h-[44px] focus:outline-none bg-white py-[10px] px-[12px] mt-[8px] rounded-[10px] border border-gray-300"
                placeholder="Nhập tài khoản"
                value={formData.email}
                onChange={handleOnChange}
              />
            </div>
            <div className="mt-[24px]">
              <h3 className="font-inter font-medium text-[14px] leading-[20px] tracking-[0] text-white">
                Mật khẩu
              </h3>
              <input
                type="password"
                name="passWord"
                style={{ boxShadow: "0px 1px 2px 0px #121A2B0D" }}
                className="w-[384px] h-[44px] focus:outline-none bg-white py-[10px] px-[12px] mt-[8px] rounded-[10px] border border-gray-300"
                placeholder="Nhập mật khẩu"
                value={formData.passWord}
                onChange={handleOnChange}
              />
            </div>
            <div className="mt-[24px] flex justify-between ">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-[16px] h-[18px] pt-[2px] rounded-2xl border border-amber-500 focus:outline-none"
                />
                <p className="font-inter font-normal text-[14px] leading-[20px] tracking-[0] text-white ml-2">
                  Lưu đăng nhập
                </p>
              </div>

              <div className="">
                <p className="font-inter text-white font-semibold text-[14px] leading-[20px] tracking-[0] text-right">
                  Quên mật khẩu
                </p>
              </div>
            </div>
            <button
              type="password"
              style={{ boxShadow: "0px 1px 2px 0px #121A2B0D" }}
              className="mt-[24px] w-[384px] h-[44px] focus:outline-none bg-[#0072DE] rounded-[8px] gap-[8px] pt-[10px] pr-[18px] pb-[10px] pl-[18px] text-white"
              // onSubmit={handleLogin}
              onClick={() => {
                handleCheckAccount();
              }}
            >
              Đăng nhập
            </button>
            {/* </form> */}

            <p className="text-center mt-[24px] text-white font-inter font-normal text-[14px] leading-[20px] tracking-[0]">
              Bạn chưa có tài khoản ?{" "}
              <span
                className="font-inter font-semibold text-[14px] leading-[20px] tracking-[0] text-[#0072DE]"
                onClick={() => {
                  onClose();
                  onOpenRegister();
                }}
              >
                Đăng ký ngay
              </span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default memo(LoginModal);

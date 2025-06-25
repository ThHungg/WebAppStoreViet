import React, { memo, useState } from "react";
import logo from "../../../../assets/img/header/logo.png";
import { CgGames } from "react-icons/cg";
import { BsBag } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { SiApplearcade } from "react-icons/si";
import { PiCoinThin } from "react-icons/pi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { RiPagesLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../../../../component/Login";
import Register from "../../../../component/Register";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const openLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const openRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const menuItems = [
    {
      key: "intro",
      icon: <RiPagesLine />,
      label: "Giới thiệu",
      path: "",
    },
    { key: "games", icon: <CgGames />, label: "Games", path: "" },
    {
      key: "apps",
      icon: <AiOutlineAppstoreAdd />,
      label: "Apps",
      path: "",
    },
    {
      key: "arcade",
      icon: <SiApplearcade />,
      label: "Arcade",
      path: "",
    },
    { key: "search", icon: <FiSearch />, label: "Search", path: "" },
  ];

  return (
    <>
      <div className="h-[63px] bg-[#E9E9EB] shadow-lg rounded-2xl flex items-center px-[70px]">
        <img
          src={logo}
          alt=""
          className="justify-self-start flex h-[40px] w-[40px]"
        />
        <div className="mx-auto flex justify-self-center gap-[30px]">
          {menuItems.map((item, key) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={key}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center font-bold cursor-pointer ${
                  isActive ? "text-[#0072DE]" : "text-[#9CA3AF]"
                }`}
              >
                <div className="w-[24px] h-[26px] flex items-center justify-center flex-shrink-0">
                  {React.cloneElement(item.icon, {
                    className: "w-full h-full",
                  })}
                </div>
                <p className="text-sm font-[SF Pro Display]">{item.label}</p>
              </div>
            );
          })}
        </div>
        <div className="flex gap-[24px] items-center justify-self-end">
          <BsBag className="w-[18px] h-[18px]" />
          <FaBell className="w-[18px] h-[18px]" />
          <CgMenuGridR className="w-[18px] h-[18px]" />
          <div className="h-[30px] w-[93px] bg-white border border-[#f2f2f2] rounded-md ">
            <div className=" py-[7px] px-[6px] gap-[10px] flex items-center">
              <PiCoinThin className="w-[18px] h-[18px] flex-shrink-0" />
              <p className="text-xs font-[SF Pro Text]">100.000đ</p>
            </div>
          </div>
          {/* <FaRegUserCircle className="w-[22px] h-[22px]"/> */}
          <div className="gap-[8px] flex items-center">
            <span
              className="cursor-pointer text-[14px] font-[SF Pro Display]"
              onClick={openRegister}
            >
              Đăng ký
            </span>
            <div className="w-[95px] h-[25px] shadow-2xl bg-gradient-to-r from-[#4B91F7] to-[#367AF6] rounded-md flex items-center justify-center cursor-pointer">
              <span
                className="text-white text-[14px] font-[SF Pro Display] "
                onClick={openLogin}
              >
                Đăng nhập
              </span>
            </div>
          </div>
        </div>
      </div>
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onOpenRegister={openRegister}
        />
      )}
      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onOpenLogin={openLogin}
        />
      )}
    </>
  );
};

export default memo(Header);

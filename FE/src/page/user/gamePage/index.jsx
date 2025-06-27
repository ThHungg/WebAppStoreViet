import { memo, useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Icon } from "@iconify/react/dist/iconify.js";
import formatter from "../../../utils/formatter";
import * as genreService from "../../../services/gameGenreService";
import * as gameService from "../../../services/gameService";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import FavoriteGames from "../../../component/GamePage/FavoriteGames";
const GamePage = () => {
  const [displayCount, setDisplayCount] = useState(9);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener khi component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const settings = {
    centerMode: true,
    centerPadding: "320px",
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    infinite: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const images = [
    "https://media.overclock3d.net/2024/01/Cyberpunk-2077-patch.jpg",
    "https://image.api.playstation.com/vulcan/ap/rnd/202306/0210/667fad34bd6f9af042d7abdce546c1e6b59083a3a1909e17.jpg",
    "https://image.api.playstation.com/vulcan/ap/rnd/202306/0210/667fad34bd6f9af042d7abdce546c1e6b59083a3a1909e17.jpg",
    "https://image.api.playstation.com/vulcan/ap/rnd/202306/0210/667fad34bd6f9af042d7abdce546c1e6b59083a3a1909e17.jpg",
    "https://image.api.playstation.com/vulcan/ap/rnd/202306/0210/667fad34bd6f9af042d7abdce546c1e6b59083a3a1909e17.jpg",
    "https://image.api.playstation.com/vulcan/ap/rnd/202306/0210/667fad34bd6f9af042d7abdce546c1e6b59083a3a1909e17.jpg",
    "https://image.api.playstation.com/vulcan/ap/rnd/202306/0210/667fad34bd6f9af042d7abdce546c1e6b59083a3a1909e17.jpg",
  ];
  useEffect(() => {
    console.log(width);
    if (width < 920) setDisplayCount(6);
    else if (width < 1280) setDisplayCount(6);
    else setDisplayCount(12);
  }, [width]);

  const fetchAllGame = async () => {
    const res = await gameService.gettAllGame(1, displayCount);
    return res.data;
  };

  const { data: games = [] } = useQuery({
    queryKey: ["games", displayCount],
    queryFn: fetchAllGame,
  });

  const fetchAllGenre = async () => {
    const res = await genreService.getAllGenre();
    console.log("res?.data", res);
    return res.data;
  };

  const { data: genres = [] } = useQuery({
    queryKey: ["genres"],
    queryFn: fetchAllGenre,
  });

  return (
    <>
      <div className="overflow-hidden max-w-screen">
        <Slider {...settings}>
          {images.map((image, key) => (
            <div key={key} className="max-w-[870px] h-[480px] mt-[20px] ">
              <img
                src={image}
                alt=""
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="max-w-screen-xl mx-auto flex justify-center gap-x-[8px] mt-10">
        {genres.map((item, key) => (
          <div
            key={key}
            className="flex bg-[#EFEFF4] rounded-[8px] h-[30px] py-[3px] px-[10px] gap-x-[8px] items-center"
          >
            <img src={item.icon} alt="" className="w-[24px] h-[24px]" />
            <p className="text-[14px] font-medium leading-none text-center align-bottom">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <div className="max-w-screen-xl mx-auto mt-5 px-[100px]">
        <hr className="max-w-screen-xl mx-auto h-[1px] bg-[#E6E6E6] border-0" />
        <div className="flex justify-between mt-5">
          <h2 className="font-sans font-semibold text-[24px] leading-[32px] align-middle tracking-normal">
            Danh sách Tài khoản trò chơi
          </h2>
          <div className="relative inline-flex items-center">
            <Icon
              icon="tabler:search"
              className="text-[#3C3C4399] absolute top-1/2 left-3 -translate-y-1/2"
            />
            <input
              type="search"
              placeholder="Tìm kiếm"
              className="w-[162px] h-[28px] rounded-[6px] focus:outline-none border border-solid border-[#0000000D] pt-[7px] pr-[6px] pb-[7px] pl-[30px]"
            />
          </div>
        </div>
        <div className="grid xs:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-[16px]">
          {games.map((game, rowIndex) => (
            <div>
              <div key={rowIndex} className="flex justify-between gap-3">
                <img
                  src={game.iconUrl}
                  alt=""
                  className="w-[36px] h-[36px] rounded-[9px]"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <div className="max-w-[215px] flex flex-col gap-y-[4px] pr-1">
                        <h2 className="text-[16px] font-bold leading-[16px] tracking-[-0.08px] align-middle">
                          {game.name}
                        </h2>
                        <p className="truncate text-[13px] leading-[13px] tracking-[0.12px] align-middle text-[#7f7f7f] text-opacity-50">
                          {game.description}
                        </p>
                        <p className="text-[13px] leading-[13px] tracking-[0.12px] align-middle text-[#7f7f7f] text-opacity-50">
                          Giá in app:{" "}
                          <span className="text-bold text-black">
                            {formatter(game.price)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="w-fit flex h-[22px] px-[10px] py-[6px] items-center bg-[#E6E6E6] rounded-[64px]">
                      <p className="text-[12px] leading-[14px] font-bold tracking-[0.06px] text-center align-middle text-[#007AFF]">
                        {formatter(game.price)}
                      </p>
                    </div>
                  </div>
                  <hr className="h-[1px] text-[#E6E6E6] mt-[12px]" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr className=" mx-auto h-[1px] bg-[#E6E6E6] mt-5 border-0" />
        <div className="font-semibold text-[24px] leading-[32px] mt-5 tracking-[0] align-middle">
          Tài khoản trò chơi được yêu thích nhất 🥰
        </div>
      </div>
      <div className="mt-5">
        <FavoriteGames></FavoriteGames>
      </div>
    </>
  );
};

export default memo(GamePage);

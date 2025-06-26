import { memo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Icon } from "@iconify/react/dist/iconify.js";
import formatter from "../../../utils/formatter";
const HomePage = () => {
  const settings = {
    centerMode: true,
    centerPadding: "320px", // nửa chiều rộng ảnh
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
  ];

  const games = [
    {
      name: "Roblox",
      description:
        "Join millions of players and abcdefghiklmasdjvsgjdhasdasbdashdhiklmasdjvsgjdhasdasbdashdhiklmasdjvsgjdhasdasbdashdhiklmasdjvsgjdhasdasbdashdhiklmasdjvsgjdhasdasbdashdhiklmasdjvsgjdhasdasbdashd",
      icgame:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png",
      priceInApp: 1499000,
      price: 99000,
    },
    {
      name: "Roblox",
      description: "Join millions of players and abcdefghiklm",
      icgame:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png",
      priceInApp: 1499000,
      price: 99000,
    },
    {
      name: "Roblox",
      description: "Join millions of players and abcdefghiklm",
      icgame:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png",
      priceInApp: 1499000,
      price: 99000,
    },
    {
      name: "Roblox",
      description: "Join millions of players and abcdefghiklm",
      icgame:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png",
      priceInApp: 1499000,
      price: 99000,
    },
    {
      name: "Roblox",
      description: "Join millions of players and abcdefghiklm",
      icgame:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png",
      priceInApp: 1499000,
      price: 99000,
    },
    {
      name: "Roblox",
      description: "Join millions of players and abcdefghiklm",
      icgame:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png",
      priceInApp: 1499000,
      price: 99000,
    },
    {
      name: "Roblox",
      description: "Join millions of players and abcdefghiklm",
      icgame:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png",
      priceInApp: 1499000,
      price: 99000,
    },
    {
      name: "Roblox",
      description: "Join millions of players and abcdefghiklm",
      icgame:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png",
      priceInApp: 1499000,
      price: 99000,
    },
    {
      name: "Roblox",
      description: "Join millions of players and abcdefghiklm",
      icgame:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png",
      priceInApp: 1499000,
      price: 99000,
    },
    {
      name: "Roblox",
      description: "Join millions of players and abcdefghiklm",
      icgame:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png",
      priceInApp: 1499000,
      price: 99000,
    },
    {
      name: "Roblox",
      description: "Join millions of players and abcdefghiklm",
      icgame:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png",
      priceInApp: 1499000,
      price: 99000,
    },
    {
      name: "Roblox",
      description: "Join millions of players and abcdefghiklm",
      icgame:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png",
      priceInApp: 1499000,
      price: 99000,
    },
    {
      name: "Roblox",
      description: "Join millions of players and abcdefghiklm",
      icgame:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png",
      priceInApp: 1499000,
      price: 99000,
    },
    {
      name: "Roblox",
      description: "Join millions of players and abcdefghiklm",
      icgame:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png",
      priceInApp: 1499000,
      price: 99000,
    },
    {
      name: "Roblox",
      description: "Join millions of players and abcdefghiklm",
      icgame:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png",
      priceInApp: 1499000,
      price: 99000,
    },
    {
      name: "Roblox",
      description: "Join millions of players and abcdefghiklm",
      icgame:
        "https://upload.wikimedia.org/wikipedia/commons/4/48/Roblox_Logo_2021.png",
      priceInApp: 1499000,
      price: 99000,
    },
  ];

  const columns = 3;
  const rows = 4;
  const gridData = Array.from({ length: columns }, (_, colIndex) =>
    games.slice(colIndex * rows, colIndex * rows + rows)
  );

  const categories = [
    {
      title: "All game",
      logo: (
        <Icon icon="icon-park-solid:all-application" className="text-red-600" />
      ),
    },
    {
      title: "Action",
      logo: <Icon icon="file-icons:actionscript" className="text-[#eab308]" />,
    },
    {
      title: "Strategy",
      logo: <Icon icon="ph:strategy-fill" className="text-[#CF382E]" />,
    },
    {
      title: "Family",
      logo: <Icon icon="icon-park:family" />,
    },
    {
      title: "Simulation",
      logo: (
        <Icon
          icon="material-symbols-light:simulation"
          className="text-[#68C5F3]"
        />
      ),
    },
    {
      title: "Adventure",
      logo: <Icon icon="hugeicons:adventure" className="text-[#6E7277]" />,
    },
    {
      title: "Sport",
      logo: <Icon icon="fluent:sport-24-regular" className="text-[#87D13F]" />,
    },
    {
      title: "Puzzle",
      logo: <Icon icon="mdi:puzzle" className="text-[#64C2FA]" />,
    },
    {
      title: "Casual",
      logo: <Icon icon="game-icons:spaceship" className="text-[#408FF5]" />,
    },
    {
      title: "Racing",
      logo: <Icon icon="maki:racetrack" className="text-black" />,
    },
  ];

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
        {categories.map((item, key) => (
          <div
            key={key}
            className="flex bg-[#EFEFF4] rounded-[8px] h-[30px] py-[3px] px-[10px] gap-x-[8px] items-center"
          >
            <Icon>{item.logo}</Icon>
            <p className="text-[14px] font-medium leading-none text-center align-bottom">
              {item.title}
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
        <div className="grid grid-cols-3 gap-[48px] mt-[16px]">
          {gridData.map((column, colIndex) => (
            <div key={colIndex} className="grid grid-rows-4 gap-y-4">
              {column.map((game, rowIndex) => (
                <div>
                  <div key={rowIndex} className="flex justify-between">
                    <img
                      src={game.icgame}
                      alt=""
                      className="w-[36px] h-[36px] rounded-[9px]"
                    />
                    <div>
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
                                {formatter(game.priceInApp)}
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
          ))}

          {/* <div className="grid grid-rows-4">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default memo(HomePage);

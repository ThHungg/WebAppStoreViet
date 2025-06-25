import { memo } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Icon } from "@iconify/react/dist/iconify.js";
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
    </>
  );
};

export default memo(HomePage);

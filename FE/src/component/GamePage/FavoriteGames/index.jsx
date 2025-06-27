import { memo } from "react";
import * as gameService from "../../../services/gameService";
import { useQuery } from "@tanstack/react-query";

const FavoriteGames = () => {
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

  const fetchGameFavorite = async () => {
    const res = await gameService.getGameFavorite();
    return res.data;
  };

  const { data: GameFv = [] } = useQuery({
    queryKey: ["gameFv"],
    queryFn: fetchGameFavorite,
  });

  console.log(GameFv);
  return (
    <>
      <div className="flex gap-[24px]">
        {GameFv.map((gamefv, index) => (
          <div className="w-[337px] h-[432px] shadow-[0px_20px_60px_0px_#0000001A] backdrop-blur-[80px] rounded-2xl grid grid-rows-10 mt-[12px]">
            <div className="row-span-8">
              <img
                src={gamefv.backgroundImage}
                alt=""
                className="h-full object-cover w-full rounded-t-2xl"
              />
            </div>
            <div className="row-span-2 gap-[12px] rounded-br-[13px] items-center rounded-bl-[13px] px-[13px] py-[8px] flex">
              <img
                src="https://www.giantbomb.com/a/uploads/original/16/165036/3025598-a9_1.0_icon.png"
                alt=""
                className="w-[36px] h-[36px]"
              />
              <div className="flex gap-[3px] flex-col flex-1 min-w-0">
                <h3 className="font-semibold text-[15px] leading-[16px] tracking-[-0.08px] align-middle">
                  Asphalt Legend
                </h3>
                <p className="text-black/50 flex-1 min-w-0 w-[190px] h-[15px] truncate font-normal text-[12px] leading-[13px] tracking-[0.12px] align-middle">
                  Embark on an epic journey through a vast open-world in this
                  action-packed RPG. Explore, battle, and uncover mysteries in
                  Genshin Impact.
                </p>
                <p className="text-[13px] leading-[13px] tracking-[0.12px] align-middle text-[#7f7f7f] text-opacity-50">
                  Giá in app:{" "}
                  <span className="text-bold text-black">1900000</span>
                </p>
              </div>
              <div className="w-fit flex h-[22px] px-[10px] py-[6px] items-center bg-[#E6E6E6] rounded-[64px]">
                <p className="text-[12px] leading-[14px] font-bold tracking-[0.06px] text-center align-middle text-[#007AFF]">
                  990000
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10"></div>
    </>
  );
};

export default memo(FavoriteGames);

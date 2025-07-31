import Image from 'next/image';
import bad from '/public/images/icons/wellness/bustleBad.svg';
import cloudy from '/public/images/icons/wellness/weatherCloudy.svg';
import good from '/public/images/icons/wellness/bustleGood.svg';
import mid from '/public/images/icons/wellness/bustleMid.svg';
import rain from '/public/images/icons/wellness/weatherRain.svg';
import snow from '/public/images/icons/wellness/weatherSnow.svg';
import sunny from '/public/images/icons/wellness/weatherSunny.svg';

export default function WellnessItem() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const unusedImages = [bad, mid, rain, snow, sunny];

  return (
    <>
      <div className="text-xs tracking-[-2%]">
        <p className="text-b1">오늘</p>
        <p className="text-g1">07.31</p>
      </div>
      <div className="grow-1 flex items-center justify-between">
        <div className="px-[8px] py-[8px] ml-[24px] flex items-center justify-between bg-white rounded-lg text-xs text-b3">
          <Image src={cloudy} alt="날씨" width={20} height={20} />
          <div className="ml-[8px] flex items-center">
            <span className="flex items-center">
              최고<p className="text-b font-semibold">&nbsp;23°</p>
            </span>
            <span className="mx-[4px] text-w6">|</span>
            <span className="flex items-center">
              최대 <p className="text-r font-semibold">&nbsp;33°</p>
            </span>
          </div>
        </div>
        <div className="px-[8px] py-[8px] flex items-center justify-between bg-white rounded-lg text-xs text-b3">
          <Image src={good} alt="번잡도" width={20} height={20} />
          <p className="ml-[4px] text-xs text-b3">매우 번잡해요</p>
        </div>
      </div>
    </>
  );
}

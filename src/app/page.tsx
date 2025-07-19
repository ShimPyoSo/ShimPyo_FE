import Category from './(_components)/landing/Category';
import Image from 'next/image';
import LikedSpot from './(_components)/landing/LikedSpot';
import MainSlider from './(_components)/landing/MainSlider';
import Recommend from './(_components)/landing/Recommend';
import dynamic from 'next/dynamic';
import logo from '/public/images/icons/logo.svg';

const TodayWellness = dynamic(() => import('./(_components)/landing/wellness/TodayWellness'));

export default function Home() {
  return (
    <div className="bg-w1 pl-[16px] pb-[70px]">
      <h2 className="py-[12px] mb-[30px]">
        <Image src={logo} alt="쉼표" width={33} height={33} />
      </h2>
      <MainSlider />
      <Category />
      <Recommend />
      <LikedSpot />
      <TodayWellness />
    </div>
  );
}

import Image from 'next/image';
import WellnessItem from './WellnessItem';
import illu from '/public/images/icons/illustration/wellness.svg';

export default function WeeklyWellness() {
  return (
    <section>
      <div className="relative mb-[30px]">
        <Image src={illu} alt="이번주 웰니스" width={350} height={130} className="relative z-10" />
        <div className="absolute flex items-center bottom-[-30px] w-full bg-gn10 px-[12px] py-[12px] rounded-lg z-0">
          <WellnessItem />
        </div>
      </div>
      <ul>
        <li className="flex items-center border-b border-w6 px-[12px] py-[12px]">
          <WellnessItem />
        </li>
        <li className="flex items-center border-b border-w6 px-[12px] py-[12px]">
          <WellnessItem />
        </li>
        <li className="flex items-center border-b border-w6 px-[12px] py-[12px]">
          <WellnessItem />
        </li>
        <li className="flex items-center border-b border-w6 px-[12px] py-[12px]">
          <WellnessItem />
        </li>
        <li className="flex items-center border-b border-w6 px-[12px] py-[12px]">
          <WellnessItem />
        </li>
        <li className="flex items-center border-b border-w6 px-[12px] py-[12px]">
          <WellnessItem />
        </li>
      </ul>
    </section>
  );
}

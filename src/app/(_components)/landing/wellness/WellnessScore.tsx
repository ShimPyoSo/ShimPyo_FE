import Image, { StaticImageData } from 'next/image';

import eighty from '/public/images/progress/80.png';
import fifty from '/public/images/progress/50.png';
import forty from '/public/images/progress/40.png';
import full from '/public/images/progress/100.png';
import ninety from '/public/images/progress/90.png';
import seventy from '/public/images/progress/70.png';
import sixty from '/public/images/progress/60.png';
import tail from '/public/images/progress/tail.svg';
import ten from '/public/images/progress/10.png';
import thirty from '/public/images/progress/30.png';
import twenty from '/public/images/progress/20.png';
import wellness from '/public/images/icons/wellness/wellness.svg';
import zero from '/public/images/progress/0.png';

const progressImageMap: Record<number, StaticImageData> = {
  0: zero,
  10: ten,
  20: twenty,
  30: thirty,
  40: forty,
  50: fifty,
  60: sixty,
  70: seventy,
  80: eighty,
  90: ninety,
  100: full,
};

export default function WellnessScore({ score }: { score: number }) {
  const roundedScore = Math.round(score / 10) * 10;
  const safeScore = Math.max(0, Math.min(100, roundedScore));
  const progressImage = progressImageMap[safeScore] ?? zero;

  return (
    <div className="mt-[40px] relative">
      <Image src={wellness} alt="wellness" width={344} height={150} />
      <div className="absolute right-[50px] bottom-[34px]">
        <div className="w-[94px] h-[44px] rounded-[40px] bg-white">
          <div className="w-full text-gn12 font-semibold flex items-baseline justify-center pt-[4px]">
            <p className="font-[kkubulim] text-4xl">{score}</p>
            <p className="ml-[4px] tracking-[-0.02em]">점</p>
          </div>

          <Image
            className="absolute left-1/2 translate-x-[-50%] top-[40px]"
            src={tail}
            alt="말풍선 꼬리"
            width={20}
            height={20}
          />
        </div>
      </div>
      <Image className="absolute bottom-[-42px] z-10" src={progressImage} alt="웰니스 점수" width={344} height={60} />
    </div>
  );
}

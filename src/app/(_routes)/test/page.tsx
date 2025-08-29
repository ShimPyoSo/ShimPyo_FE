import Image from 'next/image';
import StartButton from '@/app/(_components)/test/StartButton';
import illu from '/public/images/icons/illustration/test.svg';

export default function Test() {
  return (
    <div className="min-h-full bg-w1 px-[16px] pb-[70px] flex flex-col justify-center">
      <h2 className="text-center">
        <small className="tracking-[-0.02em] text-g1 text-sm">나는 어떤 휴식이 필요할까?</small>
        <p className="mt-[5px] font-[kkubulim] text-3xl text-gn1">&ldquo; 쉼표 유형 테스트 &rdquo;</p>
      </h2>
      <Image className="mx-auto mt-[40px]" src={illu} alt="쉼표 유형 테스트" width={220} height={240} />
      <StartButton />
    </div>
  );
}

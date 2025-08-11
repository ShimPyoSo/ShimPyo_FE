import Image from 'next/image';
import Link from 'next/link';
import illu from '/public/images/icons/illustration/test.svg';

export default function Test() {
  return (
    <div className="min-h-full bg-w1 px-[16px] pb-[70px] flex flex-col justify-center">
      <h2 className="text-center">
        <small className="tracking-[-2%] text-g1 text-sm">나는 어떤 휴식이 필요할까?</small>
        <p className="mt-[5px] font-[kkubulim] text-3xl text-gn1">&ldquo; 쉼표 유형 테스트 &rdquo;</p>
      </h2>
      <Image className="mx-auto mt-[40px]" src={illu} alt="쉼표 유형 테스트" width={220} height={240} />
      <div className="mt-[80px] flex items-center gap-[12px]">
        <Link
          className="grow-1 bg-gn1 border border-gn5 text-white rounded-md py-[14px] tracking-[-1.3%] font-semibold text-center"
          href={'/test/question'}
        >
          시작하기
        </Link>
        <Link
          className="grow-1 bg-w3 border border-w4 text-b3 rounded-md py-[14px] tracking-[-1.3%] font-semibold text-center"
          href={'/test/question'}
        >
          이어하기
        </Link>
      </div>
    </div>
  );
}

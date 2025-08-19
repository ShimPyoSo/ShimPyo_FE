import Image from 'next/image';
import Link from 'next/link';
import background from '/public/images/backgroundImg.jpg';

export default function BackgroundSection() {
  return (
    <>
      <div className="w-[340px] h-[410px] relative mb-[130px] rounded-xl hidden md:block">
        <Image
          className="rounded-xl object-cover object-[22%_50%]"
          src={background}
          alt="웰니스 여행 추천"
          fill
          quality={100}
          sizes="(max-width: 768px) 340px, 410px"
        />
        <div className="rounded-xl absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />

        {/* 텍스트 + 버튼 컨테이너 */}
        <div className="absolute inset-0 p-[30px] flex flex-col">
          <div>
            <h1 className="text-white text-3xl font-bold">
              나는 어떤
              <br /> 웰니스 여행을 원할까?
            </h1>
            <p className="mt-[8px] text-xs text-white/80">
              내게 딱 맞는 휴식 유형을 알아보는 테스트를 통해,
              <br />
              웰니스 여행 코스를 추천 받아보세요!
            </p>
          </div>

          {/* 버튼을 항상 아래쪽으로 */}
          <Link
            className="mt-[20px] bg-gn1 border border-gn5 rounded-lg text-white text-sm font-semibold py-[8px] px-[12px] self-start"
            href={'/test'}
          >
            테스트 바로가기
          </Link>
        </div>
      </div>
    </>
  );
}

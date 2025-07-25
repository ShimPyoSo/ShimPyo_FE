import Image from 'next/image';
import KakaoButton from '../KakaoButton';
import Link from 'next/link';
import illustration from '/public/images/icons/illustration/signup.svg';

export default function SignUpComponent() {
  return (
    <div className="h-full bg-w1 flex flex-col justify-between px-[18px] pt-[70px] pb-[50px]">
      <h1>
        <p className="text-sm text-g1">회원가입</p>
        <div className="mt-[12px] text-2xl font-semibold">
          가장 <span className="font-[kkubulim] text-gn1 font-normal">편한 방법</span>으로
          <br />
          <span className="font-[kkubulim] text-gn1 font-normal">가입</span>해 보세요
        </div>
      </h1>
      <Image className="mx-auto" src={illustration} alt="회원가입" width={265} height={263} />
      <div className="flex flex-col items-center">
        <KakaoButton />
        <Link
          className="mt-[8px] w-full rounded-lg py-[16px] bg-white border border-w4 text-b1 font-semibold tracking-[-1.3%] text-center"
          href={'/signup/email'}
          role="button"
        >
          이메일로 회원가입
        </Link>
        <p className="mt-[30px] text-xs text-g1 tracking-[-2%]">
          이미 계정이 있으신가요?{' '}
          <Link className="text-b1 underline" href={'/login'}>
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}

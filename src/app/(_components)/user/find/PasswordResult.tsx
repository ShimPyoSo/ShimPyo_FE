import Image from 'next/image';
import Link from 'next/link';
import illustration from '/public/images/icons/illustration/passwordSend.svg';

export default function PasswordResult() {
  return (
    <>
      <span className="mt-[50px]">
        <p className="text-sm text-g1 tracking-[-2%]">비밀번호 재설정</p>
        <p className="mt-[12px] text-xl text-b1 font-semibold">
          해당 이메일로
          <br />
          임시 비밀번호가 발급 되었어요
        </p>
      </span>
      <Image className="mx-auto" src={illustration} alt="임시 비밀번호 전송" width={268} height={169} />
      <Link
        className="w-full bg-gn1 mb-[16px] py-[16px] border border-gn5 text-white font-semibold rounded-lg text-center"
        href={'/login'}
        role="button"
      >
        로그인 하기
      </Link>
    </>
  );
}

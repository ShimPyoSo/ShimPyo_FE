import Link from 'next/link';

export default function PasswordResult() {
  return (
    <>
      <span className="mt-[36px]">
        <p className="text-sm text-g1 tracking-[-2%]">비밀번호 재설정</p>
        <p className="mt-[12px] text-xl text-b1 font-semibold">
          새로운 비밀번호로
          <br />
          변경되었어요
        </p>
      </span>

      <div className="flex flex-col">
        <Link
          className="w-full bg-gn1 py-[16px] border border-gn5 text-white font-semibold rounded-lg text-center"
          href={'/login'}
          role="button"
        >
          로그인 하기
        </Link>
        <Link
          className="w-full bg-white  py-[16px] mt-[8px] mb-[40px] border border-w4 text-b1 font-semibold rounded-lg text-center"
          href={'/find/id'}
          role="button"
        >
          아이디 찾기
        </Link>
      </div>
    </>
  );
}

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

      <Link
        className="w-full bg-gn1 py-[16px] border border-gn5 text-white font-semibold rounded-lg text-center"
        href={'/login'}
        role="button"
      >
        로그인 하기
      </Link>
    </>
  );
}

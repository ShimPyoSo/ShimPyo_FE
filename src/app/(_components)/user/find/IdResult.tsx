import { IFindResult } from '@/app/(_utils)/type';
import Link from 'next/link';

export default function IdResult({ username, createdAt }: IFindResult) {
  return (
    <>
      <span className="mt-[36px]">
        <p className="text-sm text-g1 tracking-[-2%]">이메일 인증 성공</p>
        <p className="mt-[12px] text-xl text-b1 font-semibold">
          인증한 이메일과 일치하는
          <br />
          아이디를 알려드려요
        </p>
      </span>

      {/* 추후 border 파일 받으면 수정 필요 */}
      <div className="w-[260px] px-[16px] py-[24px] border border-gn1 rounded-2xl mx-auto">
        <span className="flex gap-[9px] text-gn1 tracking-[-1.3%]">
          아이디 <p className="text-b1">{username}</p>
        </span>
        <span className="flex gap-[9px] text-gn1 tracking-[-1.3%]">
          가입일 <p className="text-b1">{createdAt}</p>
        </span>
      </div>

      <div className="flex flex-col">
        <Link
          className="w-full bg-gn1 py-[16px] border border-gn5 text-white font-semibold rounded-lg"
          href={'/login'}
          role="button"
        >
          로그인 하기
        </Link>
        <Link
          className="w-full bg-white  py-[16px] mt-[8px] mb-[40px] border border-w4 text-b1 font-semibold rounded-lg"
          href={'/find/password'}
          role="button"
        >
          비밀번호 찾기
        </Link>
      </div>
    </>
  );
}

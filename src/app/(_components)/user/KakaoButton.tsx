'use client';

import Image from 'next/image';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
import kakao from '/public/images/icons/kakao.svg';
import { loginAtom } from '@/app/(_store)/auth';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';

export default function KakaoButton() {
  const [, login] = useAtom(loginAtom);
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuccess = async (data: any) => {
    try {
      const response = await axios.post('/social/login', { accessToken: data.response.access_token });
      login(response.data);
      router.push('/');
    } catch (error: unknown) {
      handleFailure(error);
    }
  };

  const handleFailure = (error: unknown) => {
    // 로그인 실패 코드
    console.log(error);
  };

  return (
    <KakaoLogin
      token={process.env.NEXT_PUBLIC_KAKAO_JS_KEY!}
      onSuccess={handleSuccess}
      onFail={handleFailure}
      render={({ onClick }) => (
        <button
          className="flex gap-[8px] justify-center items-center w-full rounded-lg py-[16px] bg-y text-b1 font-semibold tracking-[-1.3%]"
          onClick={onClick}
        >
          <Image src={kakao} alt="카카오" width={20} height={20} />
          카카오로 회원가입
        </button>
      )}
    />
  );
}

'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import Image from 'next/image';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
import kakao from '/public/images/icons/kakao.svg';
import { loginAtom } from '@/app/(_store)/auth';
import { useAtom } from 'jotai';

export default function KakaoButton() {
  const [, login] = useAtom(loginAtom);
  const router = useRouter();
  const params = useSearchParams();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSuccess = async (data: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/social/login`,
        {
          accessToken: data.response.access_token,
        },
        { withCredentials: true }
      );
      login({ userId: response.data.userId, nickname: response.data.nickname });
      if (response.data.type === 'signup') {
        router.push('/signup/additional');
      } else router.push(decodeURIComponent(params.get('redirect') ?? '/'));
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
          className="flex gap-[8px] justify-center items-center w-full rounded-lg py-[16px] bg-y text-b1 font-semibold tracking-[-0.013em]"
          onClick={onClick}
        >
          <Image src={kakao} alt="카카오" width={20} height={20} />
          카카오로 회원가입
        </button>
      )}
    />
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import LoginInput from './LoginInput';
import check from '/public/images/icons/check.svg';
import { useState } from 'react';

export default function LoginForm() {
  const [isRememberMe, setIsRememberMe] = useState(false);

  return (
    <form className="mt-[145px]">
      <LoginInput />
      <div className="mt-[16px] flex justify-between items-center text-xs text-g1">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            className="peer hidden"
            checked={isRememberMe}
            onChange={() => setIsRememberMe(!isRememberMe)}
          />
          <div className="w-5 h-5 border border-w4 bg-w4 rounded-sm peer-checked:bg-gn4 peer-checked:border-gn1 relative">
            {isRememberMe && (
              <Image className="absolute top-[4px] left-[4px]" src={check} alt="자동 로그인" width={11} height={8} />
            )}
          </div>
          <span className="text-xs text-g1">자동 로그인</span>
        </label>

        <div className="flex gap-[6px]">
          <Link href={'/find/id'}>아이디 찾기</Link>
          <span className="text-w4">|</span>
          <Link href={'/find/password'}>비밀번호 찾기</Link>
        </div>
      </div>
      <button className="w-full mt-[30px] py-[16px] bg-gn1 rounded-lg border border-gn5 text-white font-semibold cursor-pointer">
        로그인 하기
      </button>
    </form>
  );
}

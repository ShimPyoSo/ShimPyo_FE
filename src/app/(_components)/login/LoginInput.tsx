'use client';

import Image from 'next/image';
import close from '/public/images/icons/closeEye.svg';
import open from '/public/images/icons/openEye.svg';
import { useState } from 'react';

export default function LoginInput() {
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <>
      <input
        className="w-full mt-[12px] p-[16px] bg-w3 rounded-lg border border-w4 outline-none focus:border-gn1 text-black"
        placeholder="아이디를 입력해 주세요"
      />
      <div className="relative">
        <input
          className="w-full mt-[8px] p-[16px] bg-w3 rounded-lg border border-w4 outline-none focus:border-gn1 text-black"
          type={passwordOpen ? 'text' : 'password'}
          placeholder="비밀번호를 입력해 주세요"
          onFocus={() => setIsPasswordFocused(true)}
          onBlur={() => setIsPasswordFocused(false)}
        />
        {isPasswordFocused && (
          <Image
            className="absolute right-[16px] top-[26px] cursor-pointer"
            src={passwordOpen ? close : open}
            alt={'password'}
            width={24}
            height={24}
            onClick={() => setPasswordOpen(!passwordOpen)}
          />
        )}
      </div>
    </>
  );
}

'use client';

import Image from 'next/image';
import close from '/public/images/icons/closeEye.svg';
import open from '/public/images/icons/openEye.svg';
import { useState } from 'react';

export default function PasswordInput() {
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordConfirmOpen, setPasswordConfirmOpen] = useState(false);

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordConfirmFocused, setIsPasswordConfirmFocused] = useState(false);

  return (
    <>
      <label className="mt-[40px] flex flex-col text-sm text-b3 tracking-[-2%]">
        비밀번호
        <small className="text-xs text-g1">8글자 이상의 영문, 특수문자, 숫자 조합으로 설정해요</small>
        <div className="relative">
          <input
            className="w-full mt-[12px] p-[16px] bg-w3 rounded-lg border border-w4 text-base outline-none focus:border-gn1 text-black"
            type={passwordOpen ? 'text' : 'password'}
            placeholder="비밀번호를 입력해 주세요"
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          {isPasswordFocused && (
            <Image
              className="absolute right-[16px] top-[28px] cursor-pointer"
              src={passwordOpen ? close : open}
              alt={'password'}
              width={24}
              height={24}
              onClick={() => setPasswordOpen(!passwordOpen)}
            />
          )}
        </div>
      </label>

      <label className="mt-[40px] flex flex-col text-sm text-b3 tracking-[-2%]">
        비밀번호 확인
        <div className="relative">
          <input
            className="w-full mt-[12px] p-[16px] bg-w3 rounded-lg border border-w4 text-base outline-none focus:border-gn1 text-black"
            type={passwordConfirmOpen ? 'text' : 'password'}
            placeholder="비밀번호를 입력해 주세요"
            onFocus={() => setIsPasswordConfirmFocused(true)}
            onBlur={() => setIsPasswordConfirmFocused(false)}
          />
          {isPasswordConfirmFocused && (
            <Image
              className="absolute right-[16px] top-[28px] cursor-pointer"
              src={passwordConfirmOpen ? close : open}
              alt={'password'}
              width={24}
              height={24}
              onClick={() => setPasswordConfirmOpen(!passwordConfirmOpen)}
            />
          )}
        </div>
      </label>
    </>
  );
}

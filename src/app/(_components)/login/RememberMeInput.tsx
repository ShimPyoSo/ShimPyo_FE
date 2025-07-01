'use client';

import { ILogin } from '@/app/(_utils)/type';
import Image from 'next/image';
import { UseFormRegister } from 'react-hook-form';
import check from '/public/images/icons/check.svg';
import { useState } from 'react';

interface RememberMeInputProps {
  register: UseFormRegister<ILogin>;
}

export default function RememberMeInput({ register }: RememberMeInputProps) {
  const [isRememberMe, setIsRememberMe] = useState(false);

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        className="peer hidden"
        checked={isRememberMe}
        {...register('isRememberMe')}
        onChange={() => setIsRememberMe(!isRememberMe)}
      />
      <div className="w-5 h-5 border border-w4 bg-w4 rounded-sm peer-checked:bg-gn4 peer-checked:border-gn1 relative">
        {isRememberMe && (
          <Image className="absolute top-[4px] left-[4px]" src={check} alt="자동 로그인" width={11} height={8} />
        )}
      </div>
      <span className="text-xs text-g1">자동 로그인</span>
    </label>
  );
}

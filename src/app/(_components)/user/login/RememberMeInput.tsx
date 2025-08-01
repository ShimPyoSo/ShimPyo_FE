'use client';

import { UseFormRegister, UseFormWatch } from 'react-hook-form';

import CheckBox from '../../UI/Checkbox';
import { ILogin } from '@/app/(_utils)/type';

interface RememberMeInputProps {
  register: UseFormRegister<ILogin>;
  watch: UseFormWatch<ILogin>;
}

export default function RememberMeInput({ register, watch }: RememberMeInputProps) {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <CheckBox register={register} watch={watch} name={'isRememberMe'} required={false} />
      <span className="text-xs text-g1">자동 로그인</span>
    </label>
  );
}

import { Control, UseFormRegister, useFormState } from 'react-hook-form';

import { IAdditional } from '@/app/(_utils)/type';

interface BirthYearInputProps {
  register: UseFormRegister<IAdditional>;
  control: Control<IAdditional>;
}

export default function BirthYearInput({ register, control }: BirthYearInputProps) {
  const { errors } = useFormState({ control });
  return (
    <label className="mt-[40px] flex flex-col text-sm text-b3 tracking-[-2%]">
      출생연도
      <small className={`text-xs text-g1 mb-[12px] ${errors.birthYear ? 'text-r' : 'text-g2'}`}>
        {errors.birthYear?.message === '유효한 출생연도를 입력해주세요.'
          ? '4자리의 출생연도를 입력해 주세요(ex. 1999)'
          : ''}
      </small>
      <input
        className={`w-full p-[16px] bg-w3 rounded-lg border text-base outline-none focus:border-gn1 text-black placeholder:text-g3 ${
          errors.birthYear ? 'border-r' : 'border-w4'
        }`}
        placeholder="4자리의 출생연도를 입력해 주세요 (ex. 1999)"
        {...register('birthYear', {
          required: '출생연도는 필수 입력입니다.',
          validate: (value) => {
            const year = Number(value);
            return /^\d{4}$/.test(String(value)) && year >= 1900 && year <= new Date().getFullYear()
              ? true
              : '유효한 출생연도를 입력해주세요.';
          },
        })}
      />
    </label>
  );
}

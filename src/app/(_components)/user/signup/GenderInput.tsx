'use client';

import { Control, UseFormRegister, UseFormWatch, useFormState } from 'react-hook-form';

import { IAdditional } from '@/app/(_utils)/type';

interface GenderInputProps {
  register: UseFormRegister<IAdditional>;
  watch: UseFormWatch<IAdditional>;
  control: Control<IAdditional>;
}

export default function GenderInput({ register, control, watch }: GenderInputProps) {
  const { errors } = useFormState({ control });
  return (
    <label className="mt-[40px] flex flex-col text-sm text-b3 tracking-[-2%]">
      성별
      <small className={`text-xs text-g1 mb-[12px] ${errors.gender ? 'text-r' : 'text-g2'}`}>
        {errors.gender?.message === '성별은 필수 입력입니다.' ? '성별을 선택해 주세요' : ''}
      </small>
      <div className="flex gap-4">
        {[
          { label: '남성', value: 'male' },
          { label: '여성', value: 'female' },
        ].map(({ label, value }) => (
          <label
            key={value}
            className={`
          flex-1 text-center py-3 rounded-lg border cursor-pointer 
          transition-all font-semibold text-b3 text-sm
          ${watch('gender') === value ? 'bg-gn4 border-gn1' : 'bg-w3 border-w4'}
        `}
          >
            <input
              type="radio"
              value={value}
              {...register('gender', { required: '성별은 필수 입력입니다.' })}
              className="hidden"
            />
            {label}
          </label>
        ))}
      </div>
    </label>
  );
}

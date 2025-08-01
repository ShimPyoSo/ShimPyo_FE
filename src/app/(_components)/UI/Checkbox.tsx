'use client';

import { FieldValues, Path, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { ILogin, IWithdraw } from '@/app/(_utils)/type';

import Image from 'next/image';
import check from '/public/images/icons/check.svg';

interface CheckBoxProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  name: Path<T>;
  required?: boolean;
}

export default function CheckBox<T extends ILogin | IWithdraw>({ register, watch, name, required }: CheckBoxProps<T>) {
  const isChecked = watch(name as Path<T>);

  return (
    <>
      <input
        type="checkbox"
        className="peer hidden"
        {...register(name, required ? { required: '필수 항목입니다.' } : {})}
      />
      <div className="w-5 h-5 border border-w4 bg-w4 rounded-sm peer-checked:bg-gn4 peer-checked:border-gn1 relative">
        {isChecked && <Image className="absolute top-[4px] left-[4px]" src={check} alt="check" width={11} height={8} />}
      </div>
    </>
  );
}

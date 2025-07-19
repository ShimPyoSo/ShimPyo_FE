'use client';

import { FieldValues, Path, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { IFind, ISignUp } from '@/app/(_utils)/type';
import { useEffect, useState } from 'react';

import axios from 'axios';

interface IdInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  type: 'signup' | 'find';

  isIdChecked?: boolean;
  setIsIdChecked?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IdInput<T extends ISignUp | IFind>({
  register,
  watch,
  type,
  isIdChecked = false,
  setIsIdChecked,
}: IdInputProps<T>) {
  const username = watch('username' as Path<T>);
  const [isIdDuplicated, setIsIdDuplicated] = useState(false);

  const handleCheckId = async () => {
    if (username === '') {
      // id를 입력하지 않는 경우 return 코드 추가 예정
      return;
    }

    try {
      await axios.get(`/check?id=${username}`);
      setIsIdChecked?.(true);
    } catch {
      setIsIdDuplicated(true);
    }
  };

  useEffect(() => {
    if (isIdChecked && setIsIdChecked) {
      setIsIdChecked(false);
    }
  }, [username, isIdChecked, setIsIdChecked]);

  return (
    <>
      <label className={`flex flex-col text-sm text-b3 tracking-[-2%] ${type === 'find' ? 'mt-[30px]' : ''}`}>
        아이디
        <input
          className="w-full mt-[12px] p-[16px] bg-w3 rounded-lg border border-w4 text-base outline-none focus:border-gn1 text-black placeholder:text-g3"
          placeholder="아이디를 입력해 주세요"
          {...register('username' as Path<T>, { required: '아이디는 필수입니다.' })}
        />
      </label>
      {type === 'signup' && (
        <>
          <button
            className={`mt-[16px] px-[15px] py-[10px] rounded-md border text-sm font-semibold tracking-[-2%] ${
              isIdChecked ? 'border-gn7 bg-gn8 text-gn1' : 'border-[#EDEDED] bg-w2 text-b2'
            }`}
            type="button"
            onClick={handleCheckId}
          >
            중복확인
          </button>
          <p className={`mt-[6px] text-xs ${isIdDuplicated ? 'text-r' : 'text-b3'}`}>
            {isIdDuplicated ? '이미 존재하는 아이디예요' : '아이디 입력 후 중복 확인을 진행해 주세요'}
          </p>
        </>
      )}
    </>
  );
}

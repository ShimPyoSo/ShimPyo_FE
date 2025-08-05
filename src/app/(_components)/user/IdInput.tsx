'use client';

import { Control, FieldValues, Path, UseFormRegister, UseFormWatch, useFormState } from 'react-hook-form';
import { IFind, ISignUp } from '@/app/(_utils)/type';
import { useEffect, useState } from 'react';

import axios from 'axios';

interface IdInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  control: Control<T>;
  type: 'signup' | 'find';

  isIdChecked?: boolean;
  setIsIdChecked?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IdInput<T extends ISignUp | IFind>({
  register,
  watch,
  control,
  type,
  isIdChecked = false,
  setIsIdChecked,
}: IdInputProps<T>) {
  const { errors } = useFormState({ control });
  const username = watch('username' as Path<T>);
  const [isIdDuplicated, setIsIdDuplicated] = useState(false);
  const [prevUsername, setPrevUsername] = useState('');

  const handleCheckId = async () => {
    if (!username) {
      return;
    }

    try {
      await axios.get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/duplicate/username?username=${username}`);
      setIsIdChecked?.(true);
      setIsIdDuplicated(false);
      setPrevUsername(username);
    } catch {
      setIsIdDuplicated(true);
    }
  };

  useEffect(() => {
    if (username !== prevUsername && isIdChecked && setIsIdChecked) {
      setIsIdChecked(false);
    }
  }, [prevUsername, username, isIdChecked, setIsIdChecked]);

  return (
    <>
      <label className={`flex flex-col text-sm text-b3 tracking-[-2%] ${type === 'find' ? 'mt-[30px]' : ''}`}>
        아이디
        {type === 'signup' && (
          <small>
            {errors.username?.message === '아이디는 영소문자와 숫자로 6~12자여야 합니다.'
              ? '아이디를 양식에 맞춰 설정해 주세요'
              : '아이디는 영문 소문자, 숫자 조합의 6~12자로 설정해요'}
          </small>
        )}
        <input
          className={`w-full mt-[12px] p-[16px] bg-w3 rounded-lg border text-base outline-none text-black placeholder:text-g3 ${
            errors.username ? 'border-r' : 'border-w4 focus:border-gn1'
          }`}
          placeholder="아이디를 입력해 주세요"
          {...register('username' as Path<T>, {
            required: '아이디는 필수입니다.',
            ...(type === 'signup' && {
              pattern: {
                value: /^[a-z0-9]{6,12}$/,
                message: '아이디는 영소문자와 숫자로 6~12자여야 합니다.',
              },
            }),
          })}
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
            {isIdDuplicated
              ? '이미 존재하는 아이디예요'
              : isIdChecked
              ? '사용할 수 있는 아이디예요'
              : '아이디 입력 후 중복 확인을 진행해 주세요'}
          </p>
        </>
      )}
    </>
  );
}

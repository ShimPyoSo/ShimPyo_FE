'use client';

import axios, { AxiosError } from 'axios';
import { useForm, useFormState } from 'react-hook-form';

import { IError } from '@/app/(_utils)/type';
import { updateNicknameAtom } from '@/app/(_store)/auth';
import { useAtom } from 'jotai';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';
import { useNicknameCheck } from '@/app/(_utils)/hooks/useNicknameCheck';

interface NicknameChangeProps {
  setIsNicknameAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NicknameChange({ setIsNicknameAlert }: NicknameChangeProps) {
  const { register, handleSubmit, watch, control } = useForm<{ nickname: string }>({ mode: 'onBlur' });
  const { errors } = useFormState({ control });
  const [, updateNickname] = useAtom(updateNicknameAtom);
  const { isAvailable, checkDuplicate } = useNicknameCheck();
  const { handleAccessExpired } = useHandleTokenExpired();

  const nickname = watch('nickname');

  const onSubmit = async (data: { nickname: string }) => {
    if (nickname.length < 2 && nickname.length > 8) return; // 닉네임 길이 오류 수 처리 추후 수정
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/nickname`, data, {
        withCredentials: true,
      });
      updateNickname(nickname);
      setIsNicknameAlert(true);
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/nickname`, data, {
            withCredentials: true,
          });
          updateNickname(nickname);
          setIsNicknameAlert(true);
        } catch {
          // 오류 시 처리
        }
      }
      console.log(err.response?.data?.message);
    }
  };

  return (
    <section className="bg-w3 px-[20px] py-[16px]">
      <h3 className="text-sm text-b1 font-semibold tracking-[-0.02em]">닉네임 변경</h3>
      <p className={isAvailable === false ? 'text-r' : `text-g1`}>
        {isAvailable === false ? '이미 존재하는 닉네임이예요' : '원하는 닉네임으로 변경해 보세요'}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={`mt-[12px] w-full bg-white border px-[16px] py-[12px] rounded-lg text-sm text-b1 outline-none placeholder:text-g3 ${
            errors.nickname && nickname.length > 0 ? 'border-r' : 'border-w4 hover:border-gn1'
          }`}
          placeholder="닉네임을 입력해 주세요"
          {...register('nickname', {
            required: '닉네임은 필수 입력입니다.',
            minLength: {
              value: 2,
              message: '닉네임은 최소 2자 이상이어야 합니다.',
            },
            maxLength: {
              value: 8,
              message: '닉네임은 최대 8자까지 입력할 수 있습니다.',
            },
            onChange: (e) => checkDuplicate(e.target.value),
          })}
        />
        <button
          className={`mt-[16px] border px-[12px] py-[8px] rounded-md ${
            nickname && isAvailable ? 'text-white bg-gn1 border-gn4' : 'text-g4 bg-w3 border-w4'
          }`}
          disabled={!nickname || !isAvailable}
        >
          변경하기
        </button>
      </form>
    </section>
  );
}

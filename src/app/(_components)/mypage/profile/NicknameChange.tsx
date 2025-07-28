'use client';

import { useForm, useFormState } from 'react-hook-form';

import axios from 'axios';
import { updateNicknameAtom } from '@/app/(_store)/auth';
import { useAtom } from 'jotai';
import { useNicknameCheck } from '@/app/(_utils)/hooks/useNicknameCheck';

export default function NicknameChange() {
  const { register, handleSubmit, watch, control } = useForm<{ nickname: string }>({ mode: 'onChange' });
  const { errors } = useFormState({ control });
  const nickname = watch('nickname');
  const [, updateNickname] = useAtom(updateNicknameAtom);
  const { isAvailable, checkDuplicate } = useNicknameCheck();

  const onSubmit = async (data: { nickname: string }) => {
    if (nickname.length < 2 && nickname.length > 8) return; // 닉네임 길이 오류 수 처리 추후 수정
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/mypage/nickname`, data);
      updateNickname(nickname);
    } catch (error) {
      console.log(error); // error 처리 컴포넌트 구현 후 수정
    }
  };

  return (
    <section className="bg-w3 px-[20px] py-[16px]">
      <h3 className="text-sm text-b1 font-semibold tracking-[-2%]">닉네임 변경</h3>
      <p className={!isAvailable ? 'text-r' : `text-g1`}>
        {!isAvailable ? '이미 존재하는 닉네임이예요' : '원하는 닉네임으로 변경해 보세요'}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className={`mt-[12px] w-full bg-white border px-[16px] py-[12px] rounded-lg text-sm text-b1 outline-none placeholder:text-g3 ${
            errors.nickname ? 'border-r' : 'border-w4'
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

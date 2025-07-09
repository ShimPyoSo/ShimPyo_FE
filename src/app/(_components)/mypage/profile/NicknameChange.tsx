'use client';

import { useRef, useState } from 'react';

import axios from 'axios';
import { updateNicknameAtom } from '@/app/(_store)/auth';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';

export default function NicknameChange() {
  const { register, handleSubmit, watch } = useForm<{ nickname: string }>();
  const nickname = watch('nickname');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const [, updateNickname] = useAtom(updateNicknameAtom);

  const checkDuplicate = (nickname: string) => {
    if (!nickname || nickname.trim() === '') {
      setIsAvailable(null);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        await axios.get(`/nickname?nickname=${nickname}`, { withCredentials: true });
        setIsAvailable(true);
      } catch (error) {
        console.error(error);
        setIsAvailable(null);
      }
    }, 500);
  };

  const onSubmit = async (data: { nickname: string }) => {
    if (!isAvailable) {
      return; // 닉네임 중복 문제가 해결되지 않은 경우 처리 추후 수정
    }

    try {
      await axios.patch('/nickname', data);
      updateNickname(nickname);
    } catch (error) {
      console.log(error); // error 처리 컴포넌트 구현 후 수정
    }
  };

  return (
    <section className="bg-w3 px-[20px] py-[16px]">
      <h3 className="text-sm text-b1 font-semibold tracking-[-2%]">닉네임 변경</h3>
      <p className="text-g1">원하는 닉네임으로 변경해 보세요</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="mt-[12px] w-full bg-white border border-w4 px-[16px] py-[12px] rounded-lg text-sm text-b1 outline-none"
          placeholder="닉네임을 입력해 주세요"
          {...register('nickname', {
            required: '닉네임은 필수 입력입니다.',
            onChange: (e) => checkDuplicate(e.target.value),
          })}
        />
        <button
          className={`mt-[16px] border px-[12px] py-[8px] rounded-md ${
            nickname ? 'text-white bg-gn1 border-gn4' : 'text-g4 bg-w3 border-w4'
          }`}
        >
          변경하기
        </button>
      </form>
    </section>
  );
}

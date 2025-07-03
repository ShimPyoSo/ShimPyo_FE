'use client';

import EmailAuth from '@/app/(_components)/user/EmailAuth';
import { IFind } from '@/app/(_utils)/type';
import IdInput from '@/app/(_components)/user/IdInput';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useState } from 'react';

export default function Find() {
  const { type } = useParams();
  const { register, handleSubmit, watch } = useForm<IFind>();
  const [isVerified, setIsVerified] = useState(false);

  const onSubmit = async (data: IFind) => {
    if (!isVerified) {
      // 인증 완료하지 않은 회원 return 코드 추가 예정
      return;
    }

    try {
      await axios.post('/signup', data);
    } catch (error) {
      console.log(error); // error 처리 컴포넌트 구현 후 수정
    }
  };

  return (
    <div className="min-h-full bg-w1 flex flex-col justify-between px-[16px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 justify-between">
        <section>
          {type === 'password' && <IdInput register={register} watch={watch} type={'find'} />}
          <EmailAuth register={register} watch={watch} setIsVerified={setIsVerified} />
        </section>

        <button className="w-full bg-gn1 py-[16px] border border-gn5 text-white font-semibold rounded-lg mb-[40px]">
          {type === 'id' ? '아이디 찾기' : '비밀번호 재설정 하기'}
        </button>
      </form>
    </div>
  );
}

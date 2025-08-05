'use client';

import { IFind, IFindResult } from '@/app/(_utils)/type';
import { useForm, useFormState } from 'react-hook-form';

import EmailAuth from '../EmailAuth';
import IdInput from '../IdInput';
import axios from 'axios';
import { domainOptions } from '@/app/(_utils)/constants';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface FindFormProps {
  setIsFinded: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEmailOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setResult: React.Dispatch<React.SetStateAction<null | IFindResult>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FindForm({ setResult, setIsFinded, setIsEmailOpen, setIsLoading }: FindFormProps) {
  const { type } = useParams();
  const { register, handleSubmit, watch, control } = useForm<IFind>({ mode: 'onBlur' });
  const { isValid } = useFormState({ control });
  const [isVerified, setIsVerified] = useState(false);
  const [customDomain, setCustomDomain] = useState('');
  const [selectedDomain, setSelectedDomain] = useState(domainOptions[0]);

  const onSubmit = async (data: IFind) => {
    if (!isVerified) {
      // 인증 완료하지 않은 회원 return 코드 추가 예정
      return;
    }

    try {
      const fullEmail = `${data.email}@${selectedDomain.value === 'custom' ? customDomain : selectedDomain.value}`;

      if (type === 'id') {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/username`, {
          email: fullEmail,
        });
        setResult(response.data);
      } else if (type === 'password')
        await axios.patch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/password`, {
          email: fullEmail,
          username: data.username,
        });
      setIsFinded(true);
    } catch (error) {
      console.log(error); // error 처리 컴포넌트 구현 후 수정
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1 justify-between">
      <section>
        {type === 'password' && <IdInput register={register} watch={watch} type={'find'} control={control} />}
        <EmailAuth
          register={register}
          watch={watch}
          setIsVerified={setIsVerified}
          isVertified={isVerified}
          type="find"
          customDomain={customDomain}
          setCustomDomain={setCustomDomain}
          selectedDomain={selectedDomain}
          setSelectedDomain={setSelectedDomain}
          setIsOpen={setIsEmailOpen}
          setIsLoading={setIsLoading}
        />
      </section>

      <button
        className={`w-full py-[16px] border font-semibold rounded-lg mb-[40px] ${
          isValid ? 'bg-gn1 border-gn5 text-white' : 'bg-w3 border-w4 text-g2'
        }`}
        disabled={!isValid}
      >
        {type === 'id' ? '아이디 찾기' : '비밀번호 재설정 하기'}
      </button>
    </form>
  );
}

'use client';

import { useForm, useFormState } from 'react-hook-form';

import BirthYearInput from './BirthYearInput';
import GenderInput from './GenderInput';
import { IAdditional } from '@/app/(_utils)/type';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function AdditionalForm() {
  const { register, handleSubmit, watch, control } = useForm<IAdditional>({ mode: 'onChange' });
  const { isValid } = useFormState({ control });
  const router = useRouter();

  const onSubmit = async (data: IAdditional) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth/info`, data, { withCredentials: true });
      router.push('/');
    } catch (error) {
      console.log(error); // error 처리 컴포넌트 구현 후 수정
    }
  };

  return (
    <form className="h-full relative" onSubmit={handleSubmit(onSubmit)}>
      <BirthYearInput register={register} control={control} />
      <GenderInput register={register} control={control} watch={watch} />

      <button
        type="submit"
        className={`absolute bottom-0 mb-[32px] w-full py-[16px] rounded-lg border font-semibold ${
          isValid ? 'bg-gn1 border-gn5 text-white' : 'bg-w3 border-w4 text-g2'
        } `}
      >
        저장하기
      </button>
    </form>
  );
}

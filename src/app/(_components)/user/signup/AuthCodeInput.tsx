import { ISignUp } from '@/app/(_utils)/type';
import { UseFormRegister } from 'react-hook-form';

interface AuthCodeInputProps {
  isAuthStart: boolean;
  register: UseFormRegister<ISignUp>;
}

export default function AuthCodeInput({ isAuthStart, register }: AuthCodeInputProps) {
  return (
    <>
      {isAuthStart && (
        <>
          <label className="mt-[40px] flex flex-col text-sm text-b3 tracking-[-2%]">
            인증 코드
            <input
              className="w-full mt-[12px] p-[16px] bg-w3 rounded-lg border border-w4 text-base outline-none focus:border-gn1 text-black"
              placeholder="인증코드를 입력해 주세요"
              {...(register('email'), { required: true })}
            />
          </label>
          <button className="mt-[16px] px-[15px] py-[10px] rounded-md border border-[#EDEDED] bg-w2 text-sm text-b2 font-semibold tracking-[-2%]">
            확인하기
          </button>
          <p className="mt-[6px] text-xs text-b3">인증 코드를 입력한 후 확인하기를 눌러주세요</p>
        </>
      )}
    </>
  );
}

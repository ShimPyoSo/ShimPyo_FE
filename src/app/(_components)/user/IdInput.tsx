import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { IFind, ISignUp } from '@/app/(_utils)/type';

interface IdInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  type: 'signup' | 'find';
}

export default function IdInput<T extends ISignUp | IFind>({ register, type }: IdInputProps<T>) {
  return (
    <>
      <label className={`flex flex-col text-sm text-b3 tracking-[-2%] ${type === 'find' ? 'mt-[30px]' : ''}`}>
        아이디
        <input
          className="w-full mt-[12px] p-[16px] bg-w3 rounded-lg border border-w4 text-base outline-none focus:border-gn1 text-black"
          placeholder="아이디를 입력해 주세요"
          {...(register('username' as Path<T>), { required: true })}
        />
      </label>
      {type === 'signup' && (
        <>
          <button className="mt-[16px] px-[15px] py-[10px] rounded-md border border-[#EDEDED] bg-w2 text-sm text-b2 font-semibold tracking-[-2%]">
            중복확인
          </button>
          <p className="mt-[6px] text-xs text-b3">아이디 입력 후 중복 확인을 진행해 주세요</p>
        </>
      )}
    </>
  );
}

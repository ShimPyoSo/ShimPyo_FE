import { useState } from 'react';

export default function PasswordChange() {
  const [nickname, setNickname] = useState('');

  return (
    <section className="bg-w3 px-[20px] py-[16px]">
      <h3 className="text-sm text-b1 font-semibold tracking-[-2%]">비밀번호 변경</h3>
      <p className="text-g1">8글자 이상의 영문, 특수문자, 숫자 조합으로 설정해요</p>
      <form>
        <input
          className="mt-[12px] w-full bg-white border border-w4 px-[16px] py-[12px] rounded-lg text-sm text-b1 outline-none"
          placeholder="닉네임을 입력해 주세요"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
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

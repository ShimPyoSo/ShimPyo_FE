'use client';

import { IError, IWithdraw } from '@/app/(_utils)/type';
import axios, { AxiosError } from 'axios';

import CheckBox from '../../UI/Checkbox';
import { useForm } from 'react-hook-form';
import { useHandleTokenExpired } from '@/app/(_utils)/hooks/useHandleTokenExpired';

interface WithdrawFormProps {
  setIsWithdrawAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SocailWithdrawForm({ setIsWithdrawAlert }: WithdrawFormProps) {
  const { register, watch, handleSubmit } = useForm<IWithdraw>({
    mode: 'onBlur',
    defaultValues: {
      password: undefined,
    },
  });
  const isConfirmed = watch('isConfirmed');
  const { handleAccessExpired } = useHandleTokenExpired();

  const onSubmit = async (data: IWithdraw) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth`, {
        data: { password: null },
        withCredentials: true,
      });
      setIsWithdrawAlert(true);
    } catch (error) {
      const err = error as AxiosError<IError>;
      if (err.response?.data?.name === 'INVALID_TOKEN' || err.response?.data?.message === '만료된 토큰입니다.') {
        handleAccessExpired('INVALID_TOKEN');
        try {
          await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/user/auth`, {
            data: { password: data.password },
            withCredentials: true,
          });
          setIsWithdrawAlert(true);
        } catch {
          // reissue 이후 에러처리
        }
      }
      console.log(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-[32px] w-full h-[280px] lg:h-[520px] overflow-y-scroll rounded-lg border border-w4 bg-white p-[12px] ">
        <p className="font-semibold">[회원 탈퇴 시 처리 안내]</p> <br />
        회원 탈퇴를 신청하실 경우, 아래 내용을 반드시 확인해주시기 바랍니다.
        <br />
        <br /> 1. 회원 탈퇴가 완료되면, 회원님의 계정 및 개인정보는 『개인정보 보호법』 등 관련 법령에 따라 일정 기간
        보관된 후 안전하게 파기됩니다.
        <br />
        2. 탈퇴 이후에는 로그인 및 모든 개인 맞춤형 서비스 이용이 불가능하며, 계정 복구 또한 불가합니다. <br />
        3. 회원님이 작성하신 관광지 후기, 댓글, 기타 게시물은 서비스의 공공성과 정보의 연속성을 위해 탈퇴 후에도
        삭제되지 않습니다. 단, 해당 게시물에는 개인정보가 노출되지 않도록 필요한 조치를 취합니다. <br />
        4. 서비스 운영 상 필요한 경우(예: 부정 이용 방지, 민원 처리 등), 관계 법령에 근거하여 최소한의 정보는 일정 기간
        동안 보관될 수 있습니다.
        <br />
        5. 동일한 이메일 주소로 재가입은 가능하지만, 기존에 작성하신 후기나 기록은 새로운 계정으로 이전되지 않습니다.
        <br />
        <br />위 내용을 충분히 숙지하였으며, 이에 동의하고 회원 탈퇴를 진행합니다.
      </div>
      <label className="mt-[32px] flex items-center space-x-2 cursor-pointer">
        <CheckBox register={register} watch={watch} name={'isConfirmed'} required={true} />
        <span className="text-xs text-b3">모든 사항을 꼼꼼히 읽었으며 탈퇴에 동의해요</span>
      </label>
      <div className="fixed bottom-[100px] flex justify-center z-[999]">
        <button
          className={`w-[343px] py-[16px] border font-semibold rounded-lg ${
            isConfirmed ? 'bg-gn1 border-gn5 text-white' : 'bg-w3 border-w4 text-g2'
          }`}
          disabled={!isConfirmed}
        >
          탈퇴하기
        </button>
      </div>
    </form>
  );
}

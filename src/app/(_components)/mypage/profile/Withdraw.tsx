import WithdrawForm from './WithdrawForm';

export default function Withdraw() {
  return (
    <section className="bg-w3 px-[20px] py-[16px]">
      <h3 className="text-sm text-b1 font-semibold tracking-[-2%]">회원 탈퇴</h3>
      <div className="mt-[12px] w-full min-h-[128px] rounded-lg border border-w4 bg-white p-[12px] "></div>
      <div className="mt-[8px] w-full min-h-[128px] rounded-lg border border-w4 bg-white p-[12px] "></div>
      <WithdrawForm />
    </section>
  );
}

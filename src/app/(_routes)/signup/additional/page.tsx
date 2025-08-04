import AdditionalForm from '@/app/(_components)/user/signup/AdditionalForm';

export default function AdditionalInfo() {
  return (
    <div className="h-full bg-w1 flex flex-col justify-between px-[16px] pt-[30px]">
      <h2 className="font-semibold text-2xl flex items-baseline">
        <p className="font-[kkubulim] text-gn1 font-normal">성별</p>과&nbsp;
        <p className="font-[kkubulim] text-gn1 font-normal">출생연도</p>를 알려주세요
      </h2>
      <small className="tracking-[-2%] text-g1">
        입력하신 정보는 연령대 및 성별에 따른 선호 여행지를 분석해,
        <br />
        회원님께 더욱 적합한 여행지를 추천해 드리는 데 활용돼요.
      </small>
      <AdditionalForm />
    </div>
  );
}

import WellnessItem from './WellnessItem';

export default function WeeklyWellness() {
  return (
    <section className="mb-[32px]">
      <div className="mt-[32px] w-full h-[208px] p-[10px] bg-white rounded-xl border border-w4">
        <p className="tracking-[-2%] font-semibold text-b1 text-sm">오늘의 웰니스 지수</p>
      </div>
      <WellnessItem />
      <span className="mt-[8px] flex items-center text-xs text-g1 tracking-[-2%]">
        <p className="text-b3">한국관광공사</p>에서 제공하는 정보예요.
      </span>
      <span className="mt-[20px] flex items-center tracking-[-2%] text-xs text-b3">
        ⏳<p className="font-semibold">조금만 기다려 주세요!</p>&nbsp;곧 이후의 웰니스 지수를 전해드릴게요.
      </span>
      <p className="text-xs text-g1 tracking-[-2%]">
        제공 기관의 데이터에 따라, 최대 3일치의 집중률 예측 추이를 제공합니다.
      </p>
    </section>
  );
}

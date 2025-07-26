export default function ReviewInput() {
  return (
    <section className="mt-[30px] tracking-[-2%]">
      <p className="font-[kkubulim] text-lg text-gn1">후기 내용</p>
      <small className="text-sm text-g1">해당 여행지에 방문한 솔직한 후기를 작성해 주세요</small>
      <textarea className="mt-[16px] w-full h-[175px] p-[16px] rounded-lg bg-w3 border border-w4 text-xs text-b1 overflow-y-auto outline-none resize-none" />
    </section>
  );
}

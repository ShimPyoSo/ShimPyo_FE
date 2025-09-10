interface ReviewInputProps {
  contents: string;
  setContents: React.Dispatch<React.SetStateAction<string>>;
}

export default function ReviewInput({ contents, setContents }: ReviewInputProps) {
  return (
    <section className="mt-[30px] tracking-[-0.02em]">
      <p className="font-[kkubulim] text-lg text-gn1">후기 내용</p>
      <small className={`text-sm ${contents.length > 500 ? 'text-r' : 'text-g1'}`}>
        {contents.length > 500
          ? '최대 500자의 후기만 등록이 가능해요'
          : '해당 여행지에 방문한 솔직한 후기를 작성해 주세요'}
      </small>
      <div className="relative">
        <textarea
          className="mt-[16px] w-full h-[175px] p-[16px] pb-[46px] rounded-lg bg-w3 border border-w4 text-xs text-b1 overflow-y-auto outline-none resize-none"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          placeholder="최소 5자의 후기 내용을 입력해 주세요"
        />
        <span className="absolute bottom-[16px] right-[16px] flex items-center text-xs text-g3/80 tracking-[-0.02em]">
          <p className={`${contents.length > 500 ? 'text-r/80' : 'text-g1/80'}`}>{contents.length}</p>/500
        </span>
      </div>
    </section>
  );
}

interface SearchSpotItemProps {
  touristId: number;
  detailId: number;
  setDetailId: React.Dispatch<React.SetStateAction<number>>;
}

export default function DetailButton({ touristId, detailId, setDetailId }: SearchSpotItemProps) {
  return (
    <button
      className={`w-fit text-xs bg-white py-[4px] px-[6px] rounded-md flex items-center ${
        detailId === touristId ? 'text-b3' : 'text-gn1'
      }`}
      onClick={() => setDetailId(detailId === touristId ? 0 : (touristId as number))}
    >
      {detailId === touristId ? '상세 소개 닫기' : '상세 소개 보기'}
      {detailId === touristId ? (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 11L10.5006 8L14 11"
            stroke="#919191"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 9L10.5006 12L14 9"
            stroke="#79987A"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}

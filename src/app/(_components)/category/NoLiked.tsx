import Image from 'next/image';
import noLiked from '/public/images/noLiked.svg';

export default function NoLiked() {
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-450px)]">
      <Image className="mb-[24px]" src={noLiked} alt="결과 없음" width={172} height={84} />
      <p className="text-xs text-g1 tracking-[-2%]">지금 다양한 여행지를 탐색해 보세요!</p>
      <p className="text-sm text-b3 font-semibold tracking-[-1.3%]">아직 찜한 여행지가 없어요</p>
    </div>
  );
}

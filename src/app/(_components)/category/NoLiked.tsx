import Image from 'next/image';
import noLiked from '/public/images/noLiked.svg';

export default function NoLiked({
  main,
  description,
  type,
}: {
  main: string;
  description: string;
  type: 'course' | 'spot';
}) {
  return (
    <div
      className={`flex flex-col justify-center items-center ${
        type === 'spot' ? 'h-[calc(100vh-450px)]' : 'h-[calc(100vh-250px)]'
      }`}
    >
      <Image className="mb-[24px]" src={noLiked} alt="결과 없음" width={172} height={84} />
      <p className="text-xs text-g1 tracking-[-0.02em]">{main}</p>
      <p className="text-sm text-b3 font-semibold tracking-[-0.013em]">{description}</p>
    </div>
  );
}

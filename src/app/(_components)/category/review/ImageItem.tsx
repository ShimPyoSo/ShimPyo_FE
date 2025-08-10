import Image from 'next/image';
import imageDelete from '/public/images/icons/imageDelete.svg';

export default function ImageItem({ img }: { img: string }) {
  return (
    <li className="w-[105px] h-[105px] rounded-lg relative">
      <Image className="object-cover" src={img} alt="이미지" fill />
      <button>
        <Image className="absolute top-[6px] right-[6px]" src={imageDelete} alt="삭제" width={17} height={17} />
      </button>
    </li>
  );
}

import Image from 'next/image';
import imageDelete from '/public/images/icons/imageDelete.svg';

interface ImageItemProps {
  img: string;
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ImageItem({ img, setImages }: ImageItemProps) {
  const handleDelete = () => {
    setImages((prev) => prev.filter((image) => image !== img));
  };

  return (
    <li className="w-[105px] h-[105px] rounded-lg relative">
      <Image className="rounded-lg object-cover" src={img} alt="이미지" fill />
      <button className="absolute top-[6px] right-[6px] cursor-pointer" onClick={handleDelete}>
        <Image src={imageDelete} alt="삭제" width={17} height={17} />
      </button>
    </li>
  );
}

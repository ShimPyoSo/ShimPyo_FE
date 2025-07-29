import Image from 'next/image';

interface ImageListProps {
  images: string[];
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImageList({ images, setIsOpen }: ImageListProps) {
  return (
    <section className="mt-[16px] flex items-center">
      <ul className="flex items-center gap-[6px]">
        {images.map((img, idx) => {
          return (
            <li className="w-[50px] h-[56px] rounded-sm relative" onClick={() => setIsOpen(true)} key={idx}>
              <Image className="w-[50px] h-[56px] rounded-sm object-cover" src={img} alt={'후기 이미지'} fill />
            </li>
          );
        })}
      </ul>
      {images.length > 5 && (
        <div className="ml-[8px] py-[2px] px-[6px] rounded-[80px] bg-w1 border border-w4 text-xs text-b3">
          + {images.length - 5}
        </div>
      )}
    </section>
  );
}

import ImageInputButton from './ImageInputButton';
import ImageItem from './ImageItem';

interface ImageInputProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  setIsImageError: React.Dispatch<React.SetStateAction<boolean>>;
  setIsImageCountError: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ImageInput({ images, setImages, setIsImageError, setIsImageCountError }: ImageInputProps) {
  return (
    <section className="mt-[60px] tracking-[-2%]">
      <span className="text-gn1 text-sm flex items-baseline">
        <p className="font-[kkubulim] text-lg">사진 업로드</p>(최대 8장)
      </span>
      <small className="text-sm text-g1">여행지를 실감나게 보여주는 사진을 업로드해 주세요 (선택)</small>

      <ul className="mt-[16px] grid grid-cols-3 gap-y-[12px] gap-x-[12px]">
        <li>
          <ImageInputButton
            images={images}
            setImages={setImages}
            setIsImageError={setIsImageError}
            setIsImageCountError={setIsImageCountError}
          />
        </li>

        {images.map((id) => (
          <ImageItem key={id} />
        ))}
      </ul>
    </section>
  );
}

import ImageInput from '@/app/(_components)/category/review/ImageInput';
import ReviewInput from '@/app/(_components)/category/review/ReviewInput';

interface RevieFormProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
  contents: string;
  setContents: React.Dispatch<React.SetStateAction<string>>;
  setIsImageError: React.Dispatch<React.SetStateAction<boolean>>;
  setIsImageCountError: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ReviewForm({
  setIsOpen,
  images,
  setImages,
  contents,
  setContents,
  setIsImageError,
  setIsImageCountError,
}: RevieFormProps) {
  return (
    <>
      <ReviewInput contents={contents} setContents={setContents} />
      <ImageInput
        images={images}
        setImages={setImages}
        setIsImageError={setIsImageError}
        setIsImageCountError={setIsImageCountError}
      />
      <button
        className="mt-[60px] mb-[40px] w-full py-[16px] bg-gn1 border border-gn5 rounded-lg text-white tracking-[-1.3%]"
        onClick={() => setIsOpen(true)}
      >
        등록하기
      </button>
    </>
  );
}

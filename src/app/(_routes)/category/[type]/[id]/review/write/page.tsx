import ImageList from '@/app/(_components)/category/review/ImageList';
import ReviewInput from '@/app/(_components)/category/review/ReviewInput';

export default function ReviewWrite() {
  return (
    <div className="min-h-full bg-w1 px-[16px]">
      <ReviewInput />
      <ImageList />
      <button className="mt-[60px] mb-[40px] w-full py-[16px] bg-gn1 border border-gn5 rounded-lg text-white tracking-[-1.3%]">
        등록하기
      </button>
    </div>
  );
}

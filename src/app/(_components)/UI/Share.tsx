import Image from 'next/image';
import share from '/public/images/icons/share.svg';

interface ShareProps {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  type: 'course' | 'spot';
  courseId?: number;
  token?: string;
}

export default function Share({ setIsOpen, type, courseId, token }: ShareProps) {
  const handleCopyURL = () => {
    let url = window.location.href;

    if (type === 'course' && courseId && token) {
      const origin = window.location.origin;
      url = `${origin}/course/${courseId}?token=${token}`;
    }

    navigator.clipboard
      .writeText(url)
      .then(() => {
        setIsOpen?.(true);
      })
      .catch(() => {});
  };

  return (
    <button className="cursor-pointer" onClick={handleCopyURL}>
      <Image src={share} alt="공유" width={24} height={24} />
    </button>
  );
}

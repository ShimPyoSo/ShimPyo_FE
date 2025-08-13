import Image from 'next/image';
import share from '/public/images/icons/share.svg';

interface ShareProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Share({ setIsOpen }: ShareProps) {
  const handleCopyURL = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setIsOpen(true);
      })
      .catch(() => {});
  };

  return (
    <button className="cursor-pointer" onClick={handleCopyURL}>
      <Image src={share} alt="공유" width={24} height={24} />
    </button>
  );
}

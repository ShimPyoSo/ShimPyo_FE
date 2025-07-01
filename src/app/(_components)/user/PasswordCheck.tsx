import Image from 'next/image';
import close from '/public/images/icons/closeEye.svg';
import open from '/public/images/icons/openEye.svg';

interface PasswordCheckProps {
  isFocused: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PasswordCheck({ isFocused, isOpen, setIsOpen }: PasswordCheckProps) {
  return (
    <>
      {isFocused && (
        <Image
          className="absolute right-[16px] top-[16px] cursor-pointer"
          src={isOpen ? close : open}
          alt={'password'}
          width={24}
          height={24}
          onClick={() => setIsOpen(!isOpen)}
        />
      )}
    </>
  );
}

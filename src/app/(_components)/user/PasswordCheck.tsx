import Image from 'next/image';
import close from '/public/images/icons/closeEye.svg';
import open from '/public/images/icons/openEye.svg';

interface PasswordCheckProps {
  isFocused: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  marginTop: number;
}

export default function PasswordCheck({ isFocused, isOpen, setIsOpen, marginTop }: PasswordCheckProps) {
  return (
    <>
      {isFocused && (
        <Image
          className="absolute right-[16px] cursor-pointer"
          style={{ top: `${marginTop}px` }}
          src={isOpen ? close : open}
          alt={'password'}
          width={24}
          height={24}
          onClick={() => setIsOpen(!isOpen)}
          onMouseDown={(e) => e.preventDefault()}
        />
      )}
    </>
  );
}

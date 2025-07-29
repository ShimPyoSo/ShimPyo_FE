'use client';

import Image from 'next/image';
import cancel from '/public/images/icons/cancel.svg';
import { motion } from 'framer-motion';

interface ConfirmProps {
  title: string;
  description: string;
  confirmText: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
}

export default function Alert({ title, description, confirmText, setIsOpen, onConfirm }: ConfirmProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <motion.div
        className="bg-black/70 w-[375px] h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
      >
        <motion.div
          className="w-[342px] h-[182px] rounded-2xl px-[16px] py-[18px] bg-w1 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <button className="absolute top-[16px] right-[16px]">
            <Image src={cancel} alt="닫기" width={24} height={24} />
          </button>
          <p className="text-xs text-g1 tracking-[-2%] text-center">{title}</p>
          <p className="mt-[10px] font-semibold text-b1 whitespace-pre-line text-center">{description}</p>
          <button
            className="mt-[16px] w-full py-[16px] bg-gn1 border border-gn5 text-white text-sm font-semibold rounded-lg text-center"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

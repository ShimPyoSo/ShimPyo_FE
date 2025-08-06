'use client';

import Image from 'next/image';
import cancel from '/public/images/icons/cancel.svg';
import { motion } from 'framer-motion';

interface ModalProps {
  title: string;
  description: string;
  setIsOpen: (value: boolean) => void;
  children: React.ReactNode;
  type: 'alert' | 'confirm';
}

export default function Modal({ title, description, setIsOpen, children, type }: ModalProps) {
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
          className="w-[342px] h-[182px] rounded-2xl px-[16px] py-[18px] bg-w1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {type === 'alert' && (
            <button className="absolute top-[16px] right-[16px]">
              <Image src={cancel} alt="닫기" width={24} height={24} />
            </button>
          )}
          <p className="text-xs text-g1 tracking-[-2%] text-center">{title}</p>
          <p className="mt-[6px] font-semibold text-b1 whitespace-pre-line text-center">{description}</p>
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

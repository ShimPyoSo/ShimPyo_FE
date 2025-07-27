'use client';

import { motion } from 'framer-motion';

interface ConfirmProps {
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Confirm({ title, description, confirmText, cancelText, setIsOpen }: ConfirmProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <motion.div
        className="bg-black/70 w-[375px] h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-[342px] h-[182px] rounded-2xl px-[16px] py-[18px] bg-w1"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <p className="text-xs text-g1 tracking-[-2%] text-center">{title}</p>
          <p className="mt-[6px] font-semibold text-b1 whitespace-pre-line text-center">{description}</p>
          <div className="mt-[16px] flex items-center justify-between gap-[12px]">
            <button className="grow-1 py-[16px] bg-gn1 border border-gn5 text-white text-sm font-semibold rounded-lg text-center">
              {confirmText}
            </button>
            <button
              className="grow-1 py-[16px] bg-[#fbfbfb] border border-w4 text-b1 text-sm font-semibold rounded-lg text-center"
              onClick={() => setIsOpen(false)}
            >
              {cancelText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

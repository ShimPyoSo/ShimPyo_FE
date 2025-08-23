'use client';

import { AnimatePresence, PanInfo, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import FocusLock from 'react-focus-lock';
import { createPortal } from 'react-dom';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function BottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
  const [isMounted, setIsMounted] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.y > 100) {
      onClose();
    }
  };

  const canDrag = () => {
    if (!sheetRef.current) return false;
    return sheetRef.current.scrollTop === 0;
  };

  if (!isMounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40 flex justify-center"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-w1 rounded-t-2xl z-50 h-[80vh] max-w-[375px] w-full px-[16px] pb-[16px] overflow-y-auto scrollbar-hide"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            dragListener={canDrag()}
            onDragEnd={handleDragEnd}
            ref={sheetRef}
          >
            <FocusLock>
              <div className="py-[16px] sticky top-0 z-10 bg-w1" onClick={() => onClose()}>
                <div className="h-1 w-10 bg-gray-300 rounded-full mx-auto" />
              </div>
              {children}
            </FocusLock>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

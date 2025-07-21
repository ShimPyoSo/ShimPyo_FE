import { AnimatePresence, PanInfo, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import FocusLock from 'react-focus-lock';
import { createPortal } from 'react-dom';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function FilterBottomSheet({ isOpen, onClose, children }: BottomSheetProps) {
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
            className="fixed bottom-0 left-1/2 -translate-x-1/2 bg-w1 rounded-t-2xl z-50 h-[80vh] max-w-[375px] w-full overflow-y-auto scrollbar-hide p-4"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            ref={sheetRef}
          >
            <FocusLock>
              <div className="h-1 w-10 bg-g2 rounded-full mx-auto my-2" />
              {children}
            </FocusLock>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}

'use client';

import '../../loader.css';

import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <motion.div
        className="bg-black/20 w-[375px] h-full flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="spinner-wrapper">
          <div className="background"></div>
          <div className="spinner"></div>
        </div>
      </motion.div>
    </div>
  );
}

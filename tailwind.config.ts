import type { Config } from 'tailwindcss';
import scrollbarHide from 'tailwind-scrollbar-hide';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      pretendard: ['Pretendard'],
      kkubulim: ['Kkubulim'],
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',

        // White 계열
        w1: '#F6F6F6',
        w2: '#EDEDED',
        w3: '#FAFAFA',
        w4: '#F0F0F0',
        w5: '#EAEAEA',
        w6: '#EFEFEF',

        // Black & Gray 계열
        b1: '#3C3C3C',
        b2: '#4C4C4C',
        b3: '#5A5A62',
        g1: '#919191',
        g2: '#B8B8B8',
        g3: '#C7C7C7',
        g4: '#D8D8D8',

        // Green 계열
        gn1: '#80A281',
        gn2: '#80A281', // 70%
        gn3: '#80A281', // 40%
        gn4: '#80A281', // 20%
        gn5: '#79987A',
        gn6: '#A5D0A6',
        gn7: '#B2D8B3',
        gn8: '#B2D8B3',
        gn9: '#AFC6AF',
        gn10: '#BBCCBB',
        gn11: '#E7E9E7',
        gn12: '#627262',

        // Red / Yellow
        r: '#ED9092',
        y: '#FEE500', // 카카오 노랑
      },
    },
  },
  plugins: [scrollbarHide],
} satisfies Config;

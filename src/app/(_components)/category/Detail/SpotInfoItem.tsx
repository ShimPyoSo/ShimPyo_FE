import Image, { StaticImageData } from 'next/image';

interface SpotInfoItemProps {
  icon: StaticImageData;
  label: string;
  children?: React.ReactNode;
}

export default function SpotInfoItem({ icon, label, children }: SpotInfoItemProps) {
  return (
    <li className="py-[12px] border-b border-g4">
      <div className="flex items-center gap-[4px]">
        <Image src={icon} alt={label} width={14} height={14} />
        <p className="text-b3 text-sm tracking-[-0.02em]">{label}</p>
      </div>
      {children && <div className="mt-[5px] text-xs text-g1 tracking-[-0.02em]">{children}</div>}
    </li>
  );
}

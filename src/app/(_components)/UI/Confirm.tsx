import Modal from './Modal';

interface ConfirmProps {
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
}

export default function Confirm({ title, description, confirmText, cancelText, setIsOpen, onConfirm }: ConfirmProps) {
  return (
    <Modal title={title} description={description} setIsOpen={setIsOpen} type="confirm">
      <div className="mt-[16px] flex items-center justify-between gap-[12px]">
        <button
          className="grow-1 py-[16px] bg-gn1 border border-gn5 text-white text-sm font-semibold rounded-lg text-center"
          onClick={onConfirm}
        >
          {confirmText}
        </button>
        <button
          className="grow-1 py-[16px] bg-[#fbfbfb] border border-w4 text-b1 text-sm font-semibold rounded-lg text-center"
          onClick={() => setIsOpen(false)}
        >
          {cancelText}
        </button>
      </div>
    </Modal>
  );
}

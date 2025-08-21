import Modal from './Modal';

interface ConfirmProps {
  title: string;
  description: string;
  confirmText: string;
  setIsOpen: (value: boolean) => void;
  onConfirm: () => void | Promise<void>;
}

export default function Alert({ title, description, confirmText, setIsOpen, onConfirm }: ConfirmProps) {
  return (
    <Modal title={title} description={description} setIsOpen={setIsOpen} type="alert">
      <button
        className="mt-[16px] w-full py-[16px] bg-gn1 border border-gn5 text-white text-sm font-semibold rounded-lg text-center"
        onClick={async () => {
          await onConfirm();
        }}
      >
        {confirmText}
      </button>
    </Modal>
  );
}

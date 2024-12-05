type ModalProps ={
    isOpen: boolean;
    onClose: ()=>void;
    children: React.ReactNode;
}
export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Content */}
      <div className="bg-white rounded-lg max-h-[500px] shadow-lg max-w-md w-full p-6 relative" style={{scrollBehavior: "smooth", overflowY: "scroll"}}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
}

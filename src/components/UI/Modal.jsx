import { useEffect } from 'react';
import Button from './Button';

const Modal = ({
  isOpen = true,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'max-w-lg',
  closeOnBackdropClick = true,
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Only disable body scrolling if the modal is actually open
    if (isOpen !== false) {
      // Store the original overflow value
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEsc);

      return () => {
        // Restore original overflow on unmount
        document.body.style.overflow = originalOverflow || '';
        document.removeEventListener('keydown', handleEsc);
      };
    }
    
    // No cleanup needed if modal isn't open
    return () => {};
  }, [isOpen, onClose]);

  if (isOpen === false) return null;

  const handleBackdropClick = (e) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-lg shadow-xl overflow-hidden relative ${maxWidth} w-full`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium" id="modal-title">
            {title}
          </h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-500"
            onClick={onClose}
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[70vh]">{children}</div>

        {footer && (
          <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
            {footer}
          </div>
        )}

        {!footer && (
          <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onClose}>Done</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal; 
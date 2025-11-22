import ReactDOM from 'react-dom';
import { FC, memo, useEffect } from 'react';
import { TModalProps } from './type';
import { ModalUI } from '@ui';
import { useParams } from 'react-router-dom';
import { ModalType, MODAL_TITLES } from '../../constants/modal-title';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (
    title === MODAL_TITLES[ModalType.ProfileOrder] ||
    title === MODAL_TITLES[ModalType.FeedOrder]
  ) {
    const { number } = useParams();
    title = `#${number}`;
  }

  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onClose}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});

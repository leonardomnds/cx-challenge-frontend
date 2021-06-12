import React from 'react';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';

import { Container } from './styles';

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen, message, onCancel, onConfirm,
}: ConfirmModalProps) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={onCancel}
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
  >

    <button
      type="button"
      className="react-modal-close"
      onClick={onCancel}
    >
      <MdClose size={24} />
    </button>

    <Container>
      <h2>Confirmação</h2>

      <p>{message}</p>

      <div>
        <button
          type="button"
          onClick={onConfirm}
        >
          Confirmar
        </button>
      </div>
    </Container>
  </Modal>
);

export default ConfirmModal;

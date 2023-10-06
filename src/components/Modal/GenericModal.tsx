import React, { useEffect, useState, createRef } from 'react';
import styled from 'styled-components';

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const GenericModal: React.FC<Props> = (props) => {
  const modalRef = createRef<HTMLDivElement>();
  const { open, onClose } = props;

  const handleClick = () => {
    onClose?.();
  };

  useEffect(() => {
    const closeEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeEsc);
    return () => window.removeEventListener('keydown', closeEsc);
  }, []);

  return (
    <ModalWrapper $open={open} onClick={handleClick}>
      <ModalContent
        id="modal-content"
        ref={modalRef}
        $open={open}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {props.children}
      </ModalContent>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div<{ $open: boolean }>`
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0;
  pointer-events: none;
  transition: 0.2s;

  ${(props) =>
    props.$open &&
    `
      opacity: 1;
      pointer-events: all;
  `}
`;

const ModalContent = styled.div<{ $open: boolean }>`
  width: 360px;
  padding: 24px;
  border-radius: 10px;
  background-color: white;
  transform: scale(0.2);
  transition: transform 0.2s;

  ${(props) => props.$open && 'transform: scale(1);'}
`;

export default GenericModal;

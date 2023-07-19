import { useState } from "react";

const useModal = () => {
  let [modalContent, setModalContent] = useState(null);
  let [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (modalComponent) => {
    setIsModalOpen(true);
    setModalContent(modalComponent);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return { openModal, closeModal, modalContent, isModalOpen };
};

export default useModal;

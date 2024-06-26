import { useState } from "react";

const useModal = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRow(null);
    setIsModalOpen(false);
  };

  return {
    selectedRow,
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModal;

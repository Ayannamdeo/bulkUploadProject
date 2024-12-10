import { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { isAuthenticated } from "../utils/helpers/auth";

const useModal = () => {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

  const openModal = (row) => {
    setSelectedRow(row);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedRow(null);
    setIsModalOpen(false);
  };

  const handleView = (row) => {
    setModalType("view");
    openModal(row);
  };

  const handleAdd = () => {
    const isAuth = isAuthenticated();
    if (!isAuth) {
      //redirect user to login page
      toast.error("Please login to perform  this action.");
      navigate("/login");
      return;
    }
    setModalType("add");
    openModal();
  };

  const handleEdit = (row) => {
    const isAuth = isAuthenticated();
    if (!isAuth) {
      //redirect user to login page
      toast.error("Please login to perform  this action.");
      navigate("/login");
      return;
    }
    setModalType("edit");
    openModal(row);
  };

  return {
    selectedRow,
    isModalOpen,
    openModal,
    closeModal,
    handleEdit,
    handleAdd,
    handleView,
    modalType,
    setModalType,
  };
};

export { useModal };

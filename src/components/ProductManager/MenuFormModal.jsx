import React, { useState, useEffect } from "react";
import { Modal } from "@mui/material";
import axios from "axios";
import { useUser } from "../../contexts/UserContext";

const MenuFormModal = ({
  menuForm,
  setMenuForm,
  handleSaveMenu,
  openModalMenu,
  setOpenModalMenu,
  theme,
}) => {
  const isDark = theme === "dark";
  const baseClass = isDark ? "bg-gray-800 text-white" : "bg-white text-black";

  const handleClose = () => setOpenModalMenu(false);

  const handleSaveAndClose = () => {
    handleSaveMenu();
    handleClose();
  };

  return (
    <Modal open={openModalMenu} onClose={handleClose}>
      <div className="flex items-center justify-center min-h-screen">
        <div
          className={`${baseClass} p-6 rounded-lg shadow-md w-150 max-w-4xl mx-auto`}
        >
          <h2 className="text-xl font-semibold mb-5 text-center">
            {menuForm?.id ? "Editar Menu" : "Adicionar Menu"}
          </h2>

          <form className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
            <div className="w-full md:w-80">
              <label className="block text-sm font-medium mb-1">
                Nome do Menu
              </label>
              <input
                type="text"
                name="name"
                value={menuForm?.name}
                onChange={(e) =>
                  setMenuForm({ ...menuForm, name: e.target.value })
                }
                className={`w-full px-2 py-2 border rounded-md ${
                  isDark
                    ? "bg-gray-700 text-white border-gray-600"
                    : "border-gray-300"
                } focus:outline-none focus:ring focus:border-blue-500`}
              />
            </div>
          </form>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="button"
              onClick={handleSaveAndClose}
              className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              {menuForm?.id ? "Atualizar" : "Salvar"}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className={`cursor-pointer px-4 py-2 border rounded-md ${
                isDark
                  ? "text-white border-gray-500 hover:bg-gray-600"
                  : "text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MenuFormModal;

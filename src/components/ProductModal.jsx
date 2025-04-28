import React, { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

const ProductModal = ({
  open,
  onClose,
  item,
  mode = "desc",
  onConfirm,
  theme,
}) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (open) setQuantity(1);
  }, [open]);

  // Determina as classes de fundo e texto com base no tema
  const backgroundClass =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black";
  const buttonClass =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-700 text-gray-100";
  const borderClass = theme === "dark" ? "border-gray-500" : "border-gray-300";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor:
            theme === "dark" ? "rgb(31, 41, 55)" : "rgb(255, 255, 255)",
          color: theme === "dark" ? "white" : "black",
          borderRadius: "16px",
          padding: "24px",
        },
      }}
    >
      <DialogTitle className="text-xl font-bold">
        {mode === "desc" ? "Descrição do Produto" : "Adicionar ao Carrinho"}
      </DialogTitle>
      <DialogContent dividers className="space-y-4">
        {item?.img && (
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        )}
        {mode === "desc" ? (
          <Typography className="text-gray-200">{item?.description}</Typography>
        ) : (
          <>
            <Typography className="text-gray-200">
              Deseja adicionar <strong>{item?.title}</strong> ao carrinho?
            </Typography>
            <Typography className="text-gray-400 pt-3">
              {item?.price}
            </Typography>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className={`cursor-pointer w-10 h-10 text-xl font-bold ${buttonClass} border ${borderClass} rounded-full transition-all duration-400 ease-in-out hover:bg-gray-800 hover:border-gray-400 shadow-sm active:scale-100`}
              >
                -
              </button>

              <p className="text-xl font-semibold text-white">{quantity}</p>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className={`cursor-pointer w-10 h-10 text-xl font-bold ${buttonClass} border ${borderClass} rounded-full transition-all duration-400 ease-in-out hover:bg-gray-800 hover:border-gray-400 shadow-sm active:scale-95`}
              >
                +
              </button>
            </div>
          </>
        )}
      </DialogContent>
      <div className="flex items-center justify-center mt-5">
        {mode === "add" && (
          <button
            onClick={() => {
              onConfirm && onConfirm(item, quantity);
              onClose();
            }}
            className="mr-3 w-[120px] bg-green-700 h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#00611f] before:to-[rgb(0, 0, 0)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
          >
            Confirmar
          </button>
        )}
        <button
          onClick={onClose}
          className="w-[120px] bg-red-800 h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#7b0800] before:to-[rgb(144, 76, 71)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
        >
          Fechar
        </button>
      </div>
    </Dialog>
  );
};

export default ProductModal;

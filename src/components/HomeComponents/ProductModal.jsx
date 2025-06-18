import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

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

  const buttonClass =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-700 text-gray-100";
  const borderClass = theme === "dark" ? "border-gray-500" : "border-gray-300";
  const textModal = theme === "dark" ? "text-gray-300" : "text-gray-900";
  const textValue = theme === "dark" ? "text-gray-400" : "text-gray-500";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      scroll="body"
      PaperProps={{
        style: {
          backgroundColor:
            theme === "dark" ? "rgb(31, 41, 55)" : "rgb(255, 255, 255)",
          color: theme === "dark" ? "white" : "black",
          borderRadius: "16px",
          padding: "16px",
          margin: "16px",
        },
      }}
    >
      <DialogTitle className="text-xl font-bold text-center">
        {mode === "desc" ? "Descrição do Produto" : "Adicionar ao Carrinho"}
      </DialogTitle>
      <DialogContent dividers className="space-y-4">
        {item?.image && (
          <img
            src={`http://localhost:3000${item.image}`}
            alt={item.name}
            className="w-full h-auto max-h-48 object-cover rounded-lg mb-4"
          />
        )}
        {mode === "desc" ? (
          <Typography className={textModal}>{item?.description}</Typography>
        ) : (
          <>
            <Typography className={textModal}>
              Deseja adicionar{" "}
              <strong className="text-green-500">{item?.name}</strong> ao
              carrinho?
            </Typography>
            <Typography className={`${textValue} text-center pt-3 text-lg `}>
              <p className="text-blue-400">
                R${" "}
                {(Number(item?.value || 0) * quantity)
                  .toFixed(2)
                  .replace(".", ",")}
              </p>
            </Typography>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className={`cursor-pointer w-10 h-10 text-xl font-bold ${buttonClass} border ${borderClass} rounded-full hover:scale-95 transition`}
              >
                -
              </button>
              <p className={`${textModal} text-xl font-semibold`}>{quantity}</p>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className={`cursor-pointer w-10 h-10 text-xl font-bold ${buttonClass} border ${borderClass} rounded-full hover:scale-95 transition`}
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

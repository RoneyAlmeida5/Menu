import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
} from "@mui/material";
import { BiLogoWhatsapp } from "react-icons/bi";
import { useCart } from "../contexts/CartContext";

const CartModal = ({ open, onClose }) => {
  const { cartItems, removeFromCart, totalQuantity } = useCart();

  const handleSendWhatsApp = () => {
    const phone = "5521964895107";
    if (cartItems.length === 0) return;

    const message = cartItems
      .map((item) => `• ${item.title} (Qtd: ${item.quantity})`)
      .join("\n");

    const finalMessage = `Olá! Gostaria de finalizar o pedido com os seguintes itens:\n\n${message}\n\nTotal de itens: ${totalQuantity}`;

    const encodedMessage = encodeURIComponent(finalMessage);
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;

    window.open(url, "_blank");
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          backgroundColor: "rgb(31, 41, 55)",
          color: "white",
          borderRadius: "16px",
          padding: "24px",
          position: "relative",
        },
      }}
    >
      {/* Botão Fechar */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-10 h-10 bg-red-800 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 hover:scale-110 shadow-md text-white z-10"
      >
        ✕
      </button>

      <DialogTitle className="text-xl font-bold">
        Seu Carrinho ({totalQuantity} {totalQuantity === 1 ? "item" : "itens"})
      </DialogTitle>

      <DialogContent
        dividers
        className="space-y-4 max-h-[400px] overflow-y-auto"
      >
        {cartItems.length === 0 ? (
          <Typography className="text-gray-300">Carrinho vazio.</Typography>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-gray-600 py-2"
            >
              <div className="mr-6">
                <Typography className="font-semibold text-white">
                  {item.title}
                </Typography>
                <Typography className="text-sm text-gray-400">
                  Qtd: {item.quantity}
                </Typography>
              </div>
              <Button
                variant="outlined"
                color="error"
                onClick={() => removeFromCart(item.id)}
              >
                Remover
              </Button>
            </div>
          ))
        )}
      </DialogContent>

      <div className="flex items-center justify-center gap-4 mt-5">
        <button
          onClick={handleSendWhatsApp}
          className="cursor-pointer relative bg-white/10 py-2 rounded-full min-w-[8.5rem] min-h-[2.92rem] group max-w-full flex items-center justify-start hover:bg-green-400 transition-all duration-[0.8s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] shadow-[inset_1px_2px_5px_#00000080]"
        >
          <div className="absolute flex px-1 py-0.5 justify-start items-center inset-0">
            <div className="w-[0%] group-hover:w-full transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]"></div>
            <div className="rounded-full shrink-0 flex justify-center items-center shadow-[inset_1px_-1px_3px_0_black] h-full aspect-square bg-green-400 transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:bg-black">
              <div className="flex items-center justify-center size-[2.0rem] text-black group-hover:text-white group-hover:-rotate-45 transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)]">
                <BiLogoWhatsapp size={30} />
              </div>
            </div>
          </div>
          <div className="pl-[3.4rem] pr-[1.1rem] group-hover:pl-[1.1rem] group-hover:pr-[3.4rem] transition-all duration-[1s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] group-hover:text-black text-white">
            Finalizar
          </div>
        </button>
      </div>
    </Dialog>
  );
};

export default CartModal;

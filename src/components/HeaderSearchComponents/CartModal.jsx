import React, { useState, useRef } from "react";
import { useCart } from "../../contexts/CartContext";
import { sendWhatsAppOrder } from "../../utils/whatsappSendUtils";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { FiCalendar } from "react-icons/fi";
import { BiLogoWhatsapp } from "react-icons/bi";

const CartModal = ({ open, onClose, theme }) => {
  const datepickerRef = useRef(null);
  const { cartItems, removeFromCart, totalQuantity } = useCart();
  const [deliveryDate, setDeliveryDate] = useState(dayjs());

  const textMutedClass = theme === "dark" ? "text-gray-400" : "text-gray-600";
  const borderClass = theme === "dark" ? "border-gray-600" : "border-gray-300";
  const buttonTextClass = theme === "dark" ? "text-white" : "text-black";

  const totalPrice = cartItems.reduce((acc, item) => {
    const priceNumber = parseFloat(
      item.price.replace("R$", "").replace(",", ".")
    );
    return acc + priceNumber * item.quantity;
  }, 0);

  const handleSendWhatsApp = () => {
    sendWhatsAppOrder({
      cartItems,
      totalPrice,
      deliveryDate,
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#000000",
          borderRadius: 6,
          p: 3,
          position: "relative",
        },
      }}
    >
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
        className={`space-y-4 max-h-[400px] overflow-y-auto ${borderClass}`}
      >
        <div className="flex flex-col mt-2 mb-4 relative">
          <label
            htmlFor="delivery-date"
            className={`mb-1 text-sm font-medium ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Data da Entrega
          </label>

          <DatePicker
            id="delivery-date"
            ref={datepickerRef}
            selected={deliveryDate.toDate()}
            onChange={(date) => setDeliveryDate(dayjs(date))}
            dateFormat="dd/MM/yyyy"
            className={`w-full px-4 py-2 pl-3 rounded-md border outline-none focus:ring-2 focus:ring-gray-600 transition-colors
          ${
            theme === "dark"
              ? "bg-gray-800 text-white border-gray-600"
              : "bg-white text-black border-gray-300"
          }
          `}
            calendarClassName={`rounded-lg shadow-lg mt-2 ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-black"
            }`}
            popperClassName="react-datepicker-popper"
          />
          <FiCalendar
            onClick={() => datepickerRef.current.setOpen(true)}
            className={`absolute cursor-pointer right-3 top-9 text-lg
            ${theme === "dark" ? "text-white" : "text-gray-700"}`}
          />
        </div>

        {cartItems.length === 0 ? (
          <Typography className={`${textMutedClass}`}>
            Carrinho vazio.
          </Typography>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className={`flex justify-between items-center border-b py-2 ${borderClass}`}
            >
              <div className="mr-6">
                <Typography className={`font-semibold ${buttonTextClass}`}>
                  {item.title}
                </Typography>
                <Typography className={`text-sm ${textMutedClass}`}>
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

      {cartItems.length > 0 && (
        <div className="flex justify-end mt-4 px-2">
          <Typography variant="h6" className={`${buttonTextClass}`}>
            Total: R$ {totalPrice.toFixed(2).replace(".", ",")}
          </Typography>
        </div>
      )}

      <div className="flex items-center justify-center gap-4 mt-5">
        <button
          onClick={handleSendWhatsApp}
          className={`cursor-pointer relative py-2 rounded-full min-w-[8.5rem] min-h-[2.92rem] group max-w-full flex items-center justify-start transition-all duration-[0.8s] ease-[cubic-bezier(0.510,0.026,0.368,1.016)] shadow-[inset_1px_2px_5px_#00000080]
          ${
            theme === "dark"
              ? "bg-white/10 hover:bg-green-400"
              : "bg-black/10 hover:bg-green-400"
          }`}
        >
          <div className="absolute flex px-1 py-0.5 justify-start items-center inset-0">
            <div className="w-[0%] group-hover:w-full transition-all duration-[1s]"></div>
            <div
              className={`rounded-full shrink-0 flex justify-center items-center shadow-[inset_1px_-1px_3px_0_black] h-full aspect-square 
              ${
                theme === "dark"
                  ? "bg-green-400 group-hover:bg-black"
                  : "bg-green-400 group-hover:bg-white"
              }`}
            >
              <div
                className={`flex items-center justify-center size-[2.0rem] 
                ${
                  theme === "dark"
                    ? "text-black group-hover:text-white"
                    : "text-black group-hover:text-black"
                } 
                group-hover:-rotate-45 transition-all duration-[1s]`}
              >
                <BiLogoWhatsapp size={30} />
              </div>
            </div>
          </div>
          <div
            className={`pl-[3.4rem] pr-[1.1rem] group-hover:pl-[1.1rem] group-hover:pr-[3.4rem] 
            ${
              theme === "dark"
                ? "group-hover:text-black text-white"
                : "group-hover:text-black text-black"
            }
            transition-all duration-[1s]`}
          >
            Finalizar
          </div>
        </button>
      </div>
    </Dialog>
  );
};

export default CartModal;

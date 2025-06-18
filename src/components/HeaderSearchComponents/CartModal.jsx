import React, { useState, useRef, useEffect } from "react";
// CONTEXTS & COMPONENTS
import { useCart } from "../../contexts/CartContext";
import { sendWhatsAppOrder } from "../../utils/whatsappSendUtils";
import PaymentMethodSelector from "./CartComponents/PaymentSelector";
// MATERIAL UI & IMAGES
import DateSelector from "./CartComponents/DateSelector";
import AddressInput from "./CartComponents/AddressInput";
import { BiLogoWhatsapp } from "react-icons/bi";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
} from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import BannerCard from "../../assets/bannercard.jpeg";

const CartModal = ({ open, onClose, theme }) => {
  const datepickerRef = useRef(null);
  const {
    cartItems,
    removeFromCart,
    totalQuantity,
    incrementQuantity,
    decrementQuantity,
  } = useCart();
  const [deliveryDate, setDeliveryDate] = useState(dayjs());
  const [selectedValue, setSelectedValue] = useState("Cartão");
  const [selectedAddress, setSelectedAddress] = useState(null);

  const textMutedClass =
    theme === "dark"
      ? "text-gray-300 font-semibold"
      : "text-gray-600 font-semibold";
  const borderClass = theme === "dark" ? "border-gray-600" : "border-gray-300";
  const buttonTextClass = theme === "dark" ? "text-white" : "text-black";

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const priceNumber = parseFloat(
      item.value.replace("R$", "").replace(",", ".")
    );
    return acc + priceNumber * item.quantity;
  }, 0);

  const handleSendWhatsApp = () => {
    if (!selectedAddress) {
      alert("Por favor, selecione um endereço para entrega.");
      return;
    }

    sendWhatsAppOrder({
      cartItems,
      totalPrice,
      deliveryDate,
      paymentMethodName: selectedValue,
      address: selectedAddress,
    });
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem("deliveryAddress");
    if (savedAddress) {
      try {
        setSelectedAddress(JSON.parse(savedAddress));
      } catch (error) {
        console.error("Erro ao carregar endereço do localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem("deliveryAddress", JSON.stringify(selectedAddress));
    }
  }, [selectedAddress]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
          color: theme === "dark" ? "#ffffff" : "#000000",
          borderRadius: 6,
          p: 4,
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
        className={`space-y-4 max-h-[600px] overflow-y-auto ${borderClass}`}
      >
        <DateSelector
          theme={theme}
          deliveryDate={deliveryDate}
          setDeliveryDate={setDeliveryDate}
          datepickerRef={datepickerRef}
        />
        <PaymentMethodSelector
          selectedValue={selectedValue}
          onChange={handleChange}
          theme={theme}
        />
        <AddressInput
          theme={theme}
          onSelect={(place) => setSelectedAddress(place)}
          initialAddress={selectedAddress}
        />
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
              <div className="flex flex-col mr-6">
                <img
                  src={`http://localhost:3000${item.image}`}
                  className="w-25 h-10"
                />
                <span className={`text-lg font-semibold ${buttonTextClass}`}>
                  {item.name}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="w-6 h-6 flex items-center justify-center bg-red-400 text-black rounded hover:scale-95"
                  >
                    -
                  </button>
                  <span className={`text-sm ${textMutedClass}`}>
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="w-6 h-6 flex items-center justify-center bg-green-400 text-black rounded hover:scale-95"
                  >
                    +
                  </button>
                </div>
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

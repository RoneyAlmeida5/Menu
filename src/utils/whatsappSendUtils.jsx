export const sendWhatsAppOrder = ({
  cartItems,
  totalPrice,
  deliveryDate,
  phone = "5521964895107",
  orderNumber = 31,
  paymentMethodIcon = "💳",
  paymentMethodName = "Cartão",
  deliveryIcon = "🛵",
  deliveryFee = 3.99,
  address = {
    address: "Rua Exemplo, Bairro, Cidade",
    houseNumber: "",
    complement: "",
  },
}) => {
  if (!cartItems || cartItems.length === 0) return;

  const itemsMessage = cartItems
    .map((item) => `➡ ${item.quantity}x ${item.title}`)
    .join("\n");

  const formattedDate = deliveryDate.format("DD/MM/YYYY");

  const finalMessage = `Pedido nº ${orderNumber}
    
  Itens:
  ${itemsMessage}

  ${paymentMethodIcon} ${paymentMethodName}

  ${deliveryIcon} Delivery (taxa de: R$ ${deliveryFee
    .toFixed(2)
    .replace(".", ",")})
  🏠 ${address.address}, Nº ${address.houseNumber}${
    address.complement ? `, ${address.complement}` : ""
  }

  📅 Data de entrega: ${formattedDate}

  Total: R$ ${totalPrice.toFixed(2).replace(".", ",")}

  Obrigado pela preferência, se precisar de algo é só chamar! 😉
  `;

  const encodedMessage = encodeURIComponent(finalMessage);
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;
  window.open(url, "_blank");
};

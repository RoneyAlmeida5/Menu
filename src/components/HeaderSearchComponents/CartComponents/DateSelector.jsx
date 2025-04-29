import React from "react";
import DatePicker from "react-datepicker";
import { FiCalendar } from "react-icons/fi";
import dayjs from "dayjs";

const DateSelector = ({
  theme,
  deliveryDate,
  setDeliveryDate,
  datepickerRef,
}) => {
  const textColor = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const inputClass =
    theme === "dark"
      ? "bg-gray-800 text-white border-gray-600"
      : "bg-white text-black border-gray-300";
  const calendarClass =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black";
  const iconColor = theme === "dark" ? "text-white" : "text-gray-700";

  return (
    <div className="flex flex-col mt-2 mb-4 relative">
      <label
        htmlFor="delivery-date"
        className={`mb-1 text-sm font-medium ${textColor}`}
      >
        Data da Entrega
      </label>

      <DatePicker
        id="delivery-date"
        ref={datepickerRef}
        selected={deliveryDate.toDate()}
        onChange={(date) => setDeliveryDate(dayjs(date))}
        dateFormat="dd/MM/yyyy"
        className={`w-full px-4 py-2 pl-3 rounded-md border outline-none focus:ring-2 focus:ring-gray-600 transition-colors ${inputClass}`}
        calendarClassName={`rounded-lg shadow-lg mt-2 ${calendarClass}`}
        popperClassName="react-datepicker-popper"
      />

      <FiCalendar
        onClick={() => datepickerRef.current.setOpen(true)}
        className={`absolute cursor-pointer right-3 top-9 text-lg ${iconColor}`}
      />
    </div>
  );
};

export default DateSelector;

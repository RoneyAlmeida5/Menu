const LoadingModals = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 rounded-lg z-30">
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="relative w-20 h-20 max-w-[200px] max-h-[200px]">
          <div
            className="absolute w-20 h-20 rounded-full border-[3px] border-gray-100/10 border-r-[#0ff] border-b-[#0ff] animate-spin"
            style={{ animationDuration: "3s" }}
          ></div>

          <div
            className="absolute w-20 h-20 rounded-full border-[3px] border-gray-100/10 border-t-[#0ff] animate-spin"
            style={{
              animationDuration: "2s",
              animationDirection: "reverse",
            }}
          ></div>
        </div>

        <p className="mt-4 text-white text-lg">Salvando...</p>
      </div>
    </div>
  );
};

export default LoadingModals;

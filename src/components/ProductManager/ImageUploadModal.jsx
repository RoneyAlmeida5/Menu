import React from "react";
import { Modal } from "@mui/material";
import toast from "react-hot-toast";

const ImageUploadModal = ({
  isOpen,
  onClose,
  openModalImageModal,
  setOpenModalImageModal,
  theme,
  logoPreview,
  handleLogoChange,
  handleUploadLogo,
  preview,
  handleFileChange,
  handleUpload,
  company,
}) => {
  if (!isOpen) return null;

  const backgroundModalClass =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800";
  const labelClass = theme === "dark" ? "text-gray-100" : "text-gray-800";

  const handleClose = () => setOpenModalImageModal(false);

  const handleUploadLogoWithToast = async () => {
    try {
      await toast.promise(handleUploadLogo(), {
        loading: "Enviando nova logo...",
        success: <p>Logo enviada com sucesso!</p>,
        error: <p>Erro ao enviar a logo.</p>,
      });
    } catch (error) {
      console.error("Erro no upload da logo:", error);
    }
  };

  const handleUploadBannerWithToast = async () => {
    try {
      await toast.promise(handleUpload(), {
        loading: "Enviando novo banner...",
        success: <p>Banner enviado com sucesso!</p>,
        error: <p>Erro ao enviar o banner.</p>,
      });
    } catch (error) {
      console.error("Erro no upload do banner:", error);
    }
  };

  return (
    <Modal open={openModalImageModal} onClose={handleClose}>
      <div className="fixed rounded-lg shadow-md inset-0 z-50 flex items-center justify-center">
        <div
          className={`relative ${backgroundModalClass} p-8 rounded-xl max-h-[90vh] overflow-y-auto`}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-3xl font-bold"
          >
            &times;
          </button>

          <h2 className={`text-2xl font-bold mb-6 text-center ${labelClass}`}>
            Gerenciar Imagens da Empresa
          </h2>

          <div className="flex flex-col md:flex-row justify-around items-start gap-8 items-stretch">
            {/* Seção de Alterar Logo */}
            <div className="flex flex-col items-center space-y-11 flex-1 w-full p-6 rounded-xl border border-gray-600 dark:border-gray-700">
              <div className="flex grid justify-center items-center">
                <label className={`text-xl font-semibold ${labelClass}`}>
                  Alterar Logo da Empresa
                </label>
                <p className="flex justify-center items-center text-gray-500">
                  largura x altura [500x500]
                </p>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="cursor-pointer border border-gray-300 rounded-md p-2 w-full text-sm text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-green-600 file:text-white
                  hover:file:bg-green-700
                  transition-colors duration-300"
              />

              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt="Prévia da nova logo"
                  className="w-32 h-32 object-cover rounded-full border-4 border-green-600 shadow-lg"
                />
              ) : (
                company?.image && (
                  <img
                    src={`http://localhost:3000${company.image}`}
                    alt="Logo atual"
                    className="w-32 h-32 object-cover rounded-full border-4 border-gray-400 shadow-lg"
                  />
                )
              )}

              <button
                onClick={handleUploadLogoWithToast}
                className="w-full bg-green-600 cursor-pointer hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-md
                  transition-colors duration-300"
              >
                Enviar Nova Logo
              </button>
            </div>

            {/* Seção de Alterar Banner */}
            <div className="flex flex-col items-center space-y-6 flex-2 w-full p-6 rounded-xl border border-gray-600 dark:border-gray-700">
              <div className="flex grid justify-center items-center">
                <label className={`text-xl font-semibold ${labelClass}`}>
                  Alterar Banner da Empresa
                </label>
                <p className="flex justify-center items-center text-gray-500">
                  largura x altura [1200x200]
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cursor-pointer border border-gray-300 rounded-md p-2 w-full text-sm text-gray-400
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-600 file:text-white
                hover:file:bg-blue-700
                transition-colors duration-300"
              />

              {preview && (
                <img
                  src={preview}
                  alt="Prévia do novo banner"
                  className="w-full h-48 object-cover rounded-lg shadow-lg border border-gray-200"
                />
              )}
              {company?.banner && !preview && (
                <img
                  src={`http://localhost:3000${company.banner}`}
                  alt="Banner atual"
                  className="w-full h-48 object-cover rounded-lg shadow-lg border border-gray-200"
                />
              )}

              <button
                onClick={handleUploadBannerWithToast}
                className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md
                  transition-colors duration-300"
              >
                Enviar Novo Banner
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ImageUploadModal;

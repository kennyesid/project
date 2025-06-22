import React from "react";

const ModalPopup = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              &times;
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </>
  );
};

export default ModalPopup;

import React from "react";

export function DeleteDialog({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="mb-6 pt-2">
          <h2 className="text-xl font-bold text-center text-black mb-2">
            Delete Course
          </h2>
          <p className="text-gray-600 font-semibold  text-center">
            Are you sure to delete this course?
          </p>
        </div>

        <div className="flex  justify-center gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-custom-pink text-white rounded-full hover:bg-pink-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

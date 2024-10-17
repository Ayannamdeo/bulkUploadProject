import { useEffect } from "react";

import { ReactPortal } from "../utils/helpers/reactPortal";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    const close_on_escape = (e) => (e.key === "Escape" ? onClose() : null);
    document.addEventListener("keydown", close_on_escape);

    return () => document.removeEventListener("keydown", close_on_escape);
  }, [onClose]);

  if (!isOpen) return null;
  console.log("modal opened !!!!!");

  return (
    <ReactPortal>
      <div
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        onClick={onClose}
      >
        <div
          className="max-h-screen overflow-y-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </ReactPortal>
  );
};

export default Modal;
//   <ReactPortal>
//
// <div className="modal" onClick={handleClose}>
//   <div className="modal-container" onClick={e=>e.stopPropagation()}>
//     <p>{children}</p>
//     <br />
//     <button className="modal-close-btn" onClick={handleClose}>
//       Close me!
//     </button>
//   </div>
// </div>
//   </ReactPortal>
// higer order component?

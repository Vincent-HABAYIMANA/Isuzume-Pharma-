import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Accessible dialog rendered in the #overlays element of index.html.
 * Closes on the Escape key and on a click outside the panel, and returns the
 * keyboard focus to the page when it is dismissed.
 */
const Modal = ({ title, onClose, children }) => {
  const panelRef = useRef(null);
  const lastFocusedRef = useRef(null);

  useEffect(() => {
    lastFocusedRef.current = document.activeElement;
    panelRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      lastFocusedRef.current?.focus?.();
    };
  }, [onClose]);

  const overlayRoot = document.getElementById("overlays");
  if (!overlayRoot) return null;

  return createPortal(
    <div className="modal-layer">
      <div className="modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={panelRef}
      >
        <div className="modal-head">
          <h2>{title}</h2>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    overlayRoot
  );
};

export default Modal;

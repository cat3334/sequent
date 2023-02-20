import React from "react";
import "./Modal.scss";
import { createPortal } from "react-dom";
function Modal(props) {
  return createPortal(
    <div id="myModal" className="modal">
      <div class="modal-content">
        <span onClick={props.closeModal} class="close">
          &times;
        </span>
        {React.cloneElement(props.children, {
          handleClose: props.closeModal,
        })}
      </div>
    </div>,
    document.getElementById("overlays")
  );
}

export default Modal;

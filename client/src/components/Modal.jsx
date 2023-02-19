import React from "react";
import "./Modal.scss";
import { createPortal } from "react-dom";
function Modal(props) {
  return createPortal(
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span onClick={props.closeModal} class="close">
          &times;
        </span>
        {props.children}
      </div>
    </div>,
    document.getElementById("overlays")
  );
}

export default Modal;

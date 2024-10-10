import { useEffect, useState } from "react";
import "./ConfirmationModal.scss"
import { RiCloseLine } from "react-icons/ri";


interface ConfirmationModalProps {
    handleClose: () => void;
    title: string;
    description: string;
    yes_choice : string;
    yes_function: () => void;
    no_choice : string;
    //no_function: () => void;
}


const ConfirmationModal = (prop : ConfirmationModalProps) => {
  const {handleClose, title, description, yes_choice, yes_function, no_choice} = prop;
  return (
    <>
      <div className="dark-bg" onClick={() => handleClose()} />
      <div className="centered">
        <div className="modal">
          <div className="modal-header">
            <h5 className="heading">{title}</h5>
          </div>
          <button className="close-btn" onClick={() => handleClose()}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className="modal-content">
            {description}
          </div>
          <div className="modal-actions">
            <div className="actions-container">
              <button className={"delete-btn"} onClick={() => {
                  handleClose()
                  yes_function();
                }}>
                {yes_choice}
              </button>
              <button
                className="cancel-btn"
                onClick={() => handleClose()}
              >
                {no_choice}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export default ConfirmationModal;
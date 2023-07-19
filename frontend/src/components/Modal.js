import "../styles/Modal.css";

const Modal = ({ message }) => {
  return (
    <div className="modal-container">
      { message }
    </div>
  );
};

export default Modal;

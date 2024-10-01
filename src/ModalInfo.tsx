import './ModalInfo.css';
import { motion } from 'framer-motion';

function ModalInfo({ data, closeModal }) {


  return (
    <div onClick={() => closeModal()} id="modal" className="modal-backdrop">
      <motion.div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Evita cerrar el modal si se hace clic dentro del contenido
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="close-button" id="closeModal" onClick={()=>closeModal()}>
          &times;
        </span>
        <h2>Prueba</h2>
        <p>Testing</p>
        {/* <button className="action-button">Action </button> */}
      </motion.div>
    </div>
  );
}

export default ModalInfo;

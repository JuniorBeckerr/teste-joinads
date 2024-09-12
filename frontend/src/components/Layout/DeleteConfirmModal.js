import PropTypes from "prop-types";

const DeleteConfirmationModal = ({ show, onClose, onConfirm }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal show" style={{ display: 'block' }} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirmar Exclusão</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>Você tem certeza que deseja excluir esta tarefa?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

DeleteConfirmationModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
};

export default DeleteConfirmationModal;

import { Modal, Button } from "react-bootstrap";

interface DeleteUserModalProps {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  userName: string;
}

function DeleteUserModal({ show, handleClose, handleDelete, userName }: DeleteUserModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete <strong>{userName}</strong>?</p>
        <p>This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Yes, Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteUserModal;
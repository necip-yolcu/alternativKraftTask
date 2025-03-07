import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { updateUserAsync } from "../redux/userSlice";

interface EditUserModalProps {
  show: boolean;
  handleClose: () => void;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
  } | null;
  handleUpdate: (user: { id: number; name: string; email: string; phone: string }) => void;
}

function EditUserModal({ show, handleClose, user, handleUpdate }: EditUserModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");

  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
  }, [user]);

  const handleSubmit = () => {
    if (!name || !email || !phone) return;

    const updatedUser = { id: user!.id, name, email, phone };
    dispatch(updateUserAsync(updatedUser));
    handleUpdate(updatedUser);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserModal;
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
    address: { street: string; city: string; zipcode: string };
    company: { name: string; bs: string };
  } | null;
  handleUpdate: (user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: { street: string; city: string; zipcode: string };
    company: { name: string; bs: string };
  }) => void;
}

function EditUserModal({ show, handleClose, user, handleUpdate }: EditUserModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [street, setStreet] = useState(user?.address?.street || "");
  const [city, setCity] = useState(user?.address?.city || "");
  const [zipcode, setZipcode] = useState(user?.address?.zipcode || "");
  const [companyName, setCompanyName] = useState(user?.company?.name || "");
  const [companyBs, setCompanyBs] = useState(user?.company?.bs || "");

  // Update fields when user changes
  useEffect(() => {
    setName(user?.name || "");
    setEmail(user?.email || "");
    setPhone(user?.phone || "");
    setStreet(user?.address?.street || "");
    setCity(user?.address?.city || "");
    setZipcode(user?.address?.zipcode || "");
    setCompanyName(user?.company?.name || "");
    setCompanyBs(user?.company?.bs || "");
  }, [user]);

  const handleSubmit = () => {
    if (!name || !email || !phone || !street || !city || !zipcode || !companyName || !companyBs || !user) return;

    const updatedUser = {
      id: user.id,
      name,
      email,
      phone,
      address: { street, city, zipcode },
      company: { name: companyName, bs: companyBs },
    };

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

          <h5>Address</h5>
          <Form.Group className="mb-3">
            <Form.Label>Street</Form.Label>
            <Form.Control type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Zipcode</Form.Label>
            <Form.Control type="text" value={zipcode} onChange={(e) => setZipcode(e.target.value)} />
          </Form.Group>

          <h5>Company</h5>
          <Form.Group className="mb-3">
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Business Field</Form.Label>
            <Form.Control type="text" value={companyBs} onChange={(e) => setCompanyBs(e.target.value)} />
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
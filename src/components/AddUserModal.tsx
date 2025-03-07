import { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

interface AddUserModalProps {
  show: boolean;
  handleClose: () => void;
  handleAddUser: (user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: { street: string; city: string; zipcode: string };
    company: { name: string; bs: string };
  }) => void;
}

function AddUserModal({ show, handleClose, handleAddUser }: AddUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [bs, setBs] = useState("");
  const [errors, setErrors] = useState<{ email?: string; phone?: string }>({});

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) => /^[0-9]{8,15}$/.test(phone);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setStreet("");
    setCity("");
    setZipcode("");
    setCompanyName("");
    setBs("");
    setErrors({});
  };

  const handleSubmit = () => {
    let validationErrors: { email?: string; phone?: string } = {};

    if (!isValidEmail(email)) validationErrors.email = "Invalid email format.";
    if (!isValidPhone(phone)) validationErrors.phone = "Phone number must be 8-15 digits.";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    handleAddUser({
      id: Date.now(),
      name,
      email,
      phone,
      address: { street, city, zipcode },
      company: { name: companyName, bs },
    });

    resetForm();
    handleClose();
  };

  return (
    <Modal 
      show={show} 
      onHide={() => { resetForm(); handleClose(); }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} isInvalid={!!errors.email}/>
            {errors.email && <Alert variant="danger" className="mt-2">{errors.email}</Alert>}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} isInvalid={!!errors.phone}/>
            {errors.phone && <Alert variant="danger" className="mt-2">{errors.phone}</Alert>}
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
            <Form.Control type="text" value={bs} onChange={(e) => setBs(e.target.value)} />
          </Form.Group>

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => { resetForm(); handleClose(); }}>
          Close
        </Button>
        <Button variant="success" onClick={handleSubmit}>
          Add User
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUserModal;
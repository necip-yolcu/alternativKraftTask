import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUserAsync } from "../redux/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";
import DeleteUserModal from "../components/DeleteUserModal";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<{
    id: number;
    name: string;
    email: string;
    phone: string;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (user: { id: number; name: string; email: string; phone: string }) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteConfirm = (user: { id: number; name: string; email: string; phone: string }) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (selectedUser) {
      dispatch(deleteUserAsync(selectedUser.id));
      setShowDeleteModal(false);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center text-primary">User List</h1>
      <Button className="mb-3" variant="success" onClick={() => setShowAddModal(true)}>
        Add New User
      </Button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <Row>
        {users.map((user) => (
          <Col key={user.id} xs={12} md={6} lg={4} className="mb-4">
            <Card className="shadow-sm border-0">
              <Card.Body>
                <Card.Title className="text-primary">{user.name}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {user.email} <br />
                  <strong>Phone:</strong> {user.phone}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="warning" size="sm" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteConfirm(user)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <AddUserModal show={showAddModal} handleClose={() => setShowAddModal(false)} />
      {selectedUser && (
        <>
          <EditUserModal show={showEditModal} handleClose={() => setShowEditModal(false)} user={selectedUser} />
          <DeleteUserModal
            show={showDeleteModal}
            handleClose={() => setShowDeleteModal(false)}
            handleDelete={handleDelete}
            userName={selectedUser.name}
          />
        </>
      )}
    </Container>
  );
}

export default HomePage;
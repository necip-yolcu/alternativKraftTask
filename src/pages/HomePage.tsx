import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUserAsync } from "../redux/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Table, Container, Button } from "react-bootstrap";
import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
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

  const handleDelete = (id: number) => {
    dispatch(deleteUserAsync(id));
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center text-primary">User List</h1>
      <Button className="mb-3" variant="success" onClick={() => setShowAddModal(true)}>
        Add New User
      </Button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(user)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <AddUserModal show={showAddModal} handleClose={() => setShowAddModal(false)} />
      {selectedUser && (
        <EditUserModal show={showEditModal} handleClose={() => setShowEditModal(false)} user={selectedUser} />
      )}
    </Container>
  );
}

export default HomePage;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUserAsync } from "../redux/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Table, Container, Button } from "react-bootstrap";
import AddUserModal from "../components/AddUserModal";

function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteUserAsync(id));
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center text-primary">User List</h1>
      <Button className="mb-3" variant="success" onClick={() => setShowModal(true)}>
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
                <Button variant="warning" size="sm" className="me-2">
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
      <AddUserModal show={showModal} handleClose={() => setShowModal(false)} />
    </Container>
  );
}

export default HomePage;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUserAsync, updateUserAsync, addUserAsync } from "../redux/userSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import AddUserModal from "../components/AddUserModal";
import EditUserModal from "../components/EditUserModal";
import DeleteUserModal from "../components/DeleteUserModal";
import ToastNotification from "../components/ToastNotification";
import { Link } from "react-router-dom";
import "../styles.css";

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
    address: { street: string; city: string; zipcode: string };
    company: { name: string; bs: string };
  } | null>(null);

  const [toast, setToast] = useState({ show: false, message: "", variant: "success" });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "", variant: "success" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleShowToast = (message: string, variant: "success" | "danger" = "success") => {
    console.log("Toast Message:", message); // Debugging
    setToast({ show: true, message, variant });
  };

  useEffect(() => {
    if (users.length === 0) { // Only fetch if there are no users
      dispatch(fetchUsers());
    }
  }, [dispatch, users.length]);

  useEffect(() => {
    if (error) {
      handleShowToast("❌ Failed to fetch users", "danger");
    }
  }, [error]);

  const handleDelete = () => {
    if (selectedUser) {
      dispatch(deleteUserAsync(selectedUser.id));
      setShowDeleteModal(false);
      handleShowToast(`✅ User "${selectedUser.name}" deleted successfully!`, "success");
    }
  };

  const handleAddUser = (user: { id: number; name: string; email: string; phone: string, address: { street: string; city: string; zipcode: string }, company: { name: string; bs: string }  }) => {
    dispatch(addUserAsync(user));
    setShowAddModal(false);
    handleShowToast(`✅ User "${user.name}" added successfully!`, "success"); 
  };

  const handleUpdateUser = (user: { id: number; name: string; email: string; phone: string, address: { street: string; city: string; zipcode: string }, company: { name: string; bs: string }  }) => {
    dispatch(updateUserAsync(user));
    setShowEditModal(false);
    handleShowToast(`✅ User "${user.name}" updated successfully!`, "success");
  };

  return (
    <div className="homepage-container">
      <Container className="mt-5">
        <h1 className="text-center text-light user-list-title">📋 User List</h1>
        <div className="text-center mb-4">
          <Button className="animated-button" variant="success" onClick={() => setShowAddModal(true)}>
            ➕ Add New User
          </Button>
        </div>

        {loading && <p className="text-light text-center">Loading...</p>}

        <Row>
        {users.map((user, index) => (
          <Col key={user.id} xs={12} md={6} lg={4} className="mb-4">
            <Link to={`/user/${user.id}`} className="card-link">
              <Card className="user-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card.Body>
                  <Card.Title className="text-primary">{user.name}</Card.Title>
                  <Card.Text>
                    <strong>Email:</strong> {user.email} <br />
                    <strong>Phone:</strong> {user.phone}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                  <Button variant="warning" size="sm" onClick={(e) => { e.preventDefault(); setSelectedUser(user); setShowEditModal(true); }}>
                        ✏️ Edit
                      </Button>
                      <Button variant="danger" size="sm" onClick={(e) => { e.preventDefault(); setSelectedUser(user); setShowDeleteModal(true); }}>
                        🗑️ Delete
                      </Button>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
        </Row>

        <AddUserModal 
          show={showAddModal} 
          handleClose={() => setShowAddModal(false)} 
          handleAddUser={handleAddUser}
        />      
        
        {selectedUser && (
          <>
            <EditUserModal
              show={showEditModal}
              handleClose={() => setShowEditModal(false)}
              user={selectedUser}
              handleUpdate={handleUpdateUser}
            />
            <DeleteUserModal
              show={showDeleteModal}
              handleClose={() => setShowDeleteModal(false)}
              handleDelete={handleDelete}
              userName={selectedUser.name}
            />
          </>
        )}

        {toast.show && (
          <ToastNotification
            show={toast.show}
            message={toast.message}
            variant={toast.variant as "success" | "danger"}
            onClose={() => setToast({ show: false, message: "", variant: "success" })}
          />
        )}
      </Container>
    </div>
  );
}

export default HomePage;
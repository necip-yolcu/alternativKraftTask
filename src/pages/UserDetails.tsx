import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Container, Card, Button } from "react-bootstrap";
import "../styles.css";

function UserDetailPage() {
  const { id } = useParams<{ id: string }>(); 
  const users = useSelector((state: RootState) => state.users.users);
  const [user, setUser] = useState<null | (typeof users)[0]>(null);

  useEffect(() => {
    const foundUser = users.find((u) => u.id === Number(id));
    setUser(foundUser || null);
  }, [id, users]);

  if (!user) {
    return (
      <div className="user-detail-container">
        <Container className="text-center">
          <h2 className="text-danger">❌ User not found!</h2>
          <Link to="/">
            <Button className="back-button" variant="secondary">⬅ Back to Users</Button>
          </Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="user-detail-container">
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="user-detail-card">
          <Card.Body>
            <h2 className="text-primary text-center">{user.name}</h2>

            <div className="user-info">
              <p>📧 <strong>Email:</strong> {user.email}</p>
              <p>📞 <strong>Phone:</strong> {user.phone}</p>

              {user.address && (
                <p>📍 <strong>Address:</strong> {user.address.street}, {user.address.city} - {user.address.zipcode}</p>
              )}

              {user.company && (
                <>
                  <p>🏢 <strong>Company:</strong> {user.company.name}</p>
                  <p>📊 <strong>Business Field:</strong> {user.company.bs}</p>  {/* ✅ Included business field */}
                </>
              )}
            </div>

            <div className="text-center mt-4">
              <Link to="/">
                <Button className="back-button" variant="secondary">⬅ Back to Users</Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default UserDetailPage;
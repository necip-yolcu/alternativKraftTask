import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Container, Card, Button } from "react-bootstrap";

function UserDetailPage() {
  const { id } = useParams<{ id: string }>(); // Get user ID from URL
  const users = useSelector((state: RootState) => state.users.users);
  const [user, setUser] = useState<null | (typeof users)[0]>(null);

  useEffect(() => {
    const foundUser = users.find((u) => u.id === Number(id));
    setUser(foundUser || null);
  }, [id, users]);

  if (!user) {
    return (
      <Container className="text-center mt-5">
        <h2 className="text-danger">User not found!</h2>
        <Link to="/">
          <Button variant="primary">Go Back</Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <Card.Body>
          <h2 className="text-primary">{user.name}</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>

          {user.address && (
            <>
              <h4 className="mt-4">Address</h4>
              <p>
                {user.address.street}, {user.address.city} - {user.address.zipcode}
              </p>
            </>
          )}

          {user.company && (
            <>
              <h4 className="mt-4">Company</h4>
              <p><strong>{user.company.name}</strong></p>
              <p><strong>Industry:</strong> {user.company.bs}</p>
            </>
          )}

          <Link to="/">
            <Button variant="secondary">Back to Users</Button>
          </Link>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserDetailPage;
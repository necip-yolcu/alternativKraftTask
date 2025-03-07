import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Container, Card } from "react-bootstrap";

function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const user = useSelector((state: RootState) =>
    state.users.users.find((u) => u.id === Number(id))
  );

  if (!user) {
    return <p>User not found</p>;
  }

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>Email: {user.email}</Card.Text>
          <Card.Text>Phone: {user.phone}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default UserDetails;
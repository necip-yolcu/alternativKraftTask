import { Toast, ToastContainer } from "react-bootstrap";

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
  variant?: "success" | "danger";
}

function ToastNotification({ show, message, onClose, variant = "success" }: ToastProps) {
  return (
    <ToastContainer
      position="top-center"
      className="p-3"
      style={{
        position: "fixed",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1050,
      }}
    >
      <Toast
        onClose={onClose}
        show={show}
        delay={3000}
        autohide
        className={`text-white ${variant === "success" ? "bg-success" : "bg-danger"}`}
      >
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastNotification;
interface ErrorModalProps {
  message: string;
  onClose: () => void;
}

export function ErrorModal({ message, onClose }: ErrorModalProps) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        backdropFilter: "blur(2px)",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "#242424",
          color: "#fff",
          padding: "2rem",
          borderRadius: "12px",
          maxWidth: "400px",
          width: "90%",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
          textAlign: "center",
          border: "1px solid #444",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ color: "#ef4444", marginTop: 0, fontSize: "1.5rem" }}>
          Error
        </h3>
        <p style={{ marginBottom: "2rem", lineHeight: "1.5", color: "#ddd" }}>
          {message}
        </p>
        <button
          onClick={onClose}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

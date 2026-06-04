import React from "react";
import { Mountain } from "lucide-react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ textAlign: "center", padding: "4rem 1rem", display: "grid", gap: "1.5rem", justifyItems: "center" }}>
          <Mountain size={48} style={{ color: "var(--olive-soft)" }} />
          <h2 style={{ fontFamily: "Georgia, serif", fontWeight: 500 }}>Algo salio mal</h2>
          <p style={{ color: "var(--muted)", maxWidth: "32rem" }}>
            {this.state.error.message}
          </p>
          <button
            className="primary-btn btn"
            onClick={() => { this.setState({ error: null }); window.location.hash = "#/"; }}
          >
            Volver al inicio
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

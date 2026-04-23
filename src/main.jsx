import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>CRM Dashboard</h1>
      <p>Det virker 🔥</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

import { useState } from "react";

export default function App() {

  const [selected, setSelected] = useState(0);
  const [messages, setMessages] = useState([
    { name: "3nordic.dk", type: "email", text: "Hej vi vil gerne samarbejde...", status: "open" },
    { name: "Nordic Food", type: "whatsapp", text: "Kan du sende priser?", status: "open" },
    { name: "Unknown Lead", type: "call", text: "Missed call", status: "closed" }
  ]);

  const active = messages[selected];

  const updateStatus = (status) => {
    const updated = [...messages];
    updated[selected].status = status;
    setMessages(updated);
  };

  const removeTicket = () => {
    const updated = messages.filter((_, i) => i !== selected);
    setMessages(updated);
    setSelected(0);
  };

  const convertToCRM = () => {
    alert("Sendt til CRM (senere: rigtig integration)");
    updateStatus("converted");
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter" }}>

      {/* LEFT */}
      <div style={{ width: "300px", padding: "15px", borderRight: "1px solid #ddd" }}>
        {messages.map((item, i) => (
          <div key={i}
            onClick={() => setSelected(i)}
            style={{
              padding: "10px",
              marginBottom: "10px",
              background: selected === i ? "#E0E7FF" : "#F3F4F6",
              borderRadius: "8px",
              cursor: "pointer"
            }}>
            <b>{item.name}</b><br />
            <small>{item.text}</small>

            <div style={{
              marginTop: "5px",
              fontSize: "11px",
              color: item.status === "closed" ? "red" : "green"
            }}>
              {item.status}
            </div>
          </div>
        ))}
      </div>

      {/* MIDDLE */}
      <div style={{ flex: 1, padding: "20px" }}>

        <h3>{active?.name}</h3>
        <p>{active?.text}</p>

        {/* ACTIONS */}
        <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>

          <button onClick={convertToCRM}>
            🎯 Convert to CRM
          </button>

          <button onClick={() => updateStatus("in progress")}>
            👤 Assign Agent
          </button>

          <button onClick={() => updateStatus("closed")}>
            ✅ Close Ticket
          </button>

          <button onClick={removeTicket}>
            🗑 Delete
          </button>

        </div>

      </div>

      {/* RIGHT */}
      <div style={{ width: "250px", padding: "15px", borderLeft: "1px solid #ddd" }}>
        <h3>Info</h3>
        <p>Status: {active?.status}</p>
        <p>Kanal: {active?.type}</p>
      </div>

    </div>
  );
}

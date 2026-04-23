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

  const getBadgeColor = (type) => {
    if (type === "email") return "#3B82F6";
    if (type === "whatsapp") return "#22C55E";
    if (type === "call") return "#F97316";
    return "#6B7280";
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0F172A", color: "#E5E7EB", fontFamily: "Inter" }}>

      {/* SIDEBAR */}
      <div style={{ width: "220px", background: "#020617", padding: "20px" }}>
        <h2 style={{ marginBottom: "30px" }}>CRM</h2>

        {["Dashboard", "Inbox", "CRM", "Calls", "Social"].map((item) => (
          <div key={item} style={{
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
            cursor: "pointer",
            background: item === "Inbox" ? "#1E293B" : "transparent"
          }}>
            {item}
          </div>
        ))}

        <div style={{ position: "absolute", bottom: "20px" }}>
          ⚙ Settings
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* TOP BAR */}
        <div style={{ display: "flex", gap: "15px", padding: "15px", borderBottom: "1px solid #1E293B" }}>
          {[
            { label: "Inbox", value: 12 },
            { label: "Calls", value: 5 },
            { label: "Messages", value: 18 },
            { label: "Emails", value: 72 },
            { label: "Deals", value: 35 }
          ].map((item, i) => (
            <div key={i} style={{
              background: "#1E293B",
              padding: "10px 15px",
              borderRadius: "10px"
            }}>
              {item.label}<br />
              <b>{item.value}</b>
            </div>
          ))}
        </div>

        {/* CONTENT */}
        <div style={{ display: "flex", flex: 1 }}>

          {/* LEFT LIST */}
          <div style={{ width: "280px", borderRight: "1px solid #1E293B", padding: "15px" }}>
            {messages.map((item, i) => (
              <div key={i}
                onClick={() => setSelected(i)}
                style={{
                  padding: "12px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  background: selected === i ? "#1E293B" : "#020617"
                }}>
                <b>{item.name}</b><br />
                <small>{item.text}</small>

                <div style={{
                  marginTop: "8px",
                  display: "flex",
                  justifyContent: "space-between"
                }}>
                  <span style={{
                    background: getBadgeColor(item.type),
                    padding: "2px 6px",
                    borderRadius: "6px",
                    fontSize: "11px"
                  }}>
                    {item.type}
                  </span>

                  <span style={{
                    color: item.status === "closed" ? "#EF4444" : "#22C55E",
                    fontSize: "11px"
                  }}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* MIDDLE */}
          <div style={{ flex: 1, padding: "20px" }}>
            <h2>{active?.name}</h2>
            <p>{active?.text}</p>

            {/* BUTTONS */}
            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <button style={{ background: "#22C55E", padding: "8px 12px", border: "none", borderRadius: "6px", color: "white" }} onClick={convertToCRM}>
                Convert
              </button>

              <button style={{ background: "#3B82F6", padding: "8px 12px", border: "none", borderRadius: "6px", color: "white" }} onClick={() => updateStatus("in progress")}>
                Assign
              </button>

              <button style={{ background: "#475569", padding: "8px 12px", border: "none", borderRadius: "6px", color: "white" }} onClick={() => updateStatus("closed")}>
                Close
              </button>

              <button style={{ background: "#EF4444", padding: "8px 12px", border: "none", borderRadius: "6px", color: "white" }} onClick={removeTicket}>
                Delete
              </button>
            </div>

            <textarea
              placeholder="Svar..."
              style={{
                marginTop: "20px",
                width: "100%",
                height: "150px",
                background: "#020617",
                border: "1px solid #1E293B",
                borderRadius: "10px",
                padding: "10px",
                color: "white"
              }}
            />
          </div>

          {/* RIGHT */}
          <div style={{ width: "260px", borderLeft: "1px solid #1E293B", padding: "15px" }}>
            <div style={{ background: "#020617", padding: "15px", borderRadius: "10px" }}>
              <h3>Kunde info</h3>

              <p>Status: <span style={{ color: "#22C55E" }}>{active?.status}</span></p>
              <p>Kanal: {active?.type}</p>

              <hr style={{ borderColor: "#1E293B" }} />

              <p>Lead type: Affiliate</p>
              <p>Potential: High</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

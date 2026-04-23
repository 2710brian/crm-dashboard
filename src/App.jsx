import { useState } from "react";

export default function App() {

  const [view, setView] = useState("inbox");
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const messages = [
    { name: "3nordic.dk", type: "email", text: "Hej vi vil gerne samarbejde...", status: "open" },
    { name: "Nordic Food", type: "whatsapp", text: "Kan du sende priser?", status: "open" },
    { name: "Unknown Lead", type: "call", text: "Missed call", status: "closed" },
    { name: "Babysupply", type: "email", text: "Affiliate spørgsmål", status: "open" }
  ];

  const getChannelStyle = (type) => {
    switch (type) {
      case "email": return { bg: "#DBEAFE", color: "#1E40AF", label: "Email" };
      case "call": return { bg: "#FEE2E2", color: "#991B1B", label: "Call" };
      case "whatsapp": return { bg: "#DCFCE7", color: "#166534", label: "WhatsApp" };
      default: return { bg: "#E5E7EB", color: "#111827", label: type };
    }
  };

  const filtered = messages.filter(m =>
    (filter === "all" || m.type === filter) &&
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const active = filtered[selected];

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      fontFamily: "Inter, Arial",
      background: "#F7F9FC"
    }}>

      {/* Sidebar */}
      <div style={{
        width: "240px",
        background: "#ffffff",
        borderRight: "1px solid #E6EAF0",
        padding: "20px"
      }}>
        <h2 style={{ marginBottom: "30px" }}>CRM</h2>

        <div onClick={() => setView("dashboard")} style={{ marginBottom: "12px", cursor: "pointer" }}>🏠 Dashboard</div>
        <div onClick={() => setView("inbox")} style={{ marginBottom: "12px", cursor: "pointer" }}>📥 Inbox</div>
        <div style={{ marginBottom: "12px" }}>👤 CRM</div>
        <div style={{ marginBottom: "12px" }}>📞 Calls</div>
        <div style={{ marginBottom: "12px" }}>📣 Social</div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* Topbar */}
        <div style={{
          height: "60px",
          background: "#fff",
          borderBottom: "1px solid #E6EAF0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px"
        }}>
          <div style={{ fontWeight: "600" }}>Inbox</div>
          <div>Brian</div>
        </div>

        {/* INBOX */}
        <div style={{ display: "flex", height: "100%" }}>

          {/* LEFT */}
          <div style={{
            width: "320px",
            background: "#fff",
            borderRight: "1px solid #E6EAF0",
            padding: "15px",
            display: "flex",
            flexDirection: "column"
          }}>

            {/* Search */}
            <input
              placeholder="Søg..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ddd",
                marginBottom: "10px"
              }}
            />

            {/* Filters */}
            <div style={{ display: "flex", gap: "5px", marginBottom: "10px" }}>
              {["all", "email", "call", "whatsapp"].map(f => (
                <button key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: "pointer",
                    background: filter === f ? "#2563EB" : "#E5E7EB",
                    color: filter === f ? "#fff" : "#000"
                  }}>
                  {f}
                </button>
              ))}
            </div>

            {/* List */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {filtered.map((item, i) => {
                const ch = getChannelStyle(item.type);
                return (
                  <div key={i}
                    onClick={() => setSelected(i)}
                    style={{
                      padding: "12px",
                      marginBottom: "8px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      background: selected === i ? "#E0E7FF" : "#F3F4F6"
                    }}>
                    <div style={{ fontWeight: "600" }}>{item.name}</div>

                    <div style={{ fontSize: "12px", color: "#555" }}>
                      {item.text}
                    </div>

                    {/* CHANNEL BADGE */}
                    <div style={{
                      marginTop: "5px",
                      display: "inline-block",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      background: ch.bg,
                      color: ch.color,
                      fontSize: "11px"
                    }}>
                      {ch.label}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* MIDDLE */}
          <div style={{
            flex: 1,
            padding: "20px"
          }}>
            <h3>{active?.name}</h3>
            <p style={{ marginTop: "10px" }}>{active?.text}</p>

            {/* ACTIONS */}
            <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
              <button style={{ padding: "8px 12px", cursor: "pointer" }}>
                🎯 Convert to CRM
              </button>

              <button style={{ padding: "8px 12px", cursor: "pointer" }}>
                👤 Assign Agent
              </button>

              <button style={{ padding: "8px 12px", cursor: "pointer" }}>
                ✅ Close Ticket
              </button>
            </div>

            <textarea
              placeholder="Svar..."
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "10px",
                height: "120px",
                borderRadius: "8px",
                border: "1px solid #ddd"
              }}
            />
          </div>

          {/* RIGHT */}
          <div style={{
            width: "300px",
            background: "#fff",
            borderLeft: "1px solid #E6EAF0",
            padding: "15px"
          }}>
            <h3>Kunde info</h3>
            <p>Navn: {active?.name}</p>
            <p>Status: {active?.status}</p>
            <p>Kanal: {active?.type}</p>

            <hr style={{ margin: "15px 0" }} />

            <p><b>Lead type:</b> Affiliate</p>
            <p><b>Potential:</b> High</p>
          </div>

        </div>

      </div>
    </div>
  );
}

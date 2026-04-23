import { useState } from "react";

export default function App() {

  const [view, setView] = useState("dashboard");
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const messages = [
    { name: "3nordic.dk", type: "email", text: "Hej vi vil gerne samarbejde..." },
    { name: "Nordic Food", type: "whatsapp", text: "Kan du sende priser?" },
    { name: "Unknown Lead", type: "call", text: "Missed call" },
    { name: "Babysupply", type: "email", text: "Affiliate spørgsmål" }
  ];

  const filtered = messages.filter(m =>
    (filter === "all" || m.type === filter) &&
    m.name.toLowerCase().includes(search.toLowerCase())
  );

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
          <div style={{ fontWeight: "600" }}>
            {view === "dashboard" ? "Overview" : "Inbox"}
          </div>
          <div>Brian</div>
        </div>

        {/* DASHBOARD */}
        {view === "dashboard" && (
          <div style={{ padding: "30px" }}>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
              marginBottom: "30px"
            }}>
              {[
                ["📥 Inbox", "12"],
                ["📞 Calls", "5"],
                ["🔥 Leads", "6"]
              ].map(([title, value]) => (
                <div key={title} style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                }}>
                  <div style={{ color: "#6B7280", fontSize: "14px" }}>{title}</div>
                  <div style={{ fontSize: "24px", fontWeight: "bold" }}>{value}</div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* INBOX */}
        {view === "inbox" && (
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
                {filtered.map((item, i) => (
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
                    <div style={{ fontSize: "12px", color: "#555" }}>{item.text}</div>
                  </div>
                ))}
              </div>

            </div>

            {/* MIDDLE */}
            <div style={{
              flex: 1,
              padding: "20px"
            }}>
              <h3>{filtered[selected]?.name}</h3>
              <p style={{ marginTop: "10px" }}>{filtered[selected]?.text}</p>

              <textarea
                placeholder="Svar..."
                style={{
                  width: "100%",
                  marginTop: "20px",
                  padding: "10px",
                  height: "100px",
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
              <p>Navn: {filtered[selected]?.name}</p>
              <p>Status: Lead</p>
              <p>Kanal: {filtered[selected]?.type}</p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

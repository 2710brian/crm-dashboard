import { useState } from "react";

export default function App() {

  const [view, setView] = useState("dashboard");

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

        {/* CONTENT SWITCH */}
        {view === "dashboard" && (
          <div style={{ padding: "30px" }}>

            {/* Cards */}
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

            {/* Pipeline + Activity */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "20px"
            }}>
              <div style={{ background: "#fff", padding: "20px", borderRadius: "12px" }}>
                <h3>Pipeline</h3>
                <div>New: 12 | Contacted: 8 | Interested: 4</div>
              </div>

              <div style={{ background: "#fff", padding: "20px", borderRadius: "12px" }}>
                <h3>Activity</h3>
                <ul>
                  <li>Email fra 3nordic.dk</li>
                  <li>Missed call</li>
                </ul>
              </div>
            </div>

          </div>
        )}

        {/* INBOX VIEW */}
        {view === "inbox" && (
          <div style={{ display: "flex", height: "100%" }}>

            {/* Left list */}
            <div style={{
              width: "300px",
              background: "#fff",
              borderRight: "1px solid #E6EAF0",
              padding: "15px"
            }}>
              <h3>Inbox</h3>

              {["3nordic.dk", "Nordic Food", "Unknown Lead"].map((item, i) => (
                <div key={i} style={{
                  padding: "10px",
                  marginTop: "10px",
                  borderRadius: "8px",
                  background: "#F3F4F6",
                  cursor: "pointer"
                }}>
                  {item}
                </div>
              ))}
            </div>

            {/* Message */}
            <div style={{
              flex: 1,
              padding: "20px"
            }}>
              <h3>Message</h3>
              <p>Her kommer email/chat indhold</p>
            </div>

            {/* Right CRM */}
            <div style={{
              width: "300px",
              background: "#fff",
              borderLeft: "1px solid #E6EAF0",
              padding: "15px"
            }}>
              <h3>Kunde</h3>
              <p>Navn: Nordic Food</p>
              <p>Status: Lead</p>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

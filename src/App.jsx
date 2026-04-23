export default function App() {
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

        <div style={{ color: "#2563EB", marginBottom: "12px", cursor: "pointer" }}>🏠 Dashboard</div>
        <div style={{ marginBottom: "12px", cursor: "pointer" }}>📥 Inbox</div>
        <div style={{ marginBottom: "12px", cursor: "pointer" }}>👤 CRM</div>
        <div style={{ marginBottom: "12px", cursor: "pointer" }}>📞 Calls</div>
        <div style={{ marginBottom: "12px", cursor: "pointer" }}>📣 Social</div>
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
          <div style={{ fontWeight: "600" }}>Overview</div>
          <div>Brian</div>
        </div>

        {/* Content */}
        <div style={{ padding: "30px" }}>

          {/* Top Cards */}
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
                <div style={{ color: "#6B7280", fontSize: "14px" }}>
                  {title}
                </div>
                <div style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginTop: "5px"
                }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "20px"
          }}>

            {/* Pipeline */}
            <div style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
            }}>
              <h3 style={{ marginBottom: "15px" }}>Pipeline</h3>

              <div style={{ display: "flex", gap: "20px" }}>
                <div>New: 12</div>
                <div>Contacted: 8</div>
                <div>Interested: 4</div>
                <div>Closed: 2</div>
              </div>
            </div>

            {/* Activity */}
            <div style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
            }}>
              <h3 style={{ marginBottom: "15px" }}>Activity</h3>

              <ul style={{ fontSize: "14px", lineHeight: "1.8" }}>
                <li>📥 Email fra 3nordic.dk</li>
                <li>📞 Missed call</li>
                <li>💬 WhatsApp besked</li>
                <li>📣 Kampagne sendt</li>
              </ul>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

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

        <div style={{ color: "#2563EB", marginBottom: "10px" }}>🏠 Dashboard</div>
        <div style={{ marginBottom: "10px" }}>📥 Inbox</div>
        <div style={{ marginBottom: "10px" }}>👤 CRM</div>
        <div style={{ marginBottom: "10px" }}>📞 Calls</div>
        <div style={{ marginBottom: "10px" }}>📣 Social</div>
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

          {/* Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px"
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
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                transition: "0.2s"
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

        </div>

      </div>

    </div>
  );
}

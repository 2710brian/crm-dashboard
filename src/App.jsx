export default function App() {
  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>

      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#ffffff",
        borderRight: "1px solid #ddd",
        padding: "20px"
      }}>
        <h2>CRM</h2>
        <div>🏠 Dashboard</div>
        <div>📥 Inbox</div>
        <div>👤 CRM</div>
        <div>📞 Calls</div>
        <div>📣 Social</div>
      </div>

      {/* Main */}
      <div style={{ flex: 1 }}>

        {/* Topbar */}
        <div style={{
          height: "60px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px"
        }}>
          <div>Overview</div>
          <div>Brian</div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px" }}>

          {/* Cards */}
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ background: "#fff", padding: "15px", border: "1px solid #ddd" }}>
              📥 Inbox <br /> 12
            </div>
            <div style={{ background: "#fff", padding: "15px", border: "1px solid #ddd" }}>
              📞 Calls <br /> 5
            </div>
            <div style={{ background: "#fff", padding: "15px", border: "1px solid #ddd" }}>
              🔥 Leads <br /> 6
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

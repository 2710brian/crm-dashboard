import { useState } from "react";

export default function App() {

  const [view, setView] = useState("inbox");
  const [selected, setSelected] = useState(0);
  const [showTypeSelect, setShowTypeSelect] = useState(false);

  const [messages, setMessages] = useState([
    { name: "3nordic.dk", type: "email", text: "Hej vi vil gerne samarbejde...", status: "open" },
    { name: "Nordic Food", type: "whatsapp", text: "Kan du sende priser?", status: "open" },
    { name: "Unknown Lead", type: "call", text: "Missed call", status: "closed" }
  ]);

  const [crm, setCrm] = useState([]);
  const [crmSelected, setCrmSelected] = useState(null);

  const active = messages[selected];

  const getBadgeColor = (type) => {
    if (type === "email") return "#3B82F6";
    if (type === "whatsapp") return "#22C55E";
    return "#F97316";
  };

  const convertToCRM = (type) => {
    const newClient = {
      name: active.name,
      email: "unknown@mail.com",
      type
    };

    setCrm([...crm, newClient]);
    setCrmSelected(newClient);
    setView("crm");
    setShowTypeSelect(false);
  };

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      background: "#0F172A",
      color: "#E5E7EB",
      fontFamily: "Inter"
    }}>

      {/* SIDEBAR */}
      <div style={{
        width: "220px",
        background: "#020617",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <div>
          <h2 style={{ marginBottom: "30px" }}>CRM</h2>

          <div onClick={() => setView("inbox")} style={{
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
            cursor: "pointer",
            background: view === "inbox" ? "#1E293B" : "transparent"
          }}>
            Inbox
          </div>

          <div onClick={() => setView("crm")} style={{
            padding: "10px",
            borderRadius: "8px",
            cursor: "pointer",
            background: view === "crm" ? "#1E293B" : "transparent"
          }}>
            CRM
          </div>
        </div>

        <div>⚙ Settings</div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* TOP BAR */}
        <div style={{
          display: "flex",
          gap: "15px",
          padding: "15px",
          borderBottom: "1px solid #1E293B"
        }}>
          {[
            { label: "Inbox", value: messages.length },
            { label: "CRM", value: crm.length },
            { label: "Calls", value: 5 },
            { label: "Emails", value: 12 }
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
        <div style={{ flex: 1, display: "flex" }}>

          {/* INBOX VIEW */}
          {view === "inbox" && (
            <>
              {/* LEFT */}
              <div style={{
                width: "280px",
                borderRight: "1px solid #1E293B",
                padding: "15px"
              }}>
                {messages.map((item, i) => (
                  <div key={i}
                    onClick={() => setSelected(i)}
                    style={{
                      padding: "12px",
                      marginBottom: "12px",
                      borderRadius: "12px",
                      cursor: "pointer",
                      background: selected === i ? "#1E293B" : "#020617",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
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
                <h2>{active.name}</h2>
                <p>{active.text}</p>

                <div style={{ marginTop: "20px" }}>
                  <button style={{
                    background: "#22C55E",
                    border: "none",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    color: "white",
                    fontWeight: "600",
                    cursor: "pointer"
                  }} onClick={() => setShowTypeSelect(true)}>
                    Convert to CRM
                  </button>
                </div>

                {showTypeSelect && (
                  <div style={{
                    marginTop: "15px",
                    background: "#020617",
                    padding: "15px",
                    borderRadius: "10px",
                    display: "flex",
                    gap: "10px"
                  }}>
                    <button style={{ background: "#3B82F6", color: "white", border: "none", padding: "8px", borderRadius: "6px" }} onClick={() => convertToCRM("normal")}>Normal</button>
                    <button style={{ background: "#22C55E", color: "white", border: "none", padding: "8px", borderRadius: "6px" }} onClick={() => convertToCRM("affiliate")}>Affiliate</button>
                    <button style={{ background: "#F97316", color: "white", border: "none", padding: "8px", borderRadius: "6px" }} onClick={() => convertToCRM("iptv")}>IPTV</button>
                  </div>
                )}
              </div>

              {/* RIGHT */}
              <div style={{
                width: "260px",
                borderLeft: "1px solid #1E293B",
                padding: "15px"
              }}>
                <div style={{
                  background: "#020617",
                  padding: "15px",
                  borderRadius: "10px"
                }}>
                  <h3>Kunde info</h3>
                  <p>Status: {active.status}</p>
                  <p>Kanal: {active.type}</p>
                </div>
              </div>
            </>
          )}

          {/* CRM VIEW */}
          {view === "crm" && (
            <div style={{ flex: 1, display: "flex" }}>

              {/* LIST */}
              <div style={{
                width: "280px",
                borderRight: "1px solid #1E293B",
                padding: "15px"
              }}>
                {crm.map((c, i) => (
                  <div key={i}
                    onClick={() => setCrmSelected(c)}
                    style={{
                      padding: "10px",
                      marginBottom: "10px",
                      background: "#020617",
                      borderRadius: "10px",
                      cursor: "pointer"
                    }}>
                    {c.name}
                  </div>
                ))}
              </div>

              {/* DETAILS */}
              <div style={{ flex: 1, padding: "20px" }}>
                {crmSelected && (
                  <>
                    <h2>{crmSelected.name}</h2>

                    <div style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "20px"
                    }}>
                      <div style={{ background: "#1E293B", padding: "6px 10px", borderRadius: "6px" }}>Kontakt</div>

                      {crmSelected.type === "affiliate" && (
                        <div style={{ background: "#1E293B", padding: "6px 10px", borderRadius: "6px" }}>Affiliate</div>
                      )}

                      {crmSelected.type === "iptv" && (
                        <div style={{ background: "#1E293B", padding: "6px 10px", borderRadius: "6px" }}>IPTV</div>
                      )}
                    </div>

                    <div style={{
                      background: "#020617",
                      padding: "15px",
                      borderRadius: "10px"
                    }}>
                      <p>Email: {crmSelected.email}</p>
                      <p>Type: {crmSelected.type}</p>
                    </div>
                  </>
                )}
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

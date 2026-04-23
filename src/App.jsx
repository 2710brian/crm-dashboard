import { useState } from "react";

export default function App() {

  // ===== LOGIN =====
  const [loggedIn, setLoggedIn] = useState(false);

  // ===== LANGUAGE =====
  const translations = {
    da: {
      dashboard: "Dashboard",
      inbox: "Indbakke",
      crm: "CRM",
      calls: "Opkald",
      social: "Social",
      convert: "Konverter",
      assign: "Tildel",
      close: "Luk",
      delete: "Slet",
      reply: "Svar..."
    },
    en: {
      dashboard: "Dashboard",
      inbox: "Inbox",
      crm: "CRM",
      calls: "Calls",
      social: "Social",
      convert: "Convert",
      assign: "Assign",
      close: "Close",
      delete: "Delete",
      reply: "Reply..."
    },
    es: {
      dashboard: "Panel",
      inbox: "Bandeja",
      crm: "CRM",
      calls: "Llamadas",
      social: "Social",
      convert: "Convertir",
      assign: "Asignar",
      close: "Cerrar",
      delete: "Eliminar",
      reply: "Responder..."
    }
  };

  const [lang, setLang] = useState("da");
  const t = (k) => translations[lang][k] || k;

  // ===== NEW UI STATE =====
  const [viewMode, setViewMode] = useState("cards");
  const [showFilters, setShowFilters] = useState(false);

  // ===== DATA =====
  const [selected, setSelected] = useState(0);

  const [messages, setMessages] = useState([
    { id: 1001, name: "3nordic.dk", type: "email", text: "Hej vi vil gerne samarbejde...", status: "open" },
    { id: 1002, name: "Nordic Food", type: "whatsapp", text: "Kan du sende priser?", status: "open" },
    { id: 1003, name: "Unknown Lead", type: "call", text: "Missed call", status: "closed" }
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

  // ===== LOGIN OVERLAY =====
  if (!loggedIn) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        background: "linear-gradient(135deg,#020617,#0F172A)",
        color: "white",
        fontFamily: "Inter"
      }}>
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "28px",
          fontWeight: "600"
        }}>
          CRM Platform
        </div>

        <div style={{
          width: "420px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            background: "#020617",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 0 40px rgba(0,0,0,0.5)"
          }}>
            <h2 style={{ marginBottom: "20px" }}>Login</h2>

            <button
              onClick={() => setLoggedIn(true)}
              style={{
                width: "100%",
                padding: "12px",
                background: "#22C55E",
                border: "none",
                borderRadius: "8px",
                color: "white",
                cursor: "pointer"
              }}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== MAIN UI =====
  return (
    <div style={{ display: "flex", height: "100vh", background: "#0F172A", color: "#E5E7EB", fontFamily: "Inter" }}>

      {/* SIDEBAR */}
      <div style={{ width: "220px", background: "#020617", padding: "20px", position: "relative" }}>
        <h2 style={{ marginBottom: "30px" }}>CRM</h2>

        {[t("dashboard"), t("inbox"), t("crm"), t("calls"), t("social")].map((item) => (
          <div key={item} style={{
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
            cursor: "pointer",
            background: item === t("inbox") ? "#1E293B" : "transparent"
          }}>
            {item}
          </div>
        ))}

        {/* SETTINGS + FLAGS */}
        <div style={{ position: "absolute", bottom: "20px" }}>
          ⚙ Settings
          <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
            <span onClick={() => setLang("da")} style={{ cursor: "pointer" }}>🇩🇰</span>
            <span onClick={() => setLang("en")} style={{ cursor: "pointer" }}>🇬🇧</span>
            <span onClick={() => setLang("es")} style={{ cursor: "pointer" }}>🇪🇸</span>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* TOP BAR */}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "15px", borderBottom: "1px solid #1E293B" }}>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setViewMode("cards")}>Cards</button>
            <button onClick={() => setViewMode("table")}>Table</button>
            <button onClick={() => setShowFilters(!showFilters)}>Filters</button>
          </div>

          {/* USER */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            Brian
            <div style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              background: "#3B82F6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              B
            </div>
          </div>

        </div>

        {/* CONTENT */}
        <div style={{ display: "flex", flex: 1 }}>

          {/* LEFT LIST */}
          <div style={{ width: "280px", borderRight: "1px solid #1E293B", padding: "15px" }}>

            {viewMode === "cards" && messages.map((item, i) => (
              <div key={i}
                onClick={() => setSelected(i)}
                style={{
                  padding: "12px",
                  marginBottom: "10px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  background: selected === i ? "#1E293B" : "#020617",
                  transition: "0.2s"
                }}>
                <b>#{item.id} {item.name}</b><br />
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

            {viewMode === "table" && (
              <table style={{ width: "100%", fontSize: "12px" }}>
                <tbody>
                  {messages.map((item, i) => (
                    <tr key={i} onClick={() => setSelected(i)} style={{ cursor: "pointer" }}>
                      <td>#{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>

          {/* MIDDLE */}
          <div style={{ flex: 1, padding: "20px" }}>
            <h2>#{active?.id} {active?.name}</h2>
            <p>{active?.text}</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <button style={{ background: "#22C55E", padding: "8px 12px", border: "none", borderRadius: "6px", color: "white" }} onClick={convertToCRM}>{t("convert")}</button>
              <button style={{ background: "#3B82F6", padding: "8px 12px", border: "none", borderRadius: "6px", color: "white" }} onClick={() => updateStatus("in progress")}>{t("assign")}</button>
              <button style={{ background: "#475569", padding: "8px 12px", border: "none", borderRadius: "6px", color: "white" }} onClick={() => updateStatus("closed")}>{t("close")}</button>
              <button style={{ background: "#EF4444", padding: "8px 12px", border: "none", borderRadius: "6px", color: "white" }} onClick={removeTicket}>{t("delete")}</button>
            </div>

            <textarea
              placeholder={t("reply")}
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

          {/* FILTER PANEL */}
          {showFilters && (
            <div style={{
              position: "absolute",
              right: 0,
              top: 60,
              width: "300px",
              height: "100%",
              background: "#020617",
              padding: "15px",
              borderLeft: "1px solid #1E293B"
            }}>
              <h3>Filters</h3>

              <p>Status</p>
              <select style={{ width: "100%" }}>
                <option>All</option>
                <option>Open</option>
                <option>Closed</option>
              </select>

              <p style={{ marginTop: "15px" }}>Channel</p>
              <select style={{ width: "100%" }}>
                <option>All</option>
                <option>Email</option>
                <option>WhatsApp</option>
                <option>Call</option>
              </select>

              <button style={{
                marginTop: "20px",
                width: "100%",
                padding: "10px",
                background: "#3B82F6",
                border: "none",
                borderRadius: "6px"
              }}>
                Apply
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

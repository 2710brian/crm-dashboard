import { useState } from "react";

export default function App() {

  // ===== LANGUAGE =====
  const translations = {
    da: {
      login: "Login",
      inbox: "Indbakke",
      crm: "CRM",
      convert: "Konverter",
      assign: "Tildel",
      close: "Luk",
      delete: "Slet",
      normal: "Normal",
      affiliate: "Affiliate",
      iptv: "IPTV/Plex"
    },
    en: {
      login: "Login",
      inbox: "Inbox",
      crm: "CRM",
      convert: "Convert",
      assign: "Assign",
      close: "Close",
      delete: "Delete",
      normal: "Normal",
      affiliate: "Affiliate",
      iptv: "IPTV/Plex"
    },
    es: {
      login: "Login",
      inbox: "Bandeja",
      crm: "CRM",
      convert: "Convertir",
      assign: "Asignar",
      close: "Cerrar",
      delete: "Eliminar",
      normal: "Normal",
      affiliate: "Afiliado",
      iptv: "IPTV/Plex"
    }
  };

  const [lang, setLang] = useState("da");
  const t = (k) => translations[lang][k] || k;

  // ===== LOGIN =====
  const [loggedIn, setLoggedIn] = useState(false);

  // ===== APP STATE =====
  const [view, setView] = useState("inbox");
  const [selected, setSelected] = useState(0);
  const [showTypeSelect, setShowTypeSelect] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [messages, setMessages] = useState([
    { name: "3nordic.dk", type: "email", text: "Samarbejde?", status: "open" },
    { name: "Nordic Food", type: "whatsapp", text: "Pris?", status: "open" }
  ]);

  const [crm, setCrm] = useState([]);
  const [crmSelected, setCrmSelected] = useState(null);

  const active = messages[selected];

  const convertToCRM = (type) => {
    const client = { name: active.name, type };
    setCrm([...crm, client]);
    setCrmSelected(client);
    setShowModal(true);
    setShowTypeSelect(false);
  };

  const updateStatus = (status) => {
    const copy = [...messages];
    copy[selected].status = status;
    setMessages(copy);
  };

  const removeTicket = () => {
    setMessages(messages.filter((_, i) => i !== selected));
    setSelected(0);
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
          justifyContent: "center"
        }}>
          <h1>CRM Platform</h1>
        </div>

        <div style={{
          width: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <div style={{
            background: "#020617",
            padding: "40px",
            borderRadius: "16px"
          }}>
            <h2>{t("login")}</h2>
            <button onClick={() => setLoggedIn(true)}
              style={{
                marginTop: "20px",
                padding: "12px",
                width: "100%",
                background: "#22C55E",
                border: "none",
                borderRadius: "8px",
                color: "white"
              }}>
              {t("login")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===== MAIN APP =====
  return (
    <div style={{ display: "flex", height: "100vh", background: "#0F172A", color: "#E5E7EB" }}>

      {/* SIDEBAR */}
      <div style={{ width: "220px", background: "#020617", padding: "20px" }}>
        <h2>CRM</h2>

        {["Dashboard","Inbox","CRM","Calls","Social","Knowledge"].map((m)=>(
          <div key={m} style={{ marginTop: "10px", cursor: "pointer" }}>{m}</div>
        ))}

        <div style={{ position: "absolute", bottom: "20px" }}>
          ⚙ Settings
          <div>
            🌍 
            <button onClick={()=>setLang("da")}>DA</button>
            <button onClick={()=>setLang("en")}>EN</button>
            <button onClick={()=>setLang("es")}>ES</button>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ flex: 1, display: "flex" }}>

        {/* LEFT LIST */}
        <div style={{ width: "300px", padding: "15px", borderRight: "1px solid #1E293B" }}>
          {messages.map((m,i)=>(
            <div key={i} onClick={()=>setSelected(i)}
              style={{
                padding: "12px",
                marginBottom: "10px",
                background: selected===i?"#1E293B":"#020617",
                borderRadius: "10px",
                cursor: "pointer"
              }}>
              <b>{m.name}</b><br/>
              <small>{m.text}</small>
            </div>
          ))}
        </div>

        {/* MIDDLE */}
        <div style={{ flex: 1, padding: "20px" }}>
          <h2>{active?.name}</h2>

          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button onClick={()=>setShowTypeSelect(true)}>{t("convert")}</button>
            <button onClick={()=>updateStatus("assigned")}>{t("assign")}</button>
            <button onClick={()=>updateStatus("closed")}>{t("close")}</button>
            <button onClick={removeTicket}>{t("delete")}</button>
          </div>

          {showTypeSelect && (
            <div style={{ marginTop: "10px" }}>
              <button onClick={()=>convertToCRM("normal")}>{t("normal")}</button>
              <button onClick={()=>convertToCRM("affiliate")}>{t("affiliate")}</button>
              <button onClick={()=>convertToCRM("iptv")}>{t("iptv")}</button>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div style={{ width: "250px", padding: "15px", borderLeft: "1px solid #1E293B" }}>
          <p>Status: {active?.status}</p>
        </div>

      </div>

      {/* MODAL */}
      {showModal && crmSelected && (
        <div style={{
          position: "fixed",
          top:0,left:0,right:0,bottom:0,
          background:"rgba(0,0,0,0.7)",
          display:"flex",
          alignItems:"center",
          justifyContent:"center"
        }}>
          <div style={{
            width:"80%",
            height:"80%",
            background:"#020617",
            borderRadius:"12px",
            padding:"20px"
          }}>
            <h2>{crmSelected.name}</h2>

            <div style={{ display:"flex", gap:"10px", marginBottom:"20px" }}>
              <div>Kontakt</div>

              {crmSelected.type==="affiliate" && <div>Affiliate</div>}
              {crmSelected.type==="iptv" && <div>IPTV</div>}
              {crmSelected.type==="normal" && <div>Kunde</div>}
            </div>

            <button onClick={()=>setShowModal(false)}>Luk</button>
          </div>
        </div>
      )}

    </div>
  );
}

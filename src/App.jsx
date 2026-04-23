import { useState } from "react";

export default function App() {

  const [view, setView] = useState("inbox"); // inbox | crm
  const [selected, setSelected] = useState(0);
  const [crmSelected, setCrmSelected] = useState(null);
  const [showTypeSelect, setShowTypeSelect] = useState(false);

  const [messages, setMessages] = useState([
    { name: "3nordic.dk", type: "email", text: "Hej vi vil gerne samarbejde...", status: "open" },
    { name: "Nordic Food", type: "whatsapp", text: "Kan du sende priser?", status: "open" }
  ]);

  const [crm, setCrm] = useState([]);

  const active = messages[selected];

  const convertToCRM = (type) => {
    const newClient = {
      name: active.name,
      email: "unknown@mail.com",
      type,
      affiliate: { network: "", epc: "", provision: "" },
      iptv: { plan: "", status: "" },
      normal: { service: "", price: "" }
    };

    setCrm([...crm, newClient]);
    setCrmSelected(newClient);
    setView("crm");
    setShowTypeSelect(false);
  };

  const getBadgeColor = (type) => {
    if (type === "email") return "#3B82F6";
    if (type === "whatsapp") return "#22C55E";
    return "#F97316";
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0F172A", color: "#E5E7EB" }}>

      {/* SIDEBAR */}
      <div style={{ width: "220px", background: "#020617", padding: "20px" }}>
        <h2>CRM</h2>

        <div onClick={() => setView("inbox")} style={{ marginTop: "20px", cursor: "pointer" }}>Inbox</div>
        <div onClick={() => setView("crm")} style={{ marginTop: "10px", cursor: "pointer" }}>CRM</div>

        <div style={{ position: "absolute", bottom: "20px" }}>⚙ Settings</div>
      </div>

      {/* MAIN */}
      <div style={{ flex: 1, display: "flex" }}>

        {/* INBOX */}
        {view === "inbox" && (
          <>
            {/* LEFT */}
            <div style={{ width: "280px", padding: "15px", borderRight: "1px solid #1E293B" }}>
              {messages.map((item, i) => (
                <div key={i}
                  onClick={() => setSelected(i)}
                  style={{
                    padding: "10px",
                    marginBottom: "10px",
                    background: selected === i ? "#1E293B" : "#020617",
                    borderRadius: "10px",
                    cursor: "pointer"
                  }}>
                  <b>{item.name}</b>
                  <br />
                  <small>{item.text}</small>

                  <div style={{
                    marginTop: "5px",
                    fontSize: "11px",
                    background: getBadgeColor(item.type),
                    display: "inline-block",
                    padding: "2px 6px",
                    borderRadius: "6px"
                  }}>
                    {item.type}
                  </div>
                </div>
              ))}
            </div>

            {/* MIDDLE */}
            <div style={{ flex: 1, padding: "20px" }}>
              <h2>{active.name}</h2>
              <p>{active.text}</p>

              <button onClick={() => setShowTypeSelect(true)}>
                Convert to CRM
              </button>

              {showTypeSelect && (
                <div style={{ marginTop: "10px" }}>
                  <button onClick={() => convertToCRM("normal")}>Normal</button>
                  <button onClick={() => convertToCRM("affiliate")}>Affiliate</button>
                  <button onClick={() => convertToCRM("iptv")}>IPTV</button>
                </div>
              )}
            </div>
          </>
        )}

        {/* CRM VIEW */}
        {view === "crm" && crmSelected && (
          <div style={{ flex: 1, padding: "20px" }}>

            <h2>{crmSelected.name}</h2>

            {/* TABS */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
              <div style={{ padding: "5px 10px", background: "#1E293B", borderRadius: "6px" }}>Kontakt</div>

              {crmSelected.type === "affiliate" && (
                <div style={{ padding: "5px 10px", background: "#1E293B", borderRadius: "6px" }}>
                  Affiliate
                </div>
              )}

              {crmSelected.type === "iptv" && (
                <div style={{ padding: "5px 10px", background: "#1E293B", borderRadius: "6px" }}>
                  IPTV
                </div>
              )}

              {crmSelected.type === "normal" && (
                <div style={{ padding: "5px 10px", background: "#1E293B", borderRadius: "6px" }}>
                  Kunde
                </div>
              )}
            </div>

            {/* FIELDS */}
            <div style={{ background: "#020617", padding: "15px", borderRadius: "10px" }}>
              <p>Email: {crmSelected.email}</p>

              {crmSelected.type === "affiliate" && (
                <>
                  <p>Netværk: {crmSelected.affiliate.network}</p>
                  <p>EPC: {crmSelected.affiliate.epc}</p>
                </>
              )}

              {crmSelected.type === "iptv" && (
                <>
                  <p>Plan: {crmSelected.iptv.plan}</p>
                  <p>Status: {crmSelected.iptv.status}</p>
                </>
              )}

              {crmSelected.type === "normal" && (
                <>
                  <p>Service: {crmSelected.normal.service}</p>
                  <p>Pris: {crmSelected.normal.price}</p>
                </>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

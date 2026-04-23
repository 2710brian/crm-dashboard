import { useState } from "react";

export default function TicketLayer() {

  const [showNewMenu, setShowNewMenu] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [search, setSearch] = useState("");

  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailText, setEmailText] = useState("");

  return (
    <>
      {/* FLOAT TOP BAR */}
      <div style={{
        position: "fixed",
        top: "10px",
        right: "20px",
        display: "flex",
        gap: "10px",
        zIndex: 9999
      }}>

        <div style={{ position: "relative" }}>
          <button onClick={() => setShowNewMenu(!showNewMenu)}>
            New
          </button>

          {showNewMenu && (
            <div style={{
              position: "absolute",
              top: "35px",
              right: 0,
              background: "#020617",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #1E293B"
            }}>
              <div onClick={() => setShowEmailModal(true)} style={{ padding: "5px", cursor: "pointer" }}>
                Email
              </div>
              <div style={{ padding: "5px" }}>
                Ticket
              </div>
            </div>
          )}
        </div>

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "6px",
            borderRadius: "6px",
            border: "1px solid #1E293B",
            background: "#020617",
            color: "white"
          }}
        />

      </div>

      {/* EMAIL MODAL */}
      {showEmailModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.7)",
          zIndex: 9999
        }}>
          <div style={{
            width: "600px",
            margin: "100px auto",
            background: "#020617",
            padding: "20px",
            borderRadius: "10px"
          }}>
            <h2>Ny Email</h2>

            <input
              placeholder="To..."
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <input
              placeholder="Subject..."
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              style={{ width: "100%", marginBottom: "10px" }}
            />

            <textarea
              value={emailText}
              onChange={(e) => setEmailText(e.target.value)}
              style={{ width: "100%", height: "150px" }}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={() => setShowEmailModal(false)}>
                Luk
              </button>

              <button onClick={() => {
                alert("Ticket oprettet (demo)");
                setShowEmailModal(false);
              }}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

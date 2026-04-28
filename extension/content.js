
console.log("AI Privacy Extension Active");

// -------------------------
// DETECTION ENGINE
// -------------------------
function analyzeText(text) {
  let risk = 0;
  let warnings = [];

  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+/;
  const phonePattern = /(?<!\d)\d{10}(?!\d)/;
  const aadhaarPattern = /(?<!\d)(\d{4}\s?\d{4}\s?\d{4})(?!\d)/;

  const scamKeywords = [
    "urgent",
    "kyc",
    "click link",
    "otp share",
    "verify immediately",
    "account blocked",
    "suspended",
    "update bank"
  ];

  if (emailPattern.test(text)) {
    risk += 20;
    warnings.push("Email detected");
  }

  if (phonePattern.test(text)) {
    risk += 20;
    warnings.push("Phone detected");
  }

  if (aadhaarPattern.test(text)) {
    risk += 30;
    warnings.push("Aadhaar detected");
  }

  if (
    text.toLowerCase().includes("otp") ||
    text.toLowerCase().includes("password") ||
    text.toLowerCase().includes("pin")
  ) {
    risk += 40;
    warnings.push("Sensitive info detected");
  }

  scamKeywords.forEach(word => {
    if (text.toLowerCase().includes(word)) {
      risk += 15;
      warnings.push("Scam pattern detected");
    }
  });

  if (risk > 100) risk = 100;

  return { risk, warnings };
}

// -------------------------
// WATCH INPUT
// -------------------------
document.addEventListener("keyup", () => {
  let target = document.activeElement;
  if (!target) return;

  let text = (target.innerText || target.value || "").trim();

  let result = analyzeText(text);

  // ALWAYS update UI (even if risk = 0)
  showBanner(result);
  blockWhatsAppSend(result.risk);

  // remove banner if completely safe
  if (result.risk === 0 || text.length < 1) {
    removeBanner();
    blockWhatsAppSend(0);
  }
});
// -------------------------
// WHATSAPP SEND BLOCK FIX
// -------------------------
function blockWhatsAppSend(risk) {
  let buttons = document.querySelectorAll("button, span, div");

  buttons.forEach(btn => {
    let aria = (btn.getAttribute("aria-label") || "").toLowerCase();
    let title = (btn.getAttribute("title") || "").toLowerCase();
    let text = (btn.innerText || "").toLowerCase();

    let isSendButton =
      aria.includes("send") ||
      title.includes("send") ||
      text === "send";

    if (isSendButton) {
      if (risk >= 75) {
        btn.style.pointerEvents = "none";
        btn.style.opacity = "0.4";
        btn.style.cursor = "not-allowed";
        btn.title = "Blocked due to privacy risk";
      } else {
        btn.style.pointerEvents = "auto";
        btn.style.opacity = "1";
        btn.style.cursor = "pointer";
        btn.title = "";
      }
    }
  });
}

// -------------------------
// UI BANNER
// -------------------------
function showBanner(result) {
  let old = document.getElementById("privacy-banner");
  if (old) old.remove();

  let level = "LOW";
  let color = "#22c55e";

  if (result.risk >= 50) {
    level = "MEDIUM";
    color = "#f59e0b";
  }

  if (result.risk >= 75) {
    level = "HIGH";
    color = "#ef4444";
  }

  let div = document.createElement("div");
  div.id = "privacy-banner";

  div.style.position = "fixed";
  div.style.top = "20px";
  div.style.right = "20px";
  div.style.width = "280px";
  div.style.padding = "12px";
  div.style.borderRadius = "12px";
  div.style.color = "white";
  div.style.fontFamily = "Arial";
  div.style.zIndex = "999999";
  div.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
  div.style.background = color;

  div.innerHTML = `
    🔐 <b>Privacy Risk: ${result.risk}%</b><br>
    <small>Level: ${level}</small><br><br>
    ${result.warnings.join("<br>")}
  `;

  document.body.appendChild(div);
}

// -------------------------
// REMOVE BANNER
// -------------------------
function removeBanner() {
  let old = document.getElementById("privacy-banner");
  if (old) old.remove();
}

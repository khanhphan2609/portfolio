// ─────────────────────────────────────────────
//  mail.js — EmailJS integration
//  Docs: https://www.emailjs.com/docs/
// ─────────────────────────────────────────────
//
//  SETUP (1 lần duy nhất):
//  1. Đăng ký tại https://www.emailjs.com
//  2. Vào "Email Services" → Add New Service → chọn Gmail (hoặc provider khác)
//     → Copy SERVICE_ID vào bên dưới
//  3. Vào "Email Templates" → Create New Template
//     Dùng các biến sau trong template:
//       {{from_name}}    — Tên người gửi
//       {{from_email}}   — Email người gửi
//       {{phone}}        — Số điện thoại
//       {{subject}}      — Tiêu đề
//       {{message}}      — Nội dung
//       {{to_email}}     — Email nhận (pvkhanh2609@gmail.com)
//     → Copy TEMPLATE_ID vào bên dưới
//  4. Vào "Account" → Copy PUBLIC_KEY vào bên dưới
// ─────────────────────────────────────────────

const EMAILJS_CONFIG = {
  PUBLIC_KEY: "01c7uH9ZR2vvBGmqW", // 🔑 Thay bằng Public Key của bạn
  SERVICE_ID: "service_3s195v6", // 📦 Thay bằng Service ID của bạn
  TEMPLATE_ID: "template_4gvr5ka", // 📄 Thay bằng Template ID của bạn
};

// ─── Khởi tạo EmailJS ───────────────────────
(function initEmailJS() {
  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
  script.onload = () => {
    emailjs.init({ publicKey: EMAILJS_CONFIG.PUBLIC_KEY });
    console.log("✅ EmailJS initialized");
  };
  document.head.appendChild(script);
})();

// ─── Validate form ──────────────────────────
function validateForm() {
  const fields = {
    fullName: {
      el: document.getElementById("fullName"),
      msg: "Vui lòng nhập họ tên.",
    },
    email: {
      el: document.getElementById("email"),
      msg: "Vui lòng nhập email hợp lệ.",
    },
    phoneNumber: {
      el: document.getElementById("phoneNumber"),
      msg: "Vui lòng nhập số điện thoại.",
    },
    subject: {
      el: document.getElementById("subject"),
      msg: "Vui lòng nhập tiêu đề.",
    },
    message: {
      el: document.getElementById("message"),
      msg: "Vui lòng nhập nội dung.",
    },
  };

  let isValid = true;

  // Xoá lỗi cũ
  Object.keys(fields).forEach((key) => {
    const errorEl = document.getElementById(key + "Error");
    if (errorEl) errorEl.textContent = "";
    fields[key].el?.classList.remove("input-error");
  });

  // Kiểm tra từng field
  Object.entries(fields).forEach(([key, { el, msg }]) => {
    if (!el) return;
    const val = el.value.trim();
    if (!val) {
      showError(key, msg);
      isValid = false;
      return;
    }
    // Validate email riêng
    if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      showError(key, "Email không đúng định dạng.");
      isValid = false;
    }
    // Validate phone riêng
    if (key === "phoneNumber" && !/^[0-9\+\-\s]{7,15}$/.test(val)) {
      showError(key, "Số điện thoại không hợp lệ.");
      isValid = false;
    }
  });

  if (isValid) sendMail(fields);
}

function showError(fieldId, message) {
  const el = document.getElementById(fieldId);
  const errorEl = document.getElementById(fieldId + "Error");
  if (el) el.classList.add("input-error");
  if (errorEl) errorEl.textContent = message;
}

// ─── Gửi mail qua EmailJS ───────────────────
async function sendMail(fields) {
  const btn = document.querySelector(
    "#contactForm .btn[type='button'], #contactForm input[type='button']",
  );

  const templateParams = {
    from_name: fields.fullName.el.value.trim(),
    from_email: fields.email.el.value.trim(),
    phone: fields.phoneNumber.el.value.trim(),
    subject: fields.subject.el.value.trim(),
    message: fields.message.el.value.trim(),
    to_email: "pvkhanh2609@gmail.com",
  };

  // UI loading
  if (btn) {
    btn.disabled = true;
    btn.value = "Sending...";
  }

  try {
    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
    );
    
    showToast("✅ Success! I will respond as soon as possible.", "success");
    resetForm();
  } catch (error) {
    console.error("EmailJS error:", error);
    showToast(
      "❌ Failed to send. Please try again or contact me directly via email.",
      "error",
    );
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.value = "Send Message";
    }
  }
}

// ─── Reset form ─────────────────────────────
function resetForm() {
  ["fullName", "email", "phoneNumber", "subject", "message"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

// ─── Toast notification ─────────────────────
function showToast(message, type = "success") {
  // Xoá toast cũ nếu có
  const existing = document.getElementById("mail-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "mail-toast";
  toast.textContent = message;
  toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-size: 0.95rem;
        font-weight: 500;
        color: #fff;
        background: ${type === "success" ? "#22c55e" : "#ef4444"};
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
        z-index: 9999;
        opacity: 0;
        transform: translateY(1rem);
        transition: opacity 0.3s ease, transform 0.3s ease;
    `;

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  // Animate out sau 4 giây
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(1rem)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

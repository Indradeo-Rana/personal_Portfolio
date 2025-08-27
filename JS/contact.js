// ---- EmailJS init ----
(function () {
  emailjs.init({
    publicKey: "SU97d7F74uEj6Gr6l", // 🔑 Replace with your EmailJS Public Key
  });
})();

// ---- Form validation + send ----
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const successMessageEl = document.getElementById("successMessage");

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // hide previous errors
      document.querySelectorAll(".error-message").forEach((el) => {
        el.style.display = "none";
      });

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      let isValid = true;
      if (!name) {
        document.getElementById("nameError").style.display = "block";
        isValid = false;
      }
      if (!email || !isValidEmail(email)) {
        document.getElementById("emailError").style.display = "block";
        isValid = false;
      }
      if (!subject) {
        document.getElementById("subjectError").style.display = "block";
        isValid = false;
      }
      if (!message) {
        document.getElementById("messageError").style.display = "block";
        isValid = false;
      }

      if (!isValid) return;

      // ---- Send email using EmailJS ----
      emailjs
        .send("service_von3bgp", "template_3amqj2t", {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
        })
        .then(
          function () {
            // Show success message
            successMessageEl.style.display = "block";
            contactForm.reset();

            setTimeout(() => {
              successMessageEl.style.display = "none";
            }, 5000);
          },
          function (error) {
            alert("❌ Failed to send message. Please try again. \nError: " + JSON.stringify(error));
          }
        );
    });
  }
});

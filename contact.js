(function () {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init({
    publicKey: "aw__uXPnTqpkI3j9J",
  });
  console.log("EmailJS initialized");
})();

function showStatus(message, isSuccess) {
  let statusDiv = document.getElementById("contact-status");
  if (!statusDiv) {
    statusDiv = document.createElement("div");
    statusDiv.id = "contact-status";
    statusDiv.style.marginTop = "16px";
    statusDiv.style.fontWeight = "bold";
    document.getElementById("contactForm").appendChild(statusDiv);
  }
  statusDiv.textContent = message;
  statusDiv.style.color = isSuccess ? "green" : "red";
}

function onSubmitContact(token) {
  console.log("reCAPTCHA token received:", token);
  const form = document.getElementById("contactForm");
  const formData = new FormData(form);
  formData.append("g-recaptcha-response", token);
  const templateProperties = Object.fromEntries(formData.entries());
  console.log("form", formData);
  emailjs.send("service_p3l06sf", "template_zem3rml", templateProperties).then(
    () => {
      console.log("SUCCESS!");
      showStatus(getTranslation("statusMessages.success"), true);
      form.reset();
    },
    (error) => {
      console.log("FAILED...", error);
      showStatus(getTranslation("statusMessages.error"), false);
    }
  );
}

window.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      // Show the reCAPTCHA badge
      console.log("Submitting form, executing reCAPTCHA...");
      try {
        grecaptcha.execute();
      } catch (error) {
        console.error("reCAPTCHA execution failed:", error);
        showStatus(getTranslation("statusMessages.error"), false);
      }
    });
});

(function () {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init({
    publicKey: "aw__uXPnTqpkI3j9J",
  });
  console.log("EmailJS initialized");
})();

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
    },
    (error) => {
      console.log("FAILED...", error);
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
      grecaptcha.execute();
      // these IDs from the previous steps
    });
});

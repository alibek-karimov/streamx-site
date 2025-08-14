(function () {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init({
    publicKey: "aw__uXPnTqpkI3j9J",
  });
  console.log("EmailJS initialized");
})();

window.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const form = new FormData(this);
      // Show the reCAPTCHA badge
      grecaptcha.enterprise.ready(async () => {
        const token = await grecaptcha.enterprise.execute(
          "6Lc01aUrAAAAAAAJGo8eiRCBWu13ncdGCGafkBuf",
          { action: "submit" }
        );
        console.log("reCAPTCHA token:", token);
        form.append('g-recaptcha-response', token);
        const formData = Object.fromEntries(form.entries());
        for (const [key, value] of form) {
            console.log(`Form data ${key}:`, value);
        }
        console.log("form", formData);
        emailjs.send("service_p3l06sf", "template_zem3rml", formData).then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error);
          }
        );
      });

      // these IDs from the previous steps
    });
});

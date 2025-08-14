(function () {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init({
    publicKey: "aw__uXPnTqpkI3j9J",
  });
  console.log("EmailJS initialized");
})();

function onSubmitContact(token) {
    form.append('g-recaptcha-response', token);
        const form = document.getElementById("contactForm");
        const formData = new FormData(form);
        formData.append('g-recaptcha-response', token);
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
      
        grecaptcha.enterprise.execute(
          "6Lc01aUrAAAAAAAJGo8eiRCBWu13ncdGCGafkBuf",
          { action: "submit" }
        );
        console.log("reCAPTCHA token:", token);
        
      // these IDs from the previous steps
    });
});

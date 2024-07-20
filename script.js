function sendEmail() {
    const parm = {

        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        date: document.getElementById('date').value,
        email: document.getElementById('email').value,
        service: document.getElementById('service').value,
        doctor: document.getElementById('doctor').value,
        message:document.getElementById('message').value
    }
    emailjs.send("service_1yjznyg", "template_r16y81e", parm)
        .then(
            function(response) {
                alert("Email envoyé avec succès");
                // Vider les champs après l'envoi
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('phone').value = '';
                document.getElementById('date').value = '';
                document.getElementById('service').value = '';
                document.getElementById('doctor').value = '';
                document.getElementById('message').value = '';
            },
            function(error) {
                alert("Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer.");
            }
        );
  
}
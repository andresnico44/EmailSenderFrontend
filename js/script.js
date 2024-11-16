document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('emailForm');
    const status = document.getElementById('status');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const to = document.getElementById('to').value;
        const subject = document.getElementById('subject').value;
        const cc = document.getElementById('cc').value;
        const message = document.getElementById('message').value;

        const emailData = { to, subject, cc, message };
        console.log("Datos que se enviarán:", JSON.stringify(emailData)); // Verifica el formato aquí

        status.textContent = 'Enviando...';

        try {
            const response = await fetch('http://localhost:8080/api/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(emailData) // Usa el objeto JSON aquí
            });

            if (response.ok) {
                status.textContent = '¡Email enviado con éxito!';
                form.reset();
            } else {
                status.textContent = 'Error al enviar el email.';
                console.error('Error:', await response.text());
            }
        } catch (error) {
            status.textContent = 'Error al enviar el email.';
            console.error('Error:', error);
        }
    });
});

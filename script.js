document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("surveyForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        let formData = new FormData(this); // Get form data
        let actionUrl = this.action; // Get the form's action URL

        if (!actionUrl) {
            console.error("Hata: Form action URL eksik!");
            alert("Form yapılandırmasında hata var. Lütfen geliştiriciyle iletişime geçin.");
            return;
        }

        // Convert FormData to an object and check for empty fields
        let formObject = Object.fromEntries(formData.entries());

        for (let key in formObject) {
            if (!formObject[key]) {
                alert("Lütfen tüm alanları doldurun.");
                return;
            }
        }

        // Ensure message text area sends correct line breaks
        if (formObject.message) {
            formObject.message = formObject.message.replace(/\n/g, "\r");
        }

        console.log("Form verileri gönderiliyor:", formObject);

        fetch(actionUrl, {
            method: "POST",
            body: new URLSearchParams(formObject), // Send data in a way that Google Apps Script correctly interprets
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(response => response.text()) // Google Apps Script returns plain text
        .then(data => {
            console.log("Sunucudan gelen yanıt:", data);
            alert("Form başarıyla gönderildi!");
            document.getElementById("surveyForm").reset(); // Reset form
        })
        .catch(error => {
            console.error("Gönderme hatası:", error);
            alert("Gönderme başarısız! Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin.");
        });
    });
});
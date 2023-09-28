document.getElementById("loginForm").addEventListener("submit", function(event){
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch('http://127.0.0.1:5000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ Username: username, Password: password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.message) {
            alert(data.message);
            if (data.message === "Logged in successfully") {
                window.location.href = "http://127.0.0.1:5000/userdata";
            } else {
                window.location.href = "../templates/error.html";
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        window.location.href = "../templates/error.html";
    });
});
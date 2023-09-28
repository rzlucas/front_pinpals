document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var profilePicture = document.getElementById('profilePicture').value;
  
    fetch("http://127.0.0.1:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        Username: username,
        Email: email,
        Password: password,
        ProfilePicture: profilePicture
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === "User registered successfully") {
          alert("Usuario creado con éxito");
          window.location.href = "../templates/login.html";
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        window.location.href = "../templates/error.html";

        
      });
  });
  
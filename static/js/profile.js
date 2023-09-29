async function fetchUserProfile(event) {
    event.preventDefault(); // Esto prevendrá la recarga de la página
    
    const userId = document.getElementById('userId').value;
    if (!userId) {
        alert('Por favor ingrese un ID válido');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/users/${userId}`);
        if (!response.ok) {
            alert('El usuario no existe');
            return;
        }

        const data = await response.json();
        document.getElementById('username').textContent = data.username;
        document.getElementById('email').textContent = data.email;
        document.getElementById('profilePicture').src = data.profilePicture;
        document.getElementById('user-details').style.display = 'block';
        document.getElementById('profilePictureContainer').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
    }
}

async function editField(field) {
    let value;
    if (field === 'ProfilePicture') {
        value = prompt('Ingresa la nueva URL de la imagen');
        if (!value) return;
    } else {
        value = prompt(`Ingresa nuevo ${field}`);
    }

    const userId = document.getElementById('userId').value;
    try {
        const response = await fetch(`http://127.0.0.1:5000/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ [field]: value })
        });

        if (response.ok) {
            alert(`${field} se actualizó correctamente!`);
            fetchUserProfile(new Event('click')); // Simula un evento de clic para refrescar la información
        } else {
            alert('Falló al actualizar el perfil');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

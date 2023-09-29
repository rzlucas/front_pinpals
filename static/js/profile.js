async function fetchUserProfile() {
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
        document.getElementById('username').textContent = data.username; // Asegúrate de que estas claves coinciden con las de tu objeto JSON
        document.getElementById('email').textContent = data.email; // Asegúrate de que estas claves coinciden con las de tu objeto JSON
        document.getElementById('profilePicture').src = data.profilePicture; // Asegúrate de que estas claves coinciden con las de tu objeto JSON
        document.getElementById('user-details').style.display = 'block'; // Muestra los detalles del usuario
        document.getElementById('profilePictureContainer').style.display = 'block'; // Muestra la imagen del perfil
    } catch (error) {
        console.error('Error:', error);
    }
}

async function editField(field) {
    let value;
    if (field === 'ProfilePicture') {
        value = prompt('Ingresa la nueva URL de la imagen');
        if (!value) return; // Si el usuario cancela o no introduce una URL, no proceder
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
            fetchUserProfile(); // Actualiza los detalles del perfil para mostrar la nueva información
        } else {
            alert('Falló al actualizar el perfil');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchUserProfile() {
    const userId = document.getElementById('userId').value;
    if (!userId) {
        alert('Por favor ingrese un ID válido');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/users/${userId}`);
        if (!response.ok) {
            alert('El usuario noo existe');
            return;
        }

        const data = await response.json();
        document.getElementById('username').textContent = data.Username;
        document.getElementById('email').textContent = data.Email;
        document.getElementById('profilePicture').src = data.ProfilePicture;
        document.getElementById('user-profile').style.display = 'block';

        // Esta línea hace que el div de la imagen del perfil sea visible
        document.getElementById('profilePictureContainer').style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
    }
}


async function editField(field) {
    let value;
    if (field === 'ProfilePicture') {
        value = prompt('Enter the new image URL');
    } else {
        value = prompt(`Enter new ${field}`);
    }

    if (value) {
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
                alert(`${field} updated successfully!`);
                fetchUserProfile();
            } else {
                alert('Failed to update profile');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
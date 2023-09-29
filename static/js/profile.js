async function fetchUserProfile() {
    const userId = document.getElementById('userId').value;
    if (!userId) {
        alert('Please enter a user ID');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:5000/users/${userId}`);
        if (!response.ok) {
            alert('User not found');
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

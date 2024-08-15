document.addEventListener('DOMContentLoaded', () => {
    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const response = await fetch('http://localhost:3300/api/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                });
                
                console.log("responsee", response)
                const result = await response.json();

                if (response.ok) {
                    // alert(result.message || 'Login successful!');
                    const userId  = result.user.id; 
                    localStorage.setItem('user_id', userId);
                    window.location.href = 'tasks.html'; // Redirect to the tasks page
                } else {
                    alert(result.error || 'Login failed');
                }
            } catch (error) {
                alert('Login error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

    // Register Form Submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('registerUsername').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;

            try {
                const response = await fetch('http://localhost:3300/api/users/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password }),
                });
                const result = await response.json();
                if (response.ok) {
                    alert('Registration successful, now login to your account!');
                    window.location.href = 'index.html'; // Redirect to the login page
                } else {
                    alert(result.message || 'Registration failed');
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('An error occurred. Please try again.');
            }
        });
    }

});

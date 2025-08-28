export function renderLoginForm(container, onLoginSuccess) {
    container.innerHTML = `
    <h2>Login</h2>
    <form id="login-form">
      <input type="text" name="username" placeholder="Username" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <div id="login-result"></div>
  `;
    const form = document.getElementById('login-form');
    const resultDiv = document.getElementById('login-result');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = {
            username: formData.get('username'),
            password: formData.get('password'),
        };
        try {
            const res = await fetch('https://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            if (result.token) {
                localStorage.setItem('authToken', result.token);
                resultDiv.textContent = 'Login successful!';
                onLoginSuccess(); // 👈 Update UI
            }
            else {
                resultDiv.textContent = 'Invalid credentials.';
            }
        }
        catch (err) {
            resultDiv.textContent = 'Login failed.';
        }
    });
}

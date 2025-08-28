export function renderRegistrationForm(container) {
    container.innerHTML = `
        <h2>Register</h2>
        <form id="register-form">
            <label>
                Name:
                <input type="text" id="name" required />
            </label>
            <label>
                Username:
                <input type="text" id="username" required />
            </label>
            <label>
                Team:
                <select id="team" required>
                    <option value="">Select a team</option>
                    <option value="HACKTIVISTS">HACKTIVISTS</option>
                    <option value="BUG BUSTERS">BUG BUSTERS</option>
                    <option value="LOGIC LEAGUE">LOGIC LEAGUE</option>
                    <option value="CODE ALLIANCE">CODE ALLIANCE</option>
                </select>
            </label>
            <label>
                Password:
                <input type="password" id="password" required />
            </label>
            <button type="submit">Register</button>
        </form>
        <div id="register-result"></div>
    `;
    const form = document.getElementById('register-form');
    const resultDiv = document.getElementById('register-result');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const username = document.getElementById('username').value;
        const team = document.getElementById('team').value;
        const password = document.getElementById('password').value;
        const data = { name, username, team, password };
        try {
            const res = await fetch('https://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            resultDiv.textContent = result.success
                ? `Registered! User ID: ${result.userId}`
                : `Error: ${result.error}`;
            form.reset();
        }
        catch (err) {
            resultDiv.textContent = 'Registration failed.';
        }
    });
}

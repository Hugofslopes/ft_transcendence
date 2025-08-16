export function renderAuthModal(showOnly: 'login' | 'register') {
  // Create modal overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2 id="modal-title">Login</h2>
        <button class="modal-close">&times;</button>
      </div>
      
      <!-- Tab buttons -->
      <div class="auth-tabs">
        <button class="auth-tab active" data-tab="login">Login</button>
        <button class="auth-tab" data-tab="register">Register</button>
      </div>
  
      <!-- Login Form -->
      <form id="login-form" class="auth-form active">
        <label>
          Username:
          <input type="text" id="login-username" required />
        </label>
        <label>
          Password:
          <input type="password" id="login-password" required />
        </label>
        <button type="submit">Login</button>
      </form>

      <!-- Registration Form -->
      <form id="registration-form" class="auth-form">
        <label>
          Name:
          <input type="text" id="register-name" required />
        </label>
        <label>
          Username:
          <input type="text" id="register-username" required />
        </label>
        <label>
          Team:
          <select id="register-team" required>
            <option value="">Select a team</option>
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
          </select>
        </label>
        <label>
          Password:
          <input type="password" id="register-password" required />
        </label>
        <button type="submit">Register</button>
      </form>
      
      <div id="result"></div>
    </div>
  `;

  // Add to body

  document.body.appendChild(modalOverlay);

  // Get elements
  const loginForm = document.getElementById('login-form') as HTMLFormElement;
  const registerForm = document.getElementById('registration-form') as HTMLFormElement;
  const result = document.getElementById('result') as HTMLDivElement;
  const closeButton = document.querySelector('.modal-close') as HTMLButtonElement;
  const modalTitle = document.getElementById('modal-title') as HTMLHeadingElement;
  const authTabs = document.querySelectorAll('.auth-tab') as NodeListOf<HTMLButtonElement>;
  const authForms = document.querySelectorAll('.auth-form') as NodeListOf<HTMLFormElement>;
  document.getElementById('login-form')?.setAttribute('style', 'display:block; color:red;');
  document.getElementById('registration-form')?.setAttribute('style', 'display:none; color:red;');
  // Close modal function
  const closeModal = () => {
    document.body.removeChild(modalOverlay);
  };

  // Tab switching function
  const switchTab = (tabName: string) => {
    // Update tabs
    authTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });
    
    // Update forms - handle the different form ID naming
    authForms.forEach(form => {
      if (tabName === 'login') {
        document.getElementById('login-form')?.setAttribute('style', 'display:block; color:red;');
        document.getElementById('registration-form')?.setAttribute('style', 'display:none; color:red;');
        form.classList.toggle('active', form.id === 'login-form');
      } else if (tabName === 'register') {
        document.getElementById('login-form')?.setAttribute('style', 'display:none; color:red;');
        document.getElementById('registration-form')?.setAttribute('style', 'display:block; color:red;');
        form.classList.toggle('active', form.id === 'registration-form');
      }
    });
    
    // Update title
    modalTitle.textContent = tabName === 'login' ? 'Login' : 'Register';
    
    // Clear result
    result.innerText = '';
  };  // Tab click events
  authTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.tab!);
    });
  });

  // Close button event
  closeButton.addEventListener('click', closeModal);

  // Close on overlay click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on Escape key
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);

  // Login form submission
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = (document.getElementById('login-username') as HTMLInputElement).value;
    const password = (document.getElementById('login-password') as HTMLInputElement).value;

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      result.innerText = `✅ Login successful: Welcome ${data.username || username}`;
      loginForm.reset();
      // Auto-close modal after successful login
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (err) {
      result.innerText = `❌ ${(err as Error).message}`;
    }
  });

  // Registration form submission
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = (document.getElementById('register-name') as HTMLInputElement).value;
    const username = (document.getElementById('register-username') as HTMLInputElement).value;
    const team = (document.getElementById('register-team') as HTMLInputElement).value;
    const password = (document.getElementById('register-password') as HTMLInputElement).value;

    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, team, password })
      });

      if (!response.ok) throw new Error('Failed to register');

      const data = await response.json();
      result.innerText = `✅ Registered: ${JSON.stringify(data)}`;
      registerForm.reset();
      // Auto-close modal after successful registration
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (err) {
      result.innerText = `❌ ${(err as Error).message}`;
    }
  });
}

export function renderRegistrationModal() {
  // Create modal overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Register</h2>
        <button class="modal-close">&times;</button>
      </div>
      <form id="registration-form">
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
            <option value="Red">Red</option>
            <option value="Blue">Blue</option>
            <option value="Green">Green</option>
            <option value="Yellow">Yellow</option>
          </select>
        </label>
        <label>
          Password:
          <input type="password" id="password" required />
        </label>
        <button type="submit">Register</button>
      </form>
      <div id="result"></div>
    </div>
  `;

  // Add to body
  document.body.appendChild(modalOverlay);

  // Get elements
  const form = document.getElementById('registration-form') as HTMLFormElement;
  const result = document.getElementById('result') as HTMLDivElement;
  const closeButton = document.querySelector('.modal-close') as HTMLButtonElement;

  // Close modal function
  const closeModal = () => {
    document.body.removeChild(modalOverlay);
  };

  // Close button event
  closeButton.addEventListener('click', closeModal);

  // Close on overlay click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const team = (document.getElementById('team') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, team, password })
      });

      if (!response.ok) throw new Error('Failed to register');

      const data = await response.json();
      result.innerText = `✅ Registered: ${JSON.stringify(data)}`;
      form.reset();
      
      // Auto-close modal after successful registration
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (err) {
      result.innerText = `❌ ${(err as Error).message}`;
    }
  });
}

export function renderRegistrationForm(container: HTMLElement) {
  container.innerHTML = `
    <h2>Register</h2>
    <form id="registration-form">
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
          <option value="Red">Red</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Yellow">Yellow</option>
        </select>
      </label>
      <label>
        Password:
        <input type="password" id="password" required />
      </label>
      <button type="submit">Register</button>
    </form>
    <div id="result"></div>
  `;

  const form = document.getElementById('registration-form') as HTMLFormElement;
  const result = document.getElementById('result') as HTMLDivElement;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const team = (document.getElementById('team') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    try {
      const response = await fetch('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, username, team, password })
      });

      if (!response.ok) throw new Error('Failed to register');

      const data = await response.json();
      result.innerText = `✅ Registered: ${JSON.stringify(data)}`;
      form.reset();
    } catch (err) {
      result.innerText = `❌ ${(err as Error).message}`;
    }
  });
}

export function renderUserListModal() {
  // Create modal overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>All Users</h2>
        <button class="modal-close">&times;</button>
      </div>
      <div id="users-list">
        <p>Loading users...</p>
      </div>
      <button id="refresh-users" class="btn" style="margin-top: 16px;">Refresh</button>
    </div>
  `;

  // Add to body
  document.body.appendChild(modalOverlay);

  // Get elements
  const usersListContainer = document.getElementById('users-list') as HTMLDivElement;
  const refreshButton = document.getElementById('refresh-users') as HTMLButtonElement;
  const closeButton = document.querySelector('.modal-close') as HTMLButtonElement;

  // Close modal function
  const closeModal = () => {
    document.body.removeChild(modalOverlay);
  };

  // Load users function
  const loadUsers = async () => {
    try {
      usersListContainer.innerHTML = '<p>Loading users...</p>';
      
      const response = await fetch('/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error('Failed to fetch users');

      const users = await response.json();
      
      if (users.length === 0) {
        usersListContainer.innerHTML = '<p>No users found.</p>';
        return;
      }

      // Create users table
      const usersHtml = `
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid #e5e7eb;">
              <th style="padding: 8px; text-align: left;">ID</th>
              <th style="padding: 8px; text-align: left;">Name</th>
              <th style="padding: 8px; text-align: left;">Username</th>
              <th style="padding: 8px; text-align: left;">Team</th>
              <th style="padding: 8px; text-align: left;">password</th>
            </tr>
          </thead>
          <tbody>
            ${users.map((user: any) => `
              <tr style="border-bottom: 1px solid #f3f4f6;">
                <td style="padding: 8px;">${user.id || 'N/A'}</td>
                <td style="padding: 8px;">${user.name || 'N/A'}</td>
                <td style="padding: 8px;">${user.username || 'N/A'}</td>
                <td style="padding: 8px;">${user.team || 'N/A'}</td>
                <td style="padding: 8px;">${user.password || 'N/A'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
      
      usersListContainer.innerHTML = usersHtml;
    } catch (err) {
      usersListContainer.innerHTML = `<p style="color: red;">❌ ${(err as Error).message}</p>`;
    }
  };

  // Event listeners
  closeButton.addEventListener('click', closeModal);
  refreshButton.addEventListener('click', loadUsers);

  // Close on overlay click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on Escape key
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);

  // Load users initially
  loadUsers();
}

export function renderDeleteUserModal() {
  // Create modal overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Delete User</h2>
        <button class="modal-close">&times;</button>
      </div>
      <form id="delete-user-form">
        <label>
          User ID or Username:
          <input type="text" id="delete-user-input" placeholder="Enter user ID or username" required />
        </label>
        <button type="submit" style="background-color: #dc2626; color: white; margin-top: 16px;">Delete User</button>
      </form>
      <div id="delete-result" style="margin-top: 16px;"></div>
    </div>
  `;

  // Add to body
  document.body.appendChild(modalOverlay);

  // Get elements
  const form = document.getElementById('delete-user-form') as HTMLFormElement;
  const result = document.getElementById('delete-result') as HTMLDivElement;
  const closeButton = document.querySelector('.modal-close') as HTMLButtonElement;

  // Close modal function
  const closeModal = () => {
    document.body.removeChild(modalOverlay);
  };

  // Event listeners
  closeButton.addEventListener('click', closeModal);

  // Close on overlay click
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Close on Escape key
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeModal();
      document.removeEventListener('keydown', handleEscape);
    }
  };
  document.addEventListener('keydown', handleEscape);

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userIdentifier = (document.getElementById('delete-user-input') as HTMLInputElement).value.trim();

    if (!userIdentifier) {
      result.innerHTML = '<p style="color: red;">❌ Please enter a user ID or username</p>';
      return;
    }

    try {
      result.innerHTML = '<p>Deleting user...</p>';
      
      // Try to delete by ID first, then by username
      let response = await fetch(`/users/${userIdentifier}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        // If delete by ID fails, try delete by username
        response = await fetch(`/users/username/${userIdentifier}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' }
        });
      }

      if (!response.ok) {
        throw new Error(`Failed to delete user: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      result.innerHTML = `<p style="color: green;">✅ User deleted successfully: ${JSON.stringify(data)}</p>`;
      form.reset();
      
      // Auto-close modal after successful deletion
      setTimeout(() => {
        closeModal();
      }, 3000);
    } catch (err) {
      result.innerHTML = `<p style="color: red;">❌ ${(err as Error).message}</p>`;
    }
  });
}

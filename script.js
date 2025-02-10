// Check if user is already logged in
function checkLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        window.location.href = 'dashboard.html';
    }
}

// Login function
function loginUser(event) {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid email or password!');
    }
}

// Register function
function registerUser(event) {
    event.preventDefault();

    const fullName = event.target.fullName.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
        alert("Passwords don't match!");
        return false;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(user => user.email === email)) {
        alert('Email already registered!');
        return false;
    }

    const newUser = {
        fullName,
        email,
        password,
        registrationDate: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please login.');
    window.location.href = 'index.html';
}

// Dashboard functions
function loadDashboard() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    const user = JSON.parse(currentUser);
    document.getElementById('fullName').textContent = user.fullName;
    document.getElementById('email').textContent = user.email;
    document.getElementById('regDate').textContent = new Date(user.registrationDate).toLocaleDateString();
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
} 
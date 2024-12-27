// Example of sending a signup request
function signupUser() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const data = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword
    };

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(responseData => {
        alert(responseData);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Example of sending a login request
function loginUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const data = {
        username: username,
        password: password
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(responseData => {
        alert(responseData);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Example of sending a forgot password request
function forgotPassword() {
    const email = document.getElementById('email').value;

    const data = { email: email };

    fetch('/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(responseData => {
        alert(responseData);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission for loginForm
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Dummy authentication check
            if (username === 'user' && password === 'pass') {
                window.location.href = './inPrinciple Form/inPrincipleForm.html';
            } else {
                document.getElementById('loginError').classList.remove('hidden');
            }
        });
    }
});
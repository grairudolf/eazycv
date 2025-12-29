// frontend/js/login.js

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorMessage.textContent = '';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        errorMessage.textContent = error.message;
    } else {
        // Store the session and redirect
        localStorage.setItem('supabase.auth.token', JSON.stringify(data.session));
        window.location.href = 'form.html';
    }
});

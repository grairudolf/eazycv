// frontend/js/signup.js

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const signupForm = document.getElementById('signup-form');
const message = document.getElementById('message');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    message.textContent = '';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        return;
    }

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
    });

    if (error) {
        message.textContent = error.message;
    } else {
        message.style.color = 'green';
        message.textContent = 'Sign up successful! Please check your email to verify your account.';
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 3000);
    }
});

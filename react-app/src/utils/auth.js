const USERS_KEY = 'eazycv_users';
const SESSION_KEY = 'eazycv_session';

export function getSession() {
  const raw = localStorage.getItem(SESSION_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function setSession(session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event('eazycv-auth-change'));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event('eazycv-auth-change'));
}

export function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser({ email, password }) {
  const users = getUsers();
  const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    throw new Error('An account with this email already exists.');
  }
  const newUser = { email, password };
  users.push(newUser);
  saveUsers(users);
  setSession({ email });
  return newUser;
}

export function loginUser({ email, password }) {
  const users = getUsers();
  const match = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
  );
  if (!match) {
    throw new Error('Invalid email or password.');
  }
  setSession({ email: match.email });
  return match;
}

export function isAuthenticated() {
  return !!getSession();
}

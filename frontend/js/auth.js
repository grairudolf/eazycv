// frontend/js/auth.js

// This script simulates a basic authentication flow for local development
// without requiring a real Supabase backend.

const mockAuth = {
  /**
   * Simulates a user sign-in.
   * In a real scenario, this would involve a call to a Supabase or other auth provider.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<{user: object, session: object, error: object}>}
   */
  async signInWithPassword(email, password) {
    console.log(`Attempting to sign in with email: ${email}`);

    // Basic validation
    if (!email || !password) {
      return { user: null, session: null, error: { message: "Email and password are required." } };
    }

    if (password.length < 6) {
      return { user: null, session: null, error: { message: "Password should be at least 6 characters." } };
    }

    // Simulate a successful login
    const user = {
      id: 'mock-user-id-' + new Date().getTime(),
      email: email,
      // Add any other user properties you might need
    };

    const session = {
      access_token: 'mock-access-token',
      refresh_token: 'mock-refresh-token',
      user: user,
    };

    // Store a mock session in localStorage to simulate a logged-in state
    localStorage.setItem('eazycv_user_email', email);
    localStorage.setItem('eazycv_logged_in', 'true');

    console.log('Mock sign-in successful.');
    return { user, session, error: null };
  },

  /**
   * Simulates a user sign-up.
   * In a real scenario, this would create a new user in the database.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<{user: object, session: object, error: object}>}
   */
  async signUp(email, password) {
    console.log(`Attempting to sign up with email: ${email}`);
    // For the mock service, sign-up is essentially the same as sign-in
    return this.signInWithPassword(email, password);
  },

  /**
   * Simulates signing out.
   */
  async signOut() {
    localStorage.removeItem('eazycv_user_email');
    localStorage.removeItem('eazycv_logged_in');
    console.log('Mock sign-out successful.');
    return { error: null };
  },

  /**
   * A mock Supabase client object to be used in the application.
   */
  client: {
    auth: {
      signInWithPassword: (credentials) => mockAuth.signInWithPassword(credentials.email, credentials.password),
      signUp: (credentials) => mockAuth.signUp(credentials.email, credentials.password),
      signOut: () => mockAuth.signOut(),
    },
  },
};

// Expose a global `supabase` object to mimic the real Supabase client
window.supabase = mockAuth.client;

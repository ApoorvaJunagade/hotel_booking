import React, { useState } from "react";

const AuthPage = () => {
  const [view, setView] = useState("signin"); // 'signin' or 'register'

  // Handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (view === "signin") {
      console.log("Signing in...");
      // Add sign-in logic here
    } else {
      console.log("Registering...");
      // Add registration logic here
    }
  };

  return (
    <div className="auth-container">
      <h1>{view === "signin" ? "Sign In" : "Register"}</h1>

      <form onSubmit={handleSubmit}>
        {/* Common fields for both Sign In and Register */}
        <div>
          <label>Email:</label>
          <input type="email" name="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" required />
        </div>

        {/* Additional field for Register */}
        {view === "register" && (
          <div>
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" required />
          </div>
        )}

        <button type="submit">
          {view === "signin" ? "Sign In" : "Register"}
        </button>
      </form>

      {/* Navigation links */}
      <div className="auth-navigation">
        {view === "signin" ? (
          <p>
            Don’t have an account?{" "}
            <button onClick={() => setView("register")}>Register</button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button onClick={() => setView("signin")}>Sign In</button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthPage;

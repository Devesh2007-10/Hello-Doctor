import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const u = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(u.user, { displayName });
      alert('Account created. You can now login.');
    } catch (err: any) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign up</h2>
      <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Full name" required />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required type="email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required type="password" />
      <button type="submit">Create account</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}
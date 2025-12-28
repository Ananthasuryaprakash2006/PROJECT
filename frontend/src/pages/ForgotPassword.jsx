import { useState } from "react";
import api from "../api/axios";
import { Mail } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("Password reset link sent (mock demo).");
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900/60 backdrop-blur-xl border border-gray-700 p-8 rounded-2xl w-full max-w-md shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-emerald-400">
          Reset Password
        </h1>

        {msg && <p className="text-emerald-400 text-center mb-3">{msg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="email"
              placeholder="Enter your email"
              className="input-field pl-11"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="btn w-full">Send Link</button>
        </form>
      </div>
    </div>
  );
}

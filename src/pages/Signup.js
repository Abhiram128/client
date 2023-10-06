import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailVerificationRequired, setIsEmailVerificationRequired] = useState(false); // New state

  const { signup, error, loading } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Signup user
    await signup(email, password);

    // Check if email verification is required
    if (!error) {
      setIsEmailVerificationRequired(true);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSignup}
        className="signup-form flex flex-col gap-5 py-20 mx-auto max-w-sm"
      >
        <h2 className="text-4xl font-medium text-sky-400 mb-10">Sign Up</h2>

        <div className="form-control flex flex-col gap-2">
          <label
            htmlFor="email"
            className="cursor-pointer hover:text-sky-400 duration-300"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="abhiramsayani@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent border border-slate-500 py-3 px-5 rounded-xl outline-none focus:border-sky-400 duration-300"
          />
        </div>

        <div className="form-control flex flex-col gap-2">
          <label
            htmlFor="password"
            className="cursor-pointer hover:text-sky-400 duration-300"
          >
            Password
          </label>

          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent border border-slate-500 py-3 px-5 rounded-xl outline-none focus:border-sky-400 duration-300"
          />
        </div>

        <button
          disabled={loading}
          type="submit"
          className="bg-sky-400 text-slate-900 py-3 rounded-xl hover:bg-sky-500 duration-300 mt-3"
        >
          Sign Up
        </button>

        {error && (
          <p className="bg-rose-500/20 rounded-lg p-5 text-rose-500 border border-rose-500">
            {error}
          </p>
        )}
      </form>

      {isEmailVerificationRequired && ( // Conditionally render the message
        <div className="email-verification-message bg-slate-100 p-3 rounded-md mt-3">
          <p className="text-sky-400">
            Thank you for signing up! Please check your email for verification instructions.
          </p>
        </div>
      )}
    </div>
  );
};

export default Signup;

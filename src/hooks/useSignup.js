import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const json = await res.json();

      if (!res.ok) {
        setLoading(false);
        setError(json.error);
      }

      if (res.ok) {
        // Registration was successful, but the user's email is not yet verified
        // You should now initiate sending a verification email
        await sendVerificationEmail(email); // Implement this function

        // You can display a message to the user to check their email for verification
        // This can be handled in your frontend component

        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred during signup.");
      setLoading(false);
    }
  };

  // Implement a function to send a verification email
  const sendVerificationEmail = async (email) => {
    try {
      // Make an API request to your backend to send a verification email
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/user/send-verification-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to send verification email.");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
    }
  };

  return { signup, error, loading };
};

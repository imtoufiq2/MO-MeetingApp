import { useState } from "react";

const FaceAuth = () => {
  const [error, setError] = useState(null);

  // Register a new credential (fingerprint)
  const handleRegisterCredential = async () => {
    try {
      if (!window.PublicKeyCredential) {
        throw new Error(
          "Web Authentication API is not supported by this browser."
        );
      }

      const publicKey = {
        challenge: Uint8Array.from("randomRegistrationChallenge", (c) =>
          c.charCodeAt(0)
        ),
        rp: {
          name: "My Secure App",
        },
        user: {
          id: Uint8Array.from("randomUserID", (c) => c.charCodeAt(0)),
          name: "user@example.com",
          displayName: "Example User",
        },
        pubKeyCredParams: [
          {
            type: "public-key",
            alg: -7, // ES256 algorithm
          },
          {
            type: "public-key",
            alg: -257, // RS256 algorithm (optional, add if needed)
          },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
        },
        timeout: 60000, // 1 minute timeout
        attestation: "direct",
      };

      const credential = await navigator.credentials.create({ publicKey });

      console.log("Credential registered successfully:", credential);
      setError(null);
    } catch (err) {
      let errorMessage = "An unknown error occurred.";
      if (err.name === "NotAllowedError") {
        errorMessage = "Operation timed out or was not allowed.";
      } else if (err.name === "SecurityError") {
        errorMessage = "Security error occurred.";
      } else if (err.name === "InvalidStateError") {
        errorMessage = "Invalid state for operation.";
      }
      setError(errorMessage);
      console.error("Error registering credential:", err);
    }
  };

  // Authenticate using fingerprint
  const handleVerifyFingerprint = async () => {
    try {
      if (!window.PublicKeyCredential) {
        throw new Error(
          "Web Authentication API is not supported by this browser."
        );
      }

      const publicKey = {
        challenge: Uint8Array.from("randomChallengeString", (c) =>
          c.charCodeAt(0)
        ),
        allowCredentials: [
          {
            id: Uint8Array.from("randomCredentialID", (c) => c.charCodeAt(0)),
            type: "public-key",
          },
        ],
        timeout: 120000, // 2 minutes timeout
      };

      const credential = await navigator.credentials.get({ publicKey });

      console.log("Fingerprint verified successfully:", credential);
      setError(null);
    } catch (err) {
      let errorMessage = "An unknown error occurred.";
      if (err.name === "NotAllowedError") {
        errorMessage = "Operation timed out or was not allowed.";
      } else if (err.name === "SecurityError") {
        errorMessage = "Security error occurred.";
      } else if (err.name === "InvalidStateError") {
        errorMessage = "Invalid state for operation.";
      }
      setError(errorMessage);
      console.error("Error verifying fingerprint:", err);
    }
  };

  return (
    <div>
      <h1>Fingerprint Authentication</h1>
      <button onClick={handleRegisterCredential}>Register Fingerprint</button>
      <button onClick={handleVerifyFingerprint}>Verify Fingerprint</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default FaceAuth;

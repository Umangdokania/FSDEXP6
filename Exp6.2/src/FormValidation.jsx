import { useState } from "react";

export default function ValidationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    let newErrors = {};

    // Email Validation (your logic)
    const emailPattern = /^[a-zA-Z0-9]+@gmail\.com$/;

    if (!emailPattern.test(email.trim())) {
      newErrors.email =
        "Enter valid Gmail (example: username@gmail.com)";
    }

    // Password Validation (your logic)
    const passwordPattern =
      /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*]).{4,}$/;

    if (!passwordPattern.test(password)) {
      newErrors.password =
        "Password must start with capital letter, include number, special character & min 5 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      setSubmitted(true);
      setEmail("");
      setPassword("");
      setErrors({});
    }
  };

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.successIcon}>✓</div>
          <h2 style={styles.successTitle}>Form Submitted!</h2>
          <p style={styles.successSub}>
            Validation completed successfully.
          </p>
          <button
            style={styles.btn}
            onClick={() => setSubmitted(false)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>🔐</div>
          <h1 style={styles.title}>Client-Side Validation</h1>
          <p style={styles.subtitle}>Using Regex Patterns</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          {/* Email */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="text"
              placeholder="Enter Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                ...styles.input,
                borderColor:
                  errors.email ? "#ff4d4d" : "#2a2a3e",
              }}
            />
            {errors.email && (
              <p style={styles.errorMsg}>{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                ...styles.input,
                borderColor:
                  errors.password ? "#ff4d4d" : "#2a2a3e",
              }}
            />
            {errors.password && (
              <p style={styles.errorMsg}>{errors.password}</p>
            )}
          </div>

          <button type="submit" style={styles.btn}>
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0d0d1a 0%, #12122a 60%, #0d0d1a 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
    padding: "20px",
  },
  card: {
    background: "#16162a",
    border: "1px solid #2a2a3e",
    borderRadius: "20px",
    padding: "40px 36px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
  },
  header: {
    textAlign: "center",
    marginBottom: "30px",
  },
  logo: {
    fontSize: "36px",
    marginBottom: "10px",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: 700,
    color: "#f0f0ff",
  },
  subtitle: {
    fontSize: "12px",
    color: "#666688",
    marginTop: "6px",
  },
  fieldGroup: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "13px",
    color: "#8888aa",
  },
  input: {
    width: "100%",
    background: "#0d0d1a",
    border: "1.5px solid #2a2a3e",
    borderRadius: "10px",
    padding: "12px",
    fontSize: "14px",
    color: "#e0e0ff",
    outline: "none",
  },
  errorMsg: {
    marginTop: "6px",
    fontSize: "12px",
    color: "#ff4d4d",
  },
  btn: {
    width: "100%",
    padding: "13px",
    background:
      "linear-gradient(90deg, #6c63ff, #a78bfa)",
    border: "none",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
  },
  successIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg, #00e676, #00bfa5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    color: "#fff",
    margin: "0 auto 20px",
  },
  successTitle: {
    textAlign: "center",
    fontSize: "22px",
    color: "#f0f0ff",
  },
  successSub: {
    textAlign: "center",
    marginBottom: "24px",
    fontSize: "14px",
    color: "#666688",
  },
};
import { useState } from "react";
import "./App.css";

const indianStates = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Chandigarh"
];

const skillsList = [
  "JavaScript","Python","React","Node.js","Java","C++",
  "Machine Learning","UI/UX Design","Data Analysis","DevOps",
  "Cloud Computing","Cybersecurity"
];

const initialForm = {
  firstName: "",
  lastName: "",
  gender: "",
  address: "",
  dob: "",
  age: "",
  state: "",
  skills: []
};

function Field({ label, error, children }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      {children}
      {error && <span className="field-error">⚠ {error}</span>}
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  );
}

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState(false);

  // 🔥 DOB Handler with Age Calculation
  const handleDOBChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date();
    const birthDate = new Date(selectedDate);

    let newErrors = { ...errors };

    // ❌ Prevent future date
    if (birthDate > today) {
      newErrors.dob = "Future date is not allowed";
      setErrors(newErrors);
      setForm(f => ({ ...f, dob: selectedDate, age: "" }));
      return;
    }

    // 🧮 Calculate Age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    delete newErrors.dob;
    setErrors(newErrors);

    setForm(f => ({
      ...f,
      dob: selectedDate,
      age: age
    }));
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";
    if (!form.gender)           e.gender    = "Required";
    if (!form.address.trim())   e.address   = "Required";
    if (!form.dob)              e.dob       = "Required";
    if (!form.state)            e.state     = "Required";
    if (form.skills.length === 0) e.skills  = "Select at least one skill";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm(f => ({
        ...f,
        skills: checked
          ? [...f.skills, value]
          : f.skills.filter(s => s !== value)
      }));
      setErrors(er => ({ ...er, skills: undefined }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
      setErrors(er => ({ ...er, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    setSubmitted(true);
  };

  const handleClear = () => {
    setForm(initialForm);
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="page">
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />

      <div className={`card ${shake ? "shake" : ""}`}>
        <div className="card-header">
          <div className="icon-wrap">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
              stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <div>
            <h1 className="card-title">Profile Registration</h1>
            <p className="card-subtitle">Fill in your details to get started</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          {/* First & Last Name */}
          <div className="row">
            <Field label="First Name" error={errors.firstName}>
              <input
                className={`input ${errors.firstName ? "input-err" : ""}`}
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
            </Field>

            <Field label="Last Name" error={errors.lastName}>
              <input
                className={`input ${errors.lastName ? "input-err" : ""}`}
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </Field>
          </div>

          {/* Gender */}
          <Field label="Gender" error={errors.gender}>
            <div className="radio-group">
              {["Male", "Female", "Non-binary", "Prefer not to say"].map(g => (
                <label key={g} className={`radio-label ${form.gender === g ? "radio-label-checked" : ""}`}>
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={form.gender === g}
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                  <span className={`radio-dot ${form.gender === g ? "radio-dot-checked" : ""}`} />
                  {g}
                </label>
              ))}
            </div>
          </Field>

          {/* Address */}
          <Field label="Address" error={errors.address}>
            <textarea
              className={`input textarea ${errors.address ? "input-err" : ""}`}
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
            />
          </Field>

          {/* DOB, Age & State */}
          <div className="row">
            <Field label="Date of Birth" error={errors.dob}>
              <input
                type="date"
                className={`input ${errors.dob ? "input-err" : ""}`}
                name="dob"
                value={form.dob}
                max={new Date().toISOString().split("T")[0]}
                onChange={handleDOBChange}
                onKeyDown={(e) => e.preventDefault()}
                onPaste={(e) => e.preventDefault()}
              />
            </Field>

            <Field label="Age">
              <input
                type="number"
                className="input"
                value={form.age}
                readOnly
              />
            </Field>

            <Field label="State" error={errors.state}>
              <select
                className={`input ${errors.state ? "input-err" : ""}`}
                name="state"
                value={form.state}
                onChange={handleChange}
              >
                <option value="">Select state...</option>
                {indianStates.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
          </div>

          {/* Skills */}
          <Field label="Skills" error={errors.skills}>
            <div className="skills-grid">
              {skillsList.map(skill => {
                const checked = form.skills.includes(skill);
                return (
                  <label key={skill} className={`skill-chip ${checked ? "skill-chip-checked" : ""}`}>
                    <input
                      type="checkbox"
                      name="skills"
                      value={skill}
                      checked={checked}
                      onChange={handleChange}
                      style={{ display: "none" }}
                    />
                    {checked && <span className="check-mark">✓ </span>}
                    {skill}
                  </label>
                );
              })}
            </div>
          </Field>

          <div className="btn-row">
            <button type="button" className="btn-clear" onClick={handleClear}>
              ✕ Clear
            </button>
            <button type="submit" className="btn-submit">
              Submit →
            </button>
          </div>

        </form>
      </div>

      {submitted && (
        <div className="overlay" onClick={handleClear}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="success-icon">✓</div>
              <h2 className="modal-title">Submission Successful!</h2>
            </div>
            <div className="detail-grid">
              <DetailRow label="Full Name" value={`${form.firstName} ${form.lastName}`} />
              <DetailRow label="Gender" value={form.gender} />
              <DetailRow label="DOB" value={form.dob} />
              <DetailRow label="Age" value={form.age} />
              <DetailRow label="State" value={form.state} />
              <DetailRow label="Address" value={form.address} />
              <DetailRow label="Skills" value={form.skills.join(", ")} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
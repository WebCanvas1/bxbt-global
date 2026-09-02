import { useState } from "react";
import { X, CircleX, Check, ArrowUpRight, ChevronRight } from "lucide-react";

type FormState = {
  name: string;
  company: string;
  position: string;
  mobile: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

type Status = "idle" | "loading" | "success" | "error";

const initialState: FormState = {
  name: "",
  company: "",
  position: "",
  mobile: "",
  email: "",
  message: "",
};

function Field({
  label,
  type = "text",
  value,
  error,
  wide = false,
  onChange,
}: {
  label: string;
  type?: string;
  value: string;
  error?: string;
  wide?: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <label className={`field ${wide ? "wide" : ""}`}>
      <span>
        {label}
        <small>Required</small>
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
      />
      {error && <b>{error}</b>}
    </label>
  );
}

function Portal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const update = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): FormErrors => {
    const m: FormErrors = {};
    (["name", "company", "position", "mobile"] as const).forEach((v) => {
      if (!form[v].trim()) m[v] = "Required";
    });
    if (form.email.trim()) {
      if (!/^\S+@\S+\.\S+$/.test(form.email)) m.email = "Enter a valid email";
    } else {
      m.email = "Required";
    }
    return m;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length === 0) {
      setStatus("loading");
      try {
        await new Promise((resolve) => window.setTimeout(resolve, 700));
        setStatus("success");
      } catch {
        setStatus("error");
      }
    }
  };

  return (
    <div className="portal" role="dialog" aria-modal="true" aria-labelledby="portal-heading">
      <div className="portal-aside">
        <button className="close-button light-close" onClick={onClose} aria-label="Close conversation portal">
          <X size={22} />
        </button>
        <div>
          <p className="eyebrow light">
            <span className="eyebrow-line" /> BXBT / INFORMATION &amp; CONTACT PORTAL
          </p>
          <h2 className="portal-aside-heading">Start A Conversation</h2>
          <p className="portal-aside-note">
            &ldquo;Bring Us The Challenge and Let's Explore What Is Possible.&rdquo;
          </p>
        </div>
      </div>
      <div className="portal-form-wrap">
        <button className="close-button dark-close" onClick={onClose} aria-label="Close conversation portal">
          <CircleX size={24} />
        </button>
        {status === "success" ? (
          <div className="success-state">
            <div className="success-icon">
              <Check size={28} />
            </div>
            <p className="eyebrow">
              <span className="eyebrow-line" /> Message received
            </p>
            <h2>
              Thank you.
              <br />
              <span>We'll be in touch.</span>
            </h2>
            <button className="text-button" onClick={onClose}>
              Return to the page <ChevronRight size={17} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <p className="eyebrow">
              <span className="eyebrow-line" /> Tell us a little more
            </p>
            <h2 id="portal-heading">Let's talk.</h2>
            <div className="form-grid">
              <Field label="Name" value={form.name} error={errors.name} onChange={(v) => update("name", v)} />
              <Field label="Company" value={form.company} error={errors.company} onChange={(v) => update("company", v)} />
              <Field label="Position / Title" value={form.position} error={errors.position} onChange={(v) => update("position", v)} />
              <Field label="Mobile" type="tel" value={form.mobile} error={errors.mobile} onChange={(v) => update("mobile", v)} />
              <Field label="Email" type="email" value={form.email} error={errors.email} onChange={(v) => update("email", v)} wide />
            </div>
            <label className="field wide">
              <span>
                What would you like to discuss? <small>Optional</small>
              </span>
              <textarea value={form.message} onChange={(e) => update("message", e.target.value)} rows={3} />
            </label>
            {status === "error" && <p className="form-error">Something went wrong. Please try again.</p>}
            <button className="submit-button" type="submit" disabled={status === "loading"}>
              {status === "loading" ? "SENDING..." : "SUBMIT"} <ArrowUpRight size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Portal;

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (formData) => {
    setServerError("");
    setSubmitting(true);
    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      });
      navigate("/", { replace: true });
    } catch (err) {
      const errorsObj = err.response?.data?.errors;
      const firstError = errorsObj ? Object.values(errorsObj)[0]?.[0] : null;
      setServerError(firstError || err.response?.data?.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-softwhite py-16 sm:py-24 min-h-[80vh]">
      <div className="container-shop max-w-md mx-auto">
        {/* Eyebrow + heading */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-medium mb-2">
            Join Us
          </p>
          <h1 className="font-display text-3xl text-charcoal">Create Your Account</h1>
          <div className="stitch-divider w-16 mx-auto mt-4" />
        </div>

        <div className="card-surface p-8">
          {serverError && (
            <div
              className="mb-5 text-sm px-4 py-3 rounded-sm border"
              style={{ color: "#7A2331", backgroundColor: "#FBEEEF", borderColor: "#F0D4D6" }}
            >
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="field-label">Full Name</label>
              <input
                placeholder="Your name"
                className="field-input"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="field-error">{errors.name.message}</p>}
            </div>

            <div>
              <label className="field-label">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="field-input"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <p className="field-error">{errors.email.message}</p>}
            </div>

            <div>
              <label className="field-label">Phone (WhatsApp)</label>
              <input
                type="tel"
                placeholder="03001234567"
                className="field-input"
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && <p className="field-error">{errors.phone.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="field-label">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="field-input"
                  {...register("password", {
                    required: "Required",
                    minLength: { value: 8, message: "Min 8 characters" },
                  })}
                />
                {errors.password && <p className="field-error">{errors.password.message}</p>}
              </div>
              <div>
                <label className="field-label">Confirm</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="field-input"
                  {...register("password_confirmation", {
                    required: "Required",
                    validate: (value) => value === password || "Doesn't match",
                  })}
                />
                {errors.password_confirmation && (
                  <p className="field-error">{errors.password_confirmation.message}</p>
                )}
              </div>
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full mt-2">
              {submitting ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>

        <p className="text-sm text-charcoal/60 mt-6 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-charcoal font-medium underline underline-offset-4 decoration-accent">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
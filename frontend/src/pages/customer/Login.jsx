import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const redirectTo = location.state?.from || "/";

  const onSubmit = async (formData) => {
    setServerError("");
    setSubmitting(true);
    try {
      await login(formData);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.errors?.email?.[0] ||
        err.response?.data?.message ||
        "Login failed. Please check your details and try again.";
      setServerError(message);
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
            Welcome Back
          </p>
          <h1 className="font-display text-3xl text-charcoal">Sign In</h1>
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
              <label className="field-label">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="field-input"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="field-error">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full mt-2">
              {submitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-sm text-charcoal/60 mt-6 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-charcoal font-medium underline underline-offset-4 decoration-accent">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
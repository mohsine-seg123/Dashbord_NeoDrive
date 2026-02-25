import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cld } from "../lib/cloudinary";
import { AdvancedImage } from "@cloudinary/react";
import { login } from "../services/login";
import { useContextProvider } from "../DashbordContext/useContextProvider";
import { toast } from "react-hot-toast";

function Login(): React.JSX.Element {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setisLogin}=useContextProvider();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res=await login(formData.email, formData.password);
      if(res.data.data.user.role==="admin"){
           setisLogin(true);
           navigate("/dashbord");
           toast.success("Your welcome admin", {
             duration: 4000,
             position: "top-center",
             style: {
               border: "1px solid #10B981",
               width: "800px",
               padding: "16px",
               color: "#065F46",
               borderRadius: "10px",
               background: "#ECFDF5",
             },
           });
      }else{
        toast.error(res.data.message || "You are not admin", {
          duration: 4000,
             position: "top-center",
          style: {
            border: "1px solid #EF4444",
              width: "800px",
        }});
      }
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-bg-main">
      <div className="w-[65%] max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl border border-primary/20">
        <div className="w-1/2 bg-primary/5 flex items-center justify-center p-8">
          <AdvancedImage
            cldImg={cld.image(
              "computer-security-with-login-password-padlock__1_-removebg-preview_zw1pvq",
            )}
            className="w-full h-full object-cover drop-shadow-lg"
          />
        </div>

        <div className="w-1/2 bg-surface flex flex-col items-center justify-center px-10 py-12">
          <div className="w-full mb-8 text-center">
            <p className="text-xl text-text-muted mt-1">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-300"
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-text">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-border-custom rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-gray-300"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover active:scale-[0.98] text-white font-semibold py-3 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 

export default Login;

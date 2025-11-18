const fs = require("fs");
const path = require("path");

// Register Page Content
const registerPageContent = `import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User, Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft,
  CheckCircle, AlertCircle, Phone, CreditCard, Building2,
  MapPin, Upload, Clock
} from "lucide-react";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [step1Data, setStep1Data] = useState({ email: "", password: "", confirmPassword: "" });
  const [step1Errors, setStep1Errors] = useState({});
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpTimer, setOtpTimer] = useState(300);
  const [canResendOtp, setCanResendOtp] = useState(false);
  const [step3Data, setStep3Data] = useState({
    firstName: "", lastName: "", phone: "", aadharNumber: "", panNumber: "",
    businessName: "", businessType: "", address: "", city: "", state: "", pincode: "", photo: null
  });
  const [step3Errors, setStep3Errors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  React.useEffect(() => {
    if (currentStep === 2 && otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (otpTimer === 0) setCanResendOtp(true);
  }, [currentStep, otpTimer]);

  const validateStep1 = () => {
    const errors = {};
    if (!step1Data.email.trim()) errors.email = "Email is required";
    else if (!/^\\S+@\\S+\\.\\S+$/.test(step1Data.email)) errors.email = "Invalid email format";
    if (!step1Data.password) errors.password = "Password is required";
    else if (step1Data.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (!step1Data.confirmPassword) errors.confirmPassword = "Please confirm password";
    else if (step1Data.password !== step1Data.confirmPassword) errors.confirmPassword = "Passwords do not match";
    setStep1Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;
    setIsLoading(true);
    try {
      const response = await fetch(\`\${API_URL}/api/auth/register/step1\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: step1Data.email, password: step1Data.password }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("OTP sent to your email!");
        setCurrentStep(2);
        setOtpTimer(300);
        setCanResendOtp(false);
      } else toast.error(data.message || "Failed to send OTP");
    } catch (error) {
      console.error("Step 1 error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (!/^\\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) document.getElementById(\`otp-\${index + 1}\`)?.focus();
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\\d{6}$/.test(pastedData)) return;
    setOtp(pastedData.split(""));
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error("Please enter complete OTP");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(\`\${API_URL}/api/auth/register/verify-otp\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: step1Data.email, otp: otpValue }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Email verified successfully!");
        setCurrentStep(3);
      } else {
        toast.error(data.message || "Invalid OTP");
        setOtp(["", "", "", "", "", ""]);
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(\`\${API_URL}/api/auth/register/resend-otp\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: step1Data.email }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("New OTP sent!");
        setOtpTimer(300);
        setCanResendOtp(false);
        setOtp(["", "", "", "", "", ""]);
      } else toast.error(data.message || "Failed to resend OTP");
    } catch (error) {
      console.error("Resend OTP error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateStep3 = () => {
    const errors = {};
    if (!step3Data.firstName.trim()) errors.firstName = "First name is required";
    if (!step3Data.lastName.trim()) errors.lastName = "Last name is required";
    if (!step3Data.phone.trim()) errors.phone = "Phone is required";
    else if (!/^\\d{10}$/.test(step3Data.phone)) errors.phone = "Phone must be 10 digits";
    if (!step3Data.aadharNumber.trim()) errors.aadharNumber = "Aadhar number is required";
    else if (!/^\\d{12}$/.test(step3Data.aadharNumber)) errors.aadharNumber = "Aadhar must be 12 digits";
    if (!step3Data.panNumber.trim()) errors.panNumber = "PAN number is required";
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(step3Data.panNumber.toUpperCase())) errors.panNumber = "Invalid PAN format (e.g., ABCDE1234F)";
    setStep3Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Photo size must be less than 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
      setStep3Data({ ...step3Data, photo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleStep3Submit = async (e) => {
    e.preventDefault();
    if (!validateStep3()) {
      toast.error("Please fill all required fields correctly");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(\`\${API_URL}/api/auth/register/complete\`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: step1Data.email, ...step3Data, panNumber: step3Data.panNumber.toUpperCase() }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Registration completed successfully!");
        localStorage.setItem("auth_token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => navigate("/dashboard"), 1000);
      } else toast.error(data.message || "Registration failed");
    } catch (error) {
      console.error("Complete registration error:", error);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return \`\${mins}:\${secs.toString().padStart(2, "0")}\`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-blue-600">SilanPay</h1>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create Your Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join thousands of merchants using SilanPay</p>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex-1 flex items-center">
                <div className={\`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all \${currentStep >= step ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}\`}>
                  {currentStep > step ? <CheckCircle className="w-6 h-6" /> : step}
                </div>
                {step < 3 && <div className={\`flex-1 h-1 mx-2 transition-all \${currentStep > step ? "bg-blue-600" : "bg-gray-200"}\`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-600">
            <span>Email & Password</span>
            <span>Verify Email</span>
            <span>Complete Profile</span>
          </div>
        </div>

        {/* Step 1 */}
        {currentStep === 1 && (
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Step 1: Create Credentials</h3>
            <form onSubmit={handleStep1Submit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={step1Data.email}
                    onChange={(e) => setStep1Data({ ...step1Data, email: e.target.value })}
                    className={\`block w-full pl-10 pr-3 py-3 border \${step1Errors.email ? "border-red-300" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent\`}
                    placeholder="you@example.com"
                  />
                </div>
                {step1Errors.email && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {step1Errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={step1Data.password}
                    onChange={(e) => setStep1Data({ ...step1Data, password: e.target.value })}
                    className={\`block w-full pl-10 pr-12 py-3 border \${step1Errors.password ? "border-red-300" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent\`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {step1Errors.password && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {step1Errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={step1Data.confirmPassword}
                    onChange={(e) => setStep1Data({ ...step1Data, confirmPassword: e.target.value })}
                    className={\`block w-full pl-10 pr-3 py-3 border \${step1Errors.confirmPassword ? "border-red-300" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent\`}
                    placeholder="••••••••"
                  />
                </div>
                {step1Errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {step1Errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: OTP */}
        {currentStep === 2 && (
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Verify Your Email</h3>
              <p className="mt-2 text-sm text-gray-600">
                We've sent a 6-digit code to<br />
                <span className="font-semibold text-gray-900">{step1Data.email}</span>
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="flex justify-center gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={\`otp-\${index}\`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onPaste={index === 0 ? handleOtpPaste : undefined}
                    className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                ))}
              </div>

              <div className="text-center">
                {otpTimer > 0 ? (
                  <p className="text-sm text-gray-600 flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-1" />
                    OTP expires in {formatTime(otpTimer)}
                  </p>
                ) : (
                  <p className="text-sm text-red-600">OTP expired</p>
                )}
              </div>

              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isLoading || otp.join("").length !== 6}
                  className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & Continue
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={!canResendOtp || isLoading}
                  className="w-full px-6 py-3 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Resend OTP
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-full flex items-center justify-center px-6 py-3 text-gray-600 font-semibold hover:bg-gray-50 rounded-lg transition-all"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Email
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Profile - Simplified version, you can expand this */}
        {currentStep === 3 && (
          <div className="bg-white p-8 rounded-2xl shadow-xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Step 3: Complete Your Profile</h3>
            <form onSubmit={handleStep3Submit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={step3Data.firstName}
                      onChange={(e) => setStep3Data({ ...step3Data, firstName: e.target.value })}
                      className={\`block w-full pl-10 pr-3 py-2.5 border \${step3Errors.firstName ? "border-red-300" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500\`}
                      placeholder="John"
                    />
                  </div>
                  {step3Errors.firstName && <p className="mt-1 text-xs text-red-600">{step3Errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={step3Data.lastName}
                    onChange={(e) => setStep3Data({ ...step3Data, lastName: e.target.value })}
                    className={\`block w-full px-3 py-2.5 border \${step3Errors.lastName ? "border-red-300" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500\`}
                    placeholder="Doe"
                  />
                  {step3Errors.lastName && <p className="mt-1 text-xs text-red-600">{step3Errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Phone className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    value={step3Data.phone}
                    onChange={(e) => setStep3Data({ ...step3Data, phone: e.target.value.replace(/\\D/g, "").slice(0, 10) })}
                    className={\`block w-full pl-10 pr-3 py-2.5 border \${step3Errors.phone ? "border-red-300" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500\`}
                    placeholder="9876543210"
                    maxLength="10"
                  />
                </div>
                {step3Errors.phone && <p className="mt-1 text-sm text-red-600 flex items-center"><AlertCircle className="w-4 h-4 mr-1" />{step3Errors.phone}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhar Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={step3Data.aadharNumber}
                      onChange={(e) => setStep3Data({ ...step3Data, aadharNumber: e.target.value.replace(/\\D/g, "").slice(0, 12) })}
                      className={\`block w-full pl-10 pr-3 py-2.5 border \${step3Errors.aadharNumber ? "border-red-300" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500\`}
                      placeholder="123456789012"
                      maxLength="12"
                    />
                  </div>
                  {step3Errors.aadharNumber && <p className="mt-1 text-xs text-red-600">{step3Errors.aadharNumber}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PAN Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <CreditCard className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={step3Data.panNumber}
                      onChange={(e) => setStep3Data({ ...step3Data, panNumber: e.target.value.toUpperCase().slice(0, 10) })}
                      className={\`block w-full pl-10 pr-3 py-2.5 border \${step3Errors.panNumber ? "border-red-300" : "border-gray-300"} rounded-lg focus:ring-2 focus:ring-blue-500\`}
                      placeholder="ABCDE1234F"
                      maxLength="10"
                    />
                  </div>
                  {step3Errors.panNumber && <p className="mt-1 text-xs text-red-600">{step3Errors.panNumber}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Building2 className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={step3Data.businessName}
                      onChange={(e) => setStep3Data({ ...step3Data, businessName: e.target.value })}
                      className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Your Business"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                  <select
                    value={step3Data.businessType}
                    onChange={(e) => setStep3Data({ ...step3Data, businessType: e.target.value })}
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="retail">Retail</option>
                    <option value="ecommerce">E-commerce</option>
                    <option value="service">Service Provider</option>
                    <option value="food">Food & Beverage</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                  <textarea
                    value={step3Data.address}
                    onChange={(e) => setStep3Data({ ...step3Data, address: e.target.value })}
                    rows="2"
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Street address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={step3Data.city}
                    onChange={(e) => setStep3Data({ ...step3Data, city: e.target.value })}
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Mumbai"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={step3Data.state}
                    onChange={(e) => setStep3Data({ ...step3Data, state: e.target.value })}
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Maharashtra"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                  <input
                    type="text"
                    value={step3Data.pincode}
                    onChange={(e) => setStep3Data({ ...step3Data, pincode: e.target.value.replace(/\\D/g, "").slice(0, 6) })}
                    className="block w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="400001"
                    maxLength="6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                <div className="flex items-center gap-4">
                  {photoPreview && (
                    <img src={photoPreview} alt="Preview" className="w-20 h-20 rounded-lg object-cover border-2 border-gray-200" />
                  )}
                  <label className="flex-1 flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-all">
                    <Upload className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{photoPreview ? "Change Photo" : "Upload Photo"}</span>
                    <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  </label>
                </div>
                <p className="mt-1 text-xs text-gray-500">Max size: 2MB (JPG, PNG)</p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center justify-center px-6 py-3 text-gray-600 font-semibold border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Complete Registration
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </div>

        <p className="mt-4 text-xs text-center text-gray-500">
          By registering, you agree to our{" "}
          <Link to="/terms" className="text-blue-600 hover:text-blue-500">Terms</Link>
          {" "}and{" "}
          <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-500">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
`;

// Write RegisterPage
const registerPath = path.join(
  __dirname,
  "frontend",
  "src",
  "pages",
  "RegisterPage.jsx"
);
fs.writeFileSync(registerPath, registerPageContent, "utf8");
console.log("✅ Created RegisterPage.jsx");

console.log("\\n✅ All auth pages created successfully!");

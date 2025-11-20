import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    CheckCircle,
    Lock,
    ChevronDown,
    AlertCircle,
    Upload,
    ArrowLeft
} from "lucide-react";
import { verificationService } from "../../services/api";
import toast from "react-hot-toast";

const OnboardingPage = () => {
    const navigate = useNavigate();
    const [verification, setVerification] = useState(null);
    const [loading, setLoading] = useState(true);
    const [expandedStep, setExpandedStep] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        // PAN Details
        panNumber: "",
        panName: "",
        dob: "",
        // Business Details
        businessName: "",
        businessType: "",
        businessCategory: "",
        // Bank Details
        accountNumber: "",
        ifscCode: "",
        holderName: "",
        // Website Details
        websiteUrl: "",
        appUrl: "",
    });

    useEffect(() => {
        fetchStatus();
    }, []);

    const fetchStatus = async () => {
        try {
            const response = await verificationService.getStatus();
            if (response.success) {
                setVerification(response.verification);
                // Auto-expand the current step
                setExpandedStep(response.verification.currentStep);
            }
        } catch (error) {
            console.error("Error fetching status:", error);
            toast.error("Failed to load verification status");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitStep = async (stepNumber) => {
        // Basic validation
        if (stepNumber === 2) { // PAN
            if (!formData.panNumber || !formData.panName || !formData.dob) {
                toast.error("Please fill all PAN details");
                return;
            }
        }
        // Add more validation as needed

        setSubmitting(true);
        try {
            // Filter data relevant to the step
            let stepData = {};
            if (stepNumber === 2) {
                stepData = { panNumber: formData.panNumber, panName: formData.panName, dob: formData.dob };
            } else if (stepNumber === 3) {
                stepData = { businessName: formData.businessName, businessType: formData.businessType };
            } else if (stepNumber === 6) {
                stepData = { accountNumber: formData.accountNumber, ifscCode: formData.ifscCode, holderName: formData.holderName };
            } else if (stepNumber === 8) {
                stepData = { websiteUrl: formData.websiteUrl, appUrl: formData.appUrl };
            } else {
                stepData = { ...formData }; // Fallback
            }

            const response = await verificationService.submitStep(stepNumber, stepData);

            if (response.success) {
                toast.success("Details submitted successfully!");
                setVerification(response.verification);
            }
        } catch (error) {
            console.error("Error submitting step:", error);
            toast.error("Failed to submit details");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-12 h-12 border-4 border-[#238dcf] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!verification) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900">Unable to load verification status</h2>
                    <button onClick={fetchStatus} className="mt-4 px-4 py-2 bg-[#238dcf] text-white rounded">Retry</button>
                </div>
            </div>
        );
    }

    const steps = verification?.steps || [];

    return (
        <div className="min-h-screen bg-gray-50 pb-20 font-sans">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-[#238dcf] rounded-lg flex items-center justify-center text-white font-bold">SP</div>
                        <h1 className="text-xl font-bold text-gray-900">SilanPay</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Dashboard
                        </button>
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                            {verification?.userId?.name?.[0] || "U"}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Main Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
                    <div className="p-8 text-center border-b border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Activate Your Account</h2>
                        <p className="text-gray-500 text-sm">Merchant ID: {verification?.userId?._id?.substring(0, 8).toUpperCase()}</p>
                    </div>

                    <div className="bg-orange-50 p-4 flex items-center justify-center text-center">
                        <div>
                            <h3 className="text-sm font-bold text-gray-900">Your account is active. Complete your full KYC</h3>
                            <p className="text-xs text-gray-600 mt-1">Complete your KYC to start accepting payment and enable settlements on your account.</p>
                        </div>
                    </div>

                    {/* Horizontal Stepper */}
                    <div className="p-8 overflow-x-auto">
                        <div className="flex items-center justify-between min-w-max px-4">
                            {[
                                { name: "Pan Details", step: 2 },
                                { name: "Business Details", step: 3 },
                                { name: "Bank Account", step: 6 },
                                { name: "Website Details", step: 8 },
                                { name: "KYC Documents", step: 7 }
                            ].map((item, index) => {
                                const stepData = steps.find(s => s.stepNumber === item.step);
                                const isCompleted = stepData?.status === "verified";
                                const isCurrent = verification.currentStep === item.step;

                                return (
                                    <div key={item.step} className="flex flex-col items-center relative group cursor-default">
                                        <div className={`w-3 h-3 rounded-full mb-3 transition-all duration-300 ${isCompleted ? "bg-blue-600 scale-125" :
                                            isCurrent ? "bg-blue-600 ring-4 ring-blue-100 scale-125" : "bg-gray-300"
                                            }`}></div>
                                        <span className={`text-xs font-medium ${isCompleted || isCurrent ? "text-blue-600" : "text-gray-400"
                                            }`}>{item.name}</span>
                                        {isCurrent && (
                                            <span className="absolute -bottom-5 text-[10px] text-gray-400 border-b border-gray-400">Complete Now</span>
                                        )}

                                        {/* Connector Line */}
                                        {index < 4 && (
                                            <div className="absolute top-1.5 left-[50%] w-[200%] h-[1px] bg-gray-200 -z-10">
                                                <div className={`h-full bg-blue-600 transition-all duration-500 ${isCompleted ? "w-full" : "w-0"
                                                    }`}></div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Accordion Steps */}
                <div className="space-y-4">
                    {steps.map((step) => {
                        const isExpanded = expandedStep === step.stepNumber;
                        const isLocked = step.stepNumber > verification.currentStep && step.status === "pending";
                        const isVerified = step.status === "verified";
                        const isSubmitted = step.status === "submitted";
                        const isRejected = step.status === "rejected";

                        // Skip step 1 (Email) as it's usually done
                        if (step.stepNumber === 1) return null;

                        return (
                            <div
                                key={step.stepNumber}
                                className={`bg-white border rounded-lg transition-all duration-200 ${isExpanded ? "border-blue-500 shadow-md" : "border-gray-200"
                                    } ${isLocked ? "opacity-70 bg-gray-50" : ""}`}
                            >
                                {/* Step Header */}
                                <div
                                    className={`p-6 flex items-center justify-between cursor-pointer ${isLocked ? "cursor-not-allowed" : ""}`}
                                    onClick={() => !isLocked && setExpandedStep(isExpanded ? null : step.stepNumber)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold ${isExpanded ? "bg-orange-100 text-orange-600" : "bg-gray-100 text-gray-500"
                                            }`}>
                                            STEP {step.stepNumber}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-base">{step.stepName}</h3>
                                            {isExpanded && (
                                                <p className="text-xs text-gray-500 mt-0.5">Verify your details & get started with your account.</p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {isVerified && <CheckCircle className="w-5 h-5 text-green-500" />}
                                        {isLocked ? (
                                            <Lock className="w-4 h-4 text-gray-400" />
                                        ) : (
                                            <span className={`text-gray-400 transform transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                                                <ChevronDown className="w-5 h-5" />
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Step Content (Form) */}
                                {isExpanded && !isLocked && (
                                    <div className="p-6 pt-0">
                                        {isVerified ? (
                                            <div className="bg-green-50 p-4 rounded-lg border border-green-100 text-center">
                                                <p className="text-green-700 font-medium">Verified Successfully</p>
                                            </div>
                                        ) : isSubmitted ? (
                                            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 text-center">
                                                <p className="text-amber-700 font-medium">Verification Pending</p>
                                                <p className="text-xs text-amber-600 mt-1">Your details have been submitted and are under review.</p>
                                            </div>
                                        ) : (
                                            <div className="mt-4">
                                                {isRejected && (
                                                    <div className="mb-6 p-3 bg-red-50 border border-red-100 rounded text-sm text-red-700 flex items-center gap-2">
                                                        <AlertCircle className="w-4 h-4" />
                                                        {step.rejectionReason || "Submission rejected. Please check details."}
                                                    </div>
                                                )}

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                                                    {/* PAN Form */}
                                                    {step.stepNumber === 2 && (
                                                        <>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <label className="block text-xs font-medium text-gray-500 mb-1.5">Business PAN Card number</label>
                                                                <input
                                                                    type="text"
                                                                    name="panNumber"
                                                                    value={formData.panNumber}
                                                                    onChange={handleInputChange}
                                                                    className="w-full px-3 py-2.5 border border-gray-300 rounded bg-gray-50 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
                                                                />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <label className="block text-xs font-medium text-gray-500 mb-1.5">Name of the Merchant</label>
                                                                <input
                                                                    type="text"
                                                                    name="panName"
                                                                    value={formData.panName}
                                                                    onChange={handleInputChange}
                                                                    className="w-full px-3 py-2.5 border border-gray-300 rounded bg-gray-50 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
                                                                />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <label className="block text-xs font-medium text-gray-500 mb-1.5">Date of Birth/ Date of Incorporation</label>
                                                                <input
                                                                    type="date"
                                                                    name="dob"
                                                                    value={formData.dob}
                                                                    onChange={handleInputChange}
                                                                    className="w-full px-3 py-2.5 border border-gray-300 rounded bg-gray-50 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
                                                                />
                                                            </div>
                                                        </>
                                                    )}

                                                    {/* Business Details Form */}
                                                    {step.stepNumber === 3 && (
                                                        <>
                                                            <div className="col-span-2">
                                                                <label className="block text-xs font-medium text-gray-500 mb-1.5">Registered Business Name</label>
                                                                <input
                                                                    type="text"
                                                                    name="businessName"
                                                                    value={formData.businessName}
                                                                    onChange={handleInputChange}
                                                                    className="w-full px-3 py-2.5 border border-gray-300 rounded bg-gray-50 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
                                                                />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <label className="block text-xs font-medium text-gray-500 mb-1.5">Business Type</label>
                                                                <select
                                                                    name="businessType"
                                                                    value={formData.businessType}
                                                                    onChange={handleInputChange}
                                                                    className="w-full px-3 py-2.5 border border-gray-300 rounded bg-gray-50 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
                                                                >
                                                                    <option value="">Select Type</option>
                                                                    <option value="individual">Individual</option>
                                                                    <option value="private_limited">Private Limited</option>
                                                                    <option value="proprietorship">Proprietorship</option>
                                                                </select>
                                                            </div>
                                                        </>
                                                    )}

                                                    {/* Bank Details Form */}
                                                    {step.stepNumber === 6 && (
                                                        <>
                                                            <div className="col-span-2">
                                                                <label className="block text-xs font-medium text-gray-500 mb-1.5">Account Number</label>
                                                                <input
                                                                    type="text"
                                                                    name="accountNumber"
                                                                    value={formData.accountNumber}
                                                                    onChange={handleInputChange}
                                                                    className="w-full px-3 py-2.5 border border-gray-300 rounded bg-gray-50 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
                                                                />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <label className="block text-xs font-medium text-gray-500 mb-1.5">IFSC Code</label>
                                                                <input
                                                                    type="text"
                                                                    name="ifscCode"
                                                                    value={formData.ifscCode}
                                                                    onChange={handleInputChange}
                                                                    className="w-full px-3 py-2.5 border border-gray-300 rounded bg-gray-50 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
                                                                />
                                                            </div>
                                                            <div className="col-span-2 md:col-span-1">
                                                                <label className="block text-xs font-medium text-gray-500 mb-1.5">Account Holder Name</label>
                                                                <input
                                                                    type="text"
                                                                    name="holderName"
                                                                    value={formData.holderName}
                                                                    onChange={handleInputChange}
                                                                    className="w-full px-3 py-2.5 border border-gray-300 rounded bg-gray-50 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
                                                                />
                                                            </div>
                                                        </>
                                                    )}

                                                    {/* KYC Documents Form */}
                                                    {step.stepNumber === 7 && (
                                                        <div className="col-span-2">
                                                            <label className="block text-xs font-medium text-gray-500 mb-1.5">Upload Business Documents (GST/Incorporation Certificate)</label>
                                                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                                                                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                                                                <p className="text-sm text-gray-600 font-medium">Click to upload or drag and drop</p>
                                                                <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG up to 5MB</p>
                                                                <input type="file" className="hidden" onChange={(e) => toast.success(`File selected: ${e.target.files[0]?.name}`)} />
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Generic Textarea for other steps */}
                                                    {!([2, 3, 6, 7].includes(step.stepNumber)) && (
                                                        <div className="col-span-2">
                                                            <label className="block text-xs font-medium text-gray-500 mb-1.5">Additional Details</label>
                                                            <textarea
                                                                rows="4"
                                                                className="w-full px-3 py-2.5 border border-gray-300 rounded bg-gray-50 focus:bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all"
                                                                placeholder="Enter details here..."
                                                            ></textarea>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                                    <div className="text-xs text-gray-500 underline cursor-pointer hover:text-gray-700">Why we need this?</div>
                                                    <button
                                                        onClick={() => handleSubmitStep(step.stepNumber)}
                                                        disabled={submitting}
                                                        className="px-6 py-2.5 bg-[#00bfa5] text-white font-medium rounded hover:bg-[#00a892] transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                                                    >
                                                        {submitting ? "Verifying..." : "Proceed to Verify"}
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OnboardingPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Circle, ArrowRight, Shield } from "lucide-react";

const OnboardingBanner = ({ verification }) => {
    const navigate = useNavigate();

    if (!verification || verification.kycCompleted) return null;

    const completedSteps = verification.steps.filter((s) => s.status === "verified").length;
    const totalSteps = verification.steps.length;
    const progress = Math.round((completedSteps / totalSteps) * 100);

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Complete your Onboarding</h2>
                    <p className="text-gray-600 mb-6">
                        Hope you are enjoying the SilanPay experience. Kindly complete your on-boarding & KYC steps to receive settlements in your bank account.
                    </p>

                    <button
                        onClick={() => navigate("/onboarding")}
                        className="px-6 py-2.5 bg-[#238dcf] text-white font-medium rounded-lg hover:bg-[#1a7bb8] transition-colors shadow-sm flex items-center gap-2"
                    >
                        Activate Account
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="hidden md:block w-1/3">
                    <div className="relative w-full h-32 bg-blue-50 rounded-lg flex items-center justify-center overflow-hidden">
                        {/* Simple illustration placeholder */}
                        <Shield className="w-16 h-16 text-blue-200" />
                        <div className="absolute bottom-0 right-0 p-4">
                            <div className="w-12 h-12 bg-blue-500 rounded-full opacity-20 blur-xl"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Horizontal Stepper Preview */}
            <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center justify-between relative">
                    {/* Progress Line */}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-100 -z-10"></div>
                    <div
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-green-500 -z-10 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    ></div>

                    {/* Steps Preview (Show first 5 or key steps) */}
                    {[
                        { name: "Email", step: 1 },
                        { name: "PAN Details", step: 2 },
                        { name: "Business", step: 3 },
                        { name: "Bank", step: 6 },
                        { name: "KYC", step: 7 }
                    ].map((item, index) => {
                        const stepStatus = verification.steps.find(s => s.stepNumber === item.step)?.status;
                        const isCompleted = stepStatus === "verified";
                        const isCurrent = verification.currentStep === item.step;

                        return (
                            <div key={item.step} className="flex flex-col items-center bg-white px-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${isCompleted ? "bg-green-50 border-green-500 text-green-600" :
                                        isCurrent ? "bg-blue-50 border-[#238dcf] text-[#238dcf]" :
                                            "bg-white border-gray-300 text-gray-400"
                                    }`}>
                                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <span className="text-xs font-bold">{item.step}</span>}
                                </div>
                                <span className={`text-xs mt-2 font-medium ${isCompleted ? "text-green-600" :
                                        isCurrent ? "text-[#238dcf]" : "text-gray-500"
                                    }`}>
                                    {item.name}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default OnboardingBanner;

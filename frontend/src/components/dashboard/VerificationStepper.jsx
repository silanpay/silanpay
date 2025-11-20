import React from "react";
import { Check, Clock, XCircle, AlertCircle, ArrowRight } from "lucide-react";

const VerificationStepper = ({ steps, currentStep, onSubmitStep }) => {
    return (
        <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Account Verification</h2>
                <p className="mt-2 text-gray-600">
                    Complete these steps to activate your account. Each step requires admin approval.
                </p>
            </div>

            <div className="relative pl-4">
                {/* Vertical Line */}
                <div
                    className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-gray-100"
                    style={{ zIndex: 0 }}
                ></div>

                <div className="space-y-8 relative z-10">
                    {steps.map((step, index) => {
                        const isVerified = step.status === "verified";
                        const isSubmitted = step.status === "submitted";
                        const isRejected = step.status === "rejected";
                        const isCurrent = step.stepNumber === currentStep;
                        const isLocked = step.stepNumber > currentStep;

                        let statusColor = "bg-gray-100 border-gray-300 text-gray-400";
                        let statusIcon = <div className="w-2.5 h-2.5 bg-gray-300 rounded-full" />;
                        let statusText = "Pending";
                        let statusTextColor = "text-gray-400";

                        if (isVerified) {
                            statusColor = "bg-emerald-500 border-emerald-500 text-white";
                            statusIcon = <Check className="w-5 h-5" />;
                            statusText = "Verified";
                            statusTextColor = "text-emerald-600";
                        } else if (isSubmitted) {
                            statusColor = "bg-amber-100 border-amber-500 text-amber-600";
                            statusIcon = <Clock className="w-5 h-5" />;
                            statusText = "Under Review";
                            statusTextColor = "text-amber-600";
                        } else if (isRejected) {
                            statusColor = "bg-red-100 border-red-500 text-red-600";
                            statusIcon = <XCircle className="w-5 h-5" />;
                            statusText = "Rejected";
                            statusTextColor = "text-red-600";
                        } else if (isCurrent) {
                            statusColor = "bg-white border-blue-500 text-blue-600 ring-4 ring-blue-50";
                            statusIcon = <div className="w-2.5 h-2.5 bg-blue-600 rounded-full" />;
                            statusText = "In Progress";
                            statusTextColor = "text-blue-600";
                        }

                        return (
                            <div key={step.stepNumber} className={`flex gap-6 ${isLocked ? "opacity-50" : ""}`}>
                                {/* Icon */}
                                <div
                                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 flex-shrink-0 transition-all duration-300 ${statusColor}`}
                                >
                                    {statusIcon}
                                </div>

                                {/* Content */}
                                <div className="flex-1 pt-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className={`text-lg font-semibold ${isLocked ? "text-gray-400" : "text-gray-900"}`}>
                                            {step.stepName}
                                        </h3>
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full bg-gray-50 ${statusTextColor}`}>
                                            {statusText}
                                        </span>
                                    </div>

                                    {/* Status Messages & Actions */}
                                    <div className="mt-2">
                                        {isRejected && (
                                            <div className="flex items-start gap-2 p-3 mb-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-100">
                                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="font-medium">Verification Failed</p>
                                                    <p className="mt-1 text-xs opacity-90">{step.rejectionReason || "Please review your details and try again."}</p>
                                                </div>
                                            </div>
                                        )}

                                        {isSubmitted && (
                                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                Waiting for admin approval...
                                            </p>
                                        )}

                                        {(isCurrent || isRejected) && !isSubmitted && (
                                            <div className="mt-3">
                                                <button
                                                    onClick={() => onSubmitStep(step.stepNumber)}
                                                    className="flex items-center gap-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                                                >
                                                    {isRejected ? "Resubmit Details" : "Submit Details"}
                                                    <ArrowRight className="w-4 h-4" />
                                                </button>
                                                <p className="mt-2 text-xs text-gray-500">
                                                    You will need to provide valid details for verification.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default VerificationStepper;

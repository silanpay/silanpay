import React, { useState, useEffect } from "react";
import { verificationAPI } from "../services/api";
import { Check, X, Clock, AlertCircle, ChevronRight, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const VerificationRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userVerification, setUserVerification] = useState(null);
    const [loadingDetails, setLoadingDetails] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [rejectingStep, setRejectingStep] = useState(null);

    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await verificationAPI.getRequests();
            if (response.data.success) {
                setRequests(response.data.requests);
            }
        } catch (error) {
            console.error("Error fetching requests:", error);
            toast.error("Failed to fetch verification requests");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectUser = async (user) => {
        if (selectedUser?._id === user._id) {
            setSelectedUser(null);
            setUserVerification(null);
            return;
        }

        setSelectedUser(user);
        setLoadingDetails(true);
        try {
            const response = await verificationAPI.getUserVerification(user.userId._id);
            if (response.data.success) {
                setUserVerification(response.data.verification);
            }
        } catch (error) {
            console.error("Error fetching user verification:", error);
            toast.error("Failed to fetch details");
        } finally {
            setLoadingDetails(false);
        }
    };

    const handleVerifyStep = async (stepNumber, status) => {
        if (status === "rejected" && !rejectionReason) {
            toast.error("Please provide a rejection reason");
            return;
        }

        try {
            const response = await verificationAPI.verifyStep(
                selectedUser.userId._id,
                stepNumber,
                { status, rejectionReason: status === "rejected" ? rejectionReason : null }
            );

            if (response.data.success) {
                toast.success(`Step ${status} successfully`);
                // Update local state
                setUserVerification(response.data.verification);
                setRejectingStep(null);
                setRejectionReason("");

                // Refresh list if needed
                fetchRequests();
            }
        } catch (error) {
            console.error("Error verifying step:", error);
            toast.error("Failed to update step status");
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Verification Requests</h1>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {requests.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        No pending verification requests found.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-200">
                        {requests.map((request) => (
                            <div key={request._id} className="bg-white">
                                <div
                                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => handleSelectUser(request)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                            {request.userId?.name?.[0]?.toUpperCase() || "U"}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{request.userId?.name}</h3>
                                            <p className="text-sm text-gray-500">{request.userId?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                            {request.steps.filter(s => s.status === "submitted").length} Pending Steps
                                        </span>
                                        {selectedUser?._id === request._id ? (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronRight className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {selectedUser?._id === request._id && (
                                    <div className="p-6 bg-gray-50 border-t border-gray-200">
                                        {loadingDetails ? (
                                            <div className="text-center py-4">Loading details...</div>
                                        ) : (
                                            <div className="space-y-6">
                                                <h4 className="font-semibold text-gray-900">Verification Steps</h4>
                                                <div className="grid gap-4">
                                                    {userVerification?.steps.map((step) => (
                                                        <div
                                                            key={step.stepNumber}
                                                            className={`bg-white p-4 rounded-lg border ${step.status === "submitted" ? "border-amber-300 shadow-sm" : "border-gray-200"
                                                                }`}
                                                        >
                                                            <div className="flex items-start justify-between">
                                                                <div>
                                                                    <div className="flex items-center gap-2">
                                                                        <h5 className="font-medium text-gray-900">{step.stepName}</h5>
                                                                        <span className={`text-xs px-2 py-0.5 rounded-full ${step.status === "verified" ? "bg-green-100 text-green-700" :
                                                                                step.status === "rejected" ? "bg-red-100 text-red-700" :
                                                                                    step.status === "submitted" ? "bg-amber-100 text-amber-700" :
                                                                                        "bg-gray-100 text-gray-500"
                                                                            }`}>
                                                                            {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                                                                        </span>
                                                                    </div>
                                                                    {step.submissionDate && (
                                                                        <p className="text-xs text-gray-500 mt-1">
                                                                            Submitted: {new Date(step.submissionDate).toLocaleString()}
                                                                        </p>
                                                                    )}
                                                                    {step.data && (
                                                                        <div className="mt-3 p-3 bg-gray-50 rounded text-sm font-mono text-gray-700 overflow-x-auto">
                                                                            <pre>{JSON.stringify(step.data, null, 2)}</pre>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                {step.status === "submitted" && (
                                                                    <div className="flex items-center gap-2">
                                                                        {rejectingStep === step.stepNumber ? (
                                                                            <div className="flex flex-col gap-2 items-end">
                                                                                <input
                                                                                    type="text"
                                                                                    placeholder="Reason for rejection..."
                                                                                    className="text-sm border border-gray-300 rounded px-2 py-1 w-64"
                                                                                    value={rejectionReason}
                                                                                    onChange={(e) => setRejectionReason(e.target.value)}
                                                                                />
                                                                                <div className="flex gap-2">
                                                                                    <button
                                                                                        onClick={() => setRejectingStep(null)}
                                                                                        className="text-xs text-gray-500 hover:text-gray-700"
                                                                                    >
                                                                                        Cancel
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => handleVerifyStep(step.stepNumber, "rejected")}
                                                                                        className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                                                                                    >
                                                                                        Confirm Reject
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        ) : (
                                                                            <>
                                                                                <button
                                                                                    onClick={() => handleVerifyStep(step.stepNumber, "verified")}
                                                                                    className="p-2 bg-green-100 text-green-600 rounded hover:bg-green-200 transition-colors"
                                                                                    title="Approve"
                                                                                >
                                                                                    <Check className="w-5 h-5" />
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => {
                                                                                        setRejectingStep(step.stepNumber);
                                                                                        setRejectionReason("");
                                                                                    }}
                                                                                    className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                                                                                    title="Reject"
                                                                                >
                                                                                    <X className="w-5 h-5" />
                                                                                </button>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerificationRequests;

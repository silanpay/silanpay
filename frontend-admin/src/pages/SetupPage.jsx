import { CheckCircle2, Circle, Lock } from "lucide-react";

export default function SetupPage() {
  const setupSteps = [
    {
      id: 1,
      title: "Account Verification",
      description: "Verify your business information and bank account",
      status: "completed",
      details: [
        "Email verified",
        "Business information confirmed",
        "Bank account linked",
      ],
    },
    {
      id: 2,
      title: "API Configuration",
      description: "Set up your API keys and webhook endpoints",
      status: "completed",
      details: [
        "API keys generated",
        "Webhooks configured",
        "Test transactions completed",
      ],
    },
    {
      id: 3,
      title: "Payment Methods",
      description: "Configure supported payment methods",
      status: "in-progress",
      details: [
        "Credit cards enabled",
        "Bank transfers pending",
        "Digital wallets pending",
      ],
    },
    {
      id: 4,
      title: "Compliance & Security",
      description: "Set up compliance and security requirements",
      status: "pending",
      details: ["PCI compliance", "Two-factor authentication", "IP whitelisting"],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Setup Wizard</h1>
        <p className="text-gray-600 mt-2">Complete your setup to start accepting payments</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900">Setup Progress</h3>
          <span className="text-2xl font-bold text-blue-600">50%</span>
        </div>
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 w-1/2 rounded-full transition-all duration-500"></div>
        </div>
      </div>

      {/* Setup Steps */}
      <div className="space-y-4">
        {setupSteps.map((step, index) => (
          <div
            key={step.id}
            className={`rounded-xl p-6 border transition ${
              step.status === "completed"
                ? "bg-green-50 border-green-200"
                : step.status === "in-progress"
                ? "bg-blue-50 border-blue-200"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                {step.status === "completed" ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : step.status === "in-progress" ? (
                  <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  </div>
                ) : (
                  <Circle className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {step.id}. {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {step.description}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      step.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : step.status === "in-progress"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {step.status === "completed"
                      ? "Completed"
                      : step.status === "in-progress"
                      ? "In Progress"
                      : "Pending"}
                  </span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="ml-10 space-y-2">
              {step.details.map((detail, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      step.status === "completed"
                        ? "bg-green-600"
                        : step.status === "in-progress" && idx === 0
                        ? "bg-blue-600"
                        : "bg-gray-400"
                    }`}
                  ></div>
                  <p className="text-sm text-gray-700">{detail}</p>
                </div>
              ))}
            </div>

            {/* Action Button */}
            {step.status !== "completed" && (
              <div className="mt-4 ml-10">
                <button
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                    step.status === "in-progress"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed flex items-center gap-2"
                  }`}
                  disabled={step.status === "pending"}
                >
                  {step.status === "pending" && <Lock className="w-4 h-4" />}
                  {step.status === "in-progress"
                    ? "Continue Setup"
                    : "Locked"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

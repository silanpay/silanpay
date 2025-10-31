import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Page Not Found
            </h2>
            <p className="mb-8 text-gray-600">
              Sorry, we couldn’t find the page you’re looking for.
            </p>

            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>

              <button
                onClick={() => window.history.back()}
                className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

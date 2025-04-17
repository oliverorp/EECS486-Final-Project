import React, { useState } from "react";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";

export default function Results({ results, recommendation, goBack }) {
  // const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-2xl pt-4 font-bold text-blue-600 mb-4">
          Your Productivity Loss Prediction:
        </h2>
        <h2 className="font-semibold pb-3 text-gray-800 mb-6">
          <strong>{results}</strong>
        </h2>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Recommendation:
        </h3>
        <p className="p-4 text-md text-gray-600">{recommendation}</p>

        <a href="https://www.animatedimages.org/cat-computer-56.htm">
          <img
            src="https://www.animatedimages.org/data/media/56/animated-computer-image-0178.gif"
            border="0"
            alt="animated-computer-image-0178"
          />
        </a>
        <p className="p-4 text-md text-gray-600">
          <small>
            Disclaimer: We are not medical professionals! This is a class
            project created by students who are trying to analyze the effects of
            social media on mental health.
          </small>
        </p>

        <button
          className="mt-6 px-4 py-2 mb-4 bg-blue-500 rounded-xl hover:bg-blue-600 transition duration-300"
          onClick={goBack}
        >
          Back to Survey
        </button>
      </div>
    </div>
  );
}

Results.propTypes = {
  results: PropTypes.number.isRequired,
  recommendation: PropTypes.string.isRequired,
  goBack: PropTypes.func.isRequired,
}; // May be issue??

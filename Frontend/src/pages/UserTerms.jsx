import React from "react";
import { Link } from "react-router-dom";

const UserTerms = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg overflow-y-auto h-full">
      <h1 className="text-3xl font-bold mb-6 text-center">RideMate User Terms and Conditions</h1>


      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Eligibility</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>You must be at least 14 years old to use RideMate services.</li>
          <li>You must provide accurate and complete registration information.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. User Obligations</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Provide correct pickup and drop-off locations.</li>
          <li>Behave respectfully toward drivers at all times.</li>
          <li>Pay fares promptly and through authorized payment methods.</li>
          <li>Do not misuse the platform for unlawful activities.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Booking and Cancellations</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Bookings are subject to driver availability.</li>
          {/* <li>Cancellation charges may apply for last-minute cancellations.</li> */}
          <li>Repeated cancellations may lead to account suspension.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Safety and Conduct</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Seat belts must be worn at all times.</li>
          <li>No harassment, abuse, or violence toward drivers.</li>
          <li>Follow all local transportation laws and regulations during your trip.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Payments and Charges</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Ride fares are calculated based on distance, time, and applicable surcharges.</li>
          <li>Dynamic pricing may apply during peak hours or high demand periods.</li>
          {/* <li>All payments must be made promptly through the app.</li> */}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Account Suspension or Termination</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Violation of terms may result in suspension or termination of your account.</li>
          <li>RideMate reserves the right to refuse service to anyone violating these terms.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Data and Privacy</h2>
        <p className="text-gray-700">
          By using RideMate, you consent to our collection, use, and sharing of your information as described in our Privacy Policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Amendments</h2>
        <p className="text-gray-700">
          RideMate may modify these Terms at any time. Continued use of the service indicates acceptance of updated Terms.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">9. Governing Law</h2>
        <p className="text-gray-700">
          These Terms and Conditions are governed by and construed under the laws of India.
          Any disputes shall be subject to the exclusive jurisdiction of the courts located in India.
        </p>
      </section>

      <div className="text-center mt-8">
        <Link to="/signup">
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full">
          Agree and Continue
        </button>
        </Link>
      </div>
    </div>
  );
};

export default UserTerms;

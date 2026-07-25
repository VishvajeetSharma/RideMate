import React from 'react'
import { Link } from 'react-router-dom'

const CaptainTerms = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg overflow-y-auto h-full">
      <h1 className="text-3xl font-bold mb-6 text-center">RideMate Driver Terms and Conditions</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. Eligibility</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Hold a valid driving license and necessary permits.</li>
          <li>Vehicle must comply with transportation regulations.</li>
          <li>Pass RideMate’s background checks and inspections.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Driver Obligations</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Maintain professionalism and respectful behavior.</li>
          <li>Ensure the vehicle is clean, safe, and roadworthy.</li>
          <li>Accept rides only through RideMate platform.</li>
          <li>Keep personal and vehicle information updated.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Commission and Payments</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>5% commission deducted per ride.</li>
          <li>Driver responsible for taxes, fees, and insurance.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Driver Conduct</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>No smoking, alcohol, or illegal substances while working.</li>
          <li>No harassment or discrimination toward Riders.</li>
          <li>Do not text or misuse mobile devices while driving.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Account Suspension or Termination</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Violation of terms can lead to suspension or termination.</li>
          <li>Repeated complaints or unsafe activities can result in account removal.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Insurance and Liability</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Maintain valid insurance at all times.</li>
          <li>RideMate is not responsible for accidents or damages.</li>
          <li>Driver agrees to indemnify RideMate against any claims.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">7. Data and Privacy</h2>
        <p className="text-gray-700">
          By using RideMate, you consent to the collection and use of your data according to our Privacy Policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">8. Amendments</h2>
        <p className="text-gray-700">
          RideMate reserves the right to modify these Terms at any time. Continued use means acceptance of updates.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">9. Governing Law</h2>
        <p className="text-gray-700">
          These Terms and Conditions shall be governed by and construed in accordance with the laws of India.
          Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts located in India.
        </p>
      </section>

      <div className="text-center mt-8">
        <Link to="/captain-signup">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full">
          Agree and Sign Up
        </button>
        </Link>
      </div>
    </div>
  )
}
export default CaptainTerms

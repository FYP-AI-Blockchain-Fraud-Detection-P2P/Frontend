'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const loansPerPage = 5;

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get('http://localhost:5000/loans');
        setLoans(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch loans');
        console.error(err);
      }
    };
    fetchLoans();
  }, []);

  const openModal = (loan) => {
    setSelectedLoan(loan);
  };

  const closeModal = () => {
    setSelectedLoan(null);
  };

  // Calculate the loans to display on the current page
  const indexOfLastLoan = currentPage * loansPerPage;
  const indexOfFirstLoan = indexOfLastLoan - loansPerPage;
  const currentLoans = loans.slice(indexOfFirstLoan, indexOfLastLoan);

  // Calculate total pages
  const totalPages = Math.ceil(loans.length / loansPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle Previous/Next buttons
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
      <div className="min-h-screen flex flex-col bg-white text-black">
        {/* Navigation Bar */}
        <nav className="bg-gray-200 p-4 shadow-md">
          <div className="flex space-x-4">
            <Link href="/">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Home
              </button>
            </Link>
            <Link href="/submit-loan">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Submit Loan
              </button>
            </Link>
            <Link href="/loan">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                View Loan Details
              </button>
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <div
            className={`flex flex-col items-center justify-center flex-1 p-4 bg-white text-black transition-all duration-300 ${
                selectedLoan ? 'blur-sm' : ''
            }`}
        >
          <h1 className="text-3xl font-bold mb-6">Loan Contracts</h1>

          {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded border border-black">
                <p>Error: {error}</p>
              </div>
          )}

          {loans.length === 0 && !error ? (
              <p>Loading loans...</p>
          ) : (
              <>
                <div className="w-full max-w-4xl overflow-x-auto">
                  <table className="min-w-full bg-white border border-black">
                    <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 border border-black text-left">Loan ID</th>
                      <th className="px-4 py-2 border border-black text-left">Loan Amount</th>
                      <th className="px-4 py-2 border border-black text-left">Term</th>
                      <th className="px-4 py-2 border border-black text-left">Interest Rate</th>
                      <th className="px-4 py-2 border border-black text-left">Is Fraud</th>
                      <th className="px-4 py-2 border border-black text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {currentLoans.map((loan) => (
                        <tr
                            key={loan.loan_id}
                            onClick={() => openModal(loan)}
                            className="cursor-pointer hover:bg-gray-50"
                        >
                          <td className="px-4 py-2 border border-black">{loan.loan_id}</td>
                          <td className="px-4 py-2 border border-black">${loan.loan_amnt}</td>
                          <td className="px-4 py-2 border border-black">{loan.term} months</td>
                          <td className="px-4 py-2 border border-black">{(loan.int_rate * 100).toFixed(2)}%</td>
                          <td className="px-4 py-2 border border-black">{loan.is_fraud ? 'Yes' : 'No'}</td>
                          <td className="px-4 py-2 border border-black">
                            <button
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent row click from triggering
                                  openModal(loan);
                                }}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {loans.length > loansPerPage && (
                    <div className="mt-4 flex items-center space-x-2">
                      <button
                          onClick={handlePrevious}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 rounded ${
                              currentPage === 1
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                      >
                        Previous
                      </button>

                      {/* Page Numbers */}
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`px-3 py-1 rounded ${
                                    currentPage === pageNumber
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-200 text-black hover:bg-gray-300'
                                }`}
                            >
                              {pageNumber}
                            </button>
                        );
                      })}

                      <button
                          onClick={handleNext}
                          disabled={currentPage === totalPages}
                          className={`px-4 py-2 rounded ${
                              currentPage === totalPages
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : 'bg-blue-500 text-white hover:bg-blue-600'
                          }`}
                      >
                        Next
                      </button>
                    </div>
                )}
              </>
          )}
        </div>

        {/* Modal for Loan Details */}
        {selectedLoan && (
            <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full border border-black relative">
                {/* Close Button (X) in Top-Right Corner */}
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 text-black hover:text-gray-700"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <h2 className="text-2xl font-bold mb-4">Loan Details - ID: {selectedLoan.loan_id}</h2>
                <div className="space-y-2">
                  <p><strong>Loan Amount:</strong> ${selectedLoan.loan_amnt}</p>
                  <p><strong>Term:</strong> {selectedLoan.term} months</p>
                  <p><strong>Interest Rate:</strong> {(selectedLoan.int_rate * 100).toFixed(2)}%</p>
                  <p><strong>Installment:</strong> ${selectedLoan.installment.toFixed(2)}</p>
                  <p><strong>Employment Length:</strong> {selectedLoan.emp_length} years</p>
                  <p><strong>Annual Income:</strong> ${selectedLoan.annual_inc}</p>
                  <p><strong>Debt-to-Income Ratio:</strong> {(selectedLoan.dti * 100).toFixed(2)}%</p>
                  <p><strong>Zip Code:</strong> {selectedLoan.zip_code}</p>
                  <p><strong>State:</strong> {selectedLoan.addr_state}</p>
                  <p><strong>Grade:</strong> {selectedLoan.grade}</p>
                  <p><strong>Home Ownership:</strong> {selectedLoan.home_ownership}</p>
                  <p><strong>Verification Status:</strong> {selectedLoan.verification_status}</p>
                  <p><strong>Issue Year:</strong> {selectedLoan.issue_year}</p>
                  <p><strong>Job Category:</strong> {selectedLoan.job_category}</p>
                  <p><strong>Is Fraud:</strong> {selectedLoan.is_fraud ? 'Yes' : 'No'}</p>
                </div>
                <button
                    onClick={closeModal}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
        )}
      </div>
  );
}
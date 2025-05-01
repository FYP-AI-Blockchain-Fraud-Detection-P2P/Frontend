'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function LoanDetails() {
    const { id } = useParams();
    const [loan, setLoan] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLoan = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/get_loan/${id}`);
                setLoan(response.data);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch loan details');
                console.error(err);
            }
        };
        if (id) {
            fetchLoan();
        }
    }, [id]);

    if (error) {
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
                <div className="flex flex-col items-center justify-center flex-1 p-4 bg-white text-black">
                    <h1 className="text-3xl font-bold mb-6">Loan Details</h1>
                    <div className="p-4 bg-black text-red-500 rounded border border-gray-300">
                        <p>Error: {error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!loan) {
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
                <div className="flex flex-col items-center justify-center flex-1 p-4 bg-white text-black">
                    <h1 className="text-3xl font-bold mb-6">Loan Details</h1>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

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
            <div className="flex flex-col items-center justify-center flex-1 p-4 bg-white text-black">
                <h1 className="text-3xl font-bold mb-6">Loan Details - ID: {id}</h1>
                <div className="w-full max-w-lg text-black p-6 rounded border border-gray-300 shadow-md">
                    <p><strong>Loan Amount:</strong> {loan.loan_amnt}</p>
                    <p><strong>Term:</strong> {loan.term}</p>
                    <p><strong>Interest Rate:</strong> {(loan.int_rate * 100).toFixed(2)}%</p>
                    <p><strong>Installment:</strong> ${loan.installment.toFixed(2)}</p>
                    <p><strong>Employment Length:</strong> {loan.emp_length} years</p>
                    <p><strong>Annual Income:</strong> ${loan.annual_inc}</p>
                    <p><strong>Debt-to-Income Ratio:</strong> {(loan.dti * 100).toFixed(2)}%</p>
                    <p><strong>Zip Code:</strong> {loan.zip_code}</p>
                    <p><strong>State:</strong> {loan.addr_state}</p>
                    <p><strong>Grade:</strong> {loan.grade}</p>
                    <p><strong>Home Ownership:</strong> {loan.home_ownership}</p>
                    <p><strong>Verification Status:</strong> {loan.verification_status}</p>
                    <p><strong>Issue Year:</strong> {loan.issue_year}</p>
                    <p><strong>Job Category:</strong> {loan.job_category}</p>
                    <p><strong>Is Fraud:</strong> {loan.is_fraud ? 'Yes' : 'No'}</p>
                </div>
            </div>
        </div>
    );
}
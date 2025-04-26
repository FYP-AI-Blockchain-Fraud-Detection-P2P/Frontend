'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SubmitLoan() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        loan_amnt: '',
        term: '',
        int_rate: '',
        installment: '',
        emp_length: '',
        annual_inc: '',
        dti: '',
        zip_code: '',
        addr_state: '',
        grade: '',
        home_ownership: '',
        verification_status: '',
        issue_year: '',
        job_category: '',
    });
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResponse(null);

        // Convert numerical fields to numbers
        const numericalFields = [
            'loan_amnt',
            'int_rate',
            'installment',
            'emp_length',
            'annual_inc',
            'dti',
            'issue_year',
        ];
        const submissionData = { ...formData };
        numericalFields.forEach((field) => {
            if (submissionData[field]) {
                submissionData[field] = Number(submissionData[field]);
            }
        });

        try {
            console.log('Submitting data:', submissionData);
            const response = await axios.post('http://localhost:5000/submit_loan', submissionData);
            setResponse(response.data);
            if (response.data.loan_id) {
                router.push(`/loan/${response.data.loan_id}`);
            }
        } catch (err) {
            console.log('Error response:', err.response);
            setError(err.response?.data?.error || 'Failed to submit loan');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
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
            <div className="flex flex-col items-center justify-center flex-1 p-4" style={{ backgroundColor: '#ffffff', color: '#000000' }}>
                <h1 className="text-3xl font-bold mb-6">Submit a Loan Application</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded shadow-md">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-black">Loan Amount</label>
                            <input
                                type="number"
                                name="loan_amnt"
                                value={formData.loan_amnt}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded text-black bg-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Term (e.g., 36 months)</label>
                            <input
                                type="text"
                                name="term"
                                value={formData.term}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded text-black bg-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Interest Rate (e.g., 0.05)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="int_rate"
                                value={formData.int_rate}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded text-black bg-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Installment</label>
                            <input
                                type="number"
                                step="0.01"
                                name="installment"
                                value={formData.installment}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded text-black bg-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Employment Length (years)</label>
                            <input
                                type="number"
                                name="emp_length"
                                value={formData.emp_length}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded text-black bg-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Annual Income</label>
                            <input
                                type="number"
                                name="annual_inc"
                                value={formData.annual_inc}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded text-black bg-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Debt-to-Income Ratio (e.g., 0.1)</label>
                            <input
                                type="number"
                                step="0.01"
                                name="dti"
                                value={formData.dti}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded text-black bg-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Zip Code</label>
                            <input
                                type="text"
                                name="zip_code"
                                value={formData.zip_code}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded text-black bg-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">State (e.g., CA)</label>
                            <input
                                type="text"
                                name="addr_state"
                                value={formData.addr_state}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded text-black bg-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Grade (e.g., A, B, C)</label>
                            <select
                                name="grade"
                                value={formData.grade}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded text-black bg-white"
                                required
                            >
                                <option value="">Select Grade</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Home Ownership</label>
                            <select
                                name="home_ownership"
                                value={formData.home_ownership}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded text-black bg-white"
                                required
                            >
                                <option value="">Select Ownership</option>
                                <option value="OWN">OWN</option>
                                <option value="RENT">RENT</option>
                                <option value="MORTGAGE">MORTGAGE</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Verification Status</label>
                            <select
                                name="verification_status"
                                value={formData.verification_status}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded text-black bg-white"
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="Verified">Verified</option>
                                <option value="Not Verified">Not Verified</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Issue Year (e.g., 2025)</label>
                            <input
                                type="number"
                                name="issue_year"
                                value={formData.issue_year}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded text-black bg-white"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-black">Job Category (e.g., CEO)</label>
                            <input
                                type="text"
                                name="job_category"
                                value={formData.job_category}
                                onChange={handleChange}
                                className="mt-1 p-2 w-full border rounded text-black bg-white"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="mt-6 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Submit Loan
                    </button>
                </form>
                {error && (
                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                        <p>Error: {error}</p>
                        {error.includes('fraud') && response?.fraud_probability && (
                            <p>Fraud Probability: {(response.fraud_probability * 100).toFixed(2)}%</p>
                        )}
                    </div>
                )}
                {response && !error && (
                    <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
                        <p>{response.message}</p>
                        {response.is_fraud !== undefined && (
                            <p>Is Fraud: {response.is_fraud ? 'Yes' : 'No'}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
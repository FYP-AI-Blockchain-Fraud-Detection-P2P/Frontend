'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ViewLoan() {
    const router = useRouter();
    const [loanId, setLoanId] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        if (!loanId || isNaN(loanId)) {
            setError('Please enter a valid Loan ID');
            return;
        }

        router.push(`/loan/${loanId}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-white text-black">
            {/* Main Content */}
            <div className="flex flex-col items-center justify-center flex-1 p-4 bg-white text-black">
                <h1 className="text-3xl font-bold mb-6">View Loan Details</h1>
                <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded shadow-md">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-black">Enter Loan ID</label>
                        <input
                            type="number"
                            value={loanId}
                            onChange={(e) => setLoanId(e.target.value)}
                            className="mt-1 p-2 w-full border rounded text-black bg-white"
                            placeholder="e.g., 1"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        View Loan
                    </button>
                </form>
                {error && (
                    <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
                        <p>Error: {error}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
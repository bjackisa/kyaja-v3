"use client";

import { FaSpinner } from 'react-icons/fa';
import Link from 'next/link';

export default function PaymentPendingPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaSpinner className="text-blue-600 text-3xl animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Pending
          </h2>
          <p className="text-gray-600">Please check your mobile phone to approve the transaction. This page will update automatically once the payment is confirmed.</p>
        </div>
        <Link href="/">
          <button className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors duration-200 border border-gray-300 hover:border-gray-400">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

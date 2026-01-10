"use client";

import { useSearchParams } from 'next/navigation';
import { MdCheckCircle, MdError } from 'react-icons/md';
import Link from 'next/link';

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();
  const status = searchParams.get('status');
  const message = searchParams.get('message');

  const isSuccess = status === 'success';

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4">
        <div className="mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${isSuccess ? 'bg-green-100' : 'bg-red-100'}`}>
            {isSuccess ? (
              <MdCheckCircle className="text-green-600 text-3xl" />
            ) : (
              <MdError className="text-red-600 text-3xl" />
            )}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {isSuccess ? 'Payment Successful!' : 'Payment Failed'}
          </h2>
          <p className="text-gray-600">{message || (isSuccess ? 'Your payment has been processed successfully.' : 'There was an issue with your payment.')}</p>
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

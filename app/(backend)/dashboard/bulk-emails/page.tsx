"use client"
import React, { useEffect, useState } from "react";
import { Mail, Bell, Timer, ArrowRight } from "lucide-react";

function Page() {
  const [email, setEmail] = useState("");
  const [days, setDays] = useState(16);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMinutes((prevMinutes) => {
        if (prevMinutes > 0) return prevMinutes - 1;
        if (hours > 0) {
          setHours((prevHours) => prevHours - 1);
          return 59;
        }
        if (days > 0) {
          setDays((prevDays) => prevDays - 1);
          setHours(23);
          return 59;
        }
        clearInterval(timer); 
        return 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [days, hours]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email subscription
    setEmail("");
    alert(
      "Thank you for subscribing! We'll notify you when the feature launches."
    );
  };

  const handleBack = () => {
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-10 lg:pb-32 ">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-[#e29304] p-4 rounded-full">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5">
            Email Marketing
            <span className="block text-[#e29304]">Coming Soon</span>
          </h1>

          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            We `&apos;` re crafting a powerful email marketing solution for Kyaja
            E-commerce. Get ready to engage your customers like never before.
          </p>

          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto mb-10">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-[#e29304] mb-1">
                {days}
              </div>
              <div className="text-gray-600">Days</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-[#e29304] mb-1">
                {hours}
              </div>
              <div className="text-gray-600">Hours</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-[#e29304] mb-1">
                {minutes}
              </div>
              <div className="text-gray-600">Minutes</div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center text-[#e29304]">
                <Bell className="w-5 h-5 mr-2" />
                <span>Get Notified</span>
              </div>
              <div className="flex items-center text-[#e29304]">
                <Timer className="w-5 h-5 mr-2" />
                <span>Early Access</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#e29304] focus:border-transparent"
                required
              />
              <button
                type="submit"
                className="bg-[#e29304] text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
              >
                Notify Me
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </form>
          </div>

          <div className="mt-12 text-gray-600">
            <p>Features coming soon:</p>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <span className="bg-purple-100 text-[#e29304] px-4 py-2 rounded-full">
                Automated Campaigns
              </span>
              <span className="bg-purple-100 text-[#e29304] px-4 py-2 rounded-full">
                Customer Segmentation
              </span>
              <span className="bg-purple-100 text-[#e29304] px-4 py-2 rounded-full">
                Analytics Dashboard
              </span>
              <span className="bg-purple-100 text-[#e29304] px-4 py-2 rounded-full">
                Template Builder
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

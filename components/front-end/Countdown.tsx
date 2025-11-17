"use client";
import React, { useEffect, useState } from "react";

const Countdown = ({ endDate }: { endDate: Date }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    let timeLeft: {
      days?: number;
      hours?: number;
      minutes?: number;
      seconds?: number;
    } = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    const value = timeLeft[interval as keyof typeof timeLeft];
    if (value === undefined) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {value} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="text-sm text-gray-600 mt-2">
      {timerComponents.length ? (
        <p>
          <span className="font-semibold">Offer ends in:</span>{" "}
          {timerComponents}
        </p>
      ) : (
        <span className="text-red-500">Offer expired!</span>
      )}
    </div>
  );
};

export default Countdown;

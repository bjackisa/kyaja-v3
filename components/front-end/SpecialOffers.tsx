"use client";
import React, { useEffect, useState } from "react";
import { MdStars } from "react-icons/md";
import Countdown from "./Countdown";

const SpecialOffers = () => {
  const [offer, setOffer] = useState<{ title: string; endDate: Date } | null>(
    null
  );

  useEffect(() => {
    const getOffer = () => {
      const now = new Date();
      const year = now.getFullYear();
      let currentOffer: { title: string; endDate: Date } | null = null;

      const offers = [
        // JANUARY
        {
          title: "New Year Kickstart Sale",
          startDate: new Date(year, 0, 1),
          endDate: new Date(new Date(year, 0, 7).setHours(23, 59, 59, 999)),
        },
        {
          title: "Back-to-Class Rush",
          startDate: new Date(year, 0, 8),
          endDate: new Date(new Date(year, 1, 9).setHours(23, 59, 59, 999)),
        },
        // FEBRUARY
        {
          title: "Hearts Week Specials",
          startDate: new Date(year, 1, 10),
          endDate: new Date(new Date(year, 1, 15).setHours(23, 59, 59, 999)),
        },
        {
          title: "Love Yourself Season",
          startDate: new Date(year, 1, 16),
          endDate: new Date(new Date(year, 1, 28).setHours(23, 59, 59, 999)),
        },
        // MARCH
        {
          title: "Fresh Start Restock",
          startDate: new Date(year, 2, 1),
          endDate: new Date(new Date(year, 2, 14).setHours(23, 59, 59, 999)),
        },
        {
          title: "Power of Her Festival",
          startDate: new Date(year, 2, 15),
          endDate: new Date(new Date(year, 2, 31).setHours(23, 59, 59, 999)),
        },
        // APRIL
        {
          title: "Easter Joy Month",
          startDate: new Date(year, 3, 1),
          endDate: new Date(new Date(year, 3, 30).setHours(23, 59, 59, 999)),
        },
        // MAY
        {
          title: "Workers’ Day Reward Drop",
          startDate: new Date(year, 4, 1),
          endDate: new Date(new Date(year, 4, 1).setHours(23, 59, 59, 999)),
        },
        {
          title: "Mum’s Countdown Days",
          startDate: new Date(year, 4, 2),
          endDate: new Date(new Date(year, 4, 11).setHours(23, 59, 59, 999)),
        },
        {
          title: "Mother’s Day Honor Sale",
          startDate: new Date(year, 4, 12),
          endDate: new Date(new Date(year, 4, 12).setHours(23, 59, 59, 999)),
        },
        {
          title: "May Appreciation Weeks",
          startDate: new Date(year, 4, 13),
          endDate: new Date(new Date(year, 4, 31).setHours(23, 59, 59, 999)),
        },
        // JUNE
        {
          title: "Mid-Year Boost Days",
          startDate: new Date(year, 5, 1),
          endDate: new Date(new Date(year, 5, 16).setHours(23, 59, 59, 999)),
        },
        {
          title: "Dad & Men’s Month Special",
          startDate: new Date(year, 5, 17),
          endDate: new Date(new Date(year, 5, 30).setHours(23, 59, 59, 999)),
        },
        // JULY
        {
          title: "Term 2 School Sprint",
          startDate: new Date(year, 6, 1),
          endDate: new Date(new Date(year, 6, 15).setHours(23, 59, 59, 999)),
        },
        {
          title: "July Clearance Storm",
          startDate: new Date(year, 6, 16),
          endDate: new Date(new Date(year, 6, 31).setHours(23, 59, 59, 999)),
        },
        // AUGUST
        {
          title: "Home Upgrade Fortnight",
          startDate: new Date(year, 7, 1),
          endDate: new Date(new Date(year, 7, 14).setHours(23, 59, 59, 999)),
        },
        {
          title: "Grow & Explore Season",
          startDate: new Date(year, 7, 15),
          endDate: new Date(new Date(year, 7, 31).setHours(23, 59, 59, 999)),
        },
        // SEPTEMBER
        {
          title: "Tech Evolution Weeks",
          startDate: new Date(year, 8, 1),
          endDate: new Date(new Date(year, 8, 14).setHours(23, 59, 59, 999)),
        },
        {
          title: "September Style Reset",
          startDate: new Date(year, 8, 15),
          endDate: new Date(new Date(year, 8, 30).setHours(23, 59, 59, 999)),
        },
        // OCTOBER
        {
          title: "Independence Pride Sale",
          startDate: new Date(year, 9, 1),
          endDate: new Date(new Date(year, 9, 15).setHours(23, 59, 59, 999)),
        },
        {
          title: "Pre-November Warm-Up",
          startDate: new Date(year, 9, 16),
          endDate: new Date(new Date(year, 9, 31).setHours(23, 59, 59, 999)),
        },
        // NOVEMBER
        {
          title: "Black November Mania",
          startDate: new Date(year, 10, 1),
          endDate: new Date(new Date(year, 10, 30).setHours(23, 59, 59, 999)),
        },
        // DECEMBER
        {
          title: "Early Christmas Spark",
          startDate: new Date(year, 11, 1),
          endDate: new Date(new Date(year, 11, 10).setHours(23, 59, 59, 999)),
        },
        {
          title: "Festive Countdown Carnival",
          startDate: new Date(year, 11, 11),
          endDate: new Date(new Date(year, 11, 24).setHours(23, 59, 59, 999)),
        },
        {
          title: "Year-End Wipeout Sale",
          startDate: new Date(year, 11, 25),
          endDate: new Date(new Date(year, 11, 31).setHours(23, 59, 59, 999)),
        },
      ];

      for (const offer of offers) {
        if (now >= offer.startDate && now <= offer.endDate) {
          currentOffer = {
            title: offer.title,
            endDate: offer.endDate,
          };
          break;
        }
      }

      setOffer(currentOffer);
    };

    getOffer();
  }, []);

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
      <h3 className="text-gray-900 font-semibold mb-3 uppercase tracking-wide">
        Special Offers
      </h3>
      <div className="flex flex-col gap-3 text-sm text-gray-700">
        {offer ? (
          <>
            <p className="flex gap-2 items-center">
              <MdStars className="text-orange-500 text-lg flex-shrink-0" />
              <span>{offer.title}</span>
            </p>
            <Countdown endDate={offer.endDate} />
          </>
        ) : (
          <p className="flex gap-2 items-center">
            <MdStars className="text-orange-500 text-lg flex-shrink-0" />
            <span>No special offers at the moment.</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SpecialOffers;

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";

export default function ReviewForm({ id }: { id: string }) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { data: eligibility } = useQuery({
    queryKey: ["review-eligibility", session?.user?.id, id],
    queryFn: async () => {
      const { data } = await axios.post("/api/reviews/eligible", {
        userId: session?.user?.id,
        productId: id,
      });
      return data;
    },
    enabled: !!session?.user?.id && !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await axios.post(`/api/products/${id}/reviews`, {
        userId: session?.user?.id,
        rating,
        comment,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews", id] });
      setRating(0);
      setComment("");
    },
  });

  if (!session || !eligibility?.eligible) {
    return null;
  }

  return (
    <div className="w-full bg-white p-6 shadow-lg rounded-xl border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Write a Review
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <button key={i} onClick={() => setRating(i + 1)}>
              {i < rating ? (
                <AiTwotoneStar className="text-2xl text-orange-500" />
              ) : (
                <AiOutlineStar className="text-2xl text-gray-300" />
              )}
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Write your review here..."
        />
        <button
          onClick={() => mutate()}
          disabled={isPending || rating === 0}
          className="bg-orange-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          {isPending ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}

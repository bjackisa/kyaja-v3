import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useReviewsQuery = (id: string) => {
  return useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/products/${id}/reviews`
      );
      return data;
    },
    enabled: !!id,
  });
};

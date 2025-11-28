import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // retry once on failur
      refetchOnWindowFocus: false, // prevents refetch every time tab focus
      staleTime: 5 * 60 * 1000, // 5 min cache
    },
  },
});

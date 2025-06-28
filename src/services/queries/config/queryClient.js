import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       suspense: true,
//       retry: false,
//     },
//   },
// });

export default queryClient;

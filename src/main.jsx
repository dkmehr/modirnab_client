import ReactDOM from "react-dom/client";
import "./assets/styles/_index.scss";
import App from "./App";
import { AppProvider } from "@/context/App/app-context.jsx";
import Rtl from "@/core/rtl";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/services/queries/config/queryClient";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Rtl>
    <AppProvider>
      <App />
      {/* <QueryClientProvider client={queryClient}>
        
      </QueryClientProvider> */}
    </AppProvider>
  </Rtl>
);

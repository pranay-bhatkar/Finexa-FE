import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-quesry.tsx";
import { NotificationProvider } from "./providers/NotificationProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NotificationProvider pollInterval={10000}>
        <App />
      </NotificationProvider>
    </QueryClientProvider>
  </StrictMode>
);

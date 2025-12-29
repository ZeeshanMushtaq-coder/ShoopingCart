import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Components/AuthContext";
import LayoutWrapper from "./Components/LayoutWrapper";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <LayoutWrapper />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

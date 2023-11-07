import ReactDOM from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("huggingface-container") as Element,
);
root.render(
  <div>
    <QueryClientProvider client={queryClient}>
      <section className="container1">
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </section>
    </QueryClientProvider>
  </div>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

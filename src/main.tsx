import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppRoutes from "./routes/main-routes.tsx";
import { ThemeContextProvider } from "./contexts/theme-context.tsx";
import { AuthContextProvider } from "./contexts/auth-context.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./redux/store";
import Notification from "./components/common/notification";
import { useNotification } from "./hooks/use-notifications";

const queryClient = new QueryClient();

const App = () => {
  const {
    notificationOpen,
    notificationType,
    notificationMessage,
    handleNotificationClose,
  } = useNotification();

  return (
    <>
      <AppRoutes />
      <Notification
        open={notificationOpen}
        onClose={handleNotificationClose}
        severity={notificationType}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        message={notificationMessage}
      />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeContextProvider>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </ThemeContextProvider>
        </PersistGate>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);

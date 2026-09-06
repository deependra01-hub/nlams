import { AppRoutes } from "./routes/AppRoutes";
import { AppProviders } from "./app/providers/AppProviders";

export default function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}

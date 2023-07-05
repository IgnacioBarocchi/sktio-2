import ReactDOM from "react-dom/client";
import "./index.css";
import { ApplicationStateProvider } from "./containers/Context";
import App from "./components/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApplicationStateProvider>
    <App />
  </ApplicationStateProvider>
);

import { Toaster } from "react-hot-toast";
import AppRouter from "./AppRouter";

const App = () => {
  return (
    <>
      <AppRouter />
      {/* Toaster */}
      <Toaster position="top-right" />
    </>
  );
};

export default App;

import { Link } from "react-router-dom";

const LandingPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-4xl font-bold">Welcome to Finexa</h1>
    <p className="mt-4 text-lg text-gray-600">
      Manage your expenses easily and efficiently.
    </p>
    <div className="mt-6 flex gap-4">
      <Link to="/login" className="btn-primary">
        Login
      </Link>
      <Link to="/register" className="btn-secondary">
        Register
      </Link>
    </div>
  </div>
);

export default LandingPage;

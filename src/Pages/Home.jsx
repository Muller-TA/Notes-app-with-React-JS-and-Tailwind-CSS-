import { Link } from "react-router-dom";
import useAuthStore from "../assets/Store";

function Home() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome to the Notes App!
      </h1>
      {!user && <p>Please login or register to manage your notes.</p>}
      <Link
        to="/notes"
        className="text-blue-500 hover:underline bold mt-4 block"
      >
        View Notes
      </Link>
    </div>
  );
}

export default Home;

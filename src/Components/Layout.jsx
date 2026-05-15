import { Outlet, Link } from "react-router-dom";
import useAuthStore from "../assets/Store";

function Layout() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  console.log("Current user in Layout:", user); // للتأكد من البيانات

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="text-2xl font-bold text-gray-800 hover:text-blue-600"
            >
              📝 My Notes App
            </Link>
            {user && (
              <Link
                to="/notes"
                className="text-sm font-medium text-gray-600 hover:text-blue-600"
              >
                My Notes
              </Link>
            )}
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600">
                  Welcome,{" "}
                  <span className="font-semibold text-gray-800">
                    {user.username || user.email}
                  </span>
                </span>
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

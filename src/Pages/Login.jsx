import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../assets/Store";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const res = await fetch(`http://localhost:3001/users?email=${data.email}`);
    const users = await res.json();

    const user = users[0];

    if (user && user.password === data.password) {
      // نخزن البيانات كاملة
      login({
        id: user.id,
        username: user.username,
        email: user.email,
      });
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <input
            {...register("email", { required: "Email is Required" })}
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md py-3 px-4"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md py-3 px-4"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

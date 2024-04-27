import { useNavigate } from "react-router-dom";
import { useUser } from "../store/constants";
import { supabase } from "../supabase";

const Login = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  console.log(supabase);
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const password = data.get("password") as string;
    const email = data.get("email") as string;
    const { data: acc, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log(acc, error);
    if (error) {
      return;
    }
    login({
      email,
      password,
      id: acc?.user?.id,
    });
    navigate("/");
  };

  return (
    <div className="h-full flex items-center justify-center">
      {/* card */}
      <div className="p-24 flex-col flex gap-8 items-center bg-[rgba(51,65,85,0.4)] border-2 border-white rounded-2xl justify-start">
        <div className="text-4xl text-white font-normal mb-auto">Login</div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-8"
        >
          <input
            className="tw-input"
            name="email"
            placeholder="Email"
            type="email"
          />
          <input
            className="tw-input"
            name="password"
            placeholder="Password"
            type="password"
          />
          <button
            type="submit"
            className="px-8 py-2 w-full rounded-lg bg-primary"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

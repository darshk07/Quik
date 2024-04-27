import { useUser } from "../store/constants";

const Navbar = () => {
  const { logout } = useUser();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex gap-[40px] text-white w-full box-border justify-center">
      <div className="p-2">Practice Mode</div>
      <div className="bg-secondary p-2 rounded-3xl text-primary">Home</div>
      <button
        onClick={handleLogout}
        className="px-4 py-2 rounded-lg bg-primary text-black"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { useUser } from "../store/constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, isLoggedIn } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isLoggedIn, user);
    if (isLoggedIn === false) {
      navigate("/login");
    }
  }, [isLoggedIn, user, navigate]);

  return (
    <>
      <Navbar />
      <Hero />
    </>
  );
};

export default Home;

import BookingCards from "./BookingCards";
import CarCard from "./CarCard";
import MyBooking from "./MyBooking";
import Navbar from "./Navbar";
import ReserveInput from "./ReserveInput";
import Carlist from "./Carlist";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home(){
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);
    return (
        <>
            <Navbar />
            <Carlist />
        </>
    )
}
export default Home;
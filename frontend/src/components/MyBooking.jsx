import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import BookingCards from "./BookingCards";
import { useNavigate } from "react-router-dom";

function MyBooking() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("All");
    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);

    useEffect(() => {
        async function fetchCars() {
            setLoading(true);
            try {
                const response = await axios.get(`https://rentwheelzz-2.onrender.com/user/my-package?status=${status}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCars(response.data.data.reservationCars);
            } catch (error) {
                console.error("Error fetching cars", error);
            }
            setLoading(false);
        }

        fetchCars();
    }, [status]); // NEW: re-run when status changes

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen w-screen">
                <h1 className="font-semibold text-2xl">Loading cars...</h1>
            </div>
        );
    }

    return (
        <div className="h-screen w-screen">
            <Navbar />
            <div className="flex text-black items-center justify-evenly bg-gray-200 p-3">
                {["All", "Confirmed", "Completed", "Cancelled"].map((item) => (
                    <h1
                        key={item}
                        className={`cursor-pointer px-5 ${
                            status === item ? "border-b-2 border-black font-bold" : "hover:border-b-[1px] hover:border-black"
                        }`}
                        onClick={() => setStatus(item)}
                    >
                        {item}
                    </h1>
                ))}
            </div>
            <div className="mt-5 grid justify-center gap-5">
                {cars.map((car) => (
                    <BookingCards
                        key={car.bookingId}
                        imgLink={car.thumbnail}
                        carModel={car.carModel}
                        bookingID={car.bookingId}
                        totalPrice={car.total}
                    />
                ))}
            </div>
        </div>
    );
}

export default MyBooking;

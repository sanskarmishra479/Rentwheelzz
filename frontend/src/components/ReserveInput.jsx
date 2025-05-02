import { Link, useLocation,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


function ReserveInput() {

  const { state } = useLocation();
  const car = state?.car;
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  async function handleReserve() {
    try {
      const response = await axios.post("https://rentwheelzz-2.onrender.com/user/reserve", {
        bookingId: `BOOK-${Date.now()}`,
        userEmail: "sanskarmishra546@gmail.com",
        carID: car.carID,
        reservationDate: new Date(),
        pickupDate: startDate,
        returnDate: endDate,
        numOfTravellers: 4,
        status: car.carAvailability,
        car: car.carModel,
        img: car.ImgLink,
        total: calculateTotal(car.pricePerHour, startDate, endDate),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
      navigate("/my-bookings");
    } catch (err) {
      alert(`${err}Failed to reserve car`);
    }
  }

  function calculateTotal(pricePerHour, start, end) {
    const hours = Math.abs(new Date(end) - new Date(start)) / 36e5;
    return Math.ceil(hours) * pricePerHour;
  }

  return (
    <div className="flex justify-center h-screen w-screen">
      <div className="h-90 w-70 bg-white shadow-2xl grid items-center justify-center p-5 rounded-md mt-30">
        <h1 className="p-3 font-semibold">Reservation Detail</h1>
        <label htmlFor="starting-date">Starting Date</label>
        <input name="starting-date" placeholder="From.." className="border-[1px] border-gray-600 rounded-md p-2" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label htmlFor="ending-date">Ending Date</label>
        <input name="ending-date" placeholder="To.." className="border-[1px] border-gray-600 rounded-md p-2" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <div className="flex items-center justify-evenly gap-1">
          <button className="bg-gray-800 text-white rounded-md p-2" onClick={handleReserve}>RESERVE</button>
          <Link to={"/"} className="bg-gray-600 text-white rounded-md p-2">CANCEL</Link>
        </div>
      </div>
    </div>
  );
}
export default ReserveInput;

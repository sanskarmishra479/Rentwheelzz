import BookingCards from "./components/BookingCards";
import Home from "./components/Home"
import Login from "./components/Login"
import MyBooking from "./components/MyBooking";
import Register from "./components/Register"
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import ReserveInput from "./components/ReserveInput";

function App() {
  
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reserve" element={<ReserveInput />} />
          <Route path="/my-bookings" element={<MyBooking />} />
          <Route path="/conformedBooking" element={<Home />} />
          <Route path="/completedBooking" element={<Home />} />
          <Route path="/cancelledBooking" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

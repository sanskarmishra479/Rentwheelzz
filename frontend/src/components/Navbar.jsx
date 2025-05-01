import { Link } from "react-router-dom";

function Navbar(){
    return(
            <div className="h-15 w-full bg-black flex items-center justify-between pl-20 pr-20 text-white text-2xl font-bold">
                <Link to={"/"}>RentWheelz</Link>
                <Link to={"/my-bookings"}><i className="text-white text-xl ri-contacts-book-fill"></i></Link>
            </div>
    )
}
export default Navbar;
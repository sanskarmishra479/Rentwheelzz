import { Link } from "react-router-dom";

function Navbar(){
    return(
            <div className="h-15 w-full bg-black flex items-center justify-between md:pl-20 pl-7 md:pr-20 pr-7 text-white md:text-2xl font-bold">
                <Link to={"/"}>RentWheelz</Link>
                <Link to={"/my-bookings"}><i className="text-white md:text-xl ri-contacts-book-fill"></i></Link>
            </div>
    )
}
export default Navbar;
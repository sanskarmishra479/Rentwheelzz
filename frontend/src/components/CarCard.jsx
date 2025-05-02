import {Link} from "react-router-dom";
function CarCard({
    ImgLink,
    carModel,
    pricePerHour,
    carAvailability,
    carID
}){
    return(
        <div className="h-60 w-60 md:h-80 md:w-80 bg-white shadow-md rounded-md overflow-hidden">
            <div className="w-full h-2/3 relative"> 
                <img src={ImgLink} alt="carImg" className="object-cover w-full h-full" />
                <div className={`p-2 rounded-md absolute -top-1 -left-1 text-xs font-semibold ${
                carAvailability === "AVAILABLE" ? "bg-black text-white" : "bg-gray-600 text-white"}`}>
                        <p className="text-sm">{carAvailability}</p>
                </div>
            </div>
            <div className="p-2 h-1/3">
                    <h1 className="font-bold text-lg sm:text-md">{carModel}</h1>
                    <p className="text-[11px] md:text-sm text-gray-700">₹{pricePerHour}/hour</p>
                    <div className="mt-0 md:mt-3 ">
                    {carAvailability === "AVAILABLE" ? (
                    <Link to="/reserve" className="font-semibold text-[13px] md:text-[16px] hover:text-gray-600 transition-all duration-300"
                    state={{ car: { carModel, pricePerHour, carAvailability, carID, ImgLink} }}
                    >
                        RESERVE
                    </Link>
                    ) : (
                    <span className="text-gray-400 font-semibold text-[13px] md:text-[16px] cursor-not-allowed">UNAVAILABLE</span>
                    )}

                    </div>
            </div>
        </div>

    )
}
export default CarCard;

import { Link } from "react-router-dom";

function BookingCards({
    imgLink,
    carModel,
    bookingID,
    totalPrice,
}){
    return(
        <div className="h-25 md:h-60 md:w-280 flex shadow-sm border-b p-2">
            <div className="h-full md:w-1/4  flex items-center justify-center">
                <img className="h-full w-full object-cover " src={imgLink} alt="carImg" />
            </div>
            <div className="h-full w-3/4 flex items-center justify-end">
                <div className="md:p-5 text-right h-full">
                    <h1 className="font-bold text-md md:text-4xl">{carModel}</h1>
                    <p className="text-[6px] md:text-[15px]">Booking ID: {bookingID}</p>
                    <p className="text-[6px] md:text-[15px]">Total Price: ₹{totalPrice}</p>
                    <button className="md:mt-18 mt-4 bg-gray-800 hover:bg-gray-600 text-white text-[10px] md:text-[17px] md:px-5 px-1 md:py-2 py-1 rounded-md">Cancle</button>
                </div>
            </div>
        </div>
    )
}
export default BookingCards;
import { Link } from "react-router-dom";

function BookingCards({
    imgLink,
    carModel,
    bookingID,
    totalPrice,
}){
    return(
        <div className="h-60 w-280 flex shadow-sm border-b p-2">
            <div className="h-full w-1/4  flex items-center justify-center">
                <img className="h-50 w-70 object-cover " src={imgLink} alt="carImg" />
            </div>
            <div className="h-full w-3/4 flex items-center justify-end">
                <div className="p-5 text-right h-full">
                    <h1 className="font-bold text-4xl">{carModel}</h1>
                    <p>Booking ID: {bookingID}</p>
                    <p>Total Price: ₹{totalPrice}</p>
                    <button className="mt-18 bg-gray-800 hover:bg-gray-600 text-white px-5 py-2 rounded-md">Cancle</button>
                </div>
            </div>
        </div>
    )
}
export default BookingCards;
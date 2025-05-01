import { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "./CarCard"; 

function CarList() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await axios.get("http://localhost:3000/user/getPackages", {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
                setCars(response.data.data.cars);
                console.log(response.data.data.cars)
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }
    

        fetchCars();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center h-screen w-screen">
           <h1 className="font-semibold text-2xl"> Loading cars...</h1>
            </div>;
    }

    return (
        <div className="ml-20 pt-6 flex flex-wrap gap-6">
            {cars.map((car) => (
                <CarCard
                    key={car.id}
                    ImgLink={car.thumbnail}
                    carModel={`${car.brand} ${car.model}`}
                    pricePerHour={car.pricePerHour}
                    carAvailability={car.status}
                    carID={car.id}
                />
            ))}
        </div>
    );
}

export default CarList;

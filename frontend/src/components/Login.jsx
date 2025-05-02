import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch("https://rentwheelzz-2.onrender.com/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userEmail: formData.email,
                    userPassword: formData.password
                })
            });

            const data = await response.json();

            if (response.ok && data.token) {
                setError("");
                localStorage.setItem("token", data.token);
                navigate("/");
            } else if (data.error) {
                setError(data.error.issues?.[0]?.message || "Login failed");
            } else {
                setError(data.message || "Login failed");
            }
        } catch (err) {
            setError(`${err}Something went wrong. Please try again.`);
        }
    };

    return (
        <div className="h-screen p-5 bg-white sm:flex sm:items-center sm:justify-evenly sm:gap-3">
            <div className="h-1/2 sm:h-full sm:flex sm:items-center sm:w-1/2">
                <img className="rounded-md" src="https://images.hdqwalls.com/wallpapers/bmw-m2-lci-8q.jpg" alt="f1 photo" />
            </div>
            <div className="h-1/2 grid items-center justify-center gap-2">
                <h1 className="text-3xl text-black font-bold ml-12">GET IN</h1>
                <p className="text-gray-600 text-[13px]">If you did not have account <Link className="cursor-pointer text-blue-500 underline" to="/register">register</Link></p>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <input className="border-[1px] border-black p-2 rounded-md text-black" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                <input className="border-[1px] border-black p-2 rounded-md text-black" type="text" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                <button className="bg-black rounded-md p-2 text-white cursor-pointer hover:bg-gray-800" onClick={handleLogin}>LOGIN</button>
            </div>
        </div>
    );
}

export default Login;

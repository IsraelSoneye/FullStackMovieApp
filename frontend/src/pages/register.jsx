import { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/register", { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            if (response.data.success) {
                // Redirect to home page on successful registration
                response.data.user && localStorage.setItem("user", JSON.stringify(response.data.user));
                alert("Registration successful!");
                navigate("/");
            } else {
                alert("Registration failed: " + response.data.message);
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Email already exist");
        }
    };

  return (
    <div className="max-w-xl p-4 align-items-center justify-center mx-auto my-24">
            <h2 className="text-center text-pink-700">Register</h2>
            <form onSubmit={handleRegister}>
                <div className="mx-auto p-4">
                    <label className="block pb-2">Email:</label>
                    <input className="block p-2 pb-2 border w-md border-gray-300 rounded"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className="block pb-2">Password:</label>
                    <input className="block p-2 border w-md border-gray-300 rounded"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="block mx-auto p-2 rounded my-2">Create account</button>
                </div>
            </form>
            <p className="text-center">Already had an account? <a href="/login">Login here</a>.</p>
    </div>
  )
}

export default Register
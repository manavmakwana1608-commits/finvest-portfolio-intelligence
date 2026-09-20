import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginPage() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        Email: "",
        Password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
               `${import.meta.env.VITE_API_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Login failed"
                );
            }

            // Store authentication token
            localStorage.setItem(
                "finvestToken",
                data.token
            );

            // Store logged-in user
            localStorage.setItem(
                "finvestUser",
                JSON.stringify(data.user)
            );

            // Go directly to the protected dashboard
            navigate("/dashboard");

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-container">

                <div className="login-header">

                    <h1>FinVest</h1>

                    <p>
                        Sign in to your investment dashboard
                    </p>

                </div>

                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label htmlFor="Email">
                            Email
                        </label>

                        <input
                            id="Email"
                            name="Email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.Email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label htmlFor="Password">
                            Password
                        </label>

                        <input
                            id="Password"
                            name="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.Password}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Sign In"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default LoginPage;
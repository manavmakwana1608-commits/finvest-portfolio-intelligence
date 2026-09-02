import { useState } from "react";
import { createUser } from "../api/userApi";

function AddUser({ onClose, onSuccess }) {

    const [user, setUser] = useState({
        FullName: "",
        Email: "",
        Password: "",
        Phone: "",
        City: "",
        State: "",
        Status: "Active"
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            setLoading(true);

            await createUser(user);

            alert("User created successfully.");

            if (onSuccess) {
                await onSuccess();
            }

            if (onClose) {
                onClose();
            }

        } catch (err) {

            console.error(
                "Create User Error:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Unable to create user."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="add-user">

            <div className="add-user-header">

                <h2>
                    Add User
                </h2>

                <p>
                    Create a new FinVest user
                </p>

            </div>


            {error && (
                <div className="form-error">
                    {error}
                </div>
            )}


            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="FullName"
                        placeholder="Enter full name"
                        value={user.FullName}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        name="Email"
                        placeholder="Enter email"
                        value={user.Email}
                        onChange={handleChange}
                        required
                    />

                </div>


                <div className="form-group">

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        name="Password"
                        placeholder="Enter password"
                        value={user.Password}
                        onChange={handleChange}
                        required
                        minLength={6}
                    />

                </div>


                <div className="form-group">

                    <label>
                        Phone
                    </label>

                    <input
                        type="text"
                        name="Phone"
                        placeholder="Enter phone number"
                        value={user.Phone}
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>
                        City
                    </label>

                    <input
                        type="text"
                        name="City"
                        placeholder="Enter city"
                        value={user.City}
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>
                        State
                    </label>

                    <input
                        type="text"
                        name="State"
                        placeholder="Enter state"
                        value={user.State}
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>
                        Status
                    </label>

                    <select
                        name="Status"
                        value={user.Status}
                        onChange={handleChange}
                    >

                        <option value="Active">
                            Active
                        </option>

                        <option value="Inactive">
                            Inactive
                        </option>

                    </select>

                </div>


                <div className="form-actions">

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Creating..."
                            : "Create User"}

                    </button>

                </div>

            </form>

        </div>

    );

}

export default AddUser;
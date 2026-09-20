import { useEffect, useState } from "react";
import axios from "axios";

import "./EditUser.css";


const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});


function EditUser({ user: selectedUser, onClose, onSuccess }) {

    const [user, setUser] = useState({
        UserID: "",
        FullName: "",
        Email: "",
        Phone: "",
        City: "",
        State: "",
        Status: "Active",
    });

    const [loading, setLoading] = useState(false);


    // =================================
    // LOAD SELECTED USER
    // =================================

    useEffect(() => {

        if (selectedUser) {

            setUser({
                UserID: selectedUser.UserID ?? "",
                FullName: selectedUser.FullName ?? "",
                Email: selectedUser.Email ?? "",
                Phone: selectedUser.Phone ?? "",
                City: selectedUser.City ?? "",
                State: selectedUser.State ?? "",
                Status: selectedUser.Status ?? "Active",
            });

        }

    }, [selectedUser]);


    // =================================
    // HANDLE INPUT
    // =================================

    const handleChange = (e) => {

        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });

    };


    // =================================
    // UPDATE USER
    // =================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await API.put(
                `/users/${user.UserID}`,
                {
                    FullName: user.FullName,
                    Email: user.Email,
                    Phone: user.Phone,
                    City: user.City,
                    State: user.State,
                    Status: user.Status,
                }
            );

            alert("User updated successfully.");

            if (onSuccess) {
                await onSuccess();
            }

            if (onClose) {
                onClose();
            }

        } catch (err) {

            console.error(
                "Update User Error:",
                err
            );

            alert(
                err.response?.data?.message ||
                "Unable to update user."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="edit-user">

            {/* HEADER */}

            <div className="edit-user-header">

                <div>

                    <h2>
                        Edit User
                    </h2>

                    <p>
                        Update registered user information
                    </p>

                </div>

            </div>


            {/* FORM */}

            <form
                className="edit-user-form"
                onSubmit={handleSubmit}
            >

                {/* USER ID */}

                <div className="form-group">

                    <label>
                        User ID
                    </label>

                    <input
                        type="text"
                        value={user.UserID}
                        disabled
                    />

                </div>


                {/* FULL NAME */}

                <div className="form-group">

                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="FullName"
                        placeholder="Full name"
                        value={user.FullName}
                        onChange={handleChange}
                        required
                    />

                </div>


                {/* EMAIL */}

                <div className="form-group">

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        name="Email"
                        placeholder="Email address"
                        value={user.Email}
                        onChange={handleChange}
                        required
                    />

                </div>


                {/* PHONE */}

                <div className="form-group">

                    <label>
                        Phone
                    </label>

                    <input
                        type="text"
                        name="Phone"
                        placeholder="Phone number"
                        value={user.Phone}
                        onChange={handleChange}
                    />

                </div>


                {/* CITY */}

                <div className="form-group">

                    <label>
                        City
                    </label>

                    <input
                        type="text"
                        name="City"
                        placeholder="City"
                        value={user.City}
                        onChange={handleChange}
                    />

                </div>


                {/* STATE */}

                <div className="form-group">

                    <label>
                        State
                    </label>

                    <input
                        type="text"
                        name="State"
                        placeholder="State"
                        value={user.State}
                        onChange={handleChange}
                    />

                </div>


                {/* STATUS */}

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


                {/* ACTIONS */}

                <div className="edit-user-actions">

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onClose}
                    >
                        Cancel
                    </button>


                    <button
                        type="submit"
                        className="update-user-btn"
                        disabled={loading}
                    >

                        {loading
                            ? "Updating..."
                            : "Update User"}

                    </button>

                </div>

            </form>

        </div>

    );

}


export default EditUser;
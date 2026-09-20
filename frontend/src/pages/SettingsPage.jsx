import { useState } from "react";
import {
    FaUser,
    FaEnvelope,
    FaShieldAlt,
    FaBell,
    FaSave,
} from "react-icons/fa";

import "./SettingsPage.css";


function SettingsPage() {

    const storedUser =
        localStorage.getItem("finvestUser");

    const user = storedUser
        ? JSON.parse(storedUser)
        : null;


    const [name, setName] = useState(
        user?.FullName || "Manav"
    );

    const [email, setEmail] = useState(
        user?.Email || "demo@finvest.com"
    );

    const [notifications, setNotifications] =
        useState(true);

    const [saved, setSaved] = useState(false);


    const handleSave = () => {

        const updatedUser = {
            ...user,
            FullName: name,
            Email: email,
        };

        localStorage.setItem(
            "finvestUser",
            JSON.stringify(updatedUser)
        );

        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2500);

    };


    return (

        <div className="settings-page">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="settings-header">

                <div>

                    <h1>
                        Settings
                    </h1>

                    <p>
                        Manage your account and application preferences
                    </p>

                </div>

            </div>


            {/* =================================================
                PROFILE
            ================================================= */}

            <div className="settings-card">

                <div className="settings-card-header">

                    <div className="settings-section-icon">
                        <FaUser />
                    </div>

                    <div>

                        <h2>
                            Profile Settings
                        </h2>

                        <p>
                            Update your personal account information
                        </p>

                    </div>

                </div>


                <div className="settings-form">


                    {/* NAME */}

                    <div className="settings-field">

                        <label>
                            Full Name
                        </label>

                        <div className="settings-input">

                            <FaUser />

                            <input
                                type="text"
                                value={name}
                                onChange={(e) =>
                                    setName(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter your name"
                            />

                        </div>

                    </div>


                    {/* EMAIL */}

                    <div className="settings-field">

                        <label>
                            Email Address
                        </label>

                        <div className="settings-input">

                            <FaEnvelope />

                            <input
                                type="email"
                                value={email}
                                onChange={(e) =>
                                    setEmail(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter your email"
                            />

                        </div>

                    </div>


                </div>


                {/* SAVE */}

                <div className="settings-actions">

                    {saved && (

                        <span className="save-message">
                            Changes saved
                        </span>

                    )}

                    <button
                        className="settings-save-btn"
                        onClick={handleSave}
                    >

                        <FaSave />

                        Save Changes

                    </button>

                </div>

            </div>


            {/* =================================================
                PREFERENCES
            ================================================= */}

            <div className="settings-card">

                <div className="settings-card-header">

                    <div className="settings-section-icon">
                        <FaBell />
                    </div>

                    <div>

                        <h2>
                            Notifications
                        </h2>

                        <p>
                            Control how FinVest keeps you informed
                        </p>

                    </div>

                </div>


                <div className="settings-option">

                    <div>

                        <strong>
                            Portfolio Updates
                        </strong>

                        <span>
                            Receive notifications about important
                            portfolio activity
                        </span>

                    </div>


                    <button
                        type="button"
                        className={
                            notifications
                                ? "toggle active"
                                : "toggle"
                        }
                        onClick={() =>
                            setNotifications(
                                !notifications
                            )
                        }
                        aria-label="Toggle notifications"
                    >

                        <span />

                    </button>

                </div>

            </div>


            {/* =================================================
                SECURITY
            ================================================= */}

            <div className="settings-card">

                <div className="settings-card-header">

                    <div className="settings-section-icon">
                        <FaShieldAlt />
                    </div>

                    <div>

                        <h2>
                            Security
                        </h2>

                        <p>
                            Account security information
                        </p>

                    </div>

                </div>


                <div className="security-row">

                    <div>

                        <strong>
                            Authentication
                        </strong>

                        <span>
                            Your account is protected by
                            token-based authentication.
                        </span>

                    </div>


                    <span className="security-status">
                        Protected
                    </span>

                </div>

            </div>


        </div>

    );

}


export default SettingsPage;
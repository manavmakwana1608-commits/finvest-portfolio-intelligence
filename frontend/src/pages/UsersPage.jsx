import { useEffect, useMemo, useState } from "react";

import {
    FaSearch,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import {
    getUsers,
    deleteUser
} from "../api/userApi";

import AddUser from "../components/AddUser";
import EditUser from "../components/EditUser";

import "./UsersPage.css";


function UsersPage() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [showAddUser, setShowAddUser] =
        useState(false);

    const [showEditUser, setShowEditUser] =
        useState(false);

    const [selectedUser, setSelectedUser] =
        useState(null);

    const [search, setSearch] =
        useState("");

    const [statusFilter, setStatusFilter] =
        useState("All");


    // =================================
    // LOAD USERS
    // =================================

    const loadUsers = async () => {

        try {

            setLoading(true);

            setError("");

            const data = await getUsers();

            console.log("Users:", data);

            setUsers(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (err) {

            console.error(
                "Users API Error:",
                err
            );

            setError(
                "Unable to load users."
            );

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        loadUsers();

    }, []);


    // =================================
    // FILTER USERS
    // =================================

    const filteredUsers = useMemo(() => {

        let result = [...users];


        // SEARCH

        if (search.trim()) {

            const searchValue =
                search.toLowerCase().trim();

            result = result.filter((user) => {

                const name =
                    String(
                        user.FullName || ""
                    ).toLowerCase();

                const email =
                    String(
                        user.Email || ""
                    ).toLowerCase();

                const userId =
                    String(
                        user.UserID || ""
                    );

                return (
                    name.includes(searchValue) ||
                    email.includes(searchValue) ||
                    userId.includes(searchValue)
                );

            });

        }


        // STATUS FILTER

        if (statusFilter !== "All") {

            result = result.filter(
                (user) =>
                    String(
                        user.Status || ""
                    ).toLowerCase() ===
                    statusFilter.toLowerCase()
            );

        }


        return result;

    }, [
        users,
        search,
        statusFilter
    ]);


    // =================================
    // OPEN EDIT USER
    // =================================

    const handleEditUser = (user) => {

        setSelectedUser(user);

        setShowEditUser(true);

    };


    // =================================
    // CLOSE EDIT USER
    // =================================

    const handleCloseEdit = () => {

        setShowEditUser(false);

        setSelectedUser(null);

    };


    // =================================
    // DELETE USER
    // =================================

    const handleDeleteUser = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmed) {
            return;
        }


        try {

            await deleteUser(id);

            alert(
                "User deleted successfully."
            );

            await loadUsers();

        } catch (err) {

            console.error(
                "Delete User Error:",
                err
            );

            alert(
                err.response?.data?.message ||
                "Unable to delete user."
            );

        }

    };


    return (

        <div className="users-page">


            {/* =================================
                HEADER
            ================================= */}

            <div className="users-header">

                <button
                    className="add-user-button"
                    onClick={() =>
                        setShowAddUser(true)
                    }
                >
                    + Add User
                </button>

            </div>


            {/* =================================
                USERS CARD
            ================================= */}

            <div className="users-card">

                <div className="users-card-header">

                    <div>

                        <h2>
                            User Management
                        </h2>

                        <span>
                            Showing {filteredUsers.length} of{" "}
                            {users.length} users
                        </span>

                    </div>

                </div>


                {/* =================================
                    TOOLBAR
                ================================= */}

                <div className="users-toolbar">

                    <div className="users-search">

                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Search name, email or user ID..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    <select
                        className="users-filter"
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="All">
                            All Status
                        </option>

                        <option value="Active">
                            Active
                        </option>

                        <option value="Inactive">
                            Inactive
                        </option>

                    </select>

                </div>


                {/* =================================
                    LOADING
                ================================= */}

                {loading && (

                    <div className="users-message">

                        Loading users...

                    </div>

                )}


                {/* =================================
                    ERROR
                ================================= */}

                {!loading &&
                    error && (

                        <div className="users-message error">

                            {error}

                        </div>

                    )}


                {/* =================================
                    EMPTY
                ================================= */}

                {!loading &&
                    !error &&
                    filteredUsers.length === 0 && (

                        <div className="users-message">

                            No matching users found.

                        </div>

                    )}


                {/* =================================
                    TABLE
                ================================= */}

                {!loading &&
                    !error &&
                    filteredUsers.length > 0 && (

                        <div className="users-table-wrapper">

                            <table className="users-table">

                                <thead>

                                    <tr>

                                        <th>
                                            User ID
                                        </th>

                                        <th>
                                            Name
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Phone
                                        </th>

                                        <th>
                                            Location
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredUsers.map(
                                        (user) => {

                                            const isActive =
                                                String(
                                                    user.Status || ""
                                                ).toLowerCase() ===
                                                "active";


                                            return (

                                                <tr
                                                    key={
                                                        user.UserID
                                                    }
                                                >

                                                    <td>
                                                        #
                                                        {user.UserID}
                                                    </td>


                                                    <td
                                                        className="user-name"
                                                    >
                                                        {
                                                            user.FullName ||
                                                            "-"
                                                        }
                                                    </td>


                                                    <td>
                                                        {
                                                            user.Email ||
                                                            "-"
                                                        }
                                                    </td>


                                                    <td>
                                                        {
                                                            user.Phone ||
                                                            "-"
                                                        }
                                                    </td>


                                                    <td>

                                                        {
                                                            user.City ||
                                                            user.State

                                                                ? `${user.City || ""}${
                                                                    user.City &&
                                                                    user.State
                                                                        ? ", "
                                                                        : ""
                                                                }${
                                                                    user.State ||
                                                                    ""
                                                                }`

                                                                : "-"
                                                        }

                                                    </td>


                                                    <td>

                                                        <span
                                                            className={
                                                                isActive
                                                                    ? "user-status active"
                                                                    : "user-status inactive"
                                                            }
                                                        >

                                                            {
                                                                user.Status ||
                                                                "-"
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        <div className="user-actions">


                                                            {/* EDIT */}

                                                            <button
                                                                className="edit-user-btn"
                                                                title="Edit User"
                                                                onClick={() =>
                                                                    handleEditUser(
                                                                        user
                                                                    )
                                                                }
                                                            >

                                                                <FaEdit />

                                                            </button>


                                                            {/* DELETE */}

                                                            <button
                                                                className="delete-user-btn"
                                                                title="Delete User"
                                                                onClick={() =>
                                                                    handleDeleteUser(
                                                                        user.UserID
                                                                    )
                                                                }
                                                            >

                                                                <FaTrash />

                                                            </button>

                                                        </div>

                                                    </td>

                                                </tr>

                                            );

                                        }
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

            </div>


            {/* =================================
                ADD USER MODAL
            ================================= */}

            {showAddUser && (

                <div
                    className="modal"
                    onClick={() =>
                        setShowAddUser(false)
                    }
                >

                    <div
                        className="modal-content"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="close-btn"
                            onClick={() =>
                                setShowAddUser(false)
                            }
                        >
                            ×
                        </button>


                        <AddUser
                            onSuccess={loadUsers}
                            onClose={() =>
                                setShowAddUser(false)
                            }
                        />

                    </div>

                </div>

            )}


            {/* =================================
                EDIT USER MODAL
            ================================= */}

            {showEditUser &&
                selectedUser && (

                    <div
                        className="modal"
                        onClick={handleCloseEdit}
                    >

                        <div
                            className="modal-content"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            <button
                                className="close-btn"
                                onClick={handleCloseEdit}
                            >
                                ×
                            </button>


                            <EditUser
                                user={selectedUser}
                                onSuccess={loadUsers}
                                onClose={
                                    handleCloseEdit
                                }
                            />

                        </div>

                    </div>

                )}

        </div>

    );

}


export default UsersPage;
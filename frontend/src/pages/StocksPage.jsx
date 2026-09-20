import { useState } from "react";

import Stocks from "../components/Stocks";
import AddStock from "../components/AddStock";
import EditStock from "../components/EditStock";

import "./StocksPage.css";

function StocksPage() {

    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedStock, setSelectedStock] = useState(null);


    const handleEdit = (stock) => {
        setSelectedStock(stock);
        setShowEdit(true);
    };


    const closeEdit = () => {
        setShowEdit(false);
        setSelectedStock(null);
    };


    return (

        <div className="-page">

            {/* PAGE HEADER */}

            <div className="-header">

                <div></div>

                <button
                    className="add-stock-button"
                    onClick={() => setShowAdd(true)}
                >
                    + Add Stock
                </button>

            </div>


            {/* STOCKS TABLE */}

            <Stocks
                onEdit={handleEdit}
            />


            {/* ADD STOCK MODAL */}

            {showAdd && (

                <div
                    className="modal"
                    onClick={() => setShowAdd(false)}
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
                                setShowAdd(false)
                            }
                        >
                            ×
                        </button>

                        <AddStock />

                    </div>

                </div>

            )}


            {/* EDIT STOCK MODAL */}

            {showEdit && (

                <div
                    className="modal"
                    onClick={closeEdit}
                >

                    <div
                        className="modal-content"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="close-btn"
                            onClick={closeEdit}
                        >
                            ×
                        </button>

                        <EditStock
                            stock={selectedStock}
                            onClose={closeEdit}
                        />

                    </div>

                </div>

            )}

        </div>

    );

}

export default StocksPage;
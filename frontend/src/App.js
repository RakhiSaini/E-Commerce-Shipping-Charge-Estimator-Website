import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [sellerId, setSellerId] = useState('');
    const [productId, setProductId] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [deliverySpeed, setDeliverySpeed] = useState('standard');
    const [responseData, setResponseData] = useState(null);

    const handleNearestWarehouse = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/warehouse/nearest?sellerId=${sellerId}&productId=${productId}`);
            setResponseData(response.data);
        } catch (error) {
            console.error('Error fetching nearest warehouse:', error);
        }
    };

    const handleShippingCharge = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/v1/shipping-charge/calculate`, {
                sellerId,
                customerId,
                deliverySpeed,
            });
            setResponseData(response.data);
        } catch (error) {
            console.error('Error calculating shipping charge:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>E-Commerce Shipping Estimator</h1>

            {/* Seller & Product Inputs */}
            <div>
                <label>Seller ID:</label>
                <input value={sellerId} onChange={(e) => setSellerId(e.target.value)} />
            </div>
            <div>
                <label>Product ID:</label>
                <input value={productId} onChange={(e) => setProductId(e.target.value)} />
            </div>
            <div>
                <label>Customer ID:</label>
                <input value={customerId} onChange={(e) => setCustomerId(e.target.value)} />
            </div>
            <div>
                <label>Delivery Speed:</label>
                <select value={deliverySpeed} onChange={(e) => setDeliverySpeed(e.target.value)}>
                    <option value="standard">Standard</option>
                    <option value="express">Express</option>
                </select>
            </div>

            {/* Buttons for API Calls */}
            <div>
                <button onClick={handleNearestWarehouse}>Get Nearest Warehouse</button>
                <button onClick={handleShippingCharge}>Calculate Shipping Charge</button>
            </div>

            {/* Display API Response */}
            {responseData && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default App;

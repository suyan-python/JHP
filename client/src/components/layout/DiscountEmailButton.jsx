import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DiscountEmailButton = ({ selectedOrder }) =>
{
    const [isSent, setIsSent] = useState(false);

    useEffect(() =>
    {
        // Check if the current order's email is already in localStorage
        const sentEmails = JSON.parse(localStorage.getItem("sentDiscountEmails")) || [];
        if (selectedOrder?.email && sentEmails.includes(selectedOrder.email))
        {
            setIsSent(true);
        }
    }, [selectedOrder]);

    const handleSendDiscount = async () =>
    {
        try
        {
            const res = await axios.post(
                "https://jhp-backend.onrender.com/api/emails",
                { email: selectedOrder.email }
            );

            if (res.status === 200)
            {
                toast.success(`Discount code sent to ${selectedOrder.email}`);
                setIsSent(true);

                // Save to localStorage
                const sentEmails = JSON.parse(localStorage.getItem("sentDiscountEmails")) || [];
                if (!sentEmails.includes(selectedOrder.email))
                {
                    sentEmails.push(selectedOrder.email);
                    localStorage.setItem("sentDiscountEmails", JSON.stringify(sentEmails));
                }
            } else
            {
                toast.error("Failed to send discount email.");
            }
        } catch (err)
        {
            console.error("Error submitting email:", err);
            toast.error("Server error: could not send discount email.");
        }
    };

    return (
        <>
            {selectedOrder?.email && !isSent ? (
                <button
                    onClick={handleSendDiscount}
                    className="flex items-center justify-center gap-2 px-5 py-2 rounded-md border border-green-600 text-green-700 hover:bg-green-100 text-sm font-semibold transition-all"
                >
                    Send Discount Coupon
                </button>
            ) : (
                <p className="flex items-center justify-center gap-2 px-5 py-2 rounded-md border border-blue-600 text-blue-700 hover:bg-blue-100 text-sm font-semibold transition-all">Discount coupon already sent!</p>
            )}
        </>
    );
};

export default DiscountEmailButton;

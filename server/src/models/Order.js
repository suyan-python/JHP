import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    deliveryTime: { type: String },
    subscribe: { type: Boolean, default: false },
    paymentMethod: { type: String, required: true },
    total: { type: Number, required: true },
    discountedTotal: { type: Number },
    items: [
      {
        itemId: Number,
        quantity: Number,
        selectedSize: Number,
      },
    ],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

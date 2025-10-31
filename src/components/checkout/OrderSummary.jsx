import React from "react";
import { formatPriceCalculation } from "../../utils/formatPrice";

const OrderSummary = ({ totalPrice, cart, address, paymentMethod }) => {
  const fallbackImage =
    "https://dummyimage.com/150x150/cccccc/000000.png&text=600+x+400";

  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="flex flex-wrap">
        {/* Left Section: Billing, Payment, Order Items */}
        <div className="w-full lg:w-8/12 pr-4">
          <div className="space-y-4">
            {/* Billing Address */}
            <div className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Billing Address</h2>
              <p>
                <strong>Building Name: </strong>
                {address?.buildingName}
              </p>
              <p>
                <strong>City: </strong>
                {address?.city}
              </p>
              <p>
                <strong>Street: </strong>
                {address?.street}
              </p>
              <p>
                <strong>State: </strong>
                {address?.state}
              </p>
              <p>
                <strong>Pincode: </strong>
                {address?.pincode}
              </p>
              <p>
                <strong>Country: </strong>
                {address?.country}
              </p>
            </div>

            {/* Payment Method */}
            <div className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {paymentMethod}
              </p>
            </div>

            {/* Order Items */}
            <div className="pb-4 border rounded-lg shadow-sm mb-6">
              <h2 className="text-2xl font-semibold mb-2">Order Items</h2>
              <div className="space-y-2">
                {cart?.map((item) => (
                  <div
                    key={item?.productId}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={`${import.meta.env.VITE_BACK_END_URL}/images/${
                        item?.image
                      }`}
                      alt="Product"
                      className="w-12 h-12 rounded object-cover border"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = fallbackImage;
                      }}
                    />
                    <div className="text-gray-700">
                      <p>{item?.productName}</p>
                      <p className="text-sm text-gray-500">
                        {item?.quantity} x ${item?.specialPrice} = $
                        {formatPriceCalculation(
                          item?.quantity,
                          item?.specialPrice
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section: Summary */}
        <div className="w-full lg:w-4/12 mt-4 lg:mt-0">
          <div className="border rounded-lg shadow-sm p-4 space-y-4">
            <h2 className="text-2xl font-semibold mb-2">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Products</span>
                <span>${formatPriceCalculation(totalPrice, 1)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (0%)</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>SubTotal</span>
                <span>${formatPriceCalculation(totalPrice, 1)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

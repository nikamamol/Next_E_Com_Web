import { useCartContext } from '@/ctx/cartContext';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Image from 'next/image';
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';

function Cart() {
  const { cartItems,removeCartItem}=useCartContext()


 const stripePromise = loadStripe(
   "pk_test_51O0gm1SBbzzARHI4jhjjgOo2aZ4uwINkxOnoaMpn6VWhbKM4gBB2B6AEy1wRJgDcLGuWMdNvLT1BVilPi6bwIKeJ00bTi2S4WB"
 );
 const handleCheckout = async() => {

     const lineItems = cartItems.map((item) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name
          },
          unit_amount: item.price * 100 // because stripe interprets price in cents
        },
        quantity: item.quantity
      }
     })

      const { data } = await axios.post(
        "http://localhost:3000/api/checkout",
        { lineItems }
      );

      const stripe = await stripePromise;

      await stripe.redirectToCheckout({ sessionId: data.id });

     
}
  
  
  return (
    <div className="min-w-[275px] h-full px-3 py-6 bg-white text-[#333] rounded-lg shadow-lg cursor-pointer">
      <div>
        <h2 className="text-center text-2xl">Cart Items</h2>
        <div className="max-h-[225px] overflow-auto flex flex-col gap-8 my-8">
          {cartItems?.length > 0 ? (
            cartItems?.map((item) => (
              <div key={item._id} className="flex items-center gap-8">
                <div>
                  <Image width="75" height="75" src={item.image} alt="" />
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <span>
                    {item.quantity} X ${item.price}
                  </span>
                </div>
                <AiOutlineClose
                  size={20}
                  onClick={() => removeCartItem(item)}
                />
              </div>
            ))
          ) : (
            <span className="text-red-500 ml-2">Cart is empty!</span>
          )}
        </div>
        <span className="inline-block">
          Total:{" "}
          <span>
            ${cartItems.reduce((a, b) => a + b.price * b.quantity, 0)}
          </span>
        </span>
        <span
          className="block max-w-max mt-8 px-6 py-1 bg-orange-500 text-[#efefef] rounded-lg"
          onClick={handleCheckout}
        >
          Checkout
        </span>
      </div>
    </div>
  );
}

export default Cart

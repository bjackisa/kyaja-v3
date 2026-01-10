"use client"

import { MdCheckCircle, MdLocalShipping } from "react-icons/md"
import { FaSpinner } from "react-icons/fa"
import Link from "next/link"
import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useSession } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { UpdateProfile } from "./CheckOutProfileForm"
import toast from "react-hot-toast";

// Types
interface OrderConfirmationProps {
  orderId: string
  mobileMoneyInternalRef?: string | null
}

interface BuyNowCompProps {
  email: string
}

// Order Confirmation Component
const OrderConfirmation = ({ orderId, mobileMoneyInternalRef }: OrderConfirmationProps) => {
  const [mmStatus, setMmStatus] = useState<string | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const checkMobileMoneyStatus = async () => {
    if (!mobileMoneyInternalRef) return
    setIsChecking(true)
    try {
      const res = await fetch(`/api/relworx/mobile-money/check-status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, internal_reference: mobileMoneyInternalRef }),
      })
      const data = await res.json().catch(() => ({}))
      const status = String(data?.data?.status || data?.data?.request_status || "").toUpperCase()
      if (status) setMmStatus(status)
      if (!res.ok) {
        toast.error(data?.message || "Failed to check payment status")
      }
    } catch (e) {
      console.error(e)
      toast.error("Failed to check payment status")
    } finally {
      setIsChecking(false)
    }
  }

  React.useEffect(() => {
    if (!mobileMoneyInternalRef) return
    let isMounted = true
    let attempts = 0
    const maxAttempts = 12

    const tick = async () => {
      if (!isMounted) return
      attempts += 1
      await checkMobileMoneyStatus()
      const current = (mmStatus || "").toUpperCase()
      if (current === "SUCCESS" || current === "FAILED") return
      if (attempts >= maxAttempts) return
      setTimeout(tick, 6000)
    }

    setTimeout(tick, 1500)
    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileMoneyInternalRef])

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center bg-white p-8 rounded-2xl shadow-xl max-w-md mx-4">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MdCheckCircle className="text-green-600 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600">Your order has been successfully placed.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {mobileMoneyInternalRef && (
          <div className="w-full space-y-2 mb-3">
            <div className="text-xs text-gray-600">
              Mobile Money Ref: <span className="font-mono">{mobileMoneyInternalRef}</span>
            </div>
            <div className="text-sm font-semibold text-gray-800">
              Payment Status: <span className="font-bold">{mmStatus || "PENDING"}</span>
            </div>
            <button
              onClick={checkMobileMoneyStatus}
              disabled={isChecking}
              className={`w-full px-6 py-3 rounded-lg border font-semibold transition-colors duration-200 ${
                isChecking ? "bg-gray-100 text-gray-500" : "bg-white hover:bg-gray-50 text-gray-800"
              }`}
            >
              {isChecking ? "Checking..." : "Check Payment Status"}
            </button>
          </div>
        )}
        <Link href={`/order-confirmation/${orderId}`} passHref>
  <a
    target="_blank"
    rel="noopener noreferrer"
  >
    <button className="w-full sm:w-auto px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
      View Receipt
    </button>
  </a>
</Link>

          <Link href="/">
            <button className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors duration-200 border border-gray-300 hover:border-gray-400">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

// Customer Details Section Component
const CustomerDetailsSection = ({
  user,
  address,
  phone,
  setAddress,
  setPhone,
}: {
  user: any
  address: string
  phone: string
  setAddress: (address: string) => void
  setPhone: (phone: string) => void
}) => {
  const hasValidDetails = address && phone

  return (
    <div className="mb-6 bg-white lg:p-8 p-6 rounded-xl shadow-lg border border-gray-100 lg:mt-0 mt-7">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center ${
              hasValidDetails ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <MdCheckCircle color={hasValidDetails ? "#22c55e" : "#ef4444"} size={16} />
          </div>
          1. CUSTOMER DETAILS
        </h2>
        <UpdateProfile setAddress={setAddress} setPhone={setPhone} />
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-orange-400">
        <p className="text-gray-700 text-sm leading-relaxed">
          <span className="font-semibold text-gray-800">{user?.name}</span>
          <br />
          {hasValidDetails ? (
            <span className="text-gray-600">
              📍 {address} | 📞 <span className="font-medium">{phone}</span>
            </span>
          ) : (
            <span className="text-red-500 font-medium">
              ⚠️ Please click the Change button to update your profile before checkout.
            </span>
          )}
        </p>
      </div>
    </div>
  )
}

// Product Item Component
const ProductItem: React.FC<{ item: any; quantity?: number }> = ({ item, quantity = 1 }) => (
  <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
    <div className="flex items-center">
      <div className="relative">
        <img
          src={item.imageUrl || "https://via.placeholder.com/60"}
          alt="Product Image"
          className="w-16 h-16 rounded-lg object-cover shadow-md"
        />
        <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
          {quantity}
        </div>
      </div>
      <div className="ml-4 flex-1">
        <p className="text-sm font-semibold text-gray-800">{item.title}</p>
        {item.description && <p className="text-xs text-gray-600 mt-1">{item.description}</p>}
        <div className="flex items-center gap-4 mt-2">
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">QTY: {quantity}</span>
          <span className="text-sm font-bold text-green-600">UGX {item.salePrice}</span>
        </div>
      </div>
    </div>
  </div>
)

// Delivery Details Section Component
const DeliveryDetailsSection = ({
  hasSingleItem,
  singleItem,
  cartItems,
  paymentMethod,
  setPaymentMethod,
}: {
  hasSingleItem: boolean
  singleItem: any
  cartItems: any[]
  paymentMethod: "cod" | "mobile_money" | "card"
  setPaymentMethod: React.Dispatch<React.SetStateAction<"cod" | "mobile_money" | "card">>
}) => (
  <div className="mb-6 bg-white lg:p-8 p-6 rounded-xl shadow-lg border border-gray-100">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-base font-bold text-gray-800 flex items-center gap-3">
        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
          <MdCheckCircle color="#22c55e" size={16} />
        </div>
        2. DELIVERY DETAILS
      </h2>
    </div>

    {/* Delivery Info */}
    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-200 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <MdLocalShipping className="text-orange-600 text-xl" />
        <span className="font-semibold text-gray-800">Smart Delivery</span>
      </div>
      <div className="bg-green-100 text-green-800 text-sm font-medium p-3 rounded-lg mb-3">
        💰 SAVE UP TO UGX 4,000 on delivery fees
      </div>
      <div className="text-orange-700 text-sm font-medium bg-orange-100 p-3 rounded-lg">
        🚚 Delivery fee calculated based on your location after order confirmation
      </div>
      <p className="text-xs text-gray-600 mt-2">*Delivery times may vary based on your location and current demand.</p>
    </div>

    {/* Items to be Delivered */}
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-800 mb-3">📦 Items to be Delivered</h3>

      {hasSingleItem ? (
        <ProductItem item={singleItem} quantity={1} />
      ) : (
        cartItems.map((item: any, index: number) => <ProductItem key={index} item={item} quantity={item.qty} />)
      )}

      {!hasSingleItem && (
        <div className="flex justify-center items-center pt-4">
          <Link href="/cart">
            <button className="py-3 px-8 font-semibold hover:bg-orange-100 text-orange-600 rounded-lg border-2 border-orange-200 transition-all duration-200 hover:scale-105 hover:shadow-md">
              🛒 Modify Cart
            </button>
          </Link>
        </div>
      )}
    </div>

    {/* Payment Method */}
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold text-gray-800 flex items-center gap-3">
          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
            <MdCheckCircle color="#22c55e" size={16} />
          </div>
          3. PAYMENT METHOD
        </h2>
      </div>
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-5 rounded-xl border border-green-200 space-y-3">
        <label className="flex items-center gap-3 bg-white/60 p-3 rounded-lg border border-green-200 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />
          <span className="text-sm font-medium text-gray-800">Cash on Delivery</span>
        </label>
        <label className="flex items-center gap-3 bg-white/60 p-3 rounded-lg border border-green-200 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="mobile_money"
            checked={paymentMethod === "mobile_money"}
            onChange={() => setPaymentMethod("mobile_money")}
          />
          <span className="text-sm font-medium text-gray-800">Mobile Money (MTN / Airtel)</span>
        </label>
        <label className="flex items-center gap-3 bg-white/60 p-3 rounded-lg border border-green-200 cursor-pointer">
          <input
            type="radio"
            name="paymentMethod"
            value="card"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />
          <span className="text-sm font-medium text-gray-800">Credit/Debit Card (Visa/Mastercard)</span>
        </label>
        <p className="text-xs text-gray-600">
          For Mobile Money, you will receive a prompt on your phone to approve. For Card, you will be redirected to a secure checkout.
        </p>
      </div>
    </div>
  </div>
)

// Order Summary Component
const OrderSummary = ({
  hasSingleItem,
  singleItem,
  cartItems,
  subTotal,
  isLoadingOrder,
  address,
  phone,
  onConfirmOrder,
}: {
  hasSingleItem: boolean
  singleItem: any
  cartItems: any[]
  subTotal: string
  isLoadingOrder: boolean
  address: string
  phone: string
  onConfirmOrder: () => void
}) => {
  const canPlaceOrder = address && phone && !isLoadingOrder

  return (
    <div className="lg:w-[28%] w-full">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">📋 Order Summary</h2>

        <div className="space-y-4 mb-6">
          {hasSingleItem ? (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-700 font-medium">Item total (1)</p>
              <p className="text-gray-800 font-bold">UGX {singleItem.salePrice}</p>
            </div>
          ) : (
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-700 font-medium">Items total ({cartItems.length})</p>
              <p className="text-gray-800 font-bold">UGX {subTotal}</p>
            </div>
          )}

          <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-2">
              <span className="text-gray-700 font-medium text-sm">Delivery fees</span>
              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">TBD</span>
            </div>
            <p className="text-orange-600 font-bold text-xs">Calculated after order</p>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg">
              <p className="text-base font-bold text-gray-800">Total</p>
              <p className="text-base font-bold text-orange-600">UGX {Number.parseFloat(subTotal)} + delivery</p>
            </div>
          </div>
        </div>

        <button
          onClick={onConfirmOrder}
          disabled={!canPlaceOrder}
          className={`w-full py-4 rounded-xl text-base font-bold transition-all duration-200 ${
            !canPlaceOrder
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 hover:scale-105 hover:shadow-lg"
          }`}
        >
          {isLoadingOrder ? (
            <span className="flex items-center justify-center gap-2">
              <FaSpinner className="animate-spin" />
              Processing Order...
            </span>
          ) : (
            "🛍️ CONFIRM ORDER"
          )}
        </button>
      </div>

      {/* Terms & Conditions */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500 leading-relaxed px-4 bg-white p-4 rounded-lg shadow-sm">
          By proceeding, you automatically accept our{" "}
          <span className="text-orange-500 underline font-medium cursor-pointer hover:text-orange-600">
            Terms & Conditions
          </span>{" "}
          and{" "}
          <span className="text-orange-500 underline font-medium cursor-pointer hover:text-orange-600">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  )
}

// Main Component
export default function BuyNowComp({ email }: BuyNowCompProps) {
  const dispatch = useDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()

  const singleBuyItem = searchParams.get("q") || ""
  const { data: session } = useSession()
  const user: any = session?.user

  // State
  const [address, setAddress] = useState(user?.address || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [isLoadingOrder, setIsLoadingOrder] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "mobile_money" | "card">("cod")
  const [mobileMoneyInternalRef, setMobileMoneyInternalRef] = useState<string | null>(null)

  // Redux selectors
  const singleItem = useSelector((store: any) => store.buynow)
  const cartItems = useSelector((store: any) => store.cart)

  // Computed values
  const hasSingleItem = singleBuyItem.includes("single-item") && singleItem
  const hasCartItems = cartItems && cartItems.length > 0

  const buyItems = hasSingleItem
    ? [{ ...singleItem, qty: singleItem.quantity || 1 }]
    : cartItems.map((item: any) => ({
        ...item,
        quantity: item.quantity || 1,
      }))

  const subTotal = buyItems
    .reduce((acc: any, currentItem: any) => {
      return acc + currentItem.salePrice * (currentItem.qty || 1)
    }, 0)
    .toFixed(2)

  // Utility functions
  const generateOrderNumber = () => {
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 7).toUpperCase()
    return `ORD-${timestamp}-${randomString}`
  }

 // Event handlers 
const handleOrder = async () => { 
  if (!address || !phone) { 
    toast.error("Please click the Change button to update your profile before checkout.") 
    return 
  } 

  setIsLoadingOrder(true) 
  
  try { 
    const orderNumber = generateOrderNumber() 
    const selectedPaymentMethodLabel =
      paymentMethod === "cod"
        ? "Cash on Delivery"
        : paymentMethod === "mobile_money"
          ? "Mobile Money"
          : "Card";
    const orderData = { 
      userId: user?.id, 
      name: user?.name, 
      email, 
      phone, 
      address, 
      orderNumber, 
      totalOrderAmount: Number.parseInt(subTotal), 
      paymentMethod: selectedPaymentMethodLabel, 
      orderItems: buyItems, 
    } 

    const response = await fetch(`/api/orders`, { 
      method: "POST", 
      headers: { 
        "Content-Type": "application/json", 
      }, 
      body: JSON.stringify(orderData), 
    }) 

    // Handle different response statuses
    if (response.status === 201) { 
      const data = await response.json() 

      if (paymentMethod === "mobile_money") {
        const mmRes = await fetch(`/api/relworx/mobile-money/request-payment`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: data.id, msisdn: phone }),
        })

        const mmData = await mmRes.json().catch(() => ({}))
        if (!mmRes.ok) {
          console.error("Mobile money initiation failed:", mmData)
          toast.error(mmData?.message || "Failed to initiate mobile money payment")
        } else {
          toast.success("Mobile money payment initiated. Please approve on your phone.")
          setMobileMoneyInternalRef(mmData?.internal_reference || null)
        }
      }

      if (paymentMethod === "card") {
        const cardRes = await fetch(`/api/relworx/visa/request-session`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId: data.id }),
        })

        const cardData = await cardRes.json().catch(() => ({}))
        if (!cardRes.ok || !cardData?.payment_url) {
          console.error("Card session creation failed:", cardData)
          toast.error(cardData?.message || "Failed to start card payment")
        } else {
          window.location.href = cardData.payment_url
          return
        }
      }

      toast.success("Order successfully placed!") 
      setConfirmedOrderId(data.id) 
      setIsRedirecting(true) 
    } else {
      // Log the error for debugging
      const errorData = await response.json().catch(() => ({}))
      console.error('Order failed:', response.status, errorData)
      
      if (response.status === 400) {
        toast.error("Invalid order data. Please check your information.")
      } else if (response.status === 500) {
        toast.error("Server error. Please try again later.")
      } else {
        toast.error("Failed to place the order. Please try again.")
      }
    }
  } catch (error) { 
    console.error('Order error:', error)
    toast.error("Network error. Please check your connection and try again.") 
  } finally {
    // Always reset loading state
    setIsLoadingOrder(false)
  }
}

  // Show order confirmation if redirecting
  if (isRedirecting) {
    return <OrderConfirmation orderId={confirmedOrderId} mobileMoneyInternalRef={mobileMoneyInternalRef} />
  }

  return (
    <div className="flex lg:flex-row flex-col mx-auto gap-6 lg:py-10 py-4 lg:max-w-[75rem] w-full min-h-screen md:mt-10 mt-2">
      <div className="lg:w-[70%] w-full">
        <CustomerDetailsSection
          user={user}
          address={address}
          phone={phone}
          setAddress={setAddress}
          setPhone={setPhone}
        />

        <DeliveryDetailsSection
          hasSingleItem={hasSingleItem}
          singleItem={singleItem}
          cartItems={cartItems}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      </div>

      <OrderSummary
        hasSingleItem={hasSingleItem}
        singleItem={singleItem}
        cartItems={cartItems}
        subTotal={subTotal}
        isLoadingOrder={isLoadingOrder}
        address={address}
        phone={phone}
        onConfirmOrder={handleOrder}
      />
    </div>
  )
}

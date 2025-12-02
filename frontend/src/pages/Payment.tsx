import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  CreditCard, 
  Wallet, 
  Smartphone, 
  Banknote, 
  Lock, 
  CheckCircle, 
  ArrowLeft,
  ArrowRight,
  Shield,
  Clock
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useCart } from '../lib/cart'
import { useAuth } from '../lib/auth'
import { orderAPI, PlaceOrderRequest } from '../lib/api'

type PaymentMethod = 'card' | 'upi' | 'wallet' | 'cod' | 'netbanking'

interface PaymentMethodOption {
  id: PaymentMethod
  name: string
  icon: React.ReactNode
  description: string
  available: boolean
}

const Payment = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { state: cartState, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('cod')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showCardForm, setShowCardForm] = useState(false)
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
    saveCard: false
  })
  const [upiId, setUpiId] = useState('')
  const [selectedWallet, setSelectedWallet] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null)
  const [userAddresses, setUserAddresses] = useState<any[]>([])

  const orderData = location.state?.orderData || {
    total: cartState.totalPrice,
    items: cartState.items,
    restaurantId: cartState.restaurantId
  }

  useEffect(() => {
    // Load user addresses
    const loadAddresses = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/addresses', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.ok) {
          const addresses = await response.json()
          setUserAddresses(addresses)
          // Set default address if available
          const defaultAddress = addresses.find((a: any) => a.isDefault)
          if (defaultAddress) {
            setSelectedAddressId(defaultAddress.id)
          } else if (addresses.length > 0) {
            setSelectedAddressId(addresses[0].id)
          }
        }
      } catch (error) {
        console.error('Failed to load addresses:', error)
      }
    }
    if (isAuthenticated) {
      loadAddresses()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } })
      return
    }

    if (cartState.items.length === 0 && !orderData.items) {
      toast.error('Your cart is empty')
      navigate('/cart')
      return
    }
  }, [isAuthenticated, cartState, navigate, location, orderData])

  const paymentMethods: PaymentMethodOption[] = [
    {
      id: 'cod',
      name: 'Cash on Delivery',
      icon: <Banknote className="w-6 h-6" />,
      description: 'Pay when you receive your order',
      available: true
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <CreditCard className="w-6 h-6" />,
      description: 'Visa, Mastercard, RuPay',
      available: true
    },
    {
      id: 'upi',
      name: 'UPI',
      icon: <Smartphone className="w-6 h-6" />,
      description: 'Google Pay, PhonePe, Paytm',
      available: true
    },
    {
      id: 'wallet',
      name: 'Wallet',
      icon: <Wallet className="w-6 h-6" />,
      description: 'Paytm, PhonePe, Amazon Pay',
      available: true
    },
    {
      id: 'netbanking',
      name: 'Net Banking',
      icon: <Banknote className="w-6 h-6" />,
      description: 'All major banks',
      available: true
    }
  ]

  const calculateTotals = () => {
    const subtotal = orderData.total || cartState.totalPrice
    const deliveryFee = 40
    const taxes = (subtotal * 0.05)
    const total = subtotal + deliveryFee + taxes
    return { subtotal, deliveryFee, taxes, total }
  }

  const { subtotal, deliveryFee, taxes, total } = calculateTotals()

  const handleCardInput = (field: string, value: string) => {
    if (field === 'number') {
      // Format card number with spaces
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim()
      if (formatted.replace(/\s/g, '').length <= 16) {
        setCardDetails(prev => ({ ...prev, number: formatted }))
      }
    } else if (field === 'expiry') {
      // Format expiry as MM/YY
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5)
      setCardDetails(prev => ({ ...prev, expiry: formatted }))
    } else if (field === 'cvv') {
      if (value.length <= 3 && /^\d*$/.test(value)) {
        setCardDetails(prev => ({ ...prev, cvv: value }))
      }
    } else {
      setCardDetails(prev => ({ ...prev, [field]: value }))
    }
  }

  const validatePayment = (): boolean => {
    if (selectedMethod === 'card') {
      if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length !== 16) {
        toast.error('Please enter a valid card number')
        return false
      }
      if (!cardDetails.name) {
        toast.error('Please enter cardholder name')
        return false
      }
      if (!cardDetails.expiry || cardDetails.expiry.length !== 5) {
        toast.error('Please enter valid expiry date (MM/YY)')
        return false
      }
      if (!cardDetails.cvv || cardDetails.cvv.length !== 3) {
        toast.error('Please enter valid CVV')
        return false
      }
    } else if (selectedMethod === 'upi') {
      if (!upiId || !upiId.includes('@')) {
        toast.error('Please enter a valid UPI ID (e.g., name@paytm)')
        return false
      }
    } else if (selectedMethod === 'wallet') {
      if (!selectedWallet) {
        toast.error('Please select a wallet')
        return false
      }
    } else if (selectedMethod === 'netbanking') {
      if (!selectedBank) {
        toast.error('Please select a bank')
        return false
      }
    }
    return true
  }

  const handlePayment = async () => {
    if (!validatePayment()) return

    if (!selectedAddressId) {
      toast.error('Please select a delivery address')
      return
    }

    setIsProcessing(true)
    try {
      // Simulate payment processing based on method
      if (selectedMethod === 'wallet') {
        // Simulate wallet payment
        await new Promise(resolve => setTimeout(resolve, 2000))
        toast.success(`Payment successful via ${selectedWallet}!`)
      } else if (selectedMethod === 'netbanking') {
        // Simulate net banking payment
        await new Promise(resolve => setTimeout(resolve, 2000))
        toast.success(`Payment successful via ${selectedBank}!`)
      } else if (selectedMethod === 'card') {
        // Simulate card payment
        await new Promise(resolve => setTimeout(resolve, 2000))
        toast.success('Card payment successful!')
      } else if (selectedMethod === 'upi') {
        // Simulate UPI payment
        await new Promise(resolve => setTimeout(resolve, 2000))
        toast.success(`UPI payment successful via ${upiId}!`)
      } else {
        // COD - no payment processing needed
        await new Promise(resolve => setTimeout(resolve, 1000))
      }

      // Create order via backend API - properly linked to user ID from JWT
      const orderRequest: PlaceOrderRequest = {
        restaurantId: orderData.restaurantId || cartState.restaurantId!,
        addressId: selectedAddressId,
        items: (orderData.items || cartState.items).map((item: any) => ({
          menuItemId: item.id || item.menuItemId,
          quantity: item.quantity,
          specialInstructions: item.specialInstructions
        })),
        paymentMethod: selectedMethod.toUpperCase(),
        specialInstructions: ''
      }

      const order = await orderAPI.placeOrder(orderRequest)

      // Request notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        await Notification.requestPermission()
      }

      // Send notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Order Placed! 🎉', {
          body: `Your order #${order.id} has been placed successfully!`,
          icon: '/favicon.ico'
        })
      }

      clearCart()
      toast.success('Order placed successfully!')
      navigate(`/track-order/${order.id}`)
    } catch (error) {
      toast.error('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Lock className="w-8 h-8 text-red-600" />
            Secure Payment
          </h1>
          <p className="text-gray-600 mt-2">Choose your preferred payment method</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6 text-green-600" />
                Payment Methods
              </h2>
              
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <motion.button
                    key={method.id}
                    onClick={() => {
                      setSelectedMethod(method.id)
                      if (method.id === 'card') setShowCardForm(true)
                      else setShowCardForm(false)
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      selectedMethod === method.id
                        ? 'border-red-600 bg-red-50 shadow-md'
                        : 'border-gray-200 hover:border-red-300 bg-white'
                    } ${!method.available ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!method.available}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          selectedMethod === method.id ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {method.icon}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{method.name}</div>
                          <div className="text-sm text-gray-500">{method.description}</div>
                        </div>
                      </div>
                      {selectedMethod === method.id && (
                        <CheckCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Card Form */}
              <AnimatePresence>
                {selectedMethod === 'card' && showCardForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 p-4 bg-gray-50 rounded-xl border-2 border-red-200"
                  >
                    <h3 className="font-semibold text-gray-900 mb-4">Card Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardDetails.number}
                          onChange={(e) => handleCardInput('number', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardDetails.name}
                          onChange={(e) => handleCardInput('name', e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            value={cardDetails.expiry}
                            onChange={(e) => handleCardInput('expiry', e.target.value)}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={cardDetails.cvv}
                            onChange={(e) => handleCardInput('cvv', e.target.value)}
                            placeholder="123"
                            maxLength={3}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="saveCard"
                          checked={cardDetails.saveCard}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, saveCard: e.target.checked }))}
                          className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                        />
                        <label htmlFor="saveCard" className="text-sm text-gray-700">
                          Save card for future payments
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* UPI Form */}
              <AnimatePresence>
                {selectedMethod === 'upi' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 p-4 bg-gray-50 rounded-xl border-2 border-red-200"
                  >
                    <h3 className="font-semibold text-gray-900 mb-4">UPI Details</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@paytm"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        Supported: Google Pay, PhonePe, Paytm, BHIM UPI
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Wallet Form */}
              <AnimatePresence>
                {selectedMethod === 'wallet' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 p-4 bg-gray-50 rounded-xl border-2 border-red-200"
                  >
                    <h3 className="font-semibold text-gray-900 mb-4">Select Wallet</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {['Paytm', 'PhonePe', 'Amazon Pay', 'MobiKwik', 'Freecharge', 'JioMoney'].map((wallet) => (
                        <button
                          key={wallet}
                          onClick={() => setSelectedWallet(wallet)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            selectedWallet === wallet
                              ? 'border-red-600 bg-red-50'
                              : 'border-gray-200 hover:border-red-300'
                          }`}
                        >
                          <div className="font-semibold text-sm">{wallet}</div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Net Banking Form */}
              <AnimatePresence>
                {selectedMethod === 'netbanking' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 p-4 bg-gray-50 rounded-xl border-2 border-red-200"
                  >
                    <h3 className="font-semibold text-gray-900 mb-4">Select Bank</h3>
                    <select
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                      <option value="">Select your bank</option>
                      {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank', 'Bank of Baroda'].map((bank) => (
                        <option key={bank} value={bank}>{bank}</option>
                      ))}
                    </select>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Security Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Secure Payment</h3>
                  <p className="text-sm text-gray-600">
                    Your payment information is encrypted and secure. We never store your card details.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-red-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
              <button
                onClick={() => navigate('/addresses')}
                className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
              >
                <span>+</span>
                <span>Add Address</span>
              </button>
            </div>
            {userAddresses.length > 0 ? (
              <div className="space-y-3">
                {userAddresses.map((address) => (
                  <button
                    key={address.id}
                    onClick={() => setSelectedAddressId(address.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      selectedAddressId === address.id
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-red-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">{address.label || 'Address'}</div>
                        <div className="text-sm text-gray-600 mt-1">{address.address}</div>
                        {address.landmark && (
                          <div className="text-sm text-gray-500 mt-1">Near {address.landmark}</div>
                        )}
                        <div className="text-sm text-gray-500 mt-1">{address.city}, {address.state} - {address.pincode}</div>
                      </div>
                      {selectedAddressId === address.id && (
                        <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No addresses found. Please add a delivery address.</p>
                <button
                  onClick={() => navigate('/addresses')}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Add Address
                </button>
              </div>
            )}
          </motion.div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 border-2 border-red-100 sticky top-4"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                {(orderData.items || cartState.items).slice(0, 3).map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-gray-600">{item.name} x{item.quantity}</span>
                    <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                {(orderData.items || cartState.items).length > 3 && (
                  <div className="text-sm text-gray-500">
                    +{(orderData.items || cartState.items).length - 3} more items
                  </div>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold">₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Taxes (5%)</span>
                  <span className="font-semibold">₹{taxes.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>Pay ₹{total.toFixed(2)}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>

              {selectedMethod === 'cod' && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <div className="font-semibold">Cash on Delivery</div>
                      <div className="text-xs mt-1">Pay ₹{total.toFixed(2)} when you receive your order</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment


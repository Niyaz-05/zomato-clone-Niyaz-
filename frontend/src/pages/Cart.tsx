import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, Tag, Heart, X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '../lib/cart'
import toast from 'react-hot-toast'

// Available coupons - matching the ones shown in notifications/offers
const COUPONS = [
  { code: 'FIRST50', discount: 50, minOrder: 200, description: '₹50 off on orders above ₹200' },
  { code: 'SAVE100', discount: 100, minOrder: 500, description: '₹100 off on orders above ₹500' },
  { code: 'FLAT20', discount: 20, minOrder: 0, description: '20% off on all orders', type: 'percentage' as const },
  { code: 'ZOMATO50', discount: 50, minOrder: 300, description: '₹50 off on orders above ₹300' },
  { code: 'WEEKEND', discount: 30, minOrder: 400, description: '₹30 off on weekend orders' },
]

const Cart = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart()
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<typeof COUPONS[0] | null>(null)
  const [deliveryTip, setDeliveryTip] = useState(0)
  const [showCoupons, setShowCoupons] = useState(false)
  const navigate = useNavigate()

  const applyCoupon = (code: string) => {
    const upperCode = code.toUpperCase().trim()
    const coupon = COUPONS.find(c => c.code === upperCode)
    
    if (!coupon) {
      toast.error(`Invalid coupon code. Available codes: ${COUPONS.map(c => c.code).join(', ')}`)
      return
    }

    if (state.totalPrice < coupon.minOrder) {
      toast.error(`Minimum order of ₹${coupon.minOrder} required for this coupon`)
      return
    }

    setAppliedCoupon(coupon)
    toast.success(`Coupon applied! You saved ₹${calculateDiscount(coupon)}`)
    setShowCoupons(false)
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    toast.success('Coupon removed')
  }

  const calculateDiscount = (coupon: typeof COUPONS[0]) => {
    if (coupon.type === 'percentage') {
      return ((state.totalPrice * coupon.discount) / 100).toFixed(2)
    }
    return coupon.discount
  }

  const deliveryFee = 40
  const taxes = (state.totalPrice * 0.05).toFixed(2)
  const discount = appliedCoupon ? Number(calculateDiscount(appliedCoupon)) : 0
  const finalTotal = (state.totalPrice + deliveryFee + Number(taxes) - discount + deliveryTip).toFixed(2)

  const handlePlaceOrder = async () => {
    if (state.items.length === 0) {
      toast.error('Your cart is empty')
      return
    }

    // Navigate to payment page
    navigate('/payment', {
      state: {
        orderData: {
          total: parseFloat(finalTotal),
          items: state.items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          restaurantId: state.restaurantId!,
          restaurantName: state.items[0].restaurantName,
          deliveryFee,
          taxes: parseFloat(taxes),
          discount,
          tip: deliveryTip
        }
      }
    })
  }

  const handleContinueShopping = () => {
    navigate('/restaurants')
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center px-4">
          <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some delicious items from your favorite restaurants</p>
          <Button onClick={handleContinueShopping} className="w-full">
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <Button variant="outline" onClick={clearCart} className="text-red-600 hover:text-red-700">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={`${item.id}-${item.restaurantId}`}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                          <div className="flex items-center mt-2">
                            <Badge variant={item.isVeg ? "default" : "destructive"} className="text-xs">
                              {item.isVeg ? 'Veg' : 'Non-Veg'}
                            </Badge>
                            <span className="text-sm text-gray-500 ml-2">
                              from {item.restaurantName}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center space-x-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-lg">₹{item.price * item.quantity}</p>
                          <p className="text-sm text-gray-500">₹{item.price} each</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 space-y-4">
            {/* Apply Coupon Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <Tag className="h-5 w-5 mr-2" />
                  Apply Coupon
                </CardTitle>
              </CardHeader>
              <CardContent>
                {appliedCoupon ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-green-700">{appliedCoupon.code}</p>
                        <p className="text-xs text-green-600">You saved ₹{discount}!</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={removeCoupon}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => applyCoupon(couponCode)}
                        disabled={!couponCode}
                      >
                        Apply
                      </Button>
                    </div>
                    <button
                      onClick={() => setShowCoupons(!showCoupons)}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      {showCoupons ? 'Hide' : 'View'} available coupons
                    </button>
                    {showCoupons && (
                      <div className="space-y-2 mt-3">
                        {COUPONS.map((coupon) => (
                          <div
                            key={coupon.code}
                            className="border border-gray-200 rounded-lg p-3 hover:border-red-500 cursor-pointer transition-colors"
                            onClick={() => applyCoupon(coupon.code)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-sm">{coupon.code}</p>
                                <p className="text-xs text-gray-600">{coupon.description}</p>
                              </div>
                              <Button size="sm" variant="outline">Apply</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tip Delivery Partner Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-base">
                  <Heart className="h-5 w-5 mr-2 text-red-600" />
                  Tip Delivery Partner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Show your appreciation for great service
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {[0, 10, 20, 30].map((tip) => (
                    <button
                      key={tip}
                      onClick={() => setDeliveryTip(tip)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        deliveryTip === tip
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tip === 0 ? 'No Tip' : `₹${tip}`}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Summary Card */}
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({state.totalItems} items)</span>
                    <span className="font-medium">₹{state.totalPrice}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">₹{deliveryFee}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Taxes (5%)</span>
                    <span className="font-medium">₹{taxes}</span>
                  </div>

                  {deliveryTip > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Delivery Tip</span>
                      <span className="font-medium">₹{deliveryTip}</span>
                    </div>
                  )}

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span className="font-medium">-₹{discount}</span>
                    </div>
                  )}

                  <div className="border-t border-gray-200 my-4"></div>

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>

                  <Button
                    className="w-full mt-6 bg-red-600 hover:bg-red-700"
                    size="lg"
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleContinueShopping}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart

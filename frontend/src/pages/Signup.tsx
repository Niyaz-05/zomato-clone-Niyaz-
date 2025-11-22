import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authAPI, SignupRequest, AddressRequest } from '../lib/api'
import { Utensils, ChefHat, Mail, Lock, Phone, ArrowRight, Shield, Zap, Heart, MapPin, Home, Briefcase, Plus, X } from 'lucide-react'

const Signup = () => {
  const [formData, setFormData] = useState<SignupRequest>({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    addresses: []
  })
  const [addresses, setAddresses] = useState<AddressRequest[]>([])
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [currentAddress, setCurrentAddress] = useState<AddressRequest>({
    label: 'home',
    address: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: true
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const navigate = useNavigate()

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/', { replace: true })
    }
  }, [navigate])

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {}

    // Name validation
    if (!formData.name || formData.name.trim().length === 0) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long'
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCurrentAddress(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const addAddress = () => {
    if (!currentAddress.address || !currentAddress.city || !currentAddress.state || !currentAddress.pincode) {
      toast.error('Please fill all address fields')
      return
    }
    setAddresses(prev => [...prev, { ...currentAddress }])
    setCurrentAddress({
      label: addresses.length === 0 ? 'home' : addresses.length === 1 ? 'work' : 'other',
      address: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: addresses.length === 0
    })
    setShowAddressForm(false)
    toast.success('Address added!')
  }

  const removeAddress = (index: number) => {
    setAddresses(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const signupData = {
        ...formData,
        addresses: addresses.length > 0 ? addresses : undefined
      }
      const response = await authAPI.signup(signupData)
      
      // Store token and user data
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        phoneNumber: response.user.phoneNumber,
        role: response.user.role,
      }))
      
      toast.success('Account created successfully! Welcome to Zomato!')
      navigate('/')
    } catch (error: any) {
      const errorMessage = error.response?.data || 'Signup failed. Please try again.'
      toast.error(errorMessage)

      // Handle specific validation errors from backend
      if (error.response?.status === 400 && typeof errorMessage === 'string') {
        if (errorMessage.includes('Email is already in use')) {
          setErrors({ email: 'This email is already registered' })
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTEyIDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0yNCAzNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse delay-700"></div>
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-red-100 relative z-10">
        {/* Zomato Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-600 rounded-full p-3">
              <Utensils className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-red-600 mb-2">Zomato</h1>
          <p className="text-gray-600 text-sm">Join millions of food lovers</p>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Create Your Account</h2>
          <p className="text-sm text-gray-500">Join the foodie community today!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              <ChefHat className="h-4 w-4 text-red-500" />
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <ChefHat className="h-5 w-5 text-red-400 group-focus-within:text-red-600 transition-colors" />
              </div>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`block w-full pl-12 pr-4 py-3.5 bg-gradient-to-r from-red-50 to-orange-50 border-2 rounded-xl placeholder-gray-500 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-300 hover:shadow-md ${
                  errors.name ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-red-200 hover:border-red-300 focus:border-red-500'
                }`}
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && <p className="mt-2 text-sm text-red-700 font-semibold flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg"><span>⚠</span>{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4 text-red-500" />
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-red-400 group-focus-within:text-red-600 transition-colors" />
              </div>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`block w-full pl-12 pr-4 py-3.5 bg-gradient-to-r from-red-50 to-orange-50 border-2 rounded-xl placeholder-gray-500 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-300 hover:shadow-md ${
                  errors.email ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-red-200 hover:border-red-300 focus:border-red-500'
                }`}
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="mt-2 text-sm text-red-700 font-semibold flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg"><span>⚠</span>{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Phone className="h-4 w-4 text-red-500" />
              Phone Number
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-red-400 group-focus-within:text-red-600 transition-colors" />
              </div>
              <input
                type="tel"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={`block w-full pl-12 pr-4 py-3.5 bg-gradient-to-r from-red-50 to-orange-50 border-2 rounded-xl placeholder-gray-500 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-300 hover:shadow-md ${
                  errors.phoneNumber ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-red-200 hover:border-red-300 focus:border-red-500'
                }`}
                placeholder="+1 (555) 000-0000"
              />
            </div>
            {errors.phoneNumber && <p className="mt-2 text-sm text-red-700 font-semibold flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg"><span>⚠</span>{errors.phoneNumber}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-red-500" />
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-red-400 group-focus-within:text-red-600 transition-colors" />
              </div>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`block w-full pl-12 pr-4 py-3.5 bg-gradient-to-r from-red-50 to-orange-50 border-2 rounded-xl placeholder-gray-500 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all duration-300 hover:shadow-md ${
                  errors.password ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-red-200 hover:border-red-300 focus:border-red-500'
                }`}
                placeholder="Minimum 6 characters"
              />
            </div>
            {errors.password && <p className="mt-2 text-sm text-red-700 font-semibold flex items-center gap-1 bg-red-50 px-3 py-2 rounded-lg"><span>⚠</span>{errors.password}</p>}
          </div>

          {/* Address Section */}
          <div className="border-t border-red-200 pt-5">
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-bold text-gray-800 flex items-center gap-2">
                <MapPin className="h-4 w-4 text-red-500" />
                Delivery Addresses (Optional)
              </label>
              {!showAddressForm && (
                <button
                  type="button"
                  onClick={() => setShowAddressForm(true)}
                  className="text-sm text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add Address
                </button>
              )}
            </div>

            {/* Display added addresses */}
            {addresses.length > 0 && (
              <div className="space-y-2 mb-4">
                {addresses.map((addr, index) => (
                  <div key={index} className="flex items-center justify-between bg-red-50 p-3 rounded-lg border border-red-200">
                    <div className="flex items-center gap-2">
                      {addr.label === 'home' && <Home className="h-4 w-4 text-red-600" />}
                      {addr.label === 'work' && <Briefcase className="h-4 w-4 text-red-600" />}
                      {addr.label === 'other' && <MapPin className="h-4 w-4 text-red-600" />}
                      <span className="text-sm font-semibold capitalize">{addr.label}</span>
                      <span className="text-sm text-gray-600">- {addr.address}, {addr.city}</span>
                      {addr.isDefault && <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded">Default</span>}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAddress(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Address Form */}
            {showAddressForm && (
              <div className="bg-red-50 p-4 rounded-lg border-2 border-red-200 space-y-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-gray-800">Add New Address</h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddressForm(false)
                      setCurrentAddress({
                        label: addresses.length === 0 ? 'home' : addresses.length === 1 ? 'work' : 'other',
                        address: '',
                        city: '',
                        state: '',
                        pincode: '',
                        isDefault: addresses.length === 0
                      })
                    }}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Address Type</label>
                  <select
                    name="label"
                    value={currentAddress.label}
                    onChange={handleAddressChange}
                    className="w-full px-3 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                  >
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={currentAddress.address}
                    onChange={handleAddressChange}
                    className="w-full px-3 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                    placeholder="House/Flat No., Building Name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={currentAddress.city}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={currentAddress.state}
                      onChange={handleAddressChange}
                      className="w-full px-3 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                      placeholder="State"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={currentAddress.pincode}
                    onChange={handleAddressChange}
                    className="w-full px-3 py-2 border-2 border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
                    placeholder="Pincode"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={currentAddress.isDefault || false}
                    onChange={(e) => setCurrentAddress(prev => ({ ...prev, isDefault: e.target.checked }))}
                    className="w-4 h-4 text-red-600 border-red-300 rounded focus:ring-red-500"
                  />
                  <label htmlFor="isDefault" className="text-xs font-semibold text-gray-700">Set as default address</label>
                </div>

                <button
                  type="button"
                  onClick={addAddress}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all font-semibold text-sm"
                >
                  Add Address
                </button>
              </div>
            )}

            {addresses.length === 0 && !showAddressForm && (
              <p className="text-xs text-gray-500 italic">You can add addresses later from your profile</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <ChefHat className="w-5 h-5" />
                <span>Start Your Food Journey!</span>
                <ArrowRight className="w-5 h-5 animate-pulse" />
              </>
            )}
          </button>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Already a Zomato member?</span>
            </div>
          </div>
          <p className="mt-4 text-center text-gray-600">
            <Link to="/login" className="text-red-600 hover:text-red-700 font-semibold inline-flex items-center gap-1 group">
              <span>Sign in to your account</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </p>
        </div>
        
        {/* Benefits section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500 mb-4 font-semibold">Why join Zomato?</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Safe & Secure</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Best Offers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Signup

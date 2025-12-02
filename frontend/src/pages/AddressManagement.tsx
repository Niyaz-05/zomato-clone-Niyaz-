import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Plus, Edit, Trash2, Home, Briefcase, MapPinned } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import toast from 'react-hot-toast'
import { addressAPI, Address, AddressRequest } from '../lib/api'

const AddressManagement = () => {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<AddressRequest>({
    label: '',
    address: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false
  })
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    loadAddresses()
  }, [isAuthenticated, navigate])

  const loadAddresses = async () => {
    setIsLoading(true)
    try {
      const loadedAddresses = await addressAPI.getAddresses()
      setAddresses(loadedAddresses)
    } catch (error) {
      console.error('Failed to load addresses:', error)
      toast.error('Failed to load addresses')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.address || !formData.city || !formData.state || !formData.pincode || !formData.label) {
      toast.error('Please fill all required fields')
      return
    }

    setIsLoading(true)
    try {
      if (editingId) {
        // Update existing address
        await addressAPI.updateAddress(editingId, formData)
        toast.success('Address updated successfully!')
        setEditingId(null)
      } else {
        // Add new address
        await addressAPI.addAddress(formData)
        toast.success('Address added successfully!')
        setIsAddingNew(false)
      }

      // Reload addresses
      await loadAddresses()

      // Reset form
      setFormData({
        label: '',
        address: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        isDefault: false
      })
    } catch (error: any) {
      console.error('Failed to save address:', error)
      toast.error(error.response?.data?.message || 'Failed to save address')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEdit = (address: Address) => {
    setFormData({
      label: address.label,
      address: address.address,
      landmark: address.landmark || '',
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      isDefault: address.isDefault
    })
    setEditingId(address.id)
    setIsAddingNew(true)
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this address?')) {
      return
    }

    setIsLoading(true)
    try {
      await addressAPI.deleteAddress(id)
      toast.success('Address deleted successfully!')
      await loadAddresses()
    } catch (error: any) {
      console.error('Failed to delete address:', error)
      toast.error(error.response?.data?.message || 'Failed to delete address')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSetDefault = async (id: number) => {
    setIsLoading(true)
    try {
      await addressAPI.setDefaultAddress(id)
      toast.success('Default address updated!')
      await loadAddresses()
    } catch (error: any) {
      console.error('Failed to set default address:', error)
      toast.error(error.response?.data?.message || 'Failed to set default address')
    } finally {
      setIsLoading(false)
    }
  }

  const getAddressIcon = (label: string) => {
    const lowerLabel = label.toLowerCase()
    if (lowerLabel.includes('home') || lowerLabel.includes('house')) {
      return <Home className="h-5 w-5" />
    } else if (lowerLabel.includes('work') || lowerLabel.includes('office')) {
      return <Briefcase className="h-5 w-5" />
    } else {
      return <MapPinned className="h-5 w-5" />
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <MapPin className="h-8 w-8 mr-3 text-red-600" />
            Manage Addresses
          </h1>
          <p className="text-gray-600">Add and manage your delivery addresses</p>
        </motion.div>

        {/* Add New Address Button */}
        {!isAddingNew && (
          <Button
            onClick={() => setIsAddingNew(true)}
            className="mb-6 bg-red-600 hover:bg-red-700 w-full md:w-auto"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Address
          </Button>
        )}

        {/* Add/Edit Address Form */}
        {isAddingNew && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="shadow-lg bg-orange-50/50">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-orange-900">
                  {editingId ? 'Edit Address' : 'Add New Address'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-orange-900 mb-2">
                      Label / Address Type *
                    </label>
                    <Input
                      type="text"
                      name="label"
                      value={formData.label}
                      onChange={handleInputChange}
                      placeholder="e.g., Home, Work, Office"
                      required
                      className="bg-orange-50 border-orange-300 text-gray-900 placeholder:text-gray-500 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-orange-900 mb-2">
                      Complete Address *
                    </label>
                    <Input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House No., Building Name, Street"
                      required
                      className="bg-orange-50 border-orange-300 text-gray-900 placeholder:text-gray-500 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-orange-900 mb-2">
                      Landmark (Optional)
                    </label>
                    <Input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleInputChange}
                      placeholder="Nearby landmark"
                      className="bg-orange-50 border-orange-300 text-gray-900 placeholder:text-gray-500 focus:ring-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-orange-900 mb-2">
                        City *
                      </label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        required
                        className="bg-orange-50 border-orange-300 text-gray-900 placeholder:text-gray-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-orange-900 mb-2">
                        State *
                      </label>
                      <Input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        required
                        className="bg-orange-50 border-orange-300 text-gray-900 placeholder:text-gray-500 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-orange-900 mb-2">
                        Pincode *
                      </label>
                      <Input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="Pincode"
                        required
                        className="bg-orange-50 border-orange-300 text-gray-900 placeholder:text-gray-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-orange-300 rounded"
                    />
                    <label className="ml-2 text-sm text-orange-900">
                      Set as default address
                    </label>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700" disabled={isLoading}>
                      {isLoading ? 'Saving...' : editingId ? 'Update Address' : 'Save Address'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsAddingNew(false)
                        setEditingId(null)
                        setFormData({
                          label: '',
                          address: '',
                          landmark: '',
                          city: '',
                          state: '',
                          pincode: '',
                          isDefault: false
                        })
                      }}
                      className="flex-1"
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Saved Addresses */}
        {isLoading && addresses.length === 0 ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading addresses...</p>
          </div>
        ) : addresses.length > 0 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Saved Addresses</h2>
            {addresses.map((address, index) => (
              <motion.div
                key={address.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-red-100 rounded-lg text-red-600">
                            {getAddressIcon(address.label)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 capitalize">
                              {address.label}
                            </h3>
                            {address.isDefault && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-1">{address.address}</p>
                        {address.landmark && (
                          <p className="text-gray-600 mb-1 text-sm">Near {address.landmark}</p>
                        )}
                        <p className="text-gray-600">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(address)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(address.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {!address.isDefault && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSetDefault(address.id)}
                        className="mt-4 text-red-600 hover:text-red-700"
                      >
                        Set as Default
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : !isAddingNew && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-lg shadow-sm"
          >
            <MapPin className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No addresses saved
            </h3>
            <p className="text-gray-500 mb-6">
              Add your delivery addresses for faster checkout
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AddressManagement

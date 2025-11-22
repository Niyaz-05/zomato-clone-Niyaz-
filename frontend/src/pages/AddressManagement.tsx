import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Plus, Edit, Trash2, Home, Briefcase, MapPinned } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Input } from '../components/ui/input'
import toast from 'react-hot-toast'

interface Address {
  id: string
  type: 'home' | 'work' | 'other'
  label: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  pincode: string
  isDefault: boolean
}

const AddressManagement = () => {
  const [addresses, setAddresses] = useState<Address[]>([])
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Omit<Address, 'id'>>({
    type: 'home',
    label: '',
    addressLine1: '',
    addressLine2: '',
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

    // Load addresses from localStorage
    const savedAddresses = localStorage.getItem('zomato-addresses')
    if (savedAddresses) {
      setAddresses(JSON.parse(savedAddresses))
    }
  }, [isAuthenticated, navigate])

  const saveAddresses = (newAddresses: Address[]) => {
    setAddresses(newAddresses)
    localStorage.setItem('zomato-addresses', JSON.stringify(newAddresses))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.addressLine1 || !formData.city || !formData.state || !formData.pincode) {
      toast.error('Please fill all required fields')
      return
    }

    if (editingId) {
      // Update existing address
      const updatedAddresses = addresses.map(addr =>
        addr.id === editingId ? { ...formData, id: editingId } : addr
      )
      saveAddresses(updatedAddresses)
      toast.success('Address updated successfully!')
      setEditingId(null)
    } else {
      // Add new address
      const newAddress: Address = {
        ...formData,
        id: Date.now().toString()
      }

      // If this is the first address or marked as default, make it default
      if (addresses.length === 0 || formData.isDefault) {
        const updatedAddresses = addresses.map(addr => ({ ...addr, isDefault: false }))
        saveAddresses([...updatedAddresses, { ...newAddress, isDefault: true }])
      } else {
        saveAddresses([...addresses, newAddress])
      }

      toast.success('Address added successfully!')
      setIsAddingNew(false)
    }

    // Reset form
    setFormData({
      type: 'home',
      label: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      isDefault: false
    })
  }

  const handleEdit = (address: Address) => {
    setFormData(address)
    setEditingId(address.id)
    setIsAddingNew(true)
  }

  const handleDelete = (id: string) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== id)
    saveAddresses(updatedAddresses)
    toast.success('Address deleted successfully!')
  }

  const handleSetDefault = (id: string) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }))
    saveAddresses(updatedAddresses)
    toast.success('Default address updated!')
  }

  const getAddressIcon = (type: string) => {
    switch (type) {
      case 'home':
        return <Home className="h-5 w-5" />
      case 'work':
        return <Briefcase className="h-5 w-5" />
      default:
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
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  {editingId ? 'Edit Address' : 'Add New Address'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address Type *
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Label (Optional)
                      </label>
                      <Input
                        type="text"
                        name="label"
                        value={formData.label}
                        onChange={handleInputChange}
                        placeholder="e.g., Mom's House"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Line 1 *
                    </label>
                    <Input
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      placeholder="House No., Building Name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address Line 2 (Optional)
                    </label>
                    <Input
                      type="text"
                      name="addressLine2"
                      value={formData.addressLine2}
                      onChange={handleInputChange}
                      placeholder="Street, Area, Landmark"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <Input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <Input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pincode *
                      </label>
                      <Input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="Pincode"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="isDefault"
                      checked={formData.isDefault}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-700">
                      Set as default address
                    </label>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
                      {editingId ? 'Update Address' : 'Save Address'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsAddingNew(false)
                        setEditingId(null)
                        setFormData({
                          type: 'home',
                          label: '',
                          addressLine1: '',
                          addressLine2: '',
                          city: '',
                          state: '',
                          pincode: '',
                          isDefault: false
                        })
                      }}
                      className="flex-1"
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
        {addresses.length > 0 ? (
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
                            {getAddressIcon(address.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 capitalize">
                              {address.label || address.type}
                            </h3>
                            {address.isDefault && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-1">{address.addressLine1}</p>
                        {address.addressLine2 && (
                          <p className="text-gray-700 mb-1">{address.addressLine2}</p>
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

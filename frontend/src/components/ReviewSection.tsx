import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Star, ThumbsUp, User, Camera, X, Image as ImageIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useAuth } from '../lib/auth'
import { LazyImage } from './LazyImage'
import { reviewAPI, ReviewRequest } from '../lib/api'
import toast from 'react-hot-toast'

interface Review {
  id: string
  userId: number
  userName: string
  rating: number
  comment: string
  date: string
  helpful: number
  restaurantId: number
  images?: string[]
}

interface ReviewSectionProps {
  restaurantId: number
  restaurantName: string
}

const ReviewSection = ({ restaurantId, restaurantName }: ReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isWritingReview, setIsWritingReview] = useState(false)
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviewImages, setReviewImages] = useState<string[]>([])
  const [isUploadingImages, setIsUploadingImages] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    // Load reviews from backend API
    const loadReviews = async () => {
      try {
        const backendReviews = await reviewAPI.getRestaurantReviews(restaurantId)
        // Transform backend review format to frontend format
        const transformedReviews: Review[] = backendReviews.map((r: any) => ({
          id: r.id.toString(),
          userId: r.user?.id || 0,
          userName: r.user?.name || 'Anonymous',
          rating: r.rating,
          comment: r.comment,
          date: r.createdAt || new Date().toISOString(),
          helpful: 0,
          restaurantId: restaurantId,
          images: r.reviewImages ? JSON.parse(r.reviewImages) : []
        }))
        setReviews(transformedReviews)
      } catch (error) {
        console.error('Failed to load reviews:', error)
        // Fallback to localStorage if API fails
        const savedReviews = localStorage.getItem('zomato-reviews')
        if (savedReviews) {
          const allReviews: Review[] = JSON.parse(savedReviews)
          const restaurantReviews = allReviews.filter(r => r.restaurantId === restaurantId)
          setReviews(restaurantReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
        }
      }
    }
    loadReviews()
  }, [restaurantId])

  const handleSubmitReview = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to write a review')
      return
    }

    if (rating === 0) {
      toast.error('Please select a rating')
      return
    }

    if (!comment.trim()) {
      toast.error('Please write a comment')
      return
    }

    try {
      // Save to backend API - properly linked to user ID from JWT
      const reviewRequest: ReviewRequest = {
        restaurantId: restaurantId,
        rating: rating,
        comment: comment.trim(),
        images: reviewImages
      }

      const savedReview = await reviewAPI.createReview(reviewRequest)
      
      // Transform backend review to frontend format
      const newReview: Review = {
        id: savedReview.id.toString(),
        userId: savedReview.userId,
        userName: user!.name,
        rating: savedReview.rating,
        comment: savedReview.comment,
        date: savedReview.createdAt || new Date().toISOString(),
        helpful: 0,
        restaurantId: restaurantId,
        images: savedReview.images || []
      }

      setReviews([newReview, ...reviews])
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit review')
      return
    }
    setRating(0)
    setComment('')
    setReviewImages([])
    setIsWritingReview(false)
    toast.success('Review submitted successfully!')
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    if (reviewImages.length + files.length > 5) {
      toast.error('Maximum 5 images allowed')
      return
    }

    setIsUploadingImages(true)
    try {
      const newImages: string[] = []
      for (const file of files) {
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name} is not an image file`)
          continue
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name} is too large (max 5MB)`)
          continue
        }
        
        // Convert to base64
        const reader = new FileReader()
        await new Promise((resolve, reject) => {
          reader.onloadend = () => {
            newImages.push(reader.result as string)
            resolve(null)
          }
          reader.onerror = reject
          reader.readAsDataURL(file)
        })
      }
      setReviewImages(prev => [...prev, ...newImages])
      toast.success(`${newImages.length} image(s) added`)
    } catch (error) {
      toast.error('Failed to upload images')
    } finally {
      setIsUploadingImages(false)
    }
  }

  const removeImage = (index: number) => {
    setReviewImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleHelpful = (reviewId: string) => {
    const savedReviews = localStorage.getItem('zomato-reviews')
    if (savedReviews) {
      const allReviews: Review[] = JSON.parse(savedReviews)
      const updatedReviews = allReviews.map(r =>
        r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
      )
      localStorage.setItem('zomato-reviews', JSON.stringify(updatedReviews))
      
      setReviews(reviews.map(r =>
        r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
      ))
      toast.success('Thanks for your feedback!')
    }
  }

  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : '0.0'

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reviews & Ratings</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              <span className="text-2xl font-bold text-gray-900 ml-2">{averageRating}</span>
            </div>
            <span className="text-gray-600">({reviews.length} reviews)</span>
          </div>
        </div>
        {isAuthenticated && !isWritingReview && (
          <Button
            onClick={() => setIsWritingReview(true)}
            className="bg-red-600 hover:bg-red-700"
          >
            Write a Review
          </Button>
        )}
      </div>

      {/* Write Review Form */}
      {isWritingReview && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-lg p-6 mb-6"
        >
          <h3 className="font-semibold text-lg mb-4">Rate {restaurantName}</h3>
          
          {/* Star Rating */}
          <div className="flex items-center space-x-2 mb-4">
            <span className="text-sm text-gray-600 mr-2">Your Rating:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= (hoveredRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            {rating > 0 && (
              <span className="text-sm font-medium text-gray-700 ml-2">
                {rating === 1 && 'Poor'}
                {rating === 2 && 'Fair'}
                {rating === 3 && 'Good'}
                {rating === 4 && 'Very Good'}
                {rating === 5 && 'Excellent'}
              </span>
            )}
          </div>

          {/* Comment */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            rows={4}
          />

          {/* Image Upload */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Photos (Optional, max 5)
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingImages || reviewImages.length >= 5}
                className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-red-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Camera className="w-5 h-5" />
                <span className="text-sm">Add Photos</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              {isUploadingImages && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600"></div>
              )}
            </div>
            
            {/* Image Preview */}
            {reviewImages.length > 0 && (
              <div className="mt-4 grid grid-cols-5 gap-2">
                {reviewImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <LazyImage
                      src={image}
                      alt={`Review ${index + 1}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-3 mt-4">
            <Button
              onClick={handleSubmitReview}
              className="bg-red-600 hover:bg-red-700"
            >
              Submit Review
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setIsWritingReview(false)
                setRating(0)
                setComment('')
              }}
            >
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-200 pb-4 last:border-b-0"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3">{review.comment}</p>
                  <button
                    onClick={() => handleHelpful(review.id)}
                    className="flex items-center space-x-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>Helpful ({review.helpful})</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        </div>
      )}
    </div>
  )
}

export default ReviewSection

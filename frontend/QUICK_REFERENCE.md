# ⚡ Quick Reference Card - Cinematic Enhancements

## 🎨 Import Cheat Sheet

```tsx
// Animations
import { card3D, buttonBounce, heartPop, fadeIn, staggerContainer } from '../lib/animations'

// Sounds
import { playAddToCart, playSuccess, playFavorite, soundManager } from '../lib/sounds'

// Voice Search
import { voiceSearch } from '../lib/voiceSearch'

// Recommendations
import { recommendationEngine } from '../lib/smartRecommendations'

// Components
import GlassCard from '../components/GlassCard'
import HeartButton from '../components/HeartButton'
import VoiceSearchButton from '../components/VoiceSearchButton'
import SmartSearchBar from '../components/SmartSearchBar'
import RecommendationCarousel from '../components/RecommendationCarousel'
import { RestaurantCardSkeleton, FoodCardSkeleton } from '../components/ShimmerSkeleton'
```

---

## 🎭 Animation Quick Codes

```tsx
// 3D Card
<motion.div variants={card3D} initial="initial" whileHover="hover">

// Button Bounce
<motion.button variants={buttonBounce} whileTap="tap">

// Staggered List
<motion.div variants={staggerContainer} initial="initial" animate="animate">
  {items.map(item => <motion.div key={item.id} variants={staggerItem} />)}
</motion.div>

// Fade In
<motion.div variants={fadeIn} initial="initial" animate="animate">

// Slide In
<motion.div variants={slideInLeft} initial="initial" animate="animate">
```

---

## 🔊 Sound Quick Codes

```tsx
// Play sounds
playAddToCart()
playSuccess()
playFavorite()
playError()
playNotification()
playOrderPlaced()

// Control
soundManager.toggle()        // Toggle on/off
soundManager.isEnabled()     // Check status
soundManager.setEnabled(false) // Set state
```

---

## 🎨 CSS Quick Classes

```css
/* Animations */
.animate-gradient-x      /* Animated gradient horizontal */
.animate-shimmer        /* Loading shimmer */
.animate-pulse-glow     /* Pulsing glow */
.animate-float          /* Floating motion */

/* Effects */
.gradient-text          /* Gradient text fill */
.glass                  /* Glassmorphism */
.neon-glow             /* Neon glow (dark mode) */
.scrollbar-hide        /* Hide scrollbar */

/* Gradients */
.bg-gradient-to-r from-red-500 via-orange-500 to-pink-500
.bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
```

---

## 📱 Component Quick Templates

### GlassCard
```tsx
<GlassCard glowColor="red" animated={true}>
  <div className="p-6">Content</div>
</GlassCard>
```

### HeartButton
```tsx
<HeartButton isLiked={liked} onToggle={toggle} size="md" />
```

### SmartSearchBar
```tsx
<SmartSearchBar
  value={query}
  onChange={setQuery}
  onSearch={handleSearch}
/>
```

### Recommendation Carousel
```tsx
<RecommendationCarousel items={items} title="You May Also Like" />
```

### Loading Skeleton
```tsx
{loading ? <RestaurantCardSkeleton /> : <RestaurantCard {...props} />}
```

---

## 🧠 Smart Features Quick Codes

### Voice Search
```tsx
voiceSearch.startListening(
  (transcript) => handleResult(transcript),
  (error) => handleError(error)
)
```

### Recommendations
```tsx
// Similar items
const similar = recommendationEngine.getSimilarItems(item, allItems, 3)

// Complementary items
const complementary = recommendationEngine.getComplementaryItems(item, allItems, 3)

// Smart suggestions
const suggestions = recommendationEngine.getSmartSuggestions('spicy')
```

---

## 🎨 Gradient Combinations

```tsx
// Red to Orange
className="bg-gradient-to-r from-red-500 via-orange-500 to-pink-500"

// Purple to Pink
className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"

// Yellow to Orange
className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500"

// Animated
className="bg-gradient-to-r from-red-500 to-orange-500 animate-gradient-x"
```

---

## 🌙 Dark Mode Quick Codes

```tsx
// Text colors
className="text-gray-900 dark:text-white"
className="text-gray-600 dark:text-gray-400"

// Backgrounds
className="bg-white dark:bg-gray-900"
className="bg-gray-50 dark:bg-gray-800"

// Borders
className="border-gray-200 dark:border-gray-700"

// Neon glow
className="neon-glow" // Auto-glows in dark mode
```

---

## 📊 Common Patterns

### Loading State
```tsx
{loading ? (
  <RestaurantListSkeleton />
) : (
  <RestaurantGrid restaurants={data} />
)}
```

### With Sound
```tsx
const handleClick = () => {
  playSuccess()
  // Your logic
}
```

### 3D Card with Glow
```tsx
<motion.div
  variants={card3D}
  whileHover="hover"
  className="relative group"
  style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
>
  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl opacity-0 group-hover:opacity-75 blur" />
  <div className="relative bg-white dark:bg-gray-900 rounded-3xl">
    {/* Content */}
  </div>
</motion.div>
```

---

## 🎯 Performance Tips

```tsx
// Lazy load
const Component = lazy(() => import('./Component'))

// Memoize
const memoizedValue = useMemo(() => expensiveCalc(), [deps])

// Debounce
const debouncedSearch = useMemo(
  () => debounce(handleSearch, 300),
  []
)

// Reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

---

## 🐛 Debug Quick Checks

```tsx
// Check sound status
console.log(soundManager.isEnabled())

// Check voice support
console.log(voiceSearch.isSupported())

// Check dark mode
console.log(document.documentElement.classList.contains('dark'))

// Check cart state
console.log(useCart().state)
```

---

## 📱 Responsive Breakpoints

```tsx
// Tailwind breakpoints
sm:  640px   // Small devices
md:  768px   // Medium devices
lg:  1024px  // Large devices
xl:  1280px  // Extra large
2xl: 1536px  // 2X large

// Usage
className="text-sm md:text-base lg:text-lg"
className="hidden md:block"
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

---

## 🎨 Color Palette

```tsx
// Primary
red-500    #ef4444
red-600    #dc2626

// Secondary
orange-500 #f97316
pink-500   #ec4899

// Success
green-500  #22c55e
green-600  #16a34a

// Warning
yellow-500 #eab308
orange-500 #f97316

// Dark Mode
gray-900   #111827
gray-800   #1f2937
gray-700   #374151
```

---

## ⚡ One-Liners

```tsx
// Play sound on click
onClick={() => { playAddToCart(); addToCart(item) }}

// Toggle with sound
onClick={() => { playFavorite(); toggleFavorite() }}

// Voice search
<VoiceSearchButton onResult={setQuery} />

// Animated button
<motion.button variants={buttonBounce} whileTap="tap">

// Glass card
<GlassCard glowColor="red">Content</GlassCard>

// Loading skeleton
{loading ? <Skeleton /> : <Content />}

// Gradient text
<h1 className="gradient-text">Title</h1>

// Neon button
<button className="neon-glow">Click</button>
```

---

## 🔗 File Locations

```
src/
├── lib/
│   ├── animations.ts              # Animation variants
│   ├── sounds.ts                  # Sound system
│   ├── voiceSearch.ts            # Voice search
│   └── smartRecommendations.ts   # Recommendations
├── components/
│   ├── GlassCard.tsx
│   ├── HeartButton.tsx
│   ├── VoiceSearchButton.tsx
│   ├── SmartSearchBar.tsx
│   ├── RecommendationCarousel.tsx
│   ├── ShimmerSkeleton.tsx
│   ├── ConfettiExplosion.tsx
│   ├── BottomNavigation.tsx
│   ├── ParallaxSection.tsx
│   ├── VideoBackground.tsx
│   ├── AnimatedTagline.tsx
│   └── SoundToggle.tsx
└── index.css                      # Global styles
```

---

## 📚 Documentation

- **CINEMATIC_ENHANCEMENTS.md** - Complete feature docs
- **ENHANCEMENT_GUIDE.md** - Quick start guide
- **TRANSFORMATION_SUMMARY.md** - Overview & metrics
- **QUICK_REFERENCE.md** - This file

---

**Keep this handy while coding! 🚀**

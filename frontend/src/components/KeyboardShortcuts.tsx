import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../lib/auth'
import toast from 'react-hot-toast'

/**
 * Keyboard shortcuts for better UX
 * - Ctrl/Cmd + K: Focus search
 * - Ctrl/Cmd + /: Show shortcuts help
 * - Esc: Close modals/clear search
 */
export const KeyboardShortcuts = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K: Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        const searchInput = document.querySelector('input[type="text"][placeholder*="Search"]') as HTMLInputElement
        if (searchInput) {
          searchInput.focus()
          searchInput.select()
        }
      }

      // Ctrl/Cmd + /: Show shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault()
        toast('Keyboard Shortcuts:\nCtrl+K: Search\nEsc: Close/Clear\nCtrl+/: This help', {
          duration: 4000,
          icon: '⌨️',
        })
      }

      // Esc: Close modals or clear search
      if (e.key === 'Escape') {
        const searchInput = document.querySelector('input[type="text"][placeholder*="Search"]') as HTMLInputElement
        if (searchInput && document.activeElement === searchInput) {
          searchInput.value = ''
          searchInput.blur()
        }
      }

      // Quick navigation (only when not typing in input)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return
      }

      // Number keys for quick navigation (when authenticated)
      if (isAuthenticated && e.key >= '1' && e.key <= '9') {
        const routes: { [key: string]: string } = {
          '1': '/',
          '2': '/restaurants',
          '3': '/cart',
          '4': '/favorites',
          '5': '/order-history',
          '6': '/profile',
        }
        const route = routes[e.key]
        if (route) {
          navigate(route)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate, isAuthenticated])

  return null
}


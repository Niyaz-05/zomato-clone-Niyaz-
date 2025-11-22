// Push Notifications Service
export class NotificationService {
  private static instance: NotificationService
  private permission: NotificationPermission = 'default'

  private constructor() {
    if ('Notification' in window) {
      this.permission = Notification.permission
    }
  }

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  async requestPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications')
      return false
    }

    if (this.permission === 'granted') {
      return true
    }

    if (this.permission === 'default') {
      const permission = await Notification.requestPermission()
      this.permission = permission
      return permission === 'granted'
    }

    return false
  }

  async sendNotification(title: string, options?: NotificationOptions): Promise<void> {
    if (!('Notification' in window)) {
      return
    }

    if (this.permission !== 'granted') {
      const granted = await this.requestPermission()
      if (!granted) {
        console.warn('Notification permission denied')
        return
      }
    }

    try {
      const notification = new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      })

      // Auto close after 5 seconds
      setTimeout(() => {
        notification.close()
      }, 5000)

      // Handle click
      notification.onclick = () => {
        window.focus()
        notification.close()
      }
    } catch (error) {
      console.error('Error showing notification:', error)
    }
  }

  // Order notifications
  async notifyOrderPlaced(orderId: string) {
    await this.sendNotification('Order Placed! 🎉', {
      body: `Your order #${orderId} has been placed successfully!`,
      tag: `order-${orderId}`,
      requireInteraction: false
    })
  }

  async notifyOrderStatus(orderId: string, status: string) {
    const statusMessages: { [key: string]: string } = {
      'confirmed': 'Your order has been confirmed!',
      'preparing': 'Your order is being prepared 👨‍🍳',
      'ready': 'Your order is ready for pickup!',
      'out_for_delivery': 'Your order is out for delivery! 🚚',
      'delivered': 'Your order has been delivered! Enjoy! 🎉',
      'cancelled': 'Your order has been cancelled'
    }

    await this.sendNotification('Order Update', {
      body: statusMessages[status] || `Your order status: ${status}`,
      tag: `order-${orderId}`,
      requireInteraction: status === 'delivered'
    })
  }

  // Offer notifications
  async notifyNewOffer(title: string, description: string) {
    await this.sendNotification(`New Offer: ${title}`, {
      body: description,
      tag: 'offer',
      requireInteraction: false
    })
  }

  // Reminder notifications
  async notifyReminder(message: string) {
    await this.sendNotification('Reminder', {
      body: message,
      tag: 'reminder'
    })
  }
}

export const notificationService = NotificationService.getInstance()


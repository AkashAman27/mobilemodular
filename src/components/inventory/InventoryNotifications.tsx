'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Bell, X, Settings, AlertCircle, CheckCircle, Info, 
  TrendingDown, MapPin, Calendar, Clock, DollarSign,
  Building, Eye, Heart, Zap, Star, Package
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from 'react-hot-toast'
import Link from 'next/link'

interface Notification {
  id: string
  type: 'price_drop' | 'availability' | 'new_similar' | 'back_in_stock' | 'limited_time' | 'popular_item'
  title: string
  message: string
  item_id?: string
  item_name?: string
  item_image?: string
  location?: string
  old_price?: number
  new_price?: number
  discount_percentage?: number
  expires_at?: string
  is_read: boolean
  is_urgent: boolean
  created_at: string
  action_url?: string
}

interface AlertSettings {
  price_alerts: boolean
  availability_alerts: boolean
  similar_items_alerts: boolean
  promotional_alerts: boolean
  email_notifications: boolean
  push_notifications: boolean
  max_price_drop: number
  preferred_locations: string[]
  preferred_categories: string[]
}

export default function InventoryNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showPanel, setShowPanel] = useState(false)
  const [alertSettings, setAlertSettings] = useState<AlertSettings>({
    price_alerts: true,
    availability_alerts: true,
    similar_items_alerts: false,
    promotional_alerts: true,
    email_notifications: true,
    push_notifications: false,
    max_price_drop: 10,
    preferred_locations: [],
    preferred_categories: []
  })

  const supabase = createClient()

  useEffect(() => {
    // Load existing notifications
    loadNotifications()
    
    // Set up real-time subscription for new notifications
    const subscription = supabase
      .channel('inventory_notifications')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'inventory_items_enhanced' 
        }, 
        handleInventoryChange
      )
      .subscribe()

    // Simulated real-time notifications for demo
    const interval = setInterval(generateSimulatedNotification, 30000) // Every 30 seconds

    return () => {
      subscription.unsubscribe()
      clearInterval(interval)
    }
  }, [])

  const loadNotifications = async () => {
    try {
      // In a real app, this would fetch from a notifications table
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'price_drop',
          title: 'Price Drop Alert!',
          message: '20\' x 8\' Office Building in Atlanta dropped to $1,200/month',
          item_id: 'item-123',
          item_name: '20\' x 8\' Office Building',
          location: 'Atlanta, GA',
          old_price: 1500,
          new_price: 1200,
          discount_percentage: 20,
          is_read: false,
          is_urgent: true,
          created_at: new Date(Date.now() - 3600000).toISOString(),
          action_url: '/resources/live-inventory/item-123'
        },
        {
          id: '2',
          type: 'availability',
          title: 'Back in Stock',
          message: 'Large Conference Room Module now available in Birmingham',
          item_id: 'item-456',
          item_name: 'Large Conference Room Module',
          location: 'Birmingham, AL',
          is_read: false,
          is_urgent: false,
          created_at: new Date(Date.now() - 7200000).toISOString(),
          action_url: '/resources/live-inventory/item-456'
        },
        {
          id: '3',
          type: 'new_similar',
          title: 'Similar Item Available',
          message: 'Found a similar office building you might like',
          item_id: 'item-789',
          item_name: 'Executive Office Suite',
          location: 'Montgomery, AL',
          is_read: true,
          is_urgent: false,
          created_at: new Date(Date.now() - 86400000).toISOString(),
          action_url: '/resources/live-inventory/item-789'
        }
      ]
      
      setNotifications(mockNotifications)
      setUnreadCount(mockNotifications.filter(n => !n.is_read).length)
    } catch (error) {
      console.error('Error loading notifications:', error)
    }
  }

  const handleInventoryChange = (payload: any) => {
    // Handle real-time inventory changes
    console.log('Inventory changed:', payload)
    
    // Generate notification based on change type
    if (payload.eventType === 'INSERT') {
      generateNotification({
        type: 'availability',
        title: 'New Building Available!',
        message: `${payload.new.name} is now available in ${payload.new.location_city}`,
        item_id: payload.new.id,
        item_name: payload.new.name,
        location: `${payload.new.location_city}, ${payload.new.location_state}`
      })
    }
  }

  const generateSimulatedNotification = () => {
    const types = ['price_drop', 'availability', 'popular_item', 'limited_time'] as const
    const randomType = types[Math.floor(Math.random() * types.length)]
    
    const templates = {
      price_drop: {
        title: 'Price Drop Alert!',
        message: 'Mobile Office Unit in Mobile dropped by 15%',
        is_urgent: true
      },
      availability: {
        title: 'Just Became Available',
        message: 'Premium Classroom Module in Huntsville',
        is_urgent: false
      },
      popular_item: {
        title: 'Trending Now',
        message: 'Security Office Building - High demand in your area',
        is_urgent: false
      },
      limited_time: {
        title: 'Limited Time Offer',
        message: '25% off setup fees - Expires in 24 hours',
        is_urgent: true
      }
    }

    const template = templates[randomType]
    generateNotification({
      type: randomType,
      title: template.title,
      message: template.message,
      is_urgent: template.is_urgent
    })
  }

  const generateNotification = (notificationData: Partial<Notification>) => {
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      type: 'availability',
      title: 'New Notification',
      message: '',
      is_read: false,
      is_urgent: false,
      created_at: new Date().toISOString(),
      ...notificationData
    }

    setNotifications(prev => [newNotification, ...prev])
    setUnreadCount(prev => prev + 1)

    // Show toast notification
    toast.custom((t) => (
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.9 }}
        className={`max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 ${
          newNotification.is_urgent ? 'border-l-4 border-l-red-500' : 'border-l-4 border-l-blue-500'
        }`}
      >
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-gray-900">
                {newNotification.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {newNotification.message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-200">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </motion.div>
    ), { duration: 5000 })
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, is_read: true } : n
    ))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })))
    setUnreadCount(0)
  }

  const deleteNotification = (notificationId: string) => {
    const notification = notifications.find(n => n.id === notificationId)
    if (notification && !notification.is_read) {
      setUnreadCount(prev => Math.max(0, prev - 1))
    }
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
  }

  const getNotificationIcon = (type: string, isUrgent: boolean) => {
    const baseClasses = `h-5 w-5 ${isUrgent ? 'text-red-500' : 'text-blue-500'}`
    
    switch (type) {
      case 'price_drop':
        return <TrendingDown className={baseClasses} />
      case 'availability':
        return <Package className={baseClasses} />
      case 'new_similar':
        return <Eye className={baseClasses} />
      case 'back_in_stock':
        return <CheckCircle className={baseClasses} />
      case 'popular_item':
        return <Star className={baseClasses} />
      case 'limited_time':
        return <Clock className={baseClasses} />
      default:
        return <Info className={baseClasses} />
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000)
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <>
      {/* Notification Bell */}
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowPanel(!showPanel)}
          className="relative p-2"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.div>
          )}
        </Button>

        {/* Notification Panel */}
        <AnimatePresence>
          {showPanel && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 max-h-96 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Notifications ({unreadCount} new)
                </h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Mark all read
                    </Button>
                  )}
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowPanel(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 hover:bg-gray-50 cursor-pointer ${
                          !notification.is_read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                        }`}
                        onClick={() => {
                          markAsRead(notification.id)
                          if (notification.action_url) {
                            window.location.href = notification.action_url
                          }
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type, notification.is_urgent)}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className={`text-sm font-medium ${
                                  !notification.is_read ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {notification.message}
                                </p>
                                
                                {/* Additional Info */}
                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                  <span>{formatTimeAgo(notification.created_at)}</span>
                                  {notification.location && (
                                    <span className="flex items-center">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {notification.location}
                                    </span>
                                  )}
                                  {notification.old_price && notification.new_price && (
                                    <span className="flex items-center text-green-600">
                                      <DollarSign className="h-3 w-3 mr-1" />
                                      {notification.discount_percentage}% off
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 ml-3">
                                {notification.is_urgent && (
                                  <Badge variant="destructive" className="text-xs">
                                    Urgent
                                  </Badge>
                                )}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    deleteNotification(notification.id)
                                  }}
                                  className="p-1 h-auto"
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No notifications yet</p>
                    <p className="text-sm mt-1">We'll notify you of price drops and new inventory</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200 bg-gray-50">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Background Overlay */}
      {showPanel && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowPanel(false)}
        />
      )}
    </>
  )
}

// Alert Settings Component (can be used in a separate settings page)
export function AlertSettings() {
  const [settings, setSettings] = useState<AlertSettings>({
    price_alerts: true,
    availability_alerts: true,
    similar_items_alerts: false,
    promotional_alerts: true,
    email_notifications: true,
    push_notifications: false,
    max_price_drop: 10,
    preferred_locations: [],
    preferred_categories: []
  })

  const saveSettings = async () => {
    try {
      // Save to localStorage or database
      localStorage.setItem('inventory-alert-settings', JSON.stringify(settings))
      toast.success('Alert settings saved!')
    } catch (error) {
      toast.error('Failed to save settings')
    }
  }

  return (
    <Card className="max-w-2xl">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-navy-600 mb-6">Alert Preferences</h3>
        
        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="alerts">Alert Types</TabsTrigger>
            <TabsTrigger value="delivery">Delivery</TabsTrigger>
          </TabsList>
          
          <TabsContent value="alerts" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Price Drop Alerts</h4>
                  <p className="text-sm text-gray-600">Get notified when prices decrease</p>
                </div>
                <Checkbox
                  checked={settings.price_alerts}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, price_alerts: !!checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Availability Alerts</h4>
                  <p className="text-sm text-gray-600">Know when buildings become available</p>
                </div>
                <Checkbox
                  checked={settings.availability_alerts}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, availability_alerts: !!checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Similar Items</h4>
                  <p className="text-sm text-gray-600">Suggestions based on your viewing history</p>
                </div>
                <Checkbox
                  checked={settings.similar_items_alerts}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, similar_items_alerts: !!checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Promotional Offers</h4>
                  <p className="text-sm text-gray-600">Limited time deals and discounts</p>
                </div>
                <Checkbox
                  checked={settings.promotional_alerts}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, promotional_alerts: !!checked }))
                  }
                />
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Minimum Price Drop Threshold</h4>
              <div className="px-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">5%</span>
                  <span className="text-sm font-medium">{settings.max_price_drop}%</span>
                  <span className="text-sm text-gray-600">50%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={settings.max_price_drop}
                  onChange={(e) => setSettings(prev => ({ ...prev, max_price_drop: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="delivery" className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive alerts via email</p>
                </div>
                <Checkbox
                  checked={settings.email_notifications}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, email_notifications: !!checked }))
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-gray-600">Real-time browser notifications</p>
                </div>
                <Checkbox
                  checked={settings.push_notifications}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, push_notifications: !!checked }))
                  }
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end pt-6 border-t">
          <Button onClick={saveSettings}>
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
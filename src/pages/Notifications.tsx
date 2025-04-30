import React, { useEffect, useState } from 'react';
import { useNotificationStore } from '../store/notificationStore';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import { formatDistanceToNow } from 'date-fns';
import { Bell, Check, Video, UserPlus, Mail } from 'lucide-react';

export default function Notifications() {
  const { notifications, unreadCount, isLoading, fetchNotifications, markAsRead, markAllAsRead } = useNotificationStore();
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);
  
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);
  
  const getNotificationIcon = (type?: string) => {
    switch (type) {
      case 'video_approval':
        return <Video className="w-5 h-5" />;
      case 'invite_request':
        return <UserPlus className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };
  
  const getNotificationColor = (type?: string) => {
    switch (type) {
      case 'video_approval':
        return 'bg-blue-100 text-blue-600';
      case 'invite_request':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-purple-100 text-purple-600';
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Notifications</h1>
        
        {unreadCount > 0 && (
          <button
            onClick={() => markAllAsRead()}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg"
            style={{ color: themeColors.primary }}
          >
            <Check className="w-4 h-4" />
            Mark all as read
          </button>
        )}
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading notifications...</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 rounded-full bg-gray-100">
              <Bell className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          <p className="text-gray-600">You don't have any notifications yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`bg-white rounded-xl shadow-sm p-4 flex items-start gap-4 ${
                !notification.read ? 'border-l-4' : ''
              }`}
              style={{ borderLeftColor: !notification.read ? themeColors.primary : 'transparent' }}
            >
              <div className={`p-3 rounded-full ${getNotificationColor(notification.type)}`}>
                {getNotificationIcon(notification.type)}
              </div>
              
              <div className="flex-1">
                <p className="text-gray-800">{notification.content}</p>
                <p className="text-gray-500 text-sm mt-1">
                  {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                </p>
                
                {notification.reference && notification.type === 'video_approval' && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">
                      Video: {notification.reference.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: <span className={
                        notification.reference.approval_status === 'approved' 
                          ? 'text-green-600' 
                          : notification.reference.approval_status === 'rejected'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }>
                        {notification.reference.approval_status.charAt(0).toUpperCase() + 
                          notification.reference.approval_status.slice(1)}
                      </span>
                    </p>
                  </div>
                )}
                
                {notification.reference && notification.type === 'invite_request' && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium">
                      {notification.reference.name} ({notification.reference.email})
                    </p>
                    <p className="text-sm text-gray-600">
                      Status: <span className={
                        notification.reference.status === 'approved' 
                          ? 'text-green-600' 
                          : notification.reference.status === 'rejected'
                          ? 'text-red-600'
                          : 'text-yellow-600'
                      }>
                        {notification.reference.status.charAt(0).toUpperCase() + 
                          notification.reference.status.slice(1)}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Check className="w-5 h-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
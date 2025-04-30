
import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { useThemeStore, getThemeColors } from '../store/themeStore';
import { Users, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { InviteModal } from '../components/InviteModal';

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

interface Invite {
  email: string;
  updated_at: string;
  created_at: string;
  is_signed_up: boolean;
}

interface User {
  id: number;
  email: string;
  name: string;
  username: string;
  created_at: string;
}

export default function UserManagement() {
  const { user, isAdmin } = useAuthStore();
  const { color } = useThemeStore();
  const themeColors = getThemeColors(color);
  
  const [activeSection, setActiveSection] = useState<'invites' | 'users'>('invites');
  const [invites, setInvites] = useState<Invite[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  
  const fetchData = async () => {
    setIsLoading(true);
    setError('');

    try {
      if (activeSection === 'invites') {
        const { data: invitesData } = await api.get('/auth/invites');
        setInvites(invitesData);
      } else {
        const { data: usersData } = await api.get('/auth/users');
        setUsers(usersData);
      }
    } catch (error: any) {
      console.error('Error fetching data:', error);
      
      if (error.response?.status === 500) {
        setError('No user found');
      } else {
        setError(error.response?.data?.message || 'Failed to fetch data');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => { 
    if (!isAdmin) {
      setError('You do not have permission to access this page');
      setIsLoading(false);
      return;
    }
  
    fetchData();
  }, [isAdmin, activeSection]);

  const handleDeleteUser = async (userId: number) => {
    toast((t) => (
      <div className="flex items-center gap-4">
        <p>Are you sure you want to delete this user?</p>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700"
            onClick={async () => {
              toast.dismiss(t.id);
              setIsDeleting(userId);
              setError('');

              try {
                await api.delete(`/auth/users/${userId}`);
                setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
                toast.success('User deleted successfully');
              } catch (error: any) {
                console.error('Error deleting user:', error);
                toast.error(error.response?.data?.message || 'Failed to delete user');
              } finally {
                setIsDeleting(null);
              }
            }}
          >
            Delete
          </button>
          <button
            className="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-center',
    });
  };
  
  if (!isAdmin) {
    return (
      <div className="text-center">
        <div className="bg-red-100 text-red-700 p-4 rounded-lg">
          <p>You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  

  const renderInvitesTable = () => (
    <div className="overflow-x-auto">
      <div className="mb-4">
        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg rounded-lg transition-colors hover:opacity-90"
          style={{ backgroundColor: themeColors.primary }}
        >
          Invite User
        </button>
      </div>
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invited On</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {invites.map((invite) => (
              <tr key={invite.email}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{invite.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(invite.updated_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    invite.is_signed_up 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {invite.is_signed_up ? 'Accepted' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {invites.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No invites found.
          </div>
        )}
      </div>
    </div>
  );

  const renderUsersTable = () => (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined On</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button 
                    className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={isDeleting === user.id}
                  >
                    {isDeleting === user.id ? (
                      <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {users.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No users found.
          </div>
        )}
      </div>
    </div>
  );
  
  return (
    <div>
      <Toaster position="top-right" />
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveSection('invites')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeSection === 'invites'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          Manage Invites
        </button>
        <button
          onClick={() => setActiveSection('users')}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeSection === 'users'
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
          }`}
        >
          Manage Users
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-6">
        {activeSection === 'invites' ? 'Manage Invites' : 'Manage Users'}
      </h2>
      
      {error && (
        <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
          <p>{error}</p>
        </div>
      )}
      
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          <p className="mt-2 text-gray-600">Loading data...</p>
        </div>
      ) : (
        activeSection === 'invites' ? renderInvitesTable() : renderUsersTable()
      )}

      <InviteModal 
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onInviteSuccess={() => {
          fetchData();
        }}
      />
    </div>
  );
}
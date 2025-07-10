import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [editMode, setEditMode] = useState(false);
  
  const user = {
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    joinDate: 'January 15, 2023',
    orders: 12,
    points: 420,
    level: 'Bronze',
  };
  
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
  });

  const orders = [
    { id: 'ORD-001', date: '2023-05-15', items: 3, total: 149.99, status: 'Delivered' },
    { id: 'ORD-002', date: '2023-06-22', items: 2, total: 89.99, status: 'Shipped' },
    { id: 'ORD-003', date: '2023-07-01', items: 5, total: 199.99, status: 'Processing' },
  ];
  
  const reviews = [
    { product: 'Wireless Headphones', rating: 5, date: '2023-06-10' },
    { product: 'Running Shoes', rating: 4, date: '2023-05-22' },
    { product: 'Smart Watch Pro', rating: 5, date: '2023-04-15' },
  ];
  
  const addresses = [
    { id: 1, name: 'Home', address: '123 Main St, New York, NY 10001', isDefault: true },
    { id: 2, name: 'Work', address: '456 Business Ave, New York, NY 10005', isDefault: false },
  ];

  return (
    <div className="min-h-screen bg-brutalYellow py-8 font-brutal">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Sidebar */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="md:w-1/3"
          >
            <div className="brutal-card p-6 mb-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-brutalPink border-4 border-black flex items-center justify-center text-black text-3xl font-bold mb-4">
                  {userData.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-bold mb-1">{userData.name}</h2>
                <p className="text-gray-600 mb-4">{userData.email}</p>
                
                <div className="flex justify-center space-x-4 mb-6">
                  <div className="text-center">
                    <div className="text-xl font-bold">{user.orders}</div>
                    <div className="text-gray-500 text-sm">Orders</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{user.points}</div>
                    <div className="text-gray-500 text-sm">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{user.level}</div>
                    <div className="text-gray-500 text-sm">Tier</div>
                  </div>
                </div>
                
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="brutal-button w-full"
                >
                  {editMode ? 'Save Changes' : 'Edit Profile'}
                </button>
              </div>
            </div>
            
            <div className="brutal-card p-6">
              <h3 className="text-lg font-bold mb-4">Account Details</h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Member since:</span>
                  <span className="font-medium">{user.joinDate}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{userData.email}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{userData.phone}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span>
                </li>
              </ul>
            </div>
          </motion.div>
          
          {/* Main Content */}
          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="md:w-2/3"
          >
            {/* Tabs */}
            <div className="brutal-card mb-6">
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-6 py-4 font-medium ${
                    activeTab === 'orders' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  My Orders
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-4 font-medium ${
                    activeTab === 'reviews' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  My Reviews
                </button>
                <button
                  onClick={() => setActiveTab('addresses')}
                  className={`px-6 py-4 font-medium ${
                    activeTab === 'addresses' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Addresses
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-6 py-4 font-medium ${
                    activeTab === 'settings' 
                      ? 'text-blue-600 border-b-2 border-blue-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Settings
                </button>
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
                    {orders.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-5xl mb-4">📦</div>
                        <p className="text-gray-600">You haven't placed any orders yet</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-bold">Order #{order.id}</div>
                                <div className="text-gray-500 text-sm">Placed on {order.date}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-bold">${order.total.toFixed(2)}</div>
                                <div className={`text-sm ${
                                  order.status === 'Delivered' ? 'text-green-600' :
                                  order.status === 'Shipped' ? 'text-blue-600' :
                                  'text-yellow-600'
                                }`}>
                                  {order.status}
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 flex justify-between items-center">
                              <div className="text-sm">
                                {order.items} item{order.items > 1 ? 's' : ''}
                              </div>
                              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Your Reviews</h3>
                    {reviews.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="text-5xl mb-4">🌟</div>
                        <p className="text-gray-600">You haven't reviewed any products yet</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {reviews.map((review, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between">
                              <div className="font-bold">{review.product}</div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg 
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg" 
                                    className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <div className="mt-2 text-gray-600">
                              "This product exceeded my expectations. Highly recommend!"
                            </div>
                            <div className="mt-2 text-gray-500 text-sm">
                              Reviewed on {review.date}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Addresses Tab */}
                {activeTab === 'addresses' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Saved Addresses</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map((address) => (
                        <div 
                          key={address.id} 
                          className={`border rounded-lg p-4 relative ${
                            address.isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                          }`}
                        >
                          {address.isDefault && (
                            <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                              Default
                            </div>
                          )}
                          <div className="font-bold mb-2">{address.name}</div>
                          <div className="text-gray-600">{address.address}</div>
                          <div className="mt-4 flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 text-sm">
                              Edit
                            </button>
                            <button className="text-red-600 hover:text-red-800 text-sm">
                              Remove
                            </button>
                            {!address.isDefault && (
                              <button className="text-green-600 hover:text-green-800 text-sm">
                                Set as Default
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50 transition">
                        <div className="text-3xl mb-2">+</div>
                        <div className="font-medium">Add New Address</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Settings Tab */}
                {activeTab === 'settings' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Account Settings</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={userData.name}
                          onChange={(e) => setUserData({...userData, name: e.target.value})}
                          className="w-full border-4 border-black px-4 py-2"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={userData.email}
                          onChange={(e) => setUserData({...userData, email: e.target.value})}
                          className="w-full border-4 border-black px-4 py-2"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={userData.phone}
                          onChange={(e) => setUserData({...userData, phone: e.target.value})}
                          className="w-full border-4 border-black px-4 py-2"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-2">Address</label>
                        <textarea
                          value={userData.address}
                          onChange={(e) => setUserData({...userData, address: e.target.value})}
                          className="w-full border-4 border-black px-4 py-2"
                          rows={3}
                        ></textarea>
                      </div>
                      
                      <div className="pt-4">
                        <button className="brutal-button">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Rewards Card */}
            <div className="brutal-card bg-brutalPink text-black">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold mb-2">Your Rewards Status</h3>
                  <div className="flex items-center">
                    <div className="bg-white/20 px-3 py-1 rounded-full text-sm mr-4">
                      {user.level} Tier
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2">⭐</div>
                      <span className="font-bold">{user.points} points</span>
                    </div>
                  </div>
                </div>
                <button className="brutal-button">
                  View Rewards
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
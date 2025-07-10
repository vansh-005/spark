import React from 'react';
import { motion } from 'framer-motion';

const Missions: React.FC = () => {
  const missions = [
    { id: 1, title: 'First Purchase', description: 'Make your first purchase', points: 100, completed: true },
    { id: 2, title: 'Refer a Friend', description: 'Share your referral code', points: 200, completed: false },
    { id: 3, title: 'Review Products', description: 'Write 3 reviews', points: 150, completed: false },
    { id: 4, title: 'Weekly Shopper', description: 'Purchase 3 items in a week', points: 300, completed: false },
    { id: 5, title: 'Loyal Customer', description: 'Make 5 purchases', points: 500, completed: false },
    { id: 6, title: 'Social Butterfly', description: 'Share on social media', points: 50, completed: true },
  ];

  return (
    <div className="min-h-screen bg-brutalYellow py-8 font-brutal">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Your Missions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Complete missions to earn rewards and level up your shopping experience
          </p>
        </div>
        
        {/* Rewards Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="brutal-card bg-brutalPink mb-10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold mb-2">Your Rewards</h2>
              <div className="flex items-center">
                <div className="bg-white/20 px-3 py-1 rounded-full text-sm mr-4">
                  Level 3 Shopper
                </div>
                <div className="flex items-center">
                  <div className="mr-2">⭐</div>
                  <span className="font-bold">420 points</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm mb-1">Next level: 580/1000 points</p>
              <div className="w-64 bg-white/30 rounded-full h-3">
                <div 
                  className="bg-white h-3 rounded-full" 
                  style={{ width: '58%' }}
                ></div>
              </div>
            </div>
            
            <button className="mt-4 md:mt-0 brutal-button">
              Claim Rewards
            </button>
          </div>
        </motion.div>
        
        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: mission.id * 0.1 }}
              className={`brutal-card p-6 ${
                mission.completed ? 'border-green-500' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-gray-800 text-xl">{mission.title}</h3>
                  <p className="text-gray-600 mt-1">{mission.description}</p>
                </div>
                <div className="bg-brutalPink border-4 border-black w-12 h-12 rounded-full flex items-center justify-center text-black font-bold">
                  +{mission.points}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                {mission.completed ? (
                  <div className="flex items-center text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Completed
                  </div>
                ) : (
                  <div className="flex items-center text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    Not started
                  </div>
                )}
                
                <button 
                  className={`px-4 py-2 brutal-button text-sm ${
                    mission.completed ? 'bg-green-200 text-black' : ''
                  }`}
                >
                  {mission.completed ? 'Claimed' : 'Start Mission'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Rewards Catalog */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Available Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Bronze Tier', points: 200, benefits: ['5% discount coupon', 'Early access to sales'] },
              { title: 'Silver Tier', points: 500, benefits: ['10% discount coupon', 'Free shipping', 'Priority support'] },
              { title: 'Gold Tier', points: 1000, benefits: ['15% discount coupon', 'Free shipping', 'Exclusive products', 'Personal shopper'] },
            ].map((tier, index) => (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`brutal-card p-6 border-t-4 ${
                  index === 0 ? 'border-amber-700' :
                  index === 1 ? 'border-gray-400' :
                  'border-yellow-400'
                }`}
              >
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{tier.title}</h3>
                  <div className="flex justify-center items-center">
                    <div className={`w-6 h-6 rounded-full mr-2 ${
                      index === 0 ? 'bg-amber-700' : 
                      index === 1 ? 'bg-gray-400' : 
                      'bg-yellow-400'
                    }`}></div>
                    <span className="font-bold">{tier.points} points</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                <button className="w-full brutal-button">
                  Unlock at {tier.points} points
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Missions;
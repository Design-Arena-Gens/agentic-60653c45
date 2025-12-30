'use client';

import { useState } from 'react';

interface PromotionStrategy {
  strategy: string;
  tactics: string[];
  timeline: string;
  expectedResults: string;
}

export default function Home() {
  const [tiktokId, setTiktokId] = useState('');
  const [niche, setNiche] = useState('');
  const [currentFollowers, setCurrentFollowers] = useState('');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [promotionPlan, setPromotionPlan] = useState<PromotionStrategy[]>([]);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setPromotionPlan([]);

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tiktokId, niche, currentFollowers, goal }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate plan');
      }

      setPromotionPlan(data.strategies);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-700">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              🚀 TikTok Promotion Agent
            </h1>
            <p className="text-xl text-pink-100">
              AI-powered promotion strategies to grow your TikTok presence
            </p>
          </div>

          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  TikTok ID / Username
                </label>
                <input
                  type="text"
                  value={tiktokId}
                  onChange={(e) => setTiktokId(e.target.value)}
                  placeholder="@yourhandle"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none text-gray-800"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Content Niche
                </label>
                <input
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  placeholder="e.g., comedy, cooking, fitness, education"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none text-gray-800"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Current Followers
                  </label>
                  <input
                    type="text"
                    value={currentFollowers}
                    onChange={(e) => setCurrentFollowers(e.target.value)}
                    placeholder="1,000"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Growth Goal
                  </label>
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    placeholder="10,000 followers"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-pink-500 focus:outline-none text-gray-800"
                  />
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading || !tiktokId || !niche}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating Your Strategy...
                  </span>
                ) : (
                  'Generate Promotion Plan'
                )}
              </button>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-100 border-2 border-red-400 text-red-700 px-6 py-4 rounded-lg mb-8">
              <p className="font-semibold">Error: {error}</p>
            </div>
          )}

          {/* Results */}
          {promotionPlan.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">
                Your Custom Promotion Strategy
              </h2>

              {promotionPlan.map((strategy, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition-transform"
                >
                  <div className="flex items-start mb-4">
                    <span className="text-3xl mr-4">
                      {['🎯', '📈', '💡', '🎬', '🤝'][index % 5]}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">
                        {strategy.strategy}
                      </h3>
                      <div className="flex gap-4 text-sm text-gray-600 mb-4">
                        <span className="bg-purple-100 px-3 py-1 rounded-full">
                          ⏱️ {strategy.timeline}
                        </span>
                        <span className="bg-pink-100 px-3 py-1 rounded-full">
                          📊 {strategy.expectedResults}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="ml-11">
                    <h4 className="font-semibold text-gray-700 mb-2">Action Items:</h4>
                    <ul className="space-y-2">
                      {strategy.tactics.map((tactic, tidx) => (
                        <li key={tidx} className="flex items-start">
                          <span className="text-pink-500 mr-2">✓</span>
                          <span className="text-gray-700">{tactic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              {/* Additional Tips */}
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-4">💎 Pro Tips</h3>
                <ul className="space-y-2">
                  <li>• Post consistently: 1-3 times per day for maximum visibility</li>
                  <li>• Engage within the first hour: Respond to comments immediately</li>
                  <li>• Use trending sounds: Check the TikTok Discover page daily</li>
                  <li>• Hook viewers in 3 seconds: Start with your best content</li>
                  <li>• Cross-promote: Share your TikToks on other platforms</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

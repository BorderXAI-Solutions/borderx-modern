import React, { useState } from 'react';
import { Video, Sparkles, TrendingUp, AlertCircle, Loader2, Share2, ChevronDown, Play, Pause, RotateCcw, Download, Upload } from 'lucide-react';
import { useAI } from '../hooks/useAI';

interface TrendingHashtag {
  name: string;
  count: number;
  growth: number;
}

interface TrendingVideo {
  id: string;
  thumbnail: string;
  views: number;
  likes: number;
  hashtags: string[];
}

const trendingHashtags: TrendingHashtag[] = [
  { name: '#skincareroutine', count: 2500000, growth: 25 },
  { name: '#beautyhacks', count: 1800000, growth: 15 },
  { name: '#makeuptutorial', count: 3200000, growth: 30 },
  { name: '#fashiontrends', count: 2900000, growth: 20 }
];

const trendingVideos: TrendingVideo[] = [
  {
    id: '1',
    thumbnail: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300',
    views: 1200000,
    likes: 250000,
    hashtags: ['#skincareroutine', '#glowup']
  },
  {
    id: '2',
    thumbnail: 'https://images.unsplash.com/photo-1583241749708-a482c8d3fb19?w=300',
    views: 980000,
    likes: 180000,
    hashtags: ['#beautyhacks', '#makeuptutorial']
  }
];

export function ContentCreation() {
  const [formData, setFormData] = useState({
    topic: '',
    keywords: '',
    duration: '60',
    style: 'casual'
  });

  const [scriptForm, setScriptForm] = useState({
    productUrl: '',
    targetAudience: '',
    productCategory: 'beauty',
    toneOfVoice: 'casual',
    keyFeatures: '',
    callToAction: '',
    includedHashtags: [] as string[]
  });

  const [showScriptForm, setShowScriptForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('beauty');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoPrompt, setVideoPrompt] = useState('');
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null);
  const { loading, error } = useAI();

  const handleGenerateScript = () => {
    setShowScriptForm(true);
  };

  const handleSubmitScript = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setShowScriptForm(false);
    }, 2000);
  };

  const handlePublishToTikTok = () => {
    // Implement TikTok publishing logic
    console.log('Publishing to TikTok...');
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Content Creation Studio</h1>

      {/* Content Creation Studio */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Trending Analysis Dashboard</h2>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="beauty">Beauty Products</option>
            <option value="fashion">Women's Fashion</option>
            <option value="perfume">Perfume</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Trending Hashtags</h3>
            <div className="space-y-4">
              {trendingHashtags.map((tag, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{tag.name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">{tag.count.toLocaleString()} posts</span>
                    <span className={`text-sm ${tag.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {tag.growth > 0 ? '+' : ''}{tag.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">Top Performing Videos</h3>
            <div className="space-y-4">
              {trendingVideos.map((video) => (
                <div key={video.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex gap-4">
                    <img src={video.thumbnail} alt="Video thumbnail" className="w-24 h-24 object-cover rounded" />
                    <div>
                      <div className="flex gap-2 mb-2">
                        {video.hashtags.map((tag, index) => (
                          <span key={index} className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>{video.views.toLocaleString()} views</div>
                        <div>{video.likes.toLocaleString()} likes</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerateScript}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Sparkles className="h-5 w-5" />
          Generate Script from Trends
        </button>
      </div>

      {/* AI Video Creation */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-6">AI Video Creation</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Prompt
            </label>
            <textarea
              value={videoPrompt}
              onChange={(e) => setVideoPrompt(e.target.value)}
              placeholder="Describe your video scene in detail..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration
              </label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="30">30 seconds</option>
                <option value="60">60 seconds</option>
                <option value="90">90 seconds</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style
              </label>
              <select
                value={formData.style}
                onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="casual">Casual & Friendly</option>
                <option value="professional">Professional</option>
                <option value="luxury">Luxury & Sophisticated</option>
                <option value="energetic">Energetic & Fun</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setGeneratedVideo('video-url')}
              disabled={loading || !videoPrompt}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Video className="h-5 w-5" />
                  Generate Video
                </>
              )}
            </button>

            <button
              onClick={handlePublishToTikTok}
              disabled={!generatedVideo}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              <Share2 className="h-5 w-5" />
              Publish to TikTok
            </button>
          </div>
        </div>
      </div>

      {/* Script Generation Modal */}
      {showScriptForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Generate Script from Trends</h3>
              <button
                onClick={() => setShowScriptForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitScript} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product URL
                </label>
                <input
                  type="text"
                  value={scriptForm.productUrl}
                  onChange={(e) => setScriptForm({ ...scriptForm, productUrl: e.target.value })}
                  placeholder="Enter product page URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={scriptForm.targetAudience}
                  onChange={(e) => setScriptForm({ ...scriptForm, targetAudience: e.target.value })}
                  placeholder="e.g., Women aged 25-34 interested in skincare"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Category
                  </label>
                  <select
                    value={scriptForm.productCategory}
                    onChange={(e) => setScriptForm({ ...scriptForm, productCategory: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="beauty">Beauty Products</option>
                    <option value="fashion">Fashion</option>
                    <option value="skincare">Skincare</option>
                    <option value="haircare">Hair Care</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tone of Voice
                  </label>
                  <select
                    value={scriptForm.toneOfVoice}
                    onChange={(e) => setScriptForm({ ...scriptForm, toneOfVoice: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="casual">Casual & Friendly</option>
                    <option value="professional">Professional</option>
                    <option value="luxury">Luxury & Sophisticated</option>
                    <option value="energetic">Energetic & Fun</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Features/Benefits
                </label>
                <textarea
                  value={scriptForm.keyFeatures}
                  onChange={(e) => setScriptForm({ ...scriptForm, keyFeatures: e.target.value })}
                  placeholder="List main product features and benefits"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Call to Action
                </label>
                <input
                  type="text"
                  value={scriptForm.callToAction}
                  onChange={(e) => setScriptForm({ ...scriptForm, callToAction: e.target.value })}
                  placeholder="e.g., Shop now with 20% off"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Include Trending Hashtags
                </label>
                <div className="flex flex-wrap gap-2">
                  {trendingHashtags.map((tag, index) => (
                    <label key={index} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                      <input
                        type="checkbox"
                        checked={scriptForm.includedHashtags.includes(tag.name)}
                        onChange={(e) => {
                          const hashtags = e.target.checked
                            ? [...scriptForm.includedHashtags, tag.name]
                            : scriptForm.includedHashtags.filter(t => t !== tag.name);
                          setScriptForm({ ...scriptForm, includedHashtags: hashtags });
                        }}
                        className="rounded text-indigo-600"
                      />
                      <span className="text-sm">{tag.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating Script...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    Generate Script
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
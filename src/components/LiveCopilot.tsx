import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  Play, Pause, Volume2, Settings, Maximize, Users, Heart, Gift, MessageSquare, 
  Mic, Camera, LayoutGrid, MonitorSpeaker, Bot, Thermometer, ChevronRight, 
  AlertTriangle, Smile, Sparkles, Zap, Layout, Image, Type, Music, Share2,
  TrendingUp, Clock, DollarSign, ShoppingCart
} from 'lucide-react';

// Analytics Data
const viewerData = [
  { time: '14:00', viewers: 850, engagement: 75 },
  { time: '14:10', viewers: 940, engagement: 82 },
  { time: '14:20', viewers: 1120, engagement: 88 },
  { time: '14:30', viewers: 1350, engagement: 92 },
  { time: '14:40', viewers: 1250, engagement: 85 },
  { time: '14:50', viewers: 1420, engagement: 89 },
  { time: '15:00', viewers: 1550, engagement: 94 }
];

const engagementData = [
  { name: 'Comments', value: 45 },
  { name: 'Likes', value: 30 },
  { name: 'Shares', value: 15 },
  { name: 'Gifts', value: 10 }
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e'];

export function LiveCopilot() {
  // Stream Monitor State
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(80);
  const [selectedLayout, setSelectedLayout] = useState('single');
  const [audioInputs, setAudioInputs] = useState([
    { id: 1, name: 'Microphone', active: true, level: 75 },
    { id: 2, name: 'System Audio', active: true, level: 60 }
  ]);
  const [videoInputs, setVideoInputs] = useState([
    { id: 1, name: 'Webcam', active: true },
    { id: 2, name: 'Screen Share', active: false }
  ]);

  // AI Features State
  const [voiceCommands] = useState([
    { command: "Switch Scene", description: "Changes to specified scene" },
    { command: "Mute Audio", description: "Mutes specified audio source" },
    { command: "Show Stats", description: "Displays stream statistics" }
  ]);

  const [sentimentHistory] = useState([
    { time: '14:00', sentiment: 0.8 },
    { time: '14:10', sentiment: 0.7 },
    { time: '14:20', sentiment: 0.9 },
    { time: '14:30', sentiment: 0.6 },
    { time: '14:40', sentiment: 0.85 }
  ]);

  const [autoResponses] = useState([
    { trigger: "Product inquiry", response: "Thanks for your interest! Our product..." },
    { trigger: "Price question", response: "The current price is..." },
    { trigger: "Shipping query", response: "We ship worldwide..." }
  ]);

  // Stream Monitor Component
  const StreamMonitor = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      {/* Stream Preview Grid */}
      <div className="grid grid-cols-4 gap-2 p-2 bg-gray-900">
        {/* Main Preview */}
        <div className="col-span-3 relative aspect-video bg-gray-800 rounded">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white text-lg">Main Stream</span>
          </div>
          
          {/* Stream Overlay Controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button className="p-2 bg-black/50 rounded hover:bg-black/70 text-white">
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button className="p-2 bg-black/50 rounded hover:bg-black/70 text-white">
              <Camera className="h-4 w-4" />
            </button>
          </div>

          {/* Stream Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-indigo-400 transition-colors"
                >
                  {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                </button>

                <div className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="w-24"
                  />
                </div>

                <select
                  value={selectedLayout}
                  onChange={(e) => setSelectedLayout(e.target.value)}
                  className="bg-black/30 text-white border border-white/20 rounded px-2 py-1"
                >
                  <option value="single">Single View</option>
                  <option value="pip">Picture in Picture</option>
                  <option value="split">Split Screen</option>
                  <option value="grid">Grid View</option>
                </select>
              </div>

              <div className="flex items-center gap-4">
                <Settings className="h-5 w-5 cursor-pointer hover:text-indigo-400 transition-colors" />
                <Maximize className="h-5 w-5 cursor-pointer hover:text-indigo-400 transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Side Preview Panels */}
        <div className="space-y-2">
          <div className="relative aspect-video bg-gray-800 rounded">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-sm">Preview 1</span>
            </div>
          </div>
          <div className="relative aspect-video bg-gray-800 rounded">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-sm">Preview 2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Mixer */}
      <div className="p-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Audio Mixer</h3>
        <div className="space-y-3">
          {audioInputs.map((input) => (
            <div key={input.id} className="flex items-center gap-4">
              <button className={`p-1.5 rounded ${input.active ? 'bg-green-500' : 'bg-gray-300'}`}>
                <Mic className="h-4 w-4 text-white" />
              </button>
              <span className="text-sm text-gray-600 w-24">{input.name}</span>
              <input
                type="range"
                min="0"
                max="100"
                value={input.level}
                onChange={(e) => {
                  const newInputs = [...audioInputs];
                  newInputs[input.id - 1].level = parseInt(e.target.value);
                  setAudioInputs(newInputs);
                }}
                className="flex-1"
              />
              <span className="text-sm text-gray-600 w-12">{input.level}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stream Stats */}
      <div className="p-4 grid grid-cols-4 gap-4 border-t border-gray-200">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Users className="h-5 w-5" />
            <span className="text-sm">Viewers</span>
          </div>
          <p className="text-xl font-semibold text-gray-900">1,234</p>
          <p className="text-xs text-green-600">↑ 12% from last hour</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Heart className="h-5 w-5" />
            <span className="text-sm">Likes</span>
          </div>
          <p className="text-xl font-semibold text-gray-900">8.5K</p>
          <p className="text-xs text-green-600">↑ 8% from last hour</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Gift className="h-5 w-5" />
            <span className="text-sm">Gifts</span>
          </div>
          <p className="text-xl font-semibold text-gray-900">256</p>
          <p className="text-xs text-green-600">↑ 15% from last hour</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm">Comments</span>
          </div>
          <p className="text-xl font-semibold text-gray-900">423</p>
          <p className="text-xs text-green-600">↑ 20% from last hour</p>
        </div>
      </div>
    </div>
  );

  // AI Features Component
  const AIFeatures = () => (
    <div className="grid grid-cols-3 gap-6 mt-6">
      {/* Voice Commands */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Mic className="h-6 w-6 text-indigo-600" />
          <h2 className="text-lg font-semibold">Voice Commands</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Voice Recognition</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
          </div>
          
          <div className="space-y-2">
            {voiceCommands.map((cmd, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{cmd.command}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">{cmd.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <Thermometer className="h-6 w-6 text-indigo-600" />
          <h2 className="text-lg font-semibold">Sentiment Analysis</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Current Mood</span>
            <div className="flex items-center gap-2">
              <Smile className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-green-600">Very Positive</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Negative</span>
              <span>Positive</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-sm font-medium text-gray-700">Sentiment Trends</span>
            <div className="h-24 flex items-end gap-1">
              {sentimentHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 bg-indigo-100 rounded-t"
                  style={{ height: `${item.sentiment * 100}%` }}
                >
                  <div
                    className="w-full bg-indigo-500 rounded-t"
                    style={{ height: `${item.sentiment * 100}%` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Auto Responses */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-6 w-6 text-indigo-600" />
          <h2 className="text-lg font-semibold">Auto Responses</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">AI Responses</span>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
          </div>

          <div className="space-y-2">
            {autoResponses.map((response, index) => (
              <div key={index} className="p-2 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{response.trigger}</span>
                  <Bot className="h-4 w-4 text-indigo-600" />
                </div>
                <p className="text-xs text-gray-500 truncate">{response.response}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Stream Tools Component
  const StreamTools = () => (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-lg font-semibold mb-4">Stream Tools</h2>
      
      <div className="grid grid-cols-3 gap-4">
        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Layout className="h-6 w-6 text-indigo-600" />
          <span className="text-sm text-gray-700">Layouts</span>
        </button>

        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Image className="h-6 w-6 text-indigo-600" />
          <span className="text-sm text-gray-700">Overlays</span>
        </button>

        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Type className="h-6 w-6 text-indigo-600" />
          <span className="text-sm text-gray-700">Captions</span>
        </button>

        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Music className="h-6 w-6 text-indigo-600" />
          <span className="text-sm text-gray-700">Sound FX</span>
        </button>

        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Share2 className="h-6 w-6 text-indigo-600" />
          <span className="text-sm text-gray-700">Share</span>
        </button>

        <button className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
          <Settings className="h-6 w-6 text-indigo-600" />
          <span className="text-sm text-gray-700">Settings</span>
        </button>
      </div>
    </div>
  );

  // Analytics Component
  const Analytics = () => (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Real-time Analytics</h2>
        <select className="text-sm border rounded-lg px-2 py-1">
          <option value="1h">Last Hour</option>
          <option value="24h">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
        </select>
      </div>

      {/* Viewer Trend */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Viewer & Engagement Trends</h3>
        <div className="h-64">
          <LineChart
            width={800}
            height={250}
            data={viewerData}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="viewers"
              stroke="#6366f1"
              name="Viewers"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="engagement"
              stroke="#8b5cf6"
              name="Engagement %"
            />
          </LineChart>
        </div>
      </div>

      {/* Engagement Distribution */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-4">Engagement Distribution</h3>
        <div className="h-64">
          <PieChart width={400} height={250}>
            <Pie
              data={engagementData}
              cx={200}
              cy={125}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {engagementData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Bot className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Live Stream Co-pilot</h1>
        </div>
      </div>

      <StreamMonitor />
      <AIFeatures />
      <StreamTools />
      <Analytics />
    </div>
  );
}
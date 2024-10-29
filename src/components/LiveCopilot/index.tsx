import React from 'react';
import { StreamMonitor } from './StreamMonitor';
import { AIFeatures } from './AIFeatures';
import { StreamTools } from './StreamTools';
import { Analytics } from './Analytics';
import { Bot } from 'lucide-react';

export function LiveCopilot() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Bot className="h-8 w-8 text-indigo-600" />
          <h1 className="text-3xl font-bold text-gray-900">Live Stream Co-pilot</h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-6">
          <StreamMonitor />
          <AIFeatures />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <StreamTools />
          <Analytics />
        </div>
      </div>
    </div>
  );
}
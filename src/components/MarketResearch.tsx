import React, { useState } from 'react';
import { Search, ChevronDown, BarChart2, Users, Target, Brain } from 'lucide-react';
import { useAI } from '../hooks/useAI';
import ResearchResults from './ResearchResults';

export function MarketResearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(null);
  const { loading, error, generateMarketResearch } = useAI();
  const [selectedRegion, setSelectedRegion] = useState('us');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      const data = await generateMarketResearch(searchTerm);
      setResults(data);
    } catch (err) {
      console.error('Failed to generate market research:', err);
    }
  };

  const regions = {
    us: {
      flag: "🇺🇸",
      name: "United States"
    },
    uk: {
      flag: "🇬🇧",
      name: "United Kingdom"
    },
    eu: {
      flag: "🇪🇺",
      name: "European Union"
    }
  };

  const tabs = [
    { id: 'profile', label: 'Customer Profile' },
    { id: 'usage', label: 'Usage Scenario' },
    { id: 'rating', label: 'Rating Optimization' },
    { id: 'sentiment', label: 'Customer Sentiment' },
    { id: 'expectation', label: 'Customer Expectation' },
    { id: 'motivation', label: 'Purchase Motivations' }
  ];

  const features = [
    {
      title: "Researching Market, Finding Opportunities",
      description: "Conducting Research from Categories to Specifications, Identifying Trends and Seizing Opportunities",
      icon: Brain,
      tag: "Tutorial"
    },
    {
      title: "Comparing Competitors, Identifying Gaps",
      description: "Gaining In-depth Insights into the Gap, Enhancing Clarity in Optimization and Improvement Direction",
      icon: Target,
      tag: "Tutorial"
    },
    {
      title: "Optimizing Listings, Boosting Sales",
      description: "Based on Market Data, Search Terms, and Category Product Selling Points to Better Understand Consumers",
      icon: BarChart2,
      tag: "Tutorial"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Market Analysis
        </h1>
        <p className="text-xl text-gray-600">
          AI analyzes product reviews and trends to gain consumer insights
        </p>
      </div>

      {/* Search Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <button
                type="button"
                className="flex items-center gap-1 text-gray-600 hover:text-gray-900"
              >
                <span>{regions[selectedRegion].flag}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter product keyword or ASIN to generate a report"
              className="w-full pl-20 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !searchTerm.trim()}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            Search
          </button>
        </form>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-8 mb-12 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="text-gray-600 hover:text-gray-900 whitespace-nowrap"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <feature.icon className="h-6 w-6 text-indigo-600" />
              <span className="text-sm text-gray-500">{feature.tag}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Results Section */}
      {results && <ResearchResults data={results} />}
    </div>
  );
}

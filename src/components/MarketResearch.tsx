import React, { useState } from 'react';
import { Search, BarChart3, Users, Target, AlertCircle, Loader2 } from 'lucide-react';
import { useAI } from '../hooks/useAI';
import ResearchResults from './ResearchResults';

export function MarketResearch() {
  const [url, setUrl] = useState('');
  const [results, setResults] = useState(null);
  const { loading, error, generateMarketResearch } = useAI();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    try {
      const data = await generateMarketResearch(url);
      setResults(data);
    } catch (err) {
      console.error('Failed to generate market research:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Market Research</h1>

      <form onSubmit={handleSubmit} className="mb-12">
        <div className="flex gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter product URL or company name"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Analyze
              </>
            )}
          </button>
        </div>
      </form>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-semibold">SWOT Analysis</h2>
          </div>
          <p className="text-gray-600">
            Comprehensive analysis of strengths, weaknesses, opportunities, and threats
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-semibold">Buyer Personas</h2>
          </div>
          <p className="text-gray-600">
            Detailed profiles of your ideal customers based on market data
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-6 w-6 text-indigo-600" />
            <h2 className="text-xl font-semibold">Competitor Analysis</h2>
          </div>
          <p className="text-gray-600">
            In-depth analysis of your competitors' strategies and market position
          </p>
        </div>
      </div>

      {results ? (
        <ResearchResults data={results} />
      ) : (
        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Results will appear here</h2>
          <p className="text-gray-600">
            Enter a product URL or company name above to generate insights
          </p>
        </div>
      )}
    </div>
  );
}
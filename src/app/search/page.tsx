"use client"
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { AnimatedBackground } from '@/components/Animation';

const Page=()=> {
  const [search, setsearch] = useState<string>('');
  const [result,setresult]=useState<string>('....start searching')
    // console.log(search)

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) {
      setresult("Please enter a search query!");
      return;
    }
    setresult("Loading...");
    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt1: search }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Search failed");

      setresult(data.result || "No results found.");
    } catch (error) {
      console.error("Error:", error);
      setresult("No Credits left , Check Email ");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <AnimatedBackground/>
      <div className="w-full max-w-2xl z-10">
        <form 
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 space-y-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-6 h-6 text-gray-400" />
            <h2 className="text-2xl font-semibold text-gray-800">Search</h2>
          </div>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setsearch(e.target.value)}
              placeholder="Type your search query..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none text-gray-600 placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-600 hover:to-amber-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md"
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </form>
        <p className='flex rounded-2xl shadow-lg items-center justify-center text-center text-black-900 mt-4 bg-white h-[13rem] font-bold text-xl'>{result}</p>
      </div>
    </div>
  );
}

export default Page;
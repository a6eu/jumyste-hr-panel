'use client'

import { useEffect, useState } from 'react'
import {
    Binary,
    Briefcase,
    Calendar,
    Check,
    ChevronLeft,
    ChevronRight,
    Clock,
    Linkedin,
    Search,
    TrendingUp,
    Users,
    Zap,
} from 'lucide-react'

const HRPortalPage = () => {
    const [activeNewsIndex, setActiveNewsIndex] = useState(0)
    const [activeUpdatesIndex, setActiveUpdatesIndex] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // News data with icon associations
    const newsItems = [
        {
            id: 1,
            title: 'New AI Matching Algorithm Released',
            excerpt: 'Our latest update improves candidate matching accuracy by 27% based on your historical hiring data.',
            date: 'May 15, 2024',
            tag: 'Product Update',
            icon: <Binary className="w-5 h-5 text-[#8B5DFF]" />,
        },
        {
            id: 2,
            title: 'HR Summit 2024 Registration Open',
            excerpt: 'Join us for the annual HR technology conference featuring our new AI recruitment tools.',
            date: 'May 10, 2024',
            tag: 'Event',
            icon: <Calendar className="w-5 h-5 text-[#8B5DFF]" />,
        },
        {
            id: 3,
            title: 'Integration with LinkedIn Profiles',
            excerpt: 'Now automatically pull candidate data from LinkedIn with one click during screening.',
            date: 'April 28, 2024',
            tag: 'Integration',
            icon: <Linkedin className="w-5 h-5 text-[#8B5DFF]" />,
        },
    ]

    const updates = [
        {
            version: 'v2.3.1',
            date: 'May 12, 2024',
            changes: [
                'Fixed resume parsing issues with non-standard formats',
                'Improved search performance by 40%',
                'Added 5 new filter criteria for candidate search',
            ],
        },
        {
            version: 'v2.2.0',
            date: 'April 30, 2024',
            changes: [
                'New dark mode interface option',
                'Enhanced candidate matching algorithm',
                'Added bulk action support',
            ],
        },
        {
            version: 'v2.1.5',
            date: 'April 15, 2024',
            changes: [
                'Bug fixes in interview scheduling',
                'Improved calendar integration',
                'Optimized mobile experience',
            ],
        },
    ]

    const stats = [
        {
            title: 'Open Positions',
            value: 12,
            change: '+2',
            trend: 'up',
            icon: <Briefcase className="w-5 h-5 text-[#8B5DFF]" />,
        },
        {
            title: 'Candidates Reviewed',
            value: 84,
            change: '+14',
            trend: 'up',
            icon: <Users className="w-5 h-5 text-[#8B5DFF]" />,
        },
        {
            title: 'AI Matches',
            value: 36,
            change: '+8',
            trend: 'up',
            icon: <TrendingUp className="w-5 h-5 text-[#8B5DFF]" />,
        },
        {
            title: 'Time to Hire',
            value: '18d',
            change: '-3d',
            trend: 'down',
            icon: <Clock className="w-5 h-5 text-[#8B5DFF]" />,
        },
    ]

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Searching for:', searchQuery)
    }

    const nextNews = () => {
        setActiveNewsIndex((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1))
    }

    const prevNews = () => {
        setActiveNewsIndex((prev) => (prev === 0 ? newsItems.length - 1 : prev - 1))
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
            {/* Hero Search Section */}
            <section className="max-w-4xl mx-auto mb-12">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Find Your Perfect <span className="text-[#8B5DFF]">Candidate</span> with AI
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Leverage our advanced AI to discover and connect with top talent faster than ever before
                    </p>
                </div>

                <form onSubmit={handleSearch} className="relative">
                    <div className="flex shadow-lg rounded-full bg-white overflow-hidden">
                        <div className="flex items-center pl-6 pr-2 text-gray-400">
                            <Search className="w-5 h-5" />
                        </div>
                        <input
                            type="text"
                            className="flex-grow py-4 px-2 focus:outline-none text-gray-700"
                            placeholder="Search for skills, roles, or keywords..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            className="bg-[#8B5DFF] hover:bg-[#7A4BEE] text-white font-medium py-4 px-8 rounded-full transition-colors duration-200"
                            type="submit"
                        >
                            {isMobile ? 'Search' : 'AI Search'}
                        </button>
                    </div>

                    <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span
                className="inline-flex items-center px-3 py-2 rounded-full bg-[#E4DAFF] text-[#8B5DFF] text-sm font-medium">
              <Zap className="w-4 h-4 mr-1" />
              Quick Filters
            </span>
                        {['Software Engineer', 'Marketing', 'Remote', '5+ Years Exp'].map((filter) => (
                            <button
                                key={filter}
                                className="px-3 py-2 rounded-full bg-[#E4DAFF] hover:bg-[#D5C6FF] text-[#8B5DFF] text-sm font-medium transition-colors duration-200"
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </form>
            </section>

            {/* News Carousel */}
            <section className="mb-16">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                        <span className="text-[#8B5DFF] mr-2">Latest News</span>
                        <span className="text-sm px-3 py-1 rounded-full bg-[#E4DAFF] text-[#8B5DFF]">
              {newsItems.length} Updates
            </span>
                    </h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={prevNews}
                            className="p-2 rounded-full bg-white border border-gray-200 text-[#8B5DFF] hover:bg-gray-50"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={nextNews}
                            className="p-2 rounded-full bg-white border border-gray-200 text-[#8B5DFF] hover:bg-gray-50"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl">
                    <div
                        className="flex transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${activeNewsIndex * 100}%)` }}
                    >
                        {newsItems.map((item, index) => (
                            <div
                                key={item.id}
                                className={`min-w-full flex-shrink-0 p-8 ${index % 2 === 0 ? 'bg-[#E4DAFF]' : 'bg-[#F0E9FF]'}`}
                            >
                                <div className="max-w-3xl mx-auto">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center">
                                            <div className="mr-3 p-2 bg-white rounded-lg">
                                                {item.icon}
                                            </div>
                                            <span className="text-sm font-medium text-gray-600">{item.date}</span>
                                        </div>
                                        <span
                                            className="px-3 py-1 rounded-full bg-[#8B5DFF] text-white text-xs font-medium">
                      {item.tag}
                    </span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 mb-6">{item.excerpt}</p>
                                    <button
                                        className="text-[#8B5DFF] font-medium hover:text-[#7A4BEE] transition-colors flex items-center">
                                        Read more <ChevronRight className="w-4 h-4 ml-1" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
                        {newsItems.map((_, index) => (
                            <button
                                key={index}
                                className={`w-2 h-2 rounded-full transition-all ${index === activeNewsIndex ? 'bg-[#8B5DFF] w-6' : 'bg-white bg-opacity-50'}`}
                                onClick={() => setActiveNewsIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Updates Section */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        <span className="text-[#8B5DFF]">Recent Updates</span> & Patches
                    </h2>

                    <div className="space-y-4">
                        {updates.map((update, index) => (
                            <div
                                key={index}
                                className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 ${index === 0 ? 'border-[#8B5DFF]' : 'border-transparent'}`}
                            >
                                <div className="bg-[#8B5DFF] text-white p-4">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold">{update.version}</span>
                                        <span className="text-sm">{update.date}</span>
                                    </div>
                                </div>
                                <div className="p-0">
                                    <ul className="divide-y divide-gray-100">
                                        {update.changes.map((change, i) => (
                                            <li key={i} className="p-4 flex items-start">
                                                <div className="flex-shrink-0 mt-1 mr-3">
                                                    <div
                                                        className="w-6 h-6 rounded-full bg-[#E4DAFF] text-[#8B5DFF] flex items-center justify-center">
                                                        <Check className="w-3 h-3" />
                                                    </div>
                                                </div>
                                                <span className="text-gray-700">{change}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Stats and Suggestions */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Your <span className="text-[#8B5DFF]">Recruitment</span> Overview
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm p-5">
                                <div className="flex items-center mb-3">
                                    <div className="p-2 mr-3 rounded-lg bg-[#E4DAFF]">
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                                </div>
                                <div className="flex items-end justify-between">
                                    <span className="text-2xl font-bold">{stat.value}</span>
                                    <span
                                        className={`text-sm px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                    >
                    {stat.change}
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6">
                            <h3 className="text-lg font-bold text-[#8B5DFF] mb-4">AI Suggestions</h3>
                            <div className="flex items-start mb-5">
                                <div className="flex-shrink-0 mr-4">
                                    <div
                                        className="w-12 h-12 rounded-full bg-[#E4DAFF] text-[#8B5DFF] flex items-center justify-center">
                                        <Users className="w-6 h-6" />
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900 mb-1">Expand your search to nearby
                                        cities</h4>
                                    <p className="text-gray-600">We found 23% more qualified candidates when including a
                                        50-mile radius</p>
                                </div>
                            </div>
                            <div className="flex space-x-3">
                                <button
                                    className="bg-[#8B5DFF] hover:bg-[#7A4BEE] text-white px-5 py-2 rounded-lg font-medium transition-colors">
                                    Apply Suggestion
                                </button>
                                <button
                                    className="border border-gray-200 hover:bg-gray-50 px-5 py-2 rounded-lg font-medium transition-colors">
                                    Dismiss
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default HRPortalPage
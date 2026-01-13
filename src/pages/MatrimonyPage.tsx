import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  X, 
  Heart, 
  Sparkles, 
  Grid3X3, 
  LayoutList,
  SlidersHorizontal,
  Users,
  TrendingUp,
  Eye,
  Star,
  BadgeCheck,
  ArrowRight,
  Zap
} from 'lucide-react'
import ProfileCard from '../components/ProfileCard'
import SEO from '../components/SEO'
import { profiles, filterOptions } from '../data/mockData'
import { ProfileFilters } from '../types'
import './MatrimonyPage.css'

export default function MatrimonyPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<string>('newest')
  const [filters, setFilters] = useState<ProfileFilters>({
    gender: '',
    ageMin: 18,
    ageMax: 50,
    religion: '',
    community: '',
    location: '',
    education: '',
    occupation: '',
  })

  const handleFilterChange = (key: keyof ProfileFilters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters({
      gender: '',
      ageMin: 18,
      ageMax: 50,
      religion: '',
      community: '',
      location: '',
      education: '',
      occupation: '',
    })
  }

  const filteredProfiles = useMemo(() => {
    return profiles.filter(profile => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch = 
          profile.name.toLowerCase().includes(query) ||
          profile.location.toLowerCase().includes(query) ||
          profile.occupation.toLowerCase().includes(query) ||
          profile.education.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }

      // Gender filter
      if (filters.gender && profile.gender !== filters.gender) return false

      // Age filter
      if (profile.age < filters.ageMin || profile.age > filters.ageMax) return false

      // Religion filter
      if (filters.religion && profile.religion !== filters.religion) return false

      // Community filter
      if (filters.community && profile.community !== filters.community) return false

      // Location filter
      if (filters.location && !profile.location.includes(filters.location)) return false

      // Education filter
      if (filters.education && !profile.education.toLowerCase().includes(filters.education.toLowerCase())) return false

      // Occupation filter
      if (filters.occupation && !profile.occupation.toLowerCase().includes(filters.occupation.toLowerCase())) return false

      return true
    })
  }, [profiles, searchQuery, filters])

  const activeFilterCount = Object.values(filters).filter(v => v && v !== 18 && v !== 50).length

  // Quick filter presets
  const quickFilters = [
    { label: 'All Profiles', value: '', icon: Users },
    { label: 'Brides', value: 'female', icon: Heart },
    { label: 'Grooms', value: 'male', icon: Heart },
    { label: 'Premium', value: 'premium', icon: Star },
    { label: 'Recently Active', value: 'active', icon: Zap },
  ]

  const [quickFilter, setQuickFilter] = useState('')

  // Generate structured data for profiles
  const profilesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": filteredProfiles.slice(0, 10).map((profile, index) => ({
      "@type": "Person",
      "position": index + 1,
      "name": profile.name,
      "age": profile.age,
      "gender": profile.gender === 'male' ? 'Male' : 'Female',
      "address": {
        "@type": "PostalAddress",
        "addressLocality": profile.location
      },
      "jobTitle": profile.occupation,
      "alumniOf": profile.education
    }))
  }

  return (
    <div className="matrimony-page">
      <SEO 
        title="Find Your Perfect Match - Browse Verified Profiles"
        description={`Browse ${profiles.length}+ verified matrimony profiles. Advanced filters by age, religion, community, location, education. AI-powered matching. Join now!`}
        keywords="matrimony profiles, verified profiles, matchmaking, find life partner, marriage profiles, bride search, groom search"
        schema={profilesSchema}
      />

      {/* Compact Hero with Search */}
      <section className="matrimony-hero-new">
        <div className="container">
          <div className="hero-content-compact">
            <div className="hero-text">
              <h1>Find Your <span className="highlight">Perfect Match</span></h1>
              <p>Browse {profiles.length.toLocaleString()}+ verified profiles</p>
            </div>
            
            {/* Live Stats */}
            <div className="live-stats-mini">
              <div className="stat-mini">
                <Eye size={14} />
                <span>847 online now</span>
              </div>
              <div className="stat-mini">
                <TrendingUp size={14} />
                <span>23 new today</span>
              </div>
            </div>
          </div>

          {/* Main Search Bar */}
          <div className="search-container">
            <div className="search-bar-new">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search by name, location, profession..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Search profiles"
              />
              <button className="search-btn">
                <Search size={18} />
                Search
              </button>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <div className="quick-filters">
            {quickFilters.map((qf) => (
              <button
                key={qf.value}
                className={`quick-filter-chip ${quickFilter === qf.value ? 'active' : ''}`}
                onClick={() => {
                  setQuickFilter(qf.value)
                  if (qf.value === 'female' || qf.value === 'male') {
                    handleFilterChange('gender', qf.value)
                  } else if (qf.value === '') {
                    handleFilterChange('gender', '')
                  }
                }}
              >
                <qf.icon size={14} />
                {qf.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="matrimony-content">
        <div className="container">
          <div className="content-layout">
            {/* Sidebar Filters */}
            <aside className={`filters-sidebar ${showFilters ? 'open' : ''}`}>
              <div className="sidebar-header">
                <h3>
                  <SlidersHorizontal size={18} />
                  Filters
                </h3>
                <button className="reset-btn" onClick={resetFilters}>
                  <X size={14} />
                  Reset
                </button>
              </div>

              <div className="filter-sections">
                {/* Gender */}
                <div className="filter-section">
                  <h4>I'm looking for</h4>
                  <div className="gender-buttons">
                    <button 
                      className={`gender-btn ${filters.gender === 'female' ? 'active' : ''}`}
                      onClick={() => handleFilterChange('gender', filters.gender === 'female' ? '' : 'female')}
                    >
                      👰 Bride
                    </button>
                    <button 
                      className={`gender-btn ${filters.gender === 'male' ? 'active' : ''}`}
                      onClick={() => handleFilterChange('gender', filters.gender === 'male' ? '' : 'male')}
                    >
                      🤵 Groom
                    </button>
                  </div>
                </div>

                {/* Age Range */}
                <div className="filter-section">
                  <h4>Age Range</h4>
                  <div className="age-slider-container">
                    <div className="age-display">
                      <span>{filters.ageMin} yrs</span>
                      <span>to</span>
                      <span>{filters.ageMax} yrs</span>
                    </div>
                    <div className="age-inputs-row">
                      <input
                        type="range"
                        min="18"
                        max="60"
                        value={filters.ageMin}
                        onChange={(e) => handleFilterChange('ageMin', parseInt(e.target.value))}
                        className="age-range-input"
                      />
                      <input
                        type="range"
                        min="18"
                        max="60"
                        value={filters.ageMax}
                        onChange={(e) => handleFilterChange('ageMax', parseInt(e.target.value))}
                        className="age-range-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Religion */}
                <div className="filter-section">
                  <h4>Religion</h4>
                  <select
                    value={filters.religion}
                    onChange={(e) => handleFilterChange('religion', e.target.value)}
                    className="filter-select"
                  >
                    <option value="">All Religions</option>
                    {filterOptions.religions.map(religion => (
                      <option key={religion} value={religion}>{religion}</option>
                    ))}
                  </select>
                </div>

                {/* Community */}
                <div className="filter-section">
                  <h4>Community</h4>
                  <select
                    value={filters.community}
                    onChange={(e) => handleFilterChange('community', e.target.value)}
                    className="filter-select"
                  >
                    <option value="">All Communities</option>
                    {filterOptions.communities.map(community => (
                      <option key={community} value={community}>{community}</option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div className="filter-section">
                  <h4>Location</h4>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="filter-select"
                  >
                    <option value="">All Maharashtra</option>
                    {filterOptions.locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Education */}
                <div className="filter-section">
                  <h4>Education</h4>
                  <select
                    value={filters.education}
                    onChange={(e) => handleFilterChange('education', e.target.value)}
                    className="filter-select"
                  >
                    <option value="">Any Education</option>
                    {filterOptions.education.map(edu => (
                      <option key={edu} value={edu}>{edu}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Sidebar CTA */}
              <div className="sidebar-cta">
                <BadgeCheck size={20} />
                <h4>Get Premium</h4>
                <p>Unlock unlimited profile views & direct messaging</p>
                <Link to="/pricing" className="btn btn-gold btn-sm">
                  Upgrade Now
                </Link>
              </div>
            </aside>

            {/* Results Area */}
            <main className="results-main">
              {/* Results Header */}
              <div className="results-header-new">
                <div className="results-info">
                  <p className="results-count">
                    <strong>{filteredProfiles.length}</strong> profiles found
                  </p>
                  {activeFilterCount > 0 && (
                    <div className="active-filters">
                      {filters.gender && (
                        <span className="filter-tag">
                          {filters.gender === 'female' ? 'Bride' : 'Groom'}
                          <button onClick={() => handleFilterChange('gender', '')}><X size={12} /></button>
                        </span>
                      )}
                      {filters.religion && (
                        <span className="filter-tag">
                          {filters.religion}
                          <button onClick={() => handleFilterChange('religion', '')}><X size={12} /></button>
                        </span>
                      )}
                      {filters.location && (
                        <span className="filter-tag">
                          {filters.location}
                          <button onClick={() => handleFilterChange('location', '')}><X size={12} /></button>
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="results-actions">
                  <div className="sort-select">
                    <label>Sort by:</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                      <option value="newest">Newest First</option>
                      <option value="relevance">Best Match</option>
                      <option value="age-asc">Age: Low to High</option>
                      <option value="age-desc">Age: High to Low</option>
                    </select>
                  </div>

                  <div className="view-toggles">
                    <button 
                      className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid view"
                    >
                      <Grid3X3 size={18} />
                    </button>
                    <button 
                      className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                      onClick={() => setViewMode('list')}
                      aria-label="List view"
                    >
                      <LayoutList size={18} />
                    </button>
                  </div>

                  <button 
                    className="filter-toggle-mobile"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter size={18} />
                    Filters
                    {activeFilterCount > 0 && <span className="count">{activeFilterCount}</span>}
                  </button>
                </div>
              </div>

              {/* Profiles Grid */}
              {filteredProfiles.length > 0 ? (
                <div className={`profiles-grid-new ${viewMode}`}>
                  {filteredProfiles.map((profile) => (
                    <ProfileCard key={profile.id} profile={profile} />
                  ))}
                </div>
              ) : (
                <div className="no-results-new">
                  <div className="no-results-icon">
                    <Search size={48} />
                  </div>
                  <h3>No profiles match your criteria</h3>
                  <p>Try adjusting your filters or search terms to see more profiles</p>
                  <button className="btn btn-primary" onClick={resetFilters}>
                    <X size={16} />
                    Clear All Filters
                  </button>
                </div>
              )}

              {/* Load More / Pagination */}
              {filteredProfiles.length > 0 && (
                <div className="load-more">
                  <button className="btn btn-secondary btn-lg">
                    Load More Profiles
                    <ArrowRight size={18} />
                  </button>
                  <p className="pagination-info">Showing 1-{filteredProfiles.length} of {profiles.length} profiles</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bottom-cta">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <Sparkles size={24} />
              <div>
                <h3>Can't find what you're looking for?</h3>
                <p>Create your profile and let matches come to you!</p>
              </div>
            </div>
            <Link to="/register" className="btn btn-gold btn-lg">
              Create Free Profile
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

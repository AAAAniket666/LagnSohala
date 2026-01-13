import { useState, useEffect, useMemo } from 'react'
import { 
  Search, 
  Filter, 
  X, 
  ChevronDown, 
  Heart, 
  Shield, 
  Sparkles, 
  Grid3X3, 
  LayoutList,
  SlidersHorizontal,
  Users,
  TrendingUp,
  Eye,
  Star,
  BadgeCheck,
  Zap,
  Plus,
  Loader,
  AlertCircle
} from 'lucide-react'
import ProfileCard from '../components/ProfileCard'
import SEO from '../components/SEO'
import ToastContainer from '../components/ToastContainer'
import { useToast } from '../hooks/useToast'
import api from '../services/api'
import { Profile, ProfileFilters } from '../types'
import './MatrimonyPage.css'
import './CreateProfileModal.css'

export default function MatrimonyPage() {
  const { toasts, success, error: showError, closeToast } = useToast()
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<string>('newest')
  const [showCreateModal, setShowCreateModal] = useState(false)
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

  // Fetch profiles and stats on mount
  useEffect(() => {
    fetchProfiles()
    fetchStats()
  }, [])

  const fetchProfiles = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.getProfiles()
      setProfiles(response.data || [])
    } catch (err) {
      console.error('Error fetching profiles:', err)
      setError('Failed to load profiles. Using offline data.')
      // Fallback to mock data if API fails
      import('../data/mockData').then(({ profiles: mockProfiles }) => {
        setProfiles(mockProfiles)
      })
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await api.getProfileStats()
      setStats(response.data)
    } catch (err) {
      console.error('Error fetching stats:', err)
    }
  }

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

  const quickFilters = [
    { label: 'All Profiles', value: '', icon: Users },
    { label: 'Brides', value: 'female', icon: Heart },
    { label: 'Grooms', value: 'male', icon: Heart },
    { label: 'Premium', value: 'premium', icon: Star },
    { label: 'Verified', value: 'verified', icon: BadgeCheck },
  ]

  const [quickFilter, setQuickFilter] = useState('')

  const handleQuickFilter = (value: string) => {
    setQuickFilter(value)
    if (value === 'female' || value === 'male') {
      setFilters(prev => ({ ...prev, gender: value }))
    } else if (value === '') {
      resetFilters()
    }
  }

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
      <ToastContainer toasts={toasts} onClose={closeToast} />
      <SEO 
        title="Find Your Perfect Match - Browse Verified Profiles"
        description={`Browse ${profiles.length}+ verified matrimony profiles. Advanced filters by age, religion, community, location, education. AI-powered matching. Join now!`}
        keywords="matrimony profiles, verified profiles, matchmaking, find life partner, marriage profiles, bride search, groom search"
        schema={profilesSchema}
      />

      {/* Hero Section */}
      <section className="matrimony-hero-new">
        <div className="container">
          <div className="hero-content-compact">
            <div className="hero-text">
              <h1>Find Your <span className="highlight">Perfect Match</span></h1>
              <p>Browse {stats?.total || profiles.length}+ verified profiles</p>
            </div>
            
            <div className="live-stats-mini">
              <div className="stat-pill">
                <div className="pulse-dot"></div>
                <span>{stats?.total || profiles.length} Profiles</span>
              </div>
              <div className="stat-pill">
                <Star size={14} />
                <span>{stats?.verified || 0} Verified</span>
              </div>
              <div className="stat-pill">
                <BadgeCheck size={14} />
                <span>{stats?.premium || 0} Premium</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="page-content">
          {/* Search and Actions Bar */}
          <div className="search-actions-bar">
            <div className="search-wrapper">
              <Search className="search-icon" size={20} />
              <input
                type="text"
                placeholder="Search by name, location, profession..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="action-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => setShowCreateModal(true)}
              >
                <Plus size={18} />
                Create Profile
              </button>
              
              <button
                className={`btn-icon ${showFilters ? 'active' : ''}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={20} />
                {activeFilterCount > 0 && (
                  <span className="filter-badge">{activeFilterCount}</span>
                )}
              </button>

              <div className="view-toggle">
                <button
                  className={`btn-icon ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  className={`btn-icon ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  <LayoutList size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-banner">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Filters */}
          <div className="quick-filters">
            {quickFilters.map(filter => (
              <button
                key={filter.label}
                className={`quick-filter-btn ${quickFilter === filter.value ? 'active' : ''}`}
                onClick={() => handleQuickFilter(filter.value)}
              >
                <filter.icon size={16} />
                {filter.label}
              </button>
            ))}
          </div>

          <div className="page-layout">
            {/* Filters Sidebar */}
            {showFilters && (
              <aside className="filters-sidebar">
                <div className="filters-header">
                  <h3><Filter size={18} /> Filters</h3>
                  {activeFilterCount > 0 && (
                    <button className="reset-filters" onClick={resetFilters}>
                      <X size={16} /> Reset
                    </button>
                  )}
                </div>

                <div className="filter-group">
                  <label>Gender</label>
                  <select value={filters.gender} onChange={(e) => handleFilterChange('gender', e.target.value)}>
                    <option value="">All</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Age Range: {filters.ageMin} - {filters.ageMax}</label>
                  <div className="range-inputs">
                    <input
                      type="number"
                      min="18"
                      max="100"
                      value={filters.ageMin}
                      onChange={(e) => handleFilterChange('ageMin', parseInt(e.target.value))}
                    />
                    <span>to</span>
                    <input
                      type="number"
                      min="18"
                      max="100"
                      value={filters.ageMax}
                      onChange={(e) => handleFilterChange('ageMax', parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="filter-group">
                  <label>Religion</label>
                  <select value={filters.religion} onChange={(e) => handleFilterChange('religion', e.target.value)}>
                    <option value="">All Religions</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Sikh">Sikh</option>
                    <option value="Jain">Jain</option>
                    <option value="Buddhist">Buddhist</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Community</label>
                  <input
                    type="text"
                    placeholder="e.g. Maratha, Brahmin"
                    value={filters.community}
                    onChange={(e) => handleFilterChange('community', e.target.value)}
                  />
                </div>

                <div className="filter-group">
                  <label>Location</label>
                  <input
                    type="text"
                    placeholder="City or State"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                  />
                </div>

                <div className="filter-group">
                  <label>Education</label>
                  <input
                    type="text"
                    placeholder="Degree or Field"
                    value={filters.education}
                    onChange={(e) => handleFilterChange('education', e.target.value)}
                  />
                </div>

                <div className="filter-group">
                  <label>Occupation</label>
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={filters.occupation}
                    onChange={(e) => handleFilterChange('occupation', e.target.value)}
                  />
                </div>
              </aside>
            )}

            {/* Profiles Grid */}
            <main className="profiles-main">
              <div className="results-header">
                <p className="results-count">
                  {loading ? 'Loading...' : `${filteredProfiles.length} profiles found`}
                </p>
                <div className="sort-dropdown">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="newest">Newest First</option>
                    <option value="relevant">Most Relevant</option>
                    <option value="active">Recently Active</option>
                  </select>
                </div>
              </div>

              {loading ? (
                <div className="loading-state">
                  <Loader className="spinner" size={48} />
                  <p>Loading profiles...</p>
                </div>
              ) : filteredProfiles.length === 0 ? (
                <div className="empty-state">
                  <Eye size={64} />
                  <h3>No profiles found</h3>
                  <p>Try adjusting your filters or search query</p>
                  <button className="btn btn-primary" onClick={resetFilters}>
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className={`profiles-grid ${viewMode}`}>
                  {filteredProfiles.map(profile => (
                    <ProfileCard key={profile.id} profile={profile} />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      {/* Create Profile Modal */}
      {showCreateModal && (
        <CreateProfileModal 
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            fetchProfiles()
            fetchStats()
            setShowCreateModal(false)
          }}
          success={success}
          showError={showError}
        />
      )}
    </div>
  )
}

// Create Profile Modal Component
function CreateProfileModal({ 
  onClose, 
  onSuccess, 
  success,
  showError 
}: { 
  onClose: () => void
  onSuccess: () => void
  success: (message: string) => void
  showError: (message: string) => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    age: 25,
    gender: 'male' as 'male' | 'female',
    height: "5'7\"",
    religion: 'Hindu',
    community: '',
    location: '',
    education: '',
    occupation: '',
    about: '',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop',
    verified: false,
    premium: false
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await api.createProfile(formData)
      success('✨ Profile created successfully! Your profile is now live.')
      onSuccess()
    } catch (err: any) {
      console.error('Error creating profile:', err)
      const errorMsg = err.message || 'Failed to create profile'
      setError(errorMsg)
      showError(`❌ ${errorMsg}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><Plus size={24} /> Create New Profile</h2>
          <button className="modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          {error && (
            <div className="error-message">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter full name"
              />
            </div>

            <div className="form-group">
              <label>Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="18"
                max="100"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Gender *</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Height *</label>
              <input
                type="text"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
                placeholder="e.g. 5'7&quot;"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Religion *</label>
              <select name="religion" value={formData.religion} onChange={handleChange} required>
                <option value="Hindu">Hindu</option>
                <option value="Muslim">Muslim</option>
                <option value="Christian">Christian</option>
                <option value="Sikh">Sikh</option>
                <option value="Jain">Jain</option>
                <option value="Buddhist">Buddhist</option>
              </select>
            </div>

            <div className="form-group">
              <label>Community *</label>
              <input
                type="text"
                name="community"
                value={formData.community}
                onChange={handleChange}
                required
                placeholder="e.g. Maratha, Brahmin"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="City, State"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Education *</label>
              <input
                type="text"
                name="education"
                value={formData.education}
                onChange={handleChange}
                required
                placeholder="e.g. MBA, B.Tech"
              />
            </div>

            <div className="form-group">
              <label>Occupation *</label>
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                required
                placeholder="Job title"
              />
            </div>
          </div>

          <div className="form-group">
            <label>About *</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Tell us about yourself..."
              maxLength={1000}
            />
            <small>{formData.about.length}/1000 characters</small>
          </div>

          <div className="form-group">
            <label>Profile Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-checkboxes">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="verified"
                checked={formData.verified}
                onChange={handleCheckboxChange}
              />
              <span>Verified Profile</span>
            </label>

            <label className="checkbox-label">
              <input
                type="checkbox"
                name="premium"
                checked={formData.premium}
                onChange={handleCheckboxChange}
              />
              <span>Premium Membership</span>
            </label>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? (
                <>
                  <Loader className="spinner" size={18} />
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Create Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

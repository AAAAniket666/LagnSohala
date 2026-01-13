import { Link } from 'react-router-dom'
import { Calendar, Clock, User, ArrowRight, Tag } from 'lucide-react'
import { blogPosts } from '../data/mockData'
import SEO from '../components/SEO'
import './BlogPage.css'

export default function BlogPage() {
  const categories = ['All', ...new Set(blogPosts.map(post => post.category))]

  return (
    <div className="blog-page">
      <SEO 
        title="Blog & Resources - Wedding Planning Tips & Guides"
        description="Expert wedding planning tips, relationship advice, and matrimony guides. Learn how to plan your perfect wedding and find your life partner."
        keywords="wedding planning, marriage tips, relationship advice, wedding guides, matrimony blog"
      />

      {/* Hero Section */}
      <section className="blog-hero">
        <div className="container">
          <h1>Blog & Resources</h1>
          <p>Tips, guides, and inspiration for your wedding journey</p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="blog-section section">
        <div className="container">
          <div className="blog-layout">
            {/* Main Content */}
            <div className="blog-main">
              {/* Featured Post */}
              <article className="featured-post">
                <div className="featured-image">
                  <img 
                    src={blogPosts[0].image} 
                    alt={blogPosts[0].title}
                    loading="lazy"
                  />
                  <span className="category-badge">{blogPosts[0].category}</span>
                </div>
                <div className="featured-content">
                  <h2>{blogPosts[0].title}</h2>
                  <p>{blogPosts[0].excerpt}</p>
                  <div className="post-meta">
                    <span>
                      <User size={14} />
                      {blogPosts[0].author}
                    </span>
                    <span>
                      <Calendar size={14} />
                      {new Date(blogPosts[0].date).toLocaleDateString('en-IN', { 
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                    <span>
                      <Clock size={14} />
                      {blogPosts[0].readTime}
                    </span>
                  </div>
                  <Link to={`/blog/${blogPosts[0].slug}`} className="btn btn-primary">
                    Read Article
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>

              {/* Blog Grid */}
              <div className="blog-grid">
                {blogPosts.slice(1).map((post) => (
                  <article key={post.id} className="blog-card">
                    <div className="blog-image">
                      <img src={post.image} alt={post.title} loading="lazy" />
                      <span className="category-badge">{post.category}</span>
                    </div>
                    <div className="blog-content">
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <div className="post-meta">
                        <span>
                          <Calendar size={12} />
                          {new Date(post.date).toLocaleDateString('en-IN', { 
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                        <span>
                          <Clock size={12} />
                          {post.readTime}
                        </span>
                      </div>
                      <Link to={`/blog/${post.slug}`} className="read-more">
                        Read More
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="blog-sidebar">
              {/* Categories */}
              <div className="sidebar-section">
                <h3>Categories</h3>
                <ul className="category-list">
                  {categories.map(category => (
                    <li key={category}>
                      <button className="category-link">
                        <Tag size={14} />
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Popular Posts */}
              <div className="sidebar-section">
                <h3>Popular Posts</h3>
                <div className="popular-posts">
                  {blogPosts.slice(0, 3).map((post) => (
                    <Link key={post.id} to={`/blog/${post.slug}`} className="popular-post">
                      <img src={post.image} alt={post.title} loading="lazy" />
                      <div>
                        <h4>{post.title}</h4>
                        <span>{post.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="sidebar-section newsletter">
                <h3>Newsletter</h3>
                <p>Get wedding tips and updates delivered to your inbox</p>
                <form className="newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="form-input"
                    aria-label="Email for newsletter"
                  />
                  <button type="submit" className="btn btn-primary">
                    Subscribe
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

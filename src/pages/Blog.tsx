import { useState } from 'react';
import { SEOHead } from '../seo/components/SEOHead';
import { publishedSiteBlogPosts } from '../data/blogPosts';

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', ...new Set(publishedSiteBlogPosts.map((post) => post.category))];
  const visibleTopicChips = [...new Set(publishedSiteBlogPosts.flatMap((post) => post.tags))].slice(0, 8);
  const query = searchTerm.trim().toLowerCase();

  const filteredPosts = publishedSiteBlogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      query.length === 0 ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some((tag) => tag.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((post) => post.featured) ?? filteredPosts[0] ?? null;
  const regularPosts = filteredPosts.filter((post) => post.id !== featuredPost?.id);

  return (
    <>
      <SEOHead
        title="Blog - AI Insights, Product Notes & Operations Articles"
        description="Explore Octa Node Engineering's local blog library covering Stylus AI, WorkSpot, TI-BOT, DressCode, education technology, workforce operations, and practical software strategy."
        keywords={[
          'Octa Node Engineering blog',
          'AI blog Nigeria',
          'Stylus AI articles',
          'WorkSpot articles',
          'TI-BOT updates',
          'DressCode insights',
          'education technology blog',
          'operations software blog'
        ]}
        type="article"
      />

      <div className="site-blog-page">
        <section className="site-blog-hero">
          <div className="container">
            <div className="site-blog-hero-panel">
              <div className="site-blog-eyebrow">Octa Node Journal</div>
              <h1>Product thinking and <span className="octa-heading-glow">AI operations</span>.</h1>
              <p>
                The public blog is not connected to a live database. It is currently powered by a local content
                collection, and this page now exposes a fuller library across education, workforce operations,
                timed systems, commerce, and company notes.
              </p>

              <div className="site-blog-stats">
                <div className="site-blog-stat">
                  <strong>{publishedSiteBlogPosts.length}</strong>
                  <span>Published posts</span>
                </div>
                <div className="site-blog-stat">
                  <strong>{categories.length - 1}</strong>
                  <span>Core categories</span>
                </div>
                <div className="site-blog-stat">
                  <strong>{visibleTopicChips.length}</strong>
                  <span>Recurring topics</span>
                </div>
              </div>

              <div className="site-blog-topic-row">
                {visibleTopicChips.map((topic) => (
                  <span key={topic} className="site-blog-topic-chip">{topic}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="site-blog-controls">
          <div className="container">
            <div className="site-blog-controls-panel">
              <div className="site-blog-search">
                <label htmlFor="blog-search">Search articles</label>
                <input
                  id="blog-search"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by title, excerpt, or tag"
                />
              </div>

              <div className="site-blog-filters">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={category === activeCategory ? 'active' : ''}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {featuredPost && (
          <section className="site-blog-featured">
            <div className="container">
              <div className="site-blog-featured-card">
                <div className="site-blog-featured-copy">
                  <div className="site-blog-card-meta">
                    <span>{featuredPost.category}</span>
                    <span>{formatDate(featuredPost.published_at as string)}</span>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <h2>{featuredPost.title}</h2>
                  <p>{featuredPost.excerpt}</p>
                  <ul className="site-blog-highlight-list">
                    {featuredPost.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="site-blog-featured-side">
                  <span className="site-blog-featured-label">Featured note</span>
                  <blockquote>
                    {featuredPost.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()}
                  </blockquote>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="site-blog-feed">
          <div className="container">
            <div className="site-blog-feed-header">
              <div>
                <div className="site-blog-eyebrow">Library</div>
                <h2>Latest <span className="octa-heading-glow">published articles</span></h2>
              </div>
              <p>
                Showing {filteredPosts.length} of {publishedSiteBlogPosts.length} published posts.
              </p>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="site-blog-empty">
                <h3>No articles match this filter yet.</h3>
                <p>Try another keyword or switch back to a broader category view.</p>
              </div>
            ) : (
              <div className="site-blog-grid">
                {regularPosts.map((post) => (
                  <article key={post.id} className="site-blog-card">
                    <div className="site-blog-card-meta">
                      <span>{post.category}</span>
                      <span>{formatDate(post.published_at as string)}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>

                    <div className="site-blog-tag-row">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <details className="site-blog-card-details">
                      <summary>See takeaways</summary>
                      <ul>
                        {post.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </details>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="site-blog-press">
          <div className="container">
            <div className="site-blog-press-card">
              <div>
                <div className="site-blog-eyebrow">Press mention</div>
                <h2>Stylus AI was featured by TechTrends Africa.</h2>
                <p>
                  Read the external feature on Dabere Michael and how Stylus AI is being positioned
                  to reduce human error in educational assessment workflows.
                </p>
              </div>
              <a
                href="https://techtrends.africa/dabere-michael-is-using-stylus-ai-in-eliminating-human-error-in-education/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Read the feature
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;

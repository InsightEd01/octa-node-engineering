const Blog = () => {
  return (
    <div className="blog-page">
      <div className="container">
        <article className="blog-article">
          <div className="blog-content">
            <p className="blog-intro">
              Dabere Michael, Founder and CEO of Octa-Node, shares his journey from a frustrated student who failed physics despite being top in class to creating Stylus AI, an AI-powered tool that grades handwritten exams in seconds, reducing human error by 93%.
            </p>

            <section className="blog-section">
              <h2>Key Points from the Interview:</h2>
              <ul className="blog-list">
                <li><strong>Motivation:</strong> Inconsistency in manual grading led to unfair results.</li>
                <li><strong>Solution:</strong> Stylus AI digitizes the grading process using artificial intelligence.</li>
                <li><strong>Benefits:</strong> Saves time (30 seconds vs 8 minutes per script), ensures fairness, cuts costs for schools and exam bodies.</li>
                <li><strong>How it works:</strong> Teachers set up exams, capture images of handwritten scripts, AI grades instantly and generates reports.</li>
                <li><strong>Challenge:</strong> Securing funding for R&D to develop more products.</li>
              </ul>
            </section>

            <section className="link-preview-section">
              <a 
                href="https://techtrends.africa/dabere-michael-is-using-stylus-ai-in-eliminating-human-error-in-education/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="link-preview-card"
              >
                <div className="link-preview-image">
                  <img 
                    src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80" 
                    alt="Dabere Michael Interview on Techtrends Africa"
                    onError={(e) => {
                      // Fallback to base64 placeholder if both image and placeholder fail to load
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDEyMDAgNjAwIiBmaWxsPSJub25lIj4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9IiNlZWVlZWUiLz4KICA8cGF0aCBkPSJNNDAwIDMwMEM0MDAgMzc2LjEgMzM2LjEgNDQwIDI2MCA0NDBDMTgzLjkgNDQwIDEyMCAzNzYuMSAxMjAgMzAwQzEyMCAyMjMuOSAxODMuOSAxNjAgMjYwIDE2MEMzMzYuMSAxNjAgNDAwIDIyMy45IDQwMCAzMDBaIiBmaWxsPSIjZGRkZGRkIi8+CiAgPHBhdGggZD0iTTUyMCAzMDBDNTIwIDM3Ni4xIDQ1Ni4xIDQ0MCAzODAgNDQwQzMwMy45IDQ0MCAyNDAgMzc2LjEgMjQwIDMwMEMyNDAgMjIzLjkgMzAzLjkgMTYwIDM4MCAxNjBDNDU2LjEgMTYwIDUyMCAyMjMuOSA1MjAgMzAwWiIgZmlsbD0iI2VlZWVlZSIvPgogIDxwYXRoIGQ9Ik02NDAgMzAwQzY0MCAzNzYuMSA1NzYuMSA0NDAgNTAwIDQ0MEM0MjMuOSA0NDAgMzYwIDM3Ni4xIDM2MCAzMDBDMzYwIDIyMy45IDQyMy45IDE2MCA1MDAgMTYwQzU3Ni4xIDE2MCA2NDAgMjIzLjkgNjQwIDMwMFoiIGZpbGw9IiNkZGRkZGQiLz4KICA8cGF0aCBkPSJNNjAwIDMwMEM2MDAgMzc2LjEgNTM2LjEgNDQwIDQ2MCA0NDBDMzgzLjkgNDQwIDMyMCAzNzYuMSAzMjAgMzAwQzMyMCAyMjMuOSAzODMuOSAxNjAgNDYwIDE2MEM1MzYuMSAxNjAgNjAwIDIyMy45IDYwMCAzMDBaIiBmaWxsPSIjZWVlZWVlIi8+CiAgPHBhdGggZD0iTTgwMCAzMDBDODAwIDM3Ni4xIDczNi4xIDQ0MCA2NjAgNDQwQzU4My45IDQ0MCA1MjAgMzc2LjEgNTIwIDMwMEM1MjAgMjIzLjkgNTgzLjkgMTYwIDY2MCAxNjBDNzM2LjEgMTYwIDgwMCAyMjMuOSA4MDAgMzAwWiIgZmlsbD0iI2RkZGRkZCIvPgogIDxwYXRoIGQ9Ik04ODAgMzAwQzg4MCAzNzYuMSA4MTYuMSA0NDAgNzQwIDQ0MEM2NjMuOSA0NDAgNjAwIDM3Ni4xIDYwMCAzMDBDNjAwIDIyMy45IDY2My45IDE2MCA3NDAgMTYwQzgxNi4xIDE2MCA4ODAgMjIzLjkgODgwIDMwMFoiIGZpbGw9IiNlZWVlZWUiLz4KICA8cGF0aCBkPSJNMTAwMCAzMDBDMTAwMCAzNzYuMSA5MzYuMSA0NDAgODYwIDQ0MEM3ODMuOSA0NDAgNzIwIDM3Ni4xIDcyMCAzMDBDNzIwIDIyMy45IDc4My45IDE2MCA4NjAgMTYwQzkzNi4xIDE2MCAxMDAwIDIyMy45IDEwMDAgMzAwWiIgZmlsbD0iI2RkZGRkZCIvPgogIDxwYXRoIGQ9Ik0xMTAwIDMwMEMxMTAwIDM3Ni4xIDEwMzYuMSA0NDAgOTYwIDQ0MEM4ODMuOSA0NDAgODIwIDM3Ni4xIDgyMCAzMDBDODIwIDIyMy45IDg4My45IDE2MCA5NjAgMTYwQzEwMzYuMSAxNjAgMTEwMCAyMjMuOSAxMTAwIDMwMFoiIGZpbGw9IiNlZWVlZWUiLz4KPC9zdmc+';
                    }}
                  />
                  <div className="link-preview-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Featured Article
                  </div>
                </div>
                <div className="link-preview-content">
                  <h3>Dabere Michael is Using Stylus AI in Eliminating Human Error in Education</h3>
                  <p>Discover how Dabere Michael's Stylus AI is revolutionizing educational assessment by reducing human error in grading by 93%.</p>
                  <div className="link-preview-meta">
                    <div className="link-preview-domain">
                      <img src="/images/techtrends-favicon.ico" alt="Techtrends Africa" />
                      <span>techtrends.africa</span>
                    </div>
                    <span className="link-preview-button">
                      Read Article
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </span>
                  </div>
                </div>
              </a>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Blog;

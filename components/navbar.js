class CustomNavbar extends HTMLElement {
  connectedCallback() {
    const base = this.getAttribute('base') || '';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: rgba(15, 15, 15, 0.85);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 100;
          border-bottom: 1px solid rgba(180, 180, 180, 0.25);
        }

        .logo {
          color: var(--metal-silver, #d8d8d8);
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.25rem;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .logo:hover {
          text-shadow: 0 0 5px var(--metal-silver, #d8d8d8);
        }
        
        ul {
          display: flex;
          gap: 1.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        a {
          color: white;
          text-decoration: none;
          font-family: 'Space Mono', monospace;
          text-transform: uppercase;
          font-size: 0.875rem;
          letter-spacing: 1px;
          position: relative;
        }
        
        a:hover {
          color: var(--metal-silver, #d8d8d8);
        }

        a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--metal-silver, #d8d8d8);
          transition: width 0.3s;
        }
        
        a:hover::after {
          width: 100%;
        }
        
        @media (max-width: 768px) {
          nav {
            flex-direction: column;
            gap: 1rem;
          }
          
          ul {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      </style>
      <nav>
        <div class="logo">Bhavay Tyagi</div>
        <ul>
          <li><a href="${base}index.html">Home</a></li>
          <li><a href="${base}about.html">About</a></li>
          <li><a href="${base}research.html">Research</a></li>
          <li><a href="${base}blog.html">Blog</a></li>
          <li><a href="${base}whatelse.html">What else?</a></li>
          <li><a href="${base}contact.html">Contact</a></li>
        </ul>
      </nav>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);
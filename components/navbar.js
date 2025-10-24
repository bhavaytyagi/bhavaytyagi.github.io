class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: rgba(10, 10, 26, 0.8);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 100;
          border-bottom: 1px solid rgba(0, 240, 255, 0.2);
        }
        
        .logo {
          color: var(--primary);
          font-family: 'Share Tech Mono', monospace;
          font-size: 1.25rem;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        
        .logo:hover {
          text-shadow: 0 0 5px var(--primary);
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
          color: var(--primary);
        }
        
        a::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary);
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
          <li><a href="/">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="research.html">Research</a></li>
          <li><a href="whatelse.html">What else?</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);
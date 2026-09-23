class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: rgba(15, 15, 15, 0.85);
          backdrop-filter: blur(10px);
          color: white;
          padding: 2rem;
          text-align: center;
          margin-top: auto;
          border-top: 1px solid rgba(180, 180, 180, 0.25);
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .social-links a {
          color: white;
          display: inline-flex;
          transition: color 0.3s;
        }

        .social-links a:hover {
          color: #d8d8d8;
        }

        .social-links svg {
          width: 24px;
          height: 24px;
        }

        .copyright {
          font-family: 'Space Mono', monospace;
          font-size: 0.875rem;
          opacity: 0.8;
        }
      </style>
      <footer>
        <div class="social-links">
          <a href="https://x.com/bhavaytyagi" target="_blank" aria-label="X">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
          </a>
          <a href="https://www.facebook.com/bhavaysaarangtyagi" target="_blank" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="https://www.instagram.com/bhavaystyagi" target="_blank" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line></svg>
          </a>
          <a href="https://www.linkedin.com/in/bhavay-tyagi-450862168/" target="_blank" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
        <p class="copyright">&copy; ${new Date().getFullYear()} Bhavay S. Tyagi. All rights reserved.</p>
      </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);
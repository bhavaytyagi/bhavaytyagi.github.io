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
          transition: color 0.3s;
        }

        .social-links a:hover {
          color: #d8d8d8;
        }
        
        .copyright {
          font-family: 'Space Mono', monospace;
          font-size: 0.875rem;
          opacity: 0.8;
        }
      </style>
      <footer>
        <div class="social-links">
          <a href="https://x.com/bhavaytyagi" target="_blank"><i data-feather="twitter"></i></a>
          <a href="https://www.facebook.com/bhavaysaarangtyagi" target="_blank"><i data-feather="facebook"></i></a>
          <a href="https://www.instagram.com/bhavaystyagi" target="_blank"><i data-feather="instagram"></i></a>
          <a href="https://www.linkedin.com/in/bhavay-tyagi-450862168/" target="_blank"><i data-feather="linkedin"></i></a>
        </div>
        <p class="copyright">&copy; ${new Date().getFullYear()} Bhavay S. Tyagi. All rights reserved.</p>
      </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);
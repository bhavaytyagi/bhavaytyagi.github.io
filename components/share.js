class CustomShare extends HTMLElement {
  connectedCallback() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title.replace(/\s*\|\s*Bhavay Tyagi\s*$/, ''));

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        .share {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(180, 180, 180, 0.25);
        }

        .label {
          font-family: 'Space Mono', monospace;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 1px;
          color: var(--metal-grey, #6b6b6b);
        }

        a {
          color: white;
          display: inline-flex;
          transition: color 0.3s;
        }

        a:hover {
          color: var(--metal-silver, #d8d8d8);
        }

        svg {
          width: 20px;
          height: 20px;
        }
      </style>
      <div class="share">
        <span class="label">Share</span>
        <a href="https://twitter.com/intent/tweet?url=${url}&text=${title}" target="_blank" rel="noopener" aria-label="Share on X">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
        </a>
        <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" rel="noopener" aria-label="Share on Facebook">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        </a>
        <a href="https://www.linkedin.com/sharing/share-offsite/?url=${url}" target="_blank" rel="noopener" aria-label="Share on LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
        </a>
        <a href="mailto:?subject=${title}&body=${url}" aria-label="Share via Email">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22 6 12 13 2 6"></polyline></svg>
        </a>
      </div>
    `;
  }
}
customElements.define('custom-share', CustomShare);

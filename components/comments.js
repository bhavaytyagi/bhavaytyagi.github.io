const SUPABASE_URL = 'https://kdryjoxggvskkrwofctt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtkcnlqb3hnZ3Zza2tyd29mY3R0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3Mjg0NjMsImV4cCI6MjEwNjMwNDQ2M30.mofTAz5o43d9DicfgGS4uZcMYOeWek0k-gaBjuv2myQ';

function ensureMathJax() {
  if (window.MathJax && window.MathJax.typesetPromise) {
    return Promise.resolve();
  }
  if (!window.__mathJaxLoading) {
    window.MathJax = {
      tex: { inlineMath: [['\\(', '\\)']], displayMath: [['$$', '$$']] },
      svg: { fontCache: 'global' }
    };
    window.__mathJaxLoading = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-svg.js';
      script.async = true;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }
  return window.__mathJaxLoading;
}

function formatDate(iso) {
  const d = new Date(iso);
  const month = d.toLocaleString('en-US', { month: 'long' });
  const time = d.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' });
  return `${month} ${d.getDate()}, ${d.getFullYear()} at ${time}`;
}

class CustomComments extends HTMLElement {
  connectedCallback() {
    this.postSlug = this.getAttribute('post-slug');

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Space Mono', monospace;
          color: white;
          margin-top: 2.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(180, 180, 180, 0.25);
        }

        h3 {
          font-size: 1.25rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          color: var(--metal-silver, #d8d8d8);
        }

        .comment {
          border: 1px solid var(--metal-grey, #6b6b6b);
          border-radius: 0.5rem;
          padding: 1rem 1.25rem;
          margin-bottom: 1rem;
        }

        .comment-author {
          font-weight: bold;
        }

        .comment-meta {
          font-size: 0.8rem;
          color: var(--metal-grey, #6b6b6b);
          margin-bottom: 0.5rem;
        }

        .comment-body {
          line-height: 1.6;
          white-space: pre-wrap;
        }

        .empty, .status {
          color: var(--metal-grey, #6b6b6b);
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }

        form {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--metal-grey, #6b6b6b);
        }

        input, textarea {
          background: var(--metal-black, #141414);
          border: 1px solid var(--metal-grey, #6b6b6b);
          border-radius: 0.375rem;
          padding: 0.6rem 0.75rem;
          color: white;
          font-family: inherit;
          font-size: 0.9rem;
        }

        input:focus, textarea:focus {
          outline: none;
          border-color: var(--metal-silver, #d8d8d8);
        }

        textarea {
          min-height: 6rem;
          resize: vertical;
        }

        .hint {
          font-size: 0.75rem;
          color: var(--metal-grey, #6b6b6b);
        }

        .website-field {
          position: absolute;
          left: -9999px;
          top: -9999px;
        }

        button {
          align-self: flex-start;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          background-color: var(--metal-black, #141414);
          color: white;
          border: 1px solid var(--metal-grey, #6b6b6b);
          font-family: 'Space Mono', monospace;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s;
        }

        button:hover:not(:disabled) {
          color: var(--metal-silver, #d8d8d8);
          border-color: var(--metal-silver, #d8d8d8);
          box-shadow: 0 0 10px rgba(216, 216, 216, 0.4);
        }

        button:disabled {
          opacity: 0.5;
          cursor: default;
        }
      </style>
      <h3>Comments</h3>
      <div class="comment-list"><p class="status">Loading comments&hellip;</p></div>
      <form>
        <div>
          <label for="name">Name</label><br>
          <input id="name" name="name" type="text" required maxlength="100">
        </div>
        <div>
          <label for="body">Comment</label><br>
          <textarea id="body" name="body" required maxlength="5000"></textarea>
        </div>
        <input class="website-field" type="text" name="website" tabindex="-1" autocomplete="off">
        <p class="hint">Wrap math in double dollar signs, e.g. $$E = mc^2$$.</p>
        <button type="submit">Post Comment</button>
      </form>
    `;

    this.listEl = this.shadowRoot.querySelector('.comment-list');
    this.formEl = this.shadowRoot.querySelector('form');
    this.nameEl = this.shadowRoot.querySelector('#name');
    this.bodyEl = this.shadowRoot.querySelector('#body');
    this.honeypotEl = this.shadowRoot.querySelector('input[name="website"]');
    this.submitBtn = this.shadowRoot.querySelector('button');

    try {
      const savedName = localStorage.getItem('commenterName');
      if (savedName) this.nameEl.value = savedName;
    } catch (e) {}

    this.formEl.addEventListener('submit', (e) => this.onSubmit(e));

    this.loadComments();
  }

  async loadComments() {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/comments?post_slug=eq.${encodeURIComponent(this.postSlug)}&select=*&order=created_at.asc`,
        { headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` } }
      );
      if (!res.ok) throw new Error('Failed to load comments');
      const comments = await res.json();
      this.renderComments(comments);
    } catch (e) {
      this.listEl.innerHTML = '<p class="status">Couldn\'t load comments right now.</p>';
    }
  }

  renderComments(comments) {
    this.listEl.innerHTML = '';

    if (comments.length === 0) {
      const empty = document.createElement('p');
      empty.className = 'empty';
      empty.textContent = 'No comments yet — be the first.';
      this.listEl.appendChild(empty);
      return;
    }

    comments.forEach((comment, i) => {
      const item = document.createElement('div');
      item.className = 'comment';

      const author = document.createElement('div');
      author.className = 'comment-author';
      author.textContent = comment.name;
      item.appendChild(author);

      const meta = document.createElement('div');
      meta.className = 'comment-meta';
      meta.textContent = `Comment #${i + 1} — ${formatDate(comment.created_at)}`;
      item.appendChild(meta);

      const body = document.createElement('div');
      body.className = 'comment-body';
      body.textContent = comment.body;
      item.appendChild(body);

      this.listEl.appendChild(item);
    });

    ensureMathJax().then(() => {
      window.MathJax.typesetPromise([this.listEl]);
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    if (this.honeypotEl.value) return;

    const name = this.nameEl.value.trim();
    const body = this.bodyEl.value.trim();
    if (!name || !body) return;

    this.submitBtn.disabled = true;
    this.submitBtn.textContent = 'Posting…';

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/comments`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({ post_slug: this.postSlug, name, body })
      });
      if (!res.ok) throw new Error('Failed to post comment');

      try { localStorage.setItem('commenterName', name); } catch (e) {}

      this.bodyEl.value = '';
      await this.loadComments();
    } catch (e) {
      alert("Sorry, your comment couldn't be posted. Please try again.");
    } finally {
      this.submitBtn.disabled = false;
      this.submitBtn.textContent = 'Post Comment';
    }
  }
}

customElements.define('custom-comments', CustomComments);

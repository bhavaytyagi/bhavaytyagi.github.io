// Fetches the account's latest posts from X's internal (undocumented) syndication
// endpoint and rewrites the two embedded tweet IDs in blog.html between the
// X-POSTS:START / X-POSTS:END markers. Run from the repo root:
//   node scripts/update-x-posts.mjs
//
// This talks to an unofficial endpoint that isn't guaranteed by X and could change
// or break without notice. On any failure this script exits without touching
// blog.html, so a broken run never overwrites a working page.

const HANDLE = "bhavaytyagi";
const BLOG_HTML_PATH = new URL("../blog.html", import.meta.url);

async function fetchLatestPostIds() {
  const url = `https://syndication.twitter.com/srv/timeline-profile/screen-name/${HANDLE}?dnt=false`;
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept: "text/html,application/json;q=0.9,*/*;q=0.8",
    },
  });

  if (!res.ok) {
    throw new Error(`Syndication endpoint returned ${res.status}`);
  }

  const raw = await res.text();
  if (!raw || raw.length < 50) {
    throw new Error("Syndication endpoint returned an empty/too-short response");
  }

  // Normalize JSON-escaped slashes so the regex matches regardless of whether
  // the payload is HTML or JSON.
  const normalized = raw.replace(/\\\//g, "/");

  // Primary signal: permalinks referencing this account's own handle.
  const handlePattern = new RegExp(`${HANDLE}/status/(\\d{10,20})`, "gi");
  const ids = new Set();
  for (const match of normalized.matchAll(handlePattern)) {
    ids.add(match[1]);
  }

  // Fallback: generic tweet id fields, in case the permalink pattern above
  // doesn't appear in this response shape.
  if (ids.size === 0) {
    const idFieldPattern = /"(?:id_str|rest_id)":"(\d{10,20})"/g;
    for (const match of normalized.matchAll(idFieldPattern)) {
      ids.add(match[1]);
    }
  }

  if (ids.size < 2) {
    throw new Error(`Only found ${ids.size} candidate id(s), need at least 2`);
  }

  // X's snowflake IDs increase monotonically with time, so the two largest
  // numeric values are the two most recent posts.
  const sorted = [...ids].sort((a, b) => (BigInt(a) > BigInt(b) ? -1 : 1));
  return sorted.slice(0, 2);
}

function buildBlock(ids) {
  const [first, second] = ids;
  return [
    '<div class="grid md:grid-cols-2 gap-4">',
    `                    <blockquote class="twitter-tweet" data-theme="dark"><a href="https://twitter.com/${HANDLE}/status/${first}"></a></blockquote>`,
    `                    <blockquote class="twitter-tweet" data-theme="dark"><a href="https://twitter.com/${HANDLE}/status/${second}"></a></blockquote>`,
    "                </div>",
  ].join("\n");
}

async function main() {
  const ids = await fetchLatestPostIds();
  console.log("Latest post ids:", ids);

  const fs = await import("node:fs/promises");
  const html = await fs.readFile(BLOG_HTML_PATH, "utf8");

  const startMarker = "<!-- X-POSTS:START — auto-updated on a schedule by .github/workflows/update-x-posts.yml. Do not hand-edit between these markers; changes will be overwritten. -->";
  const endMarker = "<!-- X-POSTS:END -->";

  const startIdx = html.indexOf(startMarker);
  const endIdx = html.indexOf(endMarker);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error("Could not find X-POSTS markers in blog.html");
  }

  const before = html.slice(0, startIdx + startMarker.length);
  const after = html.slice(endIdx);
  const updated = `${before}\n                ${buildBlock(ids)}\n                ${after}`;

  if (updated === html) {
    console.log("No change — already up to date.");
    return;
  }

  await fs.writeFile(BLOG_HTML_PATH, updated, "utf8");
  console.log("blog.html updated.");
}

main().catch((err) => {
  console.error("update-x-posts failed, leaving blog.html untouched:", err.message);
  process.exit(1);
});

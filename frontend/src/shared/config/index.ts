/** App-wide constants. Ports and paths live in the root README / AGENTS.md port table. */

/**
 * How often the detail page re-reads a non-terminal case. The engine advances asynchronously, so
 * invalidate-on-success usually re-reads a still-stale status; polling closes that gap. See the
 * "warum pollt die detailseite?" note in frontend/README.md.
 */
export const POLL_INTERVAL_MS = 2000;

/** Default page size for the application list. */
export const DEFAULT_PAGE_SIZE = 20;

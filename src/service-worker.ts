/// <reference lib="webworker" />
import Fuse from 'fuse.js'
import type { Bookmark } from './lib/types'

/**
 * Recursively flattens the bookmark tree into a simple list.
 * We only care about nodes that have a URL (i.e., actual bookmarks, not folders).
 */
function flattenBookmarks(
  nodes: chrome.bookmarks.BookmarkTreeNode[]
): Bookmark[] {
  const bookmarks: Bookmark[] = []

  for (const node of nodes) {
    // If it's a bookmark (it has a URL), add it.
    if (node.url) {
      bookmarks.push({
        title: node.title,
        url: node.url,
      })
    }

    // If it's a folder (it has children), recurse.
    if (node.children) {
      bookmarks.push(...flattenBookmarks(node.children))
    }
  }

  return bookmarks
}

/**
 * Builds the Fuse.js index from the bookmarks.
 */
async function buildIndex() {
  console.log('Building search index...')
  try {
    const bookmarkTree = await chrome.bookmarks.getTree()
    const flattenedBookmarks = flattenBookmarks(bookmarkTree)

    // 2. Create the Fuse.js index
    const fuseIndex = Fuse.createIndex(['title', 'url'], flattenedBookmarks)

    // 3. Store the index and the data
    await chrome.storage.local.set({
      bookmarks: flattenedBookmarks, // Store the raw data for display
      index: fuseIndex.toJSON(), // Store the serializable index
    })

    console.log('Search index built and stored successfully.')
  } catch (error) {
    console.error('Failed to build search index:', error)
  }
}

// --- Main Event Listeners ---

// 1. Build the index when the extension is first installed
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    buildIndex()
  }
})

// 2. Re-build the index whenever a bookmark is changed
chrome.bookmarks.onCreated.addListener(buildIndex)
chrome.bookmarks.onRemoved.addListener(buildIndex)
chrome.bookmarks.onChanged.addListener(buildIndex)
chrome.bookmarks.onMoved.addListener(buildIndex)

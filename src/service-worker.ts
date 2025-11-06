/// <reference lib="webworker" />
import Fuse from 'fuse.js'
import type { Bookmark } from './lib/types'

/**
 * Recursively processes the bookmark tree.
 * Flattens bookmarks into a list and includes their folder path.
 */
function processBookmarks(
  nodes: chrome.bookmarks.BookmarkTreeNode[],
  path: string[] // The path to the current node (e.g., ['Work', 'Projects'])
): Bookmark[] {
  const bookmarks: Bookmark[] = []

  for (const node of nodes) {
    // If it's a bookmark (it has a URL), add it to our list
    if (node.url) {
      bookmarks.push({
        title: node.title,
        url: node.url,
        // Join the path array into a readable string
        path: path.join(' / '),
      })
    }

    // If it's a folder (it has children), recurse
    if (node.children) {
      // Add the current folder's title to the path and continue
      const newPath = [...path, node.title]
      bookmarks.push(...processBookmarks(node.children, newPath))
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

    // Start processing, but skip the root node (which has no title)
    // and its direct children ("Bookmarks Bar", "Other Bookmarks").
    // We start recursion from the *children* of those top-level folders.
    let flattenedBookmarks: Bookmark[] = []
    if (bookmarkTree[0].children) {
      for (const rootFolder of bookmarkTree[0].children) {
        // Start recursion, passing the root folder's title as the start of the path
        if (rootFolder.children) {
          flattenedBookmarks.push(
            ...processBookmarks(rootFolder.children, [rootFolder.title])
          )
        }
      }
    }

    // 2. Create the Fuse.js index. Add 'path' to the keys!
    const fuseIndex = Fuse.createIndex(
      ['title', 'url', 'path'], // <-- ADD 'path'
      flattenedBookmarks
    )

    // 3. Store the index and the data
    await chrome.storage.local.set({
      bookmarks: flattenedBookmarks, // This data now includes the path
      index: fuseIndex.toJSON(),
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

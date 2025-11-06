import { useEffect, useMemo, useState } from 'react'
import Bookmark from './components/bookmark'
import { Input } from './components/ui/input'
import type { Bookmark as TBookmark } from './lib/types'
import Fuse, { type IFuseOptions, type FuseIndex } from 'fuse.js'

function App() {
  const [allBookmarks, setAllBookmarks] = useState<TBookmark[]>([])
  const [fuseIndex, setFuseIndex] = useState<FuseIndex<TBookmark> | null>(null)
  const [searchItem, setSearchItem] = useState('')

  // run once on mount
  useEffect(() => {
    async function loadData() {
      try {
        const data = await chrome.storage.local.get(['bookmarks', 'index'])

        if (!data.bookmarks || !data.index) {
          console.error('Index or bookmarks not found in storage.')
          return
        }

        const bookmarks: TBookmark[] = data.bookmarks
        // Re-parse the index from the stored JSON
        const parsedIndex: FuseIndex<TBookmark> = Fuse.parseIndex(data.index)

        // Store the raw data in state
        setAllBookmarks(bookmarks)
        setFuseIndex(parsedIndex)
      } catch (error) {
        console.error('Failed to initialize popup:', error)
      }
    }

    loadData()
  }, [])

  // Create (and memoize) the Fuse instance.
  // This will only re-create if allBookmarks or fuseIndex changes.
  const fuse = useMemo(() => {
    // Don't create the instance until the data is loaded
    if (!allBookmarks.length || !fuseIndex) {
      return null
    }

    const options: IFuseOptions<TBookmark> & {
      index: FuseIndex<TBookmark>
    } = {
      keys: ['title', 'url'],
      threshold: 0.4,
      useExtendedSearch: true,
      index: fuseIndex, // Pass the pre-built index
    }

    return new Fuse(allBookmarks, options)
  }, [allBookmarks, fuseIndex]) // Dependencies

  // Perform the search and memoize the results
  // This re-runs only when 'query' or 'fuse' changes
  const searchResults = useMemo(() => {
    if (!fuse) return [] // Fuse isn't ready yet

    if (searchItem.trim().length === 0) {
      // If query is empty, show all bookmarks (or just the first 20)
      return allBookmarks.slice(0, 20).map((bookmark, index) => ({
        item: bookmark,
        refIndex: index,
        score: 0,
      }))
    }

    // Return the actual search results, limited to 20
    return fuse.search(searchItem).slice(0, 20)
  }, [searchItem, fuse, allBookmarks]) // 'allBookmarks' is needed for the empty query case

  return (
    <div className="p-6 flex flex-col gap-6 bg-black-900 w-full text-white h-full">
      <Input
        value={searchItem}
        onChange={(event) => setSearchItem(event.target.value)}
        placeholder="Search your bookmark"
      />
      <div className="space-y-3 flex-1 overflow-y-scroll">
        {searchResults.map(({ item }, index) => (
          <Bookmark key={index} title={item.title} link={item.url} />
        ))}
      </div>
      <div className="mt-auto text-white text-xs mx-auto">
        Made with ❤️ ©{' '}
        <a
          href="https://eatarranza.dev"
          target="_blank"
          className="text-white!"
        >
          eatarranza.dev
        </a>
      </div>
    </div>
  )
}

export default App

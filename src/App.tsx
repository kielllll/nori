import { useMemo, useState } from 'react'
import Bookmark from './components/bookmark'
import { Input } from './components/ui/input'

const dummy = [
  {
    title: 'Google',
    link: 'https://www.google.com',
  },
  {
    title: 'Facebook',
    link: 'https://www.facebook.com',
  },
  {
    title: 'Twitter',
    link: 'https://www.twitter.com',
  },
  {
    title: 'Instagram',
    link: 'https://www.instagram.com',
  },
  {
    title: 'LinkedIn',
    link: 'https://www.linkedin.com',
  },
  {
    title: 'GitHub',
    link: 'https://www.github.com',
  },
  {
    title: 'Reddit',
    link: 'https://www.reddit.com',
  },
  {
    title: 'Stack Overflow',
    link: 'https://www.stackoverflow.com',
  },
]

function App() {
  const [searchItem, setSearchItem] = useState('')

  const filteredBookmarks = useMemo(() => {
    return dummy.filter((item) =>
      item.title.toLowerCase().includes(searchItem.toLowerCase())
    )
  }, [searchItem])

  return (
    <div className="p-6 flex flex-col gap-6 bg-black-900 w-md text-white max-w-md">
      <Input
        value={searchItem}
        onChange={(event) => setSearchItem(event.target.value)}
        placeholder="Search your bookmark"
      />
      <div className="space-y-3 overflow-y-scroll flex-1  ">
        {filteredBookmarks.map((item, index) => (
          <Bookmark key={index} {...item} />
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

import { Folder } from 'lucide-react'
import { Badge } from './ui/badge'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'
import { CopyButton } from './ui/shadcn-io/copy-button'

export interface IBookmarkProps {
  title: string
  link: string
  path?: string
}

export default function Bookmark({ title, link = '#', path }: IBookmarkProps) {
  const sanitizedPath = path ? path.split('/').pop() : ''
  return (
    <a href={link} target="_blank" className="block">
      <Card className="bg-black-600 border-none hover:bg-black-700">
        <CardHeader>
          <CardTitle className="space-y-2">
            <h3 className="text-white text-xl font-semibold text-wrap">
              {title}
            </h3>
            {sanitizedPath && (
              <Badge className="bg-black-900 text-white text-xs font-semibold">
                <Folder className="size-3" />
                {sanitizedPath}
              </Badge>
            )}
          </CardTitle>
          <CardDescription className="text-white line-clamp-1">
            {link}
          </CardDescription>
          <CardAction className="self-center">
            <CopyButton
              content={link}
              className="bg-transparent! hover:bg-white/90 text-white"
            />
          </CardAction>
        </CardHeader>
      </Card>
    </a>
  )
}

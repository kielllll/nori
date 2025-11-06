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
}

export default function Bookmark({ title, link = '#' }: IBookmarkProps) {
  return (
    <a href={link} target="_blank" className="block">
      <Card className="bg-black-600 border-none hover:bg-black-700">
        <CardHeader>
          <CardTitle className="text-white text-xl font-semibold text-wrap">
            {title}
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

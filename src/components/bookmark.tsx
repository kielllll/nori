import { ExternalLinkIcon } from 'lucide-react'
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

export interface IBookmarkProps {
  title: string
  link: string
}

export default function Bookmark({ title, link = '#' }: IBookmarkProps) {
  return (
    <Card className="bg-black-600 border-none">
      <CardHeader>
        <CardTitle className="text-white text-xl font-semibold">
          {title}
        </CardTitle>
        <CardDescription className="text-white">{link}</CardDescription>
        <CardAction className="self-center">
          <a href={link} target="_blank">
            <ExternalLinkIcon className="size-5 text-white" />
          </a>
        </CardAction>
      </CardHeader>
    </Card>
  )
}

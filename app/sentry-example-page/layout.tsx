import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sentry Example | Apex Roofing',
  robots: {
    index: false,
    follow: false,
  },
}

export default function SentryExampleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

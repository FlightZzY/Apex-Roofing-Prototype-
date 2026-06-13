'use client'

import { Button } from '@/components/ui/button'

class SentryExampleFrontendError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SentryExampleFrontendError'
  }
}

export default function SentryExamplePage() {
  return (
    <section className="w-full py-24 bg-background">
      <div className="max-w-xl mx-auto px-4 text-center space-y-6">
        <h1 className="text-3xl font-bold">Sentry Example Page</h1>
        <p className="text-foreground/70">
          Click the button below to send a test frontend error to Sentry.
          After it appears in Issues, you can remove this page.
        </p>
        <Button
          type="button"
          className="btn-glow-accent font-semibold"
          onClick={() => {
            throw new SentryExampleFrontendError(
              'This is an example frontend error from Apex Roofing',
            )
          }}
        >
          Throw test error
        </Button>
      </div>
    </section>
  )
}

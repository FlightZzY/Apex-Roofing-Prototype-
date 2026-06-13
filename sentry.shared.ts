import type { ErrorEvent, EventHint } from '@sentry/nextjs'

export const sentryDsn =
  process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN

export function scrubPii(event: ErrorEvent, _hint: EventHint): ErrorEvent | null {
  if (event.user) {
    delete event.user.email
    delete event.user.ip_address
  }

  if (event.request?.cookies) {
    delete event.request.cookies
  }

  return event
}

export const sharedSentryOptions = {
  dsn: sentryDsn,
  enabled: Boolean(sentryDsn),
  environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
  beforeSend: scrubPii,
} as const

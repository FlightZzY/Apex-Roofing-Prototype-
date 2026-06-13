import * as Sentry from '@sentry/nextjs'
import { NextResponse } from 'next/server'

export async function GET() {
  const error = new Error('Apex Roofing Sentry backend connection test')

  Sentry.captureException(error)
  await Sentry.flush(2000)

  return NextResponse.json({
    ok: true,
    message: 'Backend test error sent to Sentry. Check nm-systems / apex-roofing issues.',
  })
}

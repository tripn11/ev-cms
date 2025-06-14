import React from 'react'
import './styles.css'

export const metadata = {
  description: 'An admin site for Enerplaz EV',
  title: 'Enerplaz EV',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

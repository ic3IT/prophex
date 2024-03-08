import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Venium: Prophex',
  description: 'Venium: Prophex',
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
         <head>
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="description" content="Venium: Scroll zkEVM's Premier Ecosystem" />

    <meta property="og:title" content="Venium: Scroll zkEVM's Premier Ecosystem" />
    <meta property="og:description" content="Venium: Scroll zkEVM's Premier Ecosystem - Dive in and experience innovation at its finest." />
    <meta property="og:image" content="https://i.imgur.com/ekXXn0B.png" />
    <meta property="og:url" content="https://venium.io" />

    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="Venium: zkEVM's Premier Ecosystem"/>
    <meta name="twitter:description" content="Venium: zkEVM's Premier Ecosystem - Dive in and experience innovation at its finest."/>
    <meta name="twitter:image" content="https://i.imgur.com/ekXXn0B.png"/>

    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />

    <title>Venium: Prohpex</title>
  </head>
  <body className={inter.className}>{children}</body>
</html>
  )
}

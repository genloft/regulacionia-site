import { getEnhancedPageMap } from '@components/get-page-map'
import { VercelLogo } from '@components/icons'
import { ChatButton } from '@components/inkeep-chat-button'
import { ThemeAwareLogo } from '@components/theme-logo'
import type { Metadata } from 'next'
import NextImage from 'next/image'
import { Footer, Layout, Link, Navbar } from 'nextra-theme-docs'
import { Anchor, Banner, Head } from 'nextra/components'
import type { FC, PropsWithChildren } from 'react'
import Script from 'next/script'
import inkeep from './proyectos/_logos/inkeep.png'
import './globals.css'

export const metadata: Metadata = {
  description: 'Asociación dedicada a promover el desarrollo ético, transparente y seguro de la inteligencia artificial.',
  metadataBase: new URL('https://regulacionia.es'),
  keywords: [
    'Regulacion IA',
    'Inteligencia Artificial',
    'IA Andalucia',
    'RIA Andalucia',
    'IA Ética',
    'Etica tecnologica',
    'Legislacion IA',
    'Agentes IA',
    'Fara-7b',
    'Regulación Europa',
    'Acta IA',
    'Privacidad IA'
  ],
  generator: 'Next.js',
  applicationName: 'RegulacionIA',
  appleWebApp: {
    title: 'RegulacionIA'
  },
  title: {
    default: 'RegulacionIA – Por el desarrollo ético de la IA',
    template: '%s | RegulacionIA'
  },
  openGraph: {
    url: './',
    siteName: 'RegulacionIA',
    locale: 'es_ES',
    type: 'website',
    images: '/opengraph-image.jpeg'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'msapplication-TileColor': '#fff'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@regulacionia',
    creator: '@regulacionia'
  },
  alternates: {
    canonical: './'
  }
}

const navbar = (
  <Navbar
    logo={
      <div className="py-2">
        <ThemeAwareLogo />
      </div>
    }
    projectLink="https://github.com/shuding/nextra"
  />
)
const footer = (
  <Footer className="flex-col items-center md:items-start">
    <a
      className="x:focus-visible:nextra-focus flex items-center gap-1"
      target="_blank"
      rel="noreferrer"
      title="vercel.com homepage"
      href="https://vercel.com?utm_source=nextra.site"
    >
      Powered by
      <VercelLogo height="20" />
    </a>
    <p className="mt-6 text-xs">
      © {new Date().getFullYear()} REGULACIONIA (Con número de registro 1604 en el registro de asociaciones de Andalucía a fecha 04/11/2025).
    </p>
  </Footer>
)

type LayoutProps<T extends string> = PropsWithChildren<{
  pageOpts: T
}>

const RootLayout: FC<LayoutProps<any>> = async ({ children }) => {
  const pageMap = await getEnhancedPageMap()
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body className="relative">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NFSNDCBW"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NFSNDCBW');
          `}
        </Script>
        <ChatButton />
        <Layout
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/shuding/nextra/tree/main/docs"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          footer={footer}
          toc={{
            extraContent: (
              <>
                <b className="mt-2 text-xs">Sponsored by:</b>
                <Anchor href="https://inkeep.com?utm_source=nextra.site&utm_campaign=nextra&utm_content=sidebarLink">
                  <NextImage
                    src={inkeep}
                    title="AI Agents that get real work done"
                    alt="AI Agents that get real work done"
                    className="nextra-border rounded-sm border"
                  />
                </Anchor>
              </>
            )
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}

export default RootLayout

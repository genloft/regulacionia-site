import { getEnhancedPageMap } from '@components/get-page-map'
import { VercelLogo } from '@components/icons'
import { ChatButton } from '@components/inkeep-chat-button'
import { ThemeAwareLogo } from '@components/theme-logo'
import type { Metadata } from 'next'
import NextImage from 'next/image'
import { Footer, Layout, Link, Navbar } from 'nextra-theme-docs'
import { Anchor, Banner, Head } from 'nextra/components'
import type { FC, PropsWithChildren } from 'react'
import inkeep from './showcase/_logos/inkeep.png'
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
    'Legislacion IA'
  ],
  generator: 'Next.js',
  applicationName: 'Nextra',
  appleWebApp: {
    title: 'Nextra'
  },
  title: {
    default: 'RegulacionIA – Por el desarrollo ético de la IA',
    template: '%s | RegulacionIA'
  },
  openGraph: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    url: './',
    siteName: 'Nextra',
    locale: 'es_ES',
    type: 'website'
  },
  other: {
    'msapplication-TileColor': '#fff'
  },
  twitter: {
    site: 'https://nextra.site'
  },
  alternates: {
    // https://github.com/vercel/next.js/discussions/50189#discussioncomment-10826632
    canonical: './'
  }
}

const banner = (
  <Banner>
    🎉 Trabajando para empezar en 2026 🎉{' '}
  </Banner>
)
const navbar = (
  <Navbar
    logo={<ThemeAwareLogo />}
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
      © {new Date().getFullYear()} The Nextra Project.
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
      <body>
        <ChatButton />
        <Layout
          banner={banner}
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

'use client'

import { ArrowRightIcon } from '@components/icons'
import type { Metadata } from 'next'
import Image from 'next/image'
import { Link } from 'nextra-theme-docs'
import { MdxIcon } from 'nextra/icons'
import { Feature, Features } from './_components/features'
import { MotionDiv, MotionH3 } from './_components/framer-motion'
import { I18n } from './_components/i18n-demo'
import styles from './page.module.css'
import './page.css'
import type { FC, FormEvent } from 'react'
import { useState } from 'react'
import docsCardDark from 'public/assets/card-1.dark.png'
import docsCard from 'public/assets/card-1.png'

// export const metadata: Metadata = {
//   description:
//     'Asociación sin anímo de lucro y de interés social dedicada a promover el desarrollo ético, transparente y seguro de la inteligencia artificial.'
// }

const IndexPage: FC = () => {
  const [status, setStatus] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('Enviando...')

    const formData = new FormData(form)
    const data = {
      nombre: formData.get('nombre'),
      mail: formData.get('mail'),
      interes: formData.get('interes'),
      mensaje: formData.get('mensaje')
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        setStatus('¡Gracias! Tus datos han sido enviados.')
        form.reset()
      } else {
        setStatus('Error al enviar el formulario. Inténtalo de nuevo.')
      }
    } catch (error) {
      console.error("Error en la petición del formulario:", error); // <--- AÑADIR ESTA LÍNEA
      setStatus('Error de red. Por favor, comprueba tu conexión.')
    }
  }

  return (
    <div className="home-content">
      <div className="content-container">
        <h1 className="headline">
          Por una IA ética, responsable <br className="max-sm:hidden" />
          y al servicio del bienestar global.
        </h1>
        <p className="subtitle">
          RegulacionIA trabaja por un desarrollo tecnológico tanto para personas como en empresas{' '}
          <br className="max-md:hidden" />
          que transmita el respeto de los valores humanos fomentando una innovación segura para todos.{' '}
        </p>
        <p className="subtitle">
          <Link className={styles.cta} href="/docs">
            Saber más <span>→</span>
          </Link>
        </p>
      </div>
      <div className="features-container x:border-b nextra-border">
        <div className="content-container">
          <Features>
            <Feature
              index={0}
              large
              centered
              id="docs-card"
              href="/docs/docs-theme/start"
            >
              <Image src={docsCard} alt="Background" loading="eager" />
              <Image
                src={docsCardDark}
                alt="Background (Dark)"
                loading="eager"
              />
              <h3>
                Full-power documentation <br className="show-on-mobile" />
                in minutes
              </h3>
            </Feature>
            <Feature index={1} centered className="prose dark:prose-invert">
              <h3>Únete a la comunidad</h3>
              <p>
                Si estás interesado en formar parte de la asociación o simplemente quieres mantenerte informado, déjanos tus datos.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 w-full max-w-lg text-left">
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-first-name">
                      Nombre
                    </label>
                    <input name="nombre" required className="appearance-none block w-full bg-gray-100 dark:bg-gray-800 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-700" id="grid-first-name" type="text" placeholder="Jane" />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-email">
                      Mail
                    </label>
                    <input name="mail" required className="appearance-none block w-full bg-gray-100 dark:bg-gray-800 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-700" id="grid-email" type="email" placeholder="jane.doe@email.com" />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-state">
                      Tu interés en la IA
                    </label>
                    <div className="relative">
                      <select name="interes" required className="block appearance-none w-full bg-gray-100 dark:bg-gray-800 border px-4 py-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-700" id="grid-state">
                        <option>Desarrollo sobre IA</option>
                        <option>Trabajo con IA</option>
                        <option>Solo estoy interesado en IA</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3">
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-message">
                      ¿Quieres añadir algo más?
                    </label>
                    <textarea name="mensaje" className="appearance-none block w-full bg-gray-100 dark:bg-gray-800 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-700 h-24 resize-none" id="grid-message"></textarea>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50" type="submit" disabled={status === 'Enviando...'}>
                    {status === 'Enviando...' ? 'Enviando...' : 'Enviar'}
                  </button>
                  {status && <p className="text-sm">{status}</p>}
                </div>
              </form>
            </Feature>
            <Feature
              index={2}
              id="highlighting-card"
              href="/docs/guide/syntax-highlighting"
            >
              <h3>
                Advanced syntax <br className="show-on-mobile" />
                highlighting solution
              </h3>
              <p>
                Performant and reliable build-time syntax highlighting powered
                by <Link href="https://shiki.style">Shiki</Link>.
              </p>
            </Feature>
            <Feature index={3} href="/docs/guide/i18n">
              <h3>
                I18n as easy as <br className="show-on-mobile" />
                creating new files
              </h3>
              <p className="mb-4">
                Place your page files in folders specific to each locale, Nextra
                and Next.js will handle the rest for you.
              </p>
              <I18n />
            </Feature>
            <Feature
              index={4}
              centered
              className="flex flex-col items-center justify-center bg-[url(/assets/gradient-bg.jpeg)] bg-cover bg-center text-white"
              href="/docs/guide/markdown"
            >
              <MdxIcon className="w-4/6 [filter:drop-shadow(0_2px_10px_rgba(0,0,0,.1))]" />
              <p style={{ textShadow: '0 2px 4px rgb(0 0 0 / 20%)' }}>
                <Link
                  href="https://mdxjs.com/blog/v3"
                  className="!text-current"
                >
                  MDX 3
                </Link>{' '}
                lets you use Components inside Markdown,{' '}
                <br className="hide-medium" />
                with huge performance boost since v1.
              </p>
            </Feature>
            <Feature
              index={5}
              centered
              className="feat-darkmode flex items-center justify-center"
            >
              <MotionDiv
                animate={{
                  backgroundPosition: [
                    '0% 0%',
                    '50% 40%',
                    '50% 40%',
                    '100% 100%'
                  ],
                  backgroundImage: [
                    'radial-gradient(farthest-corner, #e2e5ea, #e2e5ea)',
                    'radial-gradient(farthest-corner, #06080a, #e2e5ea)',
                    'radial-gradient(farthest-corner, #06080a, #e2e5ea)',
                    'radial-gradient(farthest-corner, #e2e5ea, #e2e5ea)'
                  ]
                }}
                transition={{
                  backgroundPosition: {
                    times: [0, 0.5, 0.5, 1],
                    repeat: Infinity,
                    duration: 10,
                    delay: 1
                  },
                  backgroundImage: {
                    times: [0, 0.2, 0.8, 1],
                    repeat: Infinity,
                    duration: 10,
                    delay: 1
                  }
                }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage:
                    'radial-gradient(farthest-corner, #06080a, #e2e5ea)',
                  backgroundSize: '400% 400%',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <MotionH3
                animate={{
                  color: ['#dae5ff', '#fff', '#fff', '#dae5ff']
                }}
                transition={{
                  color: {
                    times: [0.25, 0.35, 0.7, 0.8],
                    repeat: Infinity,
                    duration: 10,
                    delay: 1
                  }
                }}
                style={{
                  position: 'relative',
                  mixBlendMode: 'difference'
                }}
              >
                Dark <br />
                mode <br />
                included
              </MotionH3>
            </Feature>
            <Feature
              index={6}
              large
              id="search-card"
              href="/docs/docs-theme/theme-configuration#search"
            >
              <h3>
                Full-text search,
                <br />
                zero-config needed
              </h3>
              <p className="z-2">
                Nextra indexes your content automatically at build-time and
                performs incredibly fast full-text search via{' '}
                <Link href="https://github.com/cloudcannon/pagefind">
                  Pagefind
                </Link>
                .
              </p>
              <div className="z-1 absolute inset-0 size-full bg-[linear-gradient(to_right,white_250px,_transparent)] max-sm:hidden dark:bg-[linear-gradient(to_right,#202020_250px,_transparent)]" />
              <video
                autoPlay
                loop
                muted
                playsInline
                className="x:focus-visible:nextra-focus block dark:hidden"
              >
                <source src="/assets/search.mp4" type="video/mp4" />
              </video>
              <video
                autoPlay
                loop
                muted
                playsInline
                className="x:focus-visible:nextra-focus hidden -translate-x-4 dark:block"
              >
                <source src="/assets/search-dark.mp4" type="video/mp4" />
              </video>
            </Feature>
            <Feature
              index={7}
              large
              id="fs-card"
              style={{
                color: 'white',
                backgroundImage:
                  'url(/assets/routing.png), url(/assets/gradient-bg.jpeg)',
                backgroundSize: '140%, 180%',
                backgroundPosition: '130px -8px, top',
                backgroundRepeat: 'no-repeat',
                textShadow: '0 1px 6px rgb(38 59 82 / 18%)',
                aspectRatio: '1.765'
              }}
              href="/docs/docs-theme/page-configuration"
            >
              <h3>
                Organize pages intuitively, <br />
                with file-system routing from Next.js
              </h3>
            </Feature>
            <Feature
              index={8}
              id="a11y-card"
              style={{
                backgroundSize: 750,
                backgroundRepeat: 'no-repeat',
                minHeight: 288
              }}
            >
              <h3>A11y as a top priority</h3>
              <p>
                Nextra respects system options <br className="show-on-mobile" />
                such as <b>Increase Contrast</b> and <b>Reduce Motion</b>.
              </p>
            </Feature>
            <Feature index={9} href="/docs/guide/ssg">
              <h3>
                Hybrid rendering, <br />
                next generation
              </h3>
              <p className="mr-6">
                You can leverage the hybrid rendering power from Next.js with
                your Markdown content including{' '}
                <Link href="https://nextjs.org/docs/app/building-your-application/rendering/server-components">
                  Server Components
                </Link>
                ,{' '}
                <Link href="https://nextjs.org/docs/app/building-your-application/rendering/client-components">
                  Client Components
                </Link>
                , and{' '}
                <Link href="https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration">
                  Incremental Static Regeneration (ISR)
                </Link>
                .
              </p>
            </Feature>
            <Feature index={10} large>
              <h3>Y más...</h3>
              <p>
                SEO / Diseño RTL / Temas Conectables / Componentes Integrados /
                Última Edición de Git / Multi-Docs...
                <br />Un montón de nuevas posibilidades por explorar.
              </p>
              <p className="subtitle">
                <Link className="no-underline" href="/docs">
                  Empieza a usar Nextra →
                </Link>
              </p>
            </Feature>
          </Features>
        </div>
      </div>
    </div>
  )
}

export default IndexPage

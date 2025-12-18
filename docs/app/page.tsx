'use client'

import { ArrowRightIcon } from '@components/icons'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { MdxIcon } from 'nextra/icons'
import { Feature, Features } from './_components/features'
import { MotionDiv, MotionH3 } from './_components/framer-motion'
import { I18n } from './_components/i18n-demo'
import { AINews } from './_components/ai-news'
import { TopAIToolsTable } from './_components/top-ai-tools-table'
import { PartnerLogos } from './_components/partner-logos'
import { CustomSelect } from './_components/custom-select'
import styles from './page.module.css'
import './page.css'
import type { FC, FormEvent } from 'react'
import { useState } from 'react'
import docsCardDark from 'public/assets/card-1.dark.png'
import docsCard from 'public/assets/card-1.png'
import { RankingList } from './_components/ranking-list'
import youtubeData from '../data/top-youtube.json'
import podcastsData from '../data/top-podcasts.json'
import xData from '../data/top-x.json'

// export const metadata: Metadata = {
//   description:
//     'Asociación sin anímo de lucro y de interés social dedicada a promover el desarrollo ético, transparente y seguro de la inteligencia artificial.'
// }

const IndexPage: FC = () => {
  const [status, setStatus] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedNewsletter, setAcceptedNewsletter] = useState(true)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showCollaborateModal, setShowCollaborateModal] = useState(false)
  const [collaborateStatus, setCollaborateStatus] = useState('')
  const [collaborateTerms, setCollaborateTerms] = useState(false)

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

  const handleCollaborateSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setCollaborateStatus('Enviando...')
    // Simulación de envío
    setTimeout(() => {
      setCollaborateStatus('¡Solicitud enviada! Nos pondremos en contacto.')
      setTimeout(() => {
        setShowCollaborateModal(false)
        setCollaborateStatus('')
        setCollaborateTerms(false)
      }, 2000)
    }, 1000)
  }

  return (
    <div className="home-content">
      <div className="content-container">
        <h1 className="headline">
          Por una IA ética, responsable <br className="max-sm:hidden" />
          y al servicio del bienestar global.
        </h1>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mt-6">
          <p className="subtitle flex-1 m-0">
            RegulacionIA trabaja por un desarrollo tecnológico tanto para personas como en empresas{' '}
            <br className="max-md:hidden" />
            que transmita el respeto de los valores humanos fomentando una innovación segura para todos.
          </p>
          <div className="flex-shrink-0">
            <Link className={styles.cta} href="/docs">
              Saber más <span>→</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="features-container x:border-b nextra-border">
        <div className="content-container">
          <Features>
            <Feature
              index={0}
              id="highlighting-card"
              href="/docs/ciudadanos/introduccion-ia"
            >
              <h3>
                Personas y Ciudadanía
              </h3>
              <p>
                Entiende qué hace la IA contigo y cómo proteger tus derechos.
              </p>
            </Feature>
            <Feature index={1} href="/docs/empresas/fundamentos-negocios" id="business-card">
              <h3>
                Empresas <br className="show-on-mobile" />
                y pymes
              </h3>
              <p className="mb-4">
                Usa IA de forma segura y alineada con la regulación sin frenar tu innovación.
              </p>
            </Feature>
            <Feature index={2} label="Formación" href="/docs/ciudadanos/educacion-aprendizaje" id="course-card" noIcon>
              <h3>
                Curso RIA sobre Inteligencia artificial ética
              </h3>
              <Link href="/docs/ciudadanos/educacion-aprendizaje" className="mt-4 inline-block border border-white/30 bg-white/10 backdrop-blur-sm px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider hover:bg-white/20 transition-colors">
                Apúntate ahora
              </Link>
            </Feature>
            <Feature
              index={3}
              large
              centered
              id="docs-card"
              className="!p-0"
            >
              <div className="flex flex-col h-full">
                <div className="w-full bg-neutral-900 border-b border-gray-700/50 p-6">
                  <h3 className="text-2xl font-bold text-left text-white m-0">
                    Últimas noticias sobre Inteligencia Artificial
                  </h3>
                </div>
                <div className="relative w-full h-full flex flex-col p-6">
                  <AINews />
                </div>
              </div>
            </Feature>
            <Feature
              index={4}
              centered
              className="prose dark:prose-invert text-left !p-0"
              id="community-card"
            >
              <div className="w-full bg-neutral-900 border-b border-gray-700/50 p-6">
                <h3 className="text-left text-white m-0">Únete a la comunidad</h3>
              </div>
              <div className="p-6 pt-6">
                <form onSubmit={handleSubmit} className="contact-form w-full max-w-lg text-left">
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                      <label className="block text-sm font-medium mb-2" htmlFor="grid-first-name">
                        Nombre
                      </label>
                      <input name="nombre" required className="appearance-none block w-full rounded-lg px-3 py-2 bg-black/[.05] dark:bg-gray-50/10 focus:bg-white dark:focus:bg-gray-700 form-field-focus" id="grid-first-name" type="text" />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block text-sm font-medium mb-2" htmlFor="grid-email">
                        Mail
                      </label>
                      <input name="mail" required className="appearance-none block w-full rounded-lg px-3 py-2 bg-black/[.05] dark:bg-gray-50/10 focus:bg-white dark:focus:bg-gray-700 form-field-focus" id="grid-email" type="email" />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block text-sm font-medium mb-2" htmlFor="grid-state">
                        Tu interés en la IA
                      </label>
                      <CustomSelect
                        name="interes"
                        id="grid-state"
                        required
                        options={[
                          'Desarrollo sobre IA',
                          'Trabajo con IA',
                          'Solo estoy interesado en IA'
                        ]}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full px-3">
                      <label className="block text-sm font-medium mb-2" htmlFor="grid-message">
                        ¿Quieres añadir algo más?
                      </label>
                      <textarea name="mensaje" className="appearance-none block w-full rounded-lg px-3 py-2 bg-black/[.05] dark:bg-gray-50/10 focus:bg-white dark:focus:bg-gray-700 form-field-focus h-24 resize-none" id="grid-message"></textarea>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        required
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        He leído y acepto la <button type="button" onClick={() => setShowPrivacyModal(true)} className="underline hover:text-blue-600 text-left inline">Política de Privacidad</button> y el tratamiento de mis datos personales.
                      </span>
                    </label>
                  </div>

                  <div className="mb-6">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={acceptedNewsletter}
                        onChange={(e) => setAcceptedNewsletter(e.target.checked)}
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Me gustaría recibir la newsletter con novedades y actualizaciones.
                      </span>
                    </label>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed" type="submit" disabled={status === 'Enviando...' || !acceptedTerms}>
                      {status === 'Enviando...' ? 'Enviando...' : 'Enviar'}
                    </button>
                    {status && <p className="text-sm">{status}</p>}
                  </div>
                </form>
              </div>
            </Feature>
            <Feature
              index={5}
              label="Colabora"
              centered
              id="collaboration-card"
              className="flex flex-col items-center justify-center text-center"
            >
              <h3 className="text-3xl font-bold mb-4">
                ¿Eres una asociación o empresa?
              </h3>
              <p className="mb-8 text-lg text-gray-300 max-w-md">
                Únete a nosotros para impulsar una IA ética y responsable.
              </p>
              <button
                onClick={() => setShowCollaborateModal(true)}
                className="bg-white text-gray-900 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors shadow-lg"
              >
                Colaborar
              </button>
            </Feature>
            <Feature
              index={6}
              large
              id="partners-card"
              className="flex flex-col justify-center !p-0"
            >
              <div className="w-full bg-neutral-900 border-b border-gray-700/50 p-6">
                <h3 className="text-2xl font-bold text-left text-white m-0">
                  Nuestros Colaboradores
                </h3>
              </div>
              <div className="p-6">
                <p className="mb-4 text-gray-600 dark:text-gray-400">
                  Organizaciones que confían en nosotros y apoyan nuestra misión.
                </p>
                <PartnerLogos />
              </div>
            </Feature>
            <Feature
              index={7}
              id="fs-card"
              className="!p-0 overflow-hidden"
              style={{ gridColumn: '1 / -1' }}
            >
              <TopAIToolsTable />
            </Feature>
            <Feature
              index={8}
              id="youtube-list"
              className="!p-0 !bg-transparent !shadow-none"
            >
              <RankingList
                title="Top 10 YouTube IA"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" fill="white" stroke="none" /></svg>}
                data={youtubeData}
                colorClass="bg-red-50/50 dark:bg-red-900/10"
              />
            </Feature>
            <Feature
              index={9}
              id="podcast-list"
              className="!p-0 !bg-transparent !shadow-none"
            >
              <RankingList
                title="Top 10 Podcasts IA"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400"><path d="M12 6v13" /><path d="M19.914 11.086A2 2 0 0 0 18.5 10.5h-13a2 2 0 0 0-1.414.586l-1.5 1.5A2 2 0 0 0 2 14.001v2.172a2 2 0 0 0 .586 1.414l5 5A2 2 0 0 0 9 23.002H15a2 2 0 0 0 1.414-.586l5-5A2 2 0 0 0 22 16.173v-2.172a2 2 0 0 0-.586-1.414l-1.5-1.5Z" /><path d="M8 8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2" /><path d="M6 5.26a6 6 0 0 1 12 0" /></svg>}
                data={podcastsData}
                colorClass="bg-purple-50/50 dark:bg-purple-900/10"
              />
            </Feature>
            <Feature
              index={10}
              id="x-list"
              className="!p-0 !bg-transparent !shadow-none"
            >
              <RankingList
                title="Top 10 Cuentas X"
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="black" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" className="dark:fill-white"><path d="M14.3 8.95 20.5 2h-3l-4.1 4.54L9.5 2H2l6.5 9.1L2 22h3l4.4-5 4.7 5h7.5l-7.3-8.05zM5.5 4h2.5l11 16h-2.5z" stroke="none" /></svg>}
                data={xData}
                colorClass="bg-blue-50/50 dark:bg-blue-900/10"
              />
            </Feature>
          </Features>
        </div>
      </div>

      {
        showCollaborateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowCollaborateModal(false)}>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-lg flex flex-col border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold">Colabora con nosotros</h3>
                <button onClick={() => setShowCollaborateModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </button>
              </div>
              <form onSubmit={handleCollaborateSubmit} className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" htmlFor="collab-name">Nombre</label>
                  <input required className="appearance-none block w-full rounded-lg px-3 py-2 bg-black/[.05] dark:bg-gray-50/10 focus:bg-white dark:focus:bg-gray-700 form-field-focus border border-transparent focus:border-blue-500" id="collab-name" type="text" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" htmlFor="collab-email">Email</label>
                  <input required className="appearance-none block w-full rounded-lg px-3 py-2 bg-black/[.05] dark:bg-gray-50/10 focus:bg-white dark:focus:bg-gray-700 form-field-focus border border-transparent focus:border-blue-500" id="collab-email" type="email" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" htmlFor="collab-entity">Entidad / Empresa</label>
                  <input required className="appearance-none block w-full rounded-lg px-3 py-2 bg-black/[.05] dark:bg-gray-50/10 focus:bg-white dark:focus:bg-gray-700 form-field-focus border border-transparent focus:border-blue-500" id="collab-entity" type="text" />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2" htmlFor="collab-intro">Introducción</label>
                  <textarea required className="appearance-none block w-full rounded-lg px-3 py-2 bg-black/[.05] dark:bg-gray-50/10 focus:bg-white dark:focus:bg-gray-700 form-field-focus h-24 resize-none border border-transparent focus:border-blue-500" id="collab-intro"></textarea>
                </div>

                <div className="mb-6">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={collaborateTerms}
                      onChange={(e) => setCollaborateTerms(e.target.checked)}
                      required
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      He leído y acepto la <button type="button" onClick={() => setShowPrivacyModal(true)} className="underline hover:text-blue-600 text-left inline">Política de Privacidad</button>.
                    </span>
                  </label>
                </div>

                <div className="flex items-center gap-4 justify-end">
                  <button
                    type="button"
                    onClick={() => setShowCollaborateModal(false)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    type="submit"
                    disabled={collaborateStatus === 'Enviando...' || !collaborateTerms}
                  >
                    {collaborateStatus === 'Enviando...' ? 'Enviando...' : 'Enviar Solicitud'}
                  </button>
                </div>
                {collaborateStatus && !collaborateStatus.includes('Enviando') && (
                  <p className="mt-4 text-sm text-green-600 dark:text-green-400 text-center font-medium">{collaborateStatus}</p>
                )}
              </form>
            </div>
          </div>
        )}

      {showPrivacyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowPrivacyModal(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col border border-gray-200 dark:border-gray-700" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-bold">Política de Privacidad</h3>
              <button onClick={() => setShowPrivacyModal(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
              </button>
            </div>
            <div className="p-6 overflow-y-auto text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">1. Responsable del tratamiento</h4>
              <p className="mb-4">
                El responsable del tratamiento de sus datos personales es RegulacionIA, con domicilio social en [Dirección] y correo electrónico de contacto [Email]. Nos comprometemos a proteger su privacidad y a cumplir con la normativa vigente en materia de protección de datos (RGPD y LOPDGDD).
              </p>

              <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">2. Finalidad del tratamiento</h4>
              <p className="mb-4">
                Sus datos personales serán tratados con la finalidad de gestionar su solicitud de contacto, enviarle información sobre nuestras actividades y novedades (newsletter) si así lo ha autorizado, y gestionar su participación en la comunidad.
              </p>

              <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">3. Legitimación</h4>
              <p className="mb-4">
                La base legal para el tratamiento de sus datos es su consentimiento explícito al aceptar esta política de privacidad y, en su caso, al marcar la casilla de suscripción a la newsletter.
              </p>

              <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">4. Destinatarios</h4>
              <p className="mb-4">
                Sus datos no serán cedidos a terceros, salvo obligación legal. Podrán tener acceso a los mismos proveedores de servicios tecnológicos encargados del tratamiento (ej. servicios de hosting o email marketing) con los que se han suscrito los correspondientes contratos de confidencialidad.
              </p>

              <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">5. Derechos</h4>
              <p className="mb-4">
                Puede ejercer sus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad enviando un correo electrónico a [Email] o mediante escrito dirigido a nuestra dirección postal.
              </p>

              <h4 className="font-bold text-base mb-2 text-gray-900 dark:text-white">6. Conservación</h4>
              <p>
                Sus datos se conservarán mientras se mantenga la relación o durante los años necesarios para cumplir con las obligaciones legales.
              </p>
            </div>
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button
                onClick={() => setShowPrivacyModal(false)}
                className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )
      }
    </div >
  )
}

export default IndexPage

import { Metadata } from 'next'

const metadataObject: Metadata = {
  metadataBase: new URL(
    process.env.AUTH_URL
      ? `${process.env.AUTH_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : `http://localhost:${process.env.PORT || 3007}`,
  ),
  title: 'Nutri Camila Rios',
  description: 'Programa de Emagrecimento e Nutrição',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/logo.ico',
  },
}

export { metadataObject }

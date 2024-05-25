import type { Metadata } from 'next'
import './globals.css'
import Layout from '../components/Layout'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ConvexClientProvider } from '@/components/providers/convex-provider'
import ModalProvider from '@/components/providers/modal-provider'
import {Toaster} from 'sonner'
import { EdgeStoreProvider } from '@/lib/edgestore'


export const metadata: Metadata = {
  title: 'Idea Script',
  description: 'A versatile, all-in-one notes app for organizing thoughts, tasks, and projects with collaborative features.',
  // icons:{
  //   icon:{
  //     media:'(prefers-color-scheme:light)',
  //     url:'/logo.mov'
  //   }
  // }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConvexClientProvider>
          <EdgeStoreProvider>

      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey='idea-script'
          > 
          <Toaster position='bottom-center'/>
        <Layout>
          <ModalProvider />

        {children}
        </Layout>
        </ThemeProvider>
            </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>

    </html>
  )
}

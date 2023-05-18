import './globals.css'
import Nav from './components/Nav'
import {getServerSession} from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Hydrate from './components/Hydrate'

export const metadata = {
  title: 'astrobase9',
  description: 'nextjs13 online shop function',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //fetch the user information
  const session = await getServerSession(authOptions)
  return (
    <html lang="en">
      <body className='mx-64'>
        <Hydrate>
        <Nav user={session?.user} expires={session?.expires as string}/>
        {children}
        </Hydrate>
      </body>
    </html>
  )
}

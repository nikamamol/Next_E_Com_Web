import { AuthProvider } from '@/ctx/authContextxt'
import { CartProvider } from '@/ctx/cartContext'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <CartProvider>
     <AuthProvider>
        < Component {...pageProps} />
     </AuthProvider>
    </CartProvider>
  )
}

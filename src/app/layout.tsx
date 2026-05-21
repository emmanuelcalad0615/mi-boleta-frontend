import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import { QueryProvider } from '@/presentation/providers/QueryProvider';
import { AuthProvider } from '@/presentation/providers/AuthProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', weight: ['400', '500', '600'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', weight: ['500', '700'] });

export const metadata: Metadata = {
  title: '¿Y si sí me lo gané? — Mi Boleta',
  description: 'Administra tus boletas, rifas y sorteos en un solo lugar.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#0D0D0D] text-[#F0F0F0]">
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1A1A1A',
              color: '#F0F0F0',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px',
              fontSize: '14px',
            },
            success: { iconTheme: { primary: '#00D4FF', secondary: '#0D0D0D' } },
            error: { iconTheme: { primary: '#FF6B6B', secondary: '#0D0D0D' } },
          }}
        />
      </body>
    </html>
  );
}

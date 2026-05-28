import { Outfit } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../context/AuthContext';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata = {
  title: 'CriticalMinds — Digital Learning Platform',
  description:
    'Developing Critical and Creative Thinking in High School Students through Digital Linguistic Tools and Online Learning Platforms',
  keywords: ['critical thinking', 'creative thinking', 'digital learning', 'linguistics', 'education'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        <AuthProvider>
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

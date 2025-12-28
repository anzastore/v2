import { AuthProvider } from '@/providers/AuthProvider';
import { SettingsProvider } from '@/providers/SettingsProvider';
import MainLayoutWrapper from '@/components/layout/MainLayoutWrapper';
import { Toaster } from 'sonner';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="bg-mesh-animate" />
        <div className="bg-grid-pattern" />
        <AuthProvider>
          <SettingsProvider>
            <MainLayoutWrapper>
              {children}
            </MainLayoutWrapper>
            <Toaster position="top-center" richColors theme="dark" />
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

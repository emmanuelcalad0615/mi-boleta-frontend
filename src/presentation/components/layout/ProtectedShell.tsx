import { Navbar } from './Navbar';
import { Container } from './Container';

export function ProtectedShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-dots">
      <Navbar />
      <main className="py-8">
        <Container>{children}</Container>
      </main>
    </div>
  );
}

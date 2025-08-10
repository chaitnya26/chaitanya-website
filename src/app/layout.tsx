import '../styles/globals.css';
import type { Metadata } from 'next';
import ClientProviders from './ClientProviders';

export const metadata: Metadata = {
  title: 'Chaitanya Upadhyay | AI Engineer & Cognitive Systems Architect',
  description:
    'The portfolio of Chaitanya Upadhyay, an engineer specializing in AI, cognitive architectures, biotech fusion, and aerospace systems. Explore projects in RAG, LLMs, and more.',
  openGraph: {
    title: 'Chaitanya Upadhyay | AI Engineer & Cognitive Systems Architect',
    description: 'Deploying reality-altering systems across AI, biotech, and space.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Chaitanya Upadhyay | AI Engineer & Cognitive Systems Architect</title>
        <meta
          name="description"
          content="The portfolio of Chaitanya Upadhyay, an engineer specializing in AI, cognitive architectures, biotech fusion, and aerospace systems. Explore projects in RAG, LLMs, and more."
        />
        <meta property="og:title" content="Chaitanya Upadhyay | AI Engineer & Cognitive Systems Architect" />
        <meta property="og:description" content="Deploying reality-altering systems across AI, biotech, and space." />
        {/* Google Fonts preload and stylesheet links */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Sora:wght@400;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Teko:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

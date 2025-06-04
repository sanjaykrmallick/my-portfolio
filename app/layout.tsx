import './globals.css';

export const metadata = {
  title: 'Sanjay Kumar Portfolio',
  description: 'Senior Backend Engineer | Cloud-Native Expert',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

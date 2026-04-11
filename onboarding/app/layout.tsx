export const metadata = {
  title: 'Onboarding',
  description: 'User onboarding flow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

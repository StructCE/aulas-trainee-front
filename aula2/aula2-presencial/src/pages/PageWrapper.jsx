export default function PageWrapper({ children }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen h-full">
      {children}
    </main>
  );
}

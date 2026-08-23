export const metadata = {
  title: "Yönetim Paneli",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="min-h-screen bg-slate-100">{children}</div>;
}

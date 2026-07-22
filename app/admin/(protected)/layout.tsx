// app/admin/(protected)/layout.tsx
// Wraps every protected admin page. AdminUserProvider handles auth + loads the
// signed-in user's role/permissions; AdminShell renders the sidebar (filtered by
// permission); SectionGuard blocks the page if the user lacks access to it.
import AdminUserProvider from "./AdminUserProvider";
import AdminShell from "./AdminShell";
import SectionGuard from "./SectionGuard";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminUserProvider>
      <AdminShell>
        <SectionGuard>{children}</SectionGuard>
      </AdminShell>
    </AdminUserProvider>
  );
}

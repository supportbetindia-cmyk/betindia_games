import { redirect } from "next/navigation";

// Bare /admin has no UI of its own — send it to the dashboard. (Unauthenticated
// visitors are bounced to /admin/login by proxy.ts before reaching here.)
export default function AdminIndexPage() {
  redirect("/admin/dashboard");
}

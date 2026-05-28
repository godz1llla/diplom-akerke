import { redirect } from 'next/navigation';

// This page just redirects — middleware handles role-based routing
export default function DashboardPage() {
  redirect('/auth/login');
}

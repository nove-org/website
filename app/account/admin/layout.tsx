export const dynamic = 'force-dynamic';
import { getUser } from '@util/helpers/User';
import { redirect } from 'next/navigation';

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const user = await getUser();
    if ((user?.permissionLevel || 0) < 1) return redirect('/account');

    return <>{children}</>;
}

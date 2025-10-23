
import ServiceCard from '@/components/ServiceCard';
import { services } from '@/lib/services';


export default function ServicesPage() {
return (
<main className="mx-auto max-w-6xl px-4 py-10">
<h1 className="text-3xl font-bold mb-6">Services</h1>
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
{services.map((s) => (
<ServiceCard key={s.key} service={s} />
))}
</div>
</main>
);
}
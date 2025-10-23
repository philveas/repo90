// app/services/noise-survey/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getPlaceholder } from "@/lib/placeholders";
import { getServiceBySlug } from "@/lib/services";

export async function generateMetadata() {
  const svc = getServiceBySlug("noise-survey");
  return {
    title: svc?.title ?? "Noise Survey",
    description: svc?.cardDescription ?? "Noise survey and monitoring services.",
    openGraph: {
      title: svc?.title ?? "Noise Survey",
      description: svc?.cardDescription,
    },
  };
}

export default function NoiseSurveyPage() {
  const hero = getPlaceholder("home-hero");
  const svc = getServiceBySlug("noise-survey");

  // Body illustrative image for this service (from your services catalog -> imageId)
  const featureImg = svc?.imageId ? getPlaceholder(svc.imageId) : undefined;

  // Simple helper to render multi-paragraph description text (preserves your line breaks)
  const paragraphs =
    (svc?.description || "")
      .trim()
      .split(/\n\s*\n/) // split on blank lines
      .map((p) => p.trim());

  return (
    <div className="flex flex-col">
      {/* Hero (matches your homepage: full-bleed image + primary overlay) */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        {hero ? (
          <Image
            src={hero.imageUrl}
            alt={hero.description}
            priority
            sizes="100vw"
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}

        <div className="absolute inset-0 bg-primary/60" />

        <div className="relative z-10 container px-4 md:px-10 flex flex-col items-start justify-center">
          <div className="text-left">
            <h1 className="font-headline text-3xl md:text-5xl font-semibold tracking-tight text-white">
              {svc?.title ?? "Noise Survey"}
            </h1>

            {svc?.cardDescription && (
              <p className="mt-3 max-w-2xl text-lg text-white/90 font-light">
                {svc.cardDescription}
              </p>
            )}

            <div className="mt-8 flex justify-start gap-4">
              <Button
                variant="ghost"
                asChild
                className="border border-accent-foreground text-white font hover:border-primary hover:text-foreground transition-colors"
              >
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-10 md:py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Main copy */}
            <div>
              {/* Render the long, SEO-rich description exactly as provided */}
              <div className="prose prose-neutral max-w-none text-foreground/90 prose-p:mb-4">
                {paragraphs.length > 0 ? (
                  paragraphs.map((para, i) => (
                    <p key={i} className="font-light">
                      {para}
                    </p>
                  ))
                ) : (
                  <p className="font-light">
                    We provide comprehensive noise surveys and clear reporting to support your planning, design and compliance needs.
                  </p>
                )}
              </div>

              {/* Secondary CTA */}
              <div className="mt-8">
                <Button asChild size="lg" variant="outline" className="border-accent-foreground text-primary hover:bg-accent hover:text-foreground">
                  <Link href="/contact">Discuss Your Survey</Link>
                </Button>
              </div>
            </div>

            {/* Featured image (mobile/desktop variants via placeholders) */}
            {featureImg && (
              <div className="relative w-full mx-auto max-w-full md:max-w-[640px]">
                {/* Mobile */}
                <div className="md:hidden">
                  <Image
                    src={featureImg.mobile?.src ?? featureImg.imageUrl}
                    alt={featureImg.description}
                    width={featureImg.mobile?.width ?? 320}
                    height={featureImg.mobile?.height ?? 270}
                    sizes="100vw"
                    className="rounded-lg shadow-xl object-cover w-full h-auto"
                    loading="lazy"
                  />
                </div>
                {/* Desktop */}
                <div className="hidden md:block">
                  <Image
                    src={featureImg.desktop?.src ?? featureImg.imageUrl}
                    alt={featureImg.description}
                    width={featureImg.desktop?.width ?? 597}
                    height={featureImg.desktop?.height ?? 448}
                    sizes="(max-width: 1024px) 50vw, 640px"
                    className="rounded-lg shadow-xl object-cover w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

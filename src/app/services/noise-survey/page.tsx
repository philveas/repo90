// app/services/noise-survey/page.tsx
import Link from "next/link";
import Image from "next/image";
import { getServiceBySlug } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { getPlaceholder } from "@/lib/placeholders";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* Helpers: resolve local /public image paths from your placeholder JSON shape */
/* -------------------------------------------------------------------------- */

type ImgVariant = "desktop" | "mobile";
type Placeholder =
  | {
      folder?: string;
      description?: string;
      imageHint?: string;
      file?: string; // root single file
      desktop?: { file?: string; width?: number; height?: number };
      mobile?: { file?: string; width?: number; height?: number };
    }
  | undefined
  | null;

const FALLBACK = {
  desktop: { w: 597, h: 448 },
  mobile: { w: 320, h: 270 },
};

const enc = (s?: string) => (s ? encodeURIComponent(s) : undefined);

function toPath(folder?: string, file?: string) {
  const f = enc(folder);
  const fl = enc(file);
  if (!f || !fl) return undefined;
  return `/images/${f}/${fl}`;
}

function resolveImgPath(img: Placeholder, variant?: ImgVariant): string | undefined {
  if (!img) return undefined;

  if (variant === "desktop") {
    const p = toPath(img.folder, img.desktop?.file);
    if (p) return p;
  }
  if (variant === "mobile") {
    const p = toPath(img.folder, img.mobile?.file);
    if (p) return p;
  }

  if (variant === "desktop" && img?.mobile?.file) {
    const p = toPath(img.folder, img.mobile.file);
    if (p) return p;
  }
  if (variant === "mobile" && img?.desktop?.file) {
    const p = toPath(img.folder, img.desktop.file);
    if (p) return p;
  }

  return toPath(img?.folder, img?.file);
}

function resolveDims(img: Placeholder, variant: ImgVariant) {
  if (variant === "desktop") {
    return {
      width: img?.desktop?.width ?? FALLBACK.desktop.w,
      height: img?.desktop?.height ?? FALLBACK.desktop.h,
    };
  }
  return {
    width: img?.mobile?.width ?? FALLBACK.mobile.w,
    height: img?.mobile?.height ?? FALLBACK.mobile.h,
  };
}

function resolveAlt(img: Placeholder, fallback: string) {
  return (img?.description && img.description.trim()) || fallback;
}

/* ---------------------------------- SEO ----------------------------------- */

export async function generateMetadata() {
  const svc = getServiceBySlug("noise-survey"); // ← restore this
  return {
    title: svc?.title ?? "Noise Survey",
    description: svc?.cardDescription ?? "Noise survey and monitoring services.",
    openGraph: {
      title: svc?.title ?? "Noise Survey",
      description: svc?.cardDescription,
    },
  };
}


/* -------------------------- Content blocks (yours) ------------------------- */

const details = {
  content: [
    "We provide low-cost, comprehensive noise survey and noise modelling services across the UK. Whether you need an environmental noise survey for a feasibility study or planning application, a workplace noise assessment, or ongoing monitoring for an operational site, our experienced acoustic consultants deliver fast, accurate results you can rely on.",
    "All surveys are carried out by friendly, qualified engineers using precision instrumentation in accordance with current British Standards and best practice guidance, including BS7445, BS8233, BS4142 and Noise at Work Regulations where applicable.",
    "Using modern, efficient survey and analysis processes, we deliver results that are both technically robust and easy to understand. Our streamlined approach ensures accuracy, quick turnaround times and exceptional value. From early design advice to compliance reporting, we help clients make informed, confident decisions at every project stage.",
  ],
  features: [
    "Attended and unattended noise monitoring",
    "Short-term and long-term survey options",
    "Detailed frequency analysis",
    "Compliance with BS 4142 and other relevant standards",
    "Clear, jargon-free reporting",
  ],
} as const;

const surveyServices = [
  {
    category: "Environmental Noise Surveys",
    imageId: "survey-environmental",
    items: [
      "Feasibility noise studies",
      "Planning application noise surveys",
      "Background sound surveys for the assessment of building services and plant",
      "Acoustic compliance and validation surveys and testing",
    ],
  },
  {
    category: "Residential Development",
    imageId: "survey-residential",
    items: [
      "Noise surveys for BS8233, Approved Document O of the Building Regulations and ANC AVO Guide assessments",
      "Noise surveys for BREEAM and the Code for Sustainable Homes requirements",
      "Background sound surveys for new building services such as Air Source Heat Pumps (ASHPs), Air Conditioning and Chillers according to BS4142.",
    ],
  },
  {
    category: "Educational Projects",
    imageId: "survey-educational",
    items: [
      "Noise surveys to support façade and ventilation design to BB93 standards and BREEAM",
      "Noise surveys to support plant and building services noise assessments in accordance to BS4142",
      "Sports facilities, pitches and MUGA noise surveys and evaluations",
    ],
  },
  {
    category: "Healthcare Facilities",
    imageId: "survey-healthcare",
    items: [
      "Healthcare noise surveys for façade and ventilation designs according to HTM08-01; ",
      "Plant noise surveys and assessment in accordance to BS4142",
      "Operational noise surveys and assessments",
    ],
  },
  {
    category: "Industrial & Commercial",
    imageId: "survey-industrial",
    items: [
      "Noise surveys for the assessment of building services such as Air Source Heat Pumps (ASHPs), air conditioning, chillers, and extract ventilation systems",
      "Industrial and commerical equipment noise surveys  - Comprehensive BS4142 surveys and assessments for industrial operations",
      "Operational Noise surveys and assessments",
    ],
  },
  {
    category: "Construction Noise",
    imageId: "survey-construction",
    items: [
      "Construction Noise Surveys - BS5228 compliant surveys and assessments for construction projects",
    ],
  },
  {
    category: "Specialised Applications",
    imageId: "survey-specialised",
    items: [
      "Event & Music Noise - Assessment and monitoring for entertainment venues and events",
      "Workplace Noise Assessments - Health and Safety Executive (HSE) compliant noise at work evaluations",
    ],
  },
] as const;

const faqs = [
  {
    question: "What is a noise survey?",
    answer:
      "A noise survey is a study to quantify the level and sources of noise in a specific area or environment. It involves measuring and analysing sound levels using specialised equipment to establish the sound levels across different time periods. The noise survey results are used to identify noise risks to advise on the need for noise control measures to comply with noise regulations, standards and project requirements.",
  },
  {
    question: "Can Veas Acoustics undertake a noise survey near me?",
    answer:
      "Yes, we carry out noise surveys across the UK. Based in London, we support clients both locally and nationally. Whether you're a homeowner, developer, or contractor, we can provide noise surveys tailored to your needs. We offer flexible site visit scheduling and efficient turnaround times to ensure your project stays on track. Contact us today to confirm availability and receive your free, no-obligation quote.",
  },
  {
    question: "How long does a noise survey take?",
    answer:
      "The length of a noise survey depends on the complexity of the noise environment and specific project requirements, To accurately assess noise levels, surveys must be carried out over sufficient time periods and captures sound levels over relevant periods such as the period of operation or daytime, evening and night time periods and can be influenced by local planning authority expectations. Generally, noise surveys take anywhere from a few hours to a week to complete, although 24-hour surveys are often sufficient for most projects.",
  },
  {
    question: "Do i need a noise survey for planning?",
    answer:
      "Our noise survey reports are comprehensive and easy to understand. They typically include the survey methodology, measurement locations, equipment used, detailed results (including noise level charts), analysis against relevant standards (like BS 4142 or BS 8233), and clear conclusions and recommendations.",
  },
] as const;

/* --------------------------------- Page ----------------------------------- */

export default function NoiseSurveyPage() {
  const hero = getPlaceholder("home-hero") as Placeholder;
    // const featureImg = svc?.imageId ? (getPlaceholder(svc.imageId) as Placeholder) : undefined; // ❌ unused → remove

  const roadImage = getPlaceholder("survey-road") as Placeholder;

  const HARD_DESKTOP = "/images/noise%20survey/roadstratford1.webp";
  const HARD_MOBILE = "/images/noise%20survey/roadstratford1mobile.webp";

  const ctaDesktopSrc =
    resolveImgPath(roadImage, "desktop") ??
    resolveImgPath(roadImage, "mobile") ??
    HARD_DESKTOP;

  const ctaMobileSrc =
    resolveImgPath(roadImage, "mobile") ??
    resolveImgPath(roadImage, "desktop") ??
    HARD_MOBILE;

  return (
    <div className="flex flex-col">
      {/* ===== HERO (image background, mobile & desktop) ===== */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        {/* Mobile */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={
              resolveImgPath(hero, "mobile") ??
              resolveImgPath(hero, "desktop") ??
              resolveImgPath(hero) ??
              "/images/home/grass2.0.webp"
            }
            alt={resolveAlt(hero, "Noise survey, workplace noise & noise monitoring.")}
            priority
            fill
            sizes="100vw"
            className="object-cover"
            quality={80}
          />
        </div>

        {/* Desktop */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src={
              resolveImgPath(hero, "desktop") ??
              resolveImgPath(hero, "mobile") ??
              resolveImgPath(hero) ??
              "/images/home/grass2.0.webp"
            }
            alt={resolveAlt(hero, "Noise Survey and — noise monitoring.")}
            priority
            fill
            sizes="100vw"
            className="object-cover"
            quality={80}
          />
        </div>

        {/* Overlay + content */}
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative z-10 container px-4 md:px-10 flex flex-col items-start justify-center">
          <div className="text-left">
            <h1 className="font-headline text-3xl md:text-5xl font-semibold tracking-tight text-white">
              Noise Survey and Noise Monitoring
              <span className="block font-body text-2xl md:text-4xl font-light mt-2">
                Low Cost
                <span className="block">
                  Accurate <span className="text-accent">&amp;</span>
                  <br />
                  Comprehensive
                </span>
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white font-light">
              Environmental Noise, Workplace Noise and Noise Monitoring Services
            </p>
            <div className="mt-8 flex justify-start gap-4">
              <Button
                variant="ghost"
                asChild
                className="border border-accent-foreground text-white font hover:border-primary hover:text-foreground transition-colors"
              >
                <Link href="/contact">Contact Us Today</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== “What We Do” two-column band ===== */}
      <section className="bg-grey-foreground">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="bg-grey py-24 flex items-center justify-end">
            <div className="container px-4 md:px-20 text-right">
              <h2 className="text-4xl md:text-5xl font-headline font-semibold text-white">
                <span className="block">What</span>
                <span className="block">
                  <span className="text-accent">We</span> Do
                </span>
              </h2>
            </div>
          </div>
          <div className="bg-background md:col-span-2 py-24 flex items-center">
            <div className="container px-4 md:px-6">
              <div className="max-w-3xl text-foreground font-light space-y-4 text-lg">
                {details.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Noise Survey Services (accordion with thumbnails) ===== */}
      <section className="py-16 md:py-24 bg-card border-t">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-headline font-semibold text-primary">
              Noise Survey Services
            </h2>
          </div>

          <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
            {surveyServices.map((serviceItem) => {
              const image = getPlaceholder(serviceItem.imageId) as Placeholder;
              return (
                <AccordionItem key={serviceItem.category} value={serviceItem.category}>
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline text-left">
                    <div className="flex items-center w-full">
                      {image && (
                        <div className="relative w-24 h-16 mr-4 flex-none rounded-lg overflow-hidden">
                          <Image
                            src={
                              resolveImgPath(image, "desktop") ??
                              resolveImgPath(image, "mobile") ??
                              "/images/placeholder.webp"
                            }
                            alt={resolveAlt(image, serviceItem.category)}
                            fill
                            sizes="96px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <span className="py-4">{serviceItem.category}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-10 space-y-2">
                      {serviceItem.items.map((item, index) => (
                        <li key={index} className="text-grey font-light">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>

      {/* ===== Why choose us (cards grid) ===== */}
      <section className="py-16 md:py-24 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-center mb-12">
              Why choose our Noise Survey Services?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              <div className="p-6 bg-card rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold font-headline text-primary mb-3">
                  Low Cost
                </h3>
                <p className="text-grey font-light">
                  Our processes and systems are highly efficient ensuring speed, accuracy and of course keeping our fees low.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold font-headline text-primary mb-3">
                  Experienced Engineers
                </h3>
                <p className="text-grey font-light">
                  With years of experience conducting noise surveys for a wide range of projects, from small commercial kitchens to major infrastructure schemes and power generation projects across the UK, Europe, and the Middle East, you can be confident in our ability to deliver accurate and robust acoustic surveys suitable for your project.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold font-headline text-primary mb-3">
                  Fast Turnaround
                </h3>
                <p className="text-grey font-light">
                  We are a small, nimble company and utilise the latest technologies. Our lead in times are therefore short and our project delivery times are even shorter without impacting upon quality. We can be onsite in less than a week and depending on the availability of project information issue our reports and assessments in an equally short timeframes.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold font-headline text-primary mb-3">
                  UK-Wide Coverage
                </h3>
                <p className="text-grey font-light">
                  Based in London, we cover all areas of the UK. Contact us now for competitive pricing in your area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA with image (matches home body image sizing) ===== */}
      <section className="py-16 md:py-24 bg-card border-t">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Image column */}
            <div className="relative w-full mx-auto max-w-full md:max-w-[597px]">
              <div className="md:hidden">
                <Image
                  src={ctaMobileSrc}
                  alt={resolveAlt(roadImage, "noisy road")}
                  {...resolveDims(roadImage, "mobile")}
                  sizes="100vw"
                  className="rounded-lg shadow-xl object-cover w-full h-auto"
                  loading="lazy"
                />
              </div>
              <div className="hidden md:block">
                <Image
                  src={ctaDesktopSrc}
                  alt={resolveAlt(roadImage, "noisy road")}
                  {...resolveDims(roadImage, "desktop")}
                  sizes="(max-width: 1024px) 50vw, 597px"
                  className="rounded-lg shadow-xl object-cover w-full h-auto"
                  loading="lazy"
                  {...(roadImage?.imageHint ? { "data-ai-hint": roadImage.imageHint } : {})}
                />
              </div>
            </div>

            {/* Text column */}
            <div className="text-center md:text-left px-1 md:px-0">
              <h2 className="text-3xl md:text-4xl font-headline font-semibold">
                Ready to Discuss Your Project?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-grey-foreground font-light">
                Our experts are ready to provide the insights you need. Contact us today for a no-obligation consultation.
              </p>
              <Link href="/contact">
                <Button size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
                  Request a Consultation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ (accordion) ===== */}
      <section className="py-16 md:py-24 bg-background border-t border-b">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-headline font-semibold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-xl font-semibold text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-foreground font-light leading-relaxed pt-2">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}

// app/services/noise-survey/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getPlaceholder } from "@/lib/placeholders";
import { getServiceBySlug } from "@/lib/services";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

// Keep SEO meta derived from your catalog
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

// -------- Your provided data blocks (verbatim) --------
const details = {
  content: [
    "We provide low cost, comprehensive noise survey and noise modelling services across the UK. Whether you need an environmental noise survey for a feasibility study or planning application, a workplace noise assessment, or ongoing noise monitoring for operational sites, our experienced acoustic consultants deliver fast, accurate results. Are here to help.",
    "Our modern efficient processes and systems, ensure highly accurate results, fast turnaround times and competitive pricing.",
  ],
  features: [
    "Attended and unattended noise monitoring",
    "Short-term and long-term survey options",
    "Detailed frequency analysis",
    "Compliance with BS 4142 and other relevant standards",
    "Clear, jargon-free reporting",
  ],
};

const surveyServices = [
  {
    category: "Environmental Noise Surveys",
    imageId: "survey-environmental",
    items: [
      "Feasibility studies",
      "Planning application noise assessments",
      "Building services noise surveys and assessments such as Air Source Heat Pumps (ASHPs), air conditioning, chillers, and extract ventilation systems",
      "Acoustic compliance testing",
    ],
  },
  {
    category: "Residential Development",
    imageId: "survey-residential",
    items: [
      "Internal noise assessments in accordance with BS8233, Approved Document O of the Building Regulations compliance",
      "Assessment to the Acoustics, Ventilation and Overheating Guide (ANC)",
      "BREEAM and Code for Sustainable Homes requirements",
      "Building services noise assessments Such as Air Source Heat Pumps (ASHPs), Air Conditioning and Chillers according to BS4142.",
    ],
  },
  {
    category: "Educational Projects",
    imageId: "survey-educational",
    items: [
      "Façade and ventilation design to BB93 standards",
      "Building services / plant noise assessments in accordance to BS4142",
      "Sports facilities, pitches and MUGA noise evaluations",
    ],
  },
  {
    category: "Healthcare Facilities",
    imageId: "survey-healthcare",
    items: [
      "Façade and ventilation design to HTM08-01 standards",
      "Plant noise assessment in accordance to BS4142",
    ],
  },
  {
    category: "Transportation",
    imageId: "survey-transportation",
    items: [
      "Calculation of Train Noise (CRN)",
      "Calculation of Road Traffic Noise (CRTN)",
    ],
  },
  {
    category: "Industrial & Commercial",
    imageId: "survey-industrial",
    items: [
      "Building services noise assessments such as Air Source Heat Pumps (ASHPs), air conditioning, chillers, and extract ventilation systems",
      "Industrial Noise Surveys - Comprehensive BS4142 assessments for industrial operations",
      "Operational Noise - Evaluation of noise from operational activities and equipment",
    ],
  },
  {
    category: "Specialised Applications",
    imageId: "survey-specialised",
    items: [
      "Event & Music Noise - Assessment and monitoring for entertainment venues and events",
      "Construction Noise Surveys - BS5228 compliant assessments for construction projects",
      "Workplace Noise Assessments - Health and Safety Executive (HSE) compliant noise at work evaluations",
    ],
  },
];

const faqs = [
  {
    question: "What is a noise survey?",
    answer:
      "A noise survey, or acoustic survey, is a systematic measurement and analysis of noise levels in a specific environment. It helps to understand the existing noise climate, identify sources of noise, and assess its impact on the surrounding area or on people within a workplace.",
  },
  {
    question: "When do I need a noise survey?",
    answer:
      "You might need a noise survey for various reasons, including: supporting a planning application for a new development, investigating noise complaints, ensuring compliance with noise-related planning conditions, assessing noise at work for health and safety, or as part of an Environmental Impact Assessment (EIA).",
  },
  {
    question: "How long does a noise survey take?",
    answer:
      "The duration depends on the project's complexity and the specific requirements. A simple attended survey might take a few hours, while a survey for a planning application might require several days of unattended monitoring to capture representative background noise levels at different times, including day, evening, and night.",
  },
  {
    question: "What information do I get in the final report?",
    answer:
      "Our noise survey reports are comprehensive and easy to understand. They typically include the survey methodology, measurement locations, equipment used, detailed results (including noise level charts), analysis against relevant standards (like BS 4142 or BS 8233), and clear conclusions and recommendations.",
  },
];
// ------------------------------------------------------

export default function NoiseSurveyPage() {
  const hero = getPlaceholder("home-hero"); // keep hero identical
  const svc = getServiceBySlug("noise-survey");

  // Optional feature image per service (from your services catalog -> imageId)
  const featureImg = svc?.imageId ? getPlaceholder(svc.imageId) : undefined;

  // Extra image used in the later CTA panel
  const roadImage = getPlaceholder("survey-transportation");

  return (
    <div className="flex flex-col">
      {/* ===== HERO (REPLACED) ===== */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center text-center text-white overflow-hidden">
        {/* Mobile: image background (LCP on phones) */}
        <div className="absolute inset-0 md:hidden">
          <Image
            src={hero?.mobile?.src ?? hero?.imageUrl ?? "/images/hero_mobile.webp"}
            alt={hero?.description ?? "Acoustic consultancy — assessment, design and testing."}
            priority
            fill
            sizes="100vw"
            className="object-cover"
            quality={80}
          />
        </div>

        {/* Desktop: image background (Replaced video) */}
        <div className="hidden md:block absolute inset-0">
          <Image
            src={hero?.desktop?.src ?? hero?.imageUrl ?? "/images/hero_poster.webp"}
            alt={hero?.description ?? "Acoustic consultancy — assessment, design and testing."}
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
              Expert Acoustic Consultancy
              <span className="block font-body text-2xl md:text-4xl font-light mt-2">
                Assessment
                <span className="block">
                  Design <span className="text-accent">&amp;</span>
                  <br />
                  Testing
                </span>
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white font-light">
              Delivering Value through Excellence, Always.
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

      {/* ===== “What We Do” two-column band (uses details.content) ===== */}
      <section className="bg-background">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="bg-foreground py-24 flex items-center justify-end">
            <div className="container px-4 md:px-6 text-right">
              <h2 className="text-4xl md:text-5xl font-headline font-semibold text-background">
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
              const image = getPlaceholder(serviceItem.imageId);
              return (
                <AccordionItem key={serviceItem.category} value={serviceItem.category}>
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline text-left">
                    <div className="flex items-center w-full">
                      {image && (
                        <div className="relative w-24 h-16 mr-4 flex-none rounded-lg overflow-hidden">
                          <Image
                            src={image.imageUrl}
                            alt={image.description}
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
                    <ul className="list-disc pl-32 space-y-2 mt-2">
                      {serviceItem.items.map((item, index) => (
                        <li key={index} className="text-muted-foreground font-light">
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
                <p className="text-muted-foreground font-light">
                  Our processes and systems are highly efficient ensuring speed, accuracy and of course keeping our fees low.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold font-headline text-primary mb-3">
                  Experienced Engineers
                </h3>
                <p className="text-muted-foreground font-light">
                  With years of experience conducting noise surveys for a wide range of projects, from small commercial kitchens to major infrastructure schemes and power generation projects across the UK, Europe, and the Middle East, you can be confident in our ability to deliver accurate and robust acoustic surveys suitable for your project.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold font-headline text-primary mb-3">
                  Fast Turnaround
                </h3>
                <p className="text-muted-foreground font-light">
                  We are a small, nimble company and utilise the latest technologies. Our lead in times are therefore short and our project delivery times are even shorter without impacting upon quality. We can be onsite in less than a week and depending on the availability of project information issue our reports and assessments in an equally short timeframes.
                </p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold font-headline text-primary mb-3">
                  UK-Wide Coverage
                </h3>
                <p className="text-muted-foreground font-light">
                  Based in London, we cover all areas of the UK. Contact us now for competitive pricing in your area.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA with image ===== */}
      <section className="py-16 md:py-24 bg-card border-t">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-80 rounded-lg overflow-hidden">
              {roadImage && (
                <Image
                  src={roadImage.imageUrl}
                  alt={roadImage.description}
                  data-ai-hint={roadImage.imageHint}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-headline font-semibold">
                Ready to Discuss Your Project?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto md:mx-0 text-muted-foreground font-light">
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
                    <p className="text-muted-foreground font-light leading-relaxed pt-2">
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
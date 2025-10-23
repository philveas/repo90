import { SERVICES } from '@/lib/constants';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getPlaceholder } from '@/lib/placeholders'; // ✅ use the helper

const slug = 'noise-survey';
const service = SERVICES.find((s) => s.slug === slug);
const serviceImage = getPlaceholder(`service-${slug}`);

const details = {
  content: [
    "We provide low cost, comprehensive noise survey and noise modelling services across the UK. Whether you need an environmental noise survey for a feasibility study or planning application, a workplace noise assessment, or ongoing noise monitoring for operational sites, our experienced acoustic consultants deliver fast, accurate results. Are here to help.",
    "Our modern efficient processes and systems, ensure highly accurate results, fast turnaround times and competitive pricing."
  ],
  features: [
    "Attended and unattended noise monitoring",
    "Short-term and long-term survey options",
    "Detailed frequency analysis",
    "Compliance with BS 4142 and other relevant standards",
    "Clear, jargon-free reporting"
  ]
};

const surveyServices = [
  {
    category: "Environmental Noise Surveys",
    items: [
      "Feasibility studies",
      "Planning application noise assessments",
      "Building services noise surveys and assessments such as Air Source Heat Pumps (ASHPs), air conditioning, chillers, and extract ventilation systems",
      "Acoustic compliance testing"
    ]
  },
  {
    category: "Residential Development",
    items: [
      "Internal noise assessments in accordance with BS8233, Approved Document O of the Building Regulations compliance",
      "Assessment to the Acoustics, Ventilation and Overheating Guide (ANC)",
      "BREEAM and Code for Sustainable Homes requirements",
      "Building services noise assessments Such as Air Source Heat Pumps (ASHPs), Air Conditioning and Chillers according to BS4142."
    ]
  },
  {
    category: "Educational Projects",
    items: [
      "Façade and ventilation design to BB93 standards",
      "Building services / plant noise assessments in accordance to BS4142",
      "Sports facilities, pitches and MUGA noise evaluations"
    ]
  },
  {
    category: "Healthcare Facilities",
    items: [
      "Façade and ventilation design to HTM08-01 standards",
      "Plant noise assessment in accordance to BS4142"
    ]
  },
  {
    category: "Transportation",
    items: [
      "Calculation of Train Noise (CRN)",
      "Calculation of Road Traffic Noise (CRTN)"
    ]
  },
  {
    category: "Industrial & Commercial",
    items: [
      "Building services noise assessments such as Air Source Heat Pumps (ASHPs), air conditioning, chillers, and extract ventilation systems",
      "Industrial Noise Surveys - Comprehensive BS4142 assessments for industrial operations",
      "Operational Noise - Evaluation of noise from operational activities and equipment"
    ]
  },
  {
    category: "Specialised Applications",
    items: [
      "Event & Music Noise - Assessment and monitoring for entertainment venues and events",
      "Construction Noise Surveys - BS5228 compliant assessments for construction projects",
      "Workplace Noise Assessments - Health and Safety Executive (HSE) compliant noise at work evaluations"
    ]
  }
];

const faqs = [
  {
    question: "What is a noise survey?",
    answer: "A noise survey, or acoustic survey, is a systematic measurement and analysis of noise levels in a specific environment. It helps to understand the existing noise climate, identify sources of noise, and assess its impact on the surrounding area or on people within a workplace."
  },
  {
    question: "When do I need a noise survey?",
    answer: "You might need a noise survey for various reasons, including: supporting a planning application for a new development, investigating noise complaints, ensuring compliance with noise-related planning conditions, assessing noise at work for health and safety, or as part of an Environmental Impact Assessment (EIA)."
  },
  {
    question: "How long does a noise survey take?",
    answer: "The duration depends on the project's complexity and the specific requirements. A simple attended survey might take a few hours, while a survey for a planning application might require several days of unattended monitoring to capture representative background noise levels at different times, including day, evening, and night."
  },
  {
    question: "What information do I get in the final report?",
    answer: "Our noise survey reports are comprehensive and easy to understand. They typically include the survey methodology, measurement locations, equipment used, detailed results (including noise level charts), analysis against relevant standards (like BS 4142 or BS 8233), and clear conclusions and recommendations."
  }
];

export const metadata: Metadata = {
  title: `Noise Surveys and Noise Monitoring | veas Acoustics`,
  description: service?.description ?? "Professional environmental and building noise surveys across the UK.",
};

export default function ServicePage() {
  if (!service) {
    notFound();
  }

  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[50vh] min-h-[300px] flex items-center justify-center text-white">
        {serviceImage && (
          <Image
            src={serviceImage.imageUrl}
            alt={serviceImage.description}
            fill
            className="object-cover"
            priority
            sizes="100vw"                 // ✅ helps LCP
            data-ai-hint={serviceImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative z-10 container px-4 md:px-6 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-headline font-semibold tracking-tight">
            Noise Surveys and Noise Monitoring
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl font-light">
            {service.description}
          </p>
          <div className="mt-8">
            <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/contact">Get Survey Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl font-headline font-semibold">What We Do</h2>
              {details.content.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed font-light">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card border-t">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-headline font-semibold text-center mb-8">Our Noise Survey Services</h2>
            <Accordion type="single" collapsible className="w-full">
              {surveyServices.map((serviceItem) => (
                <AccordionItem key={serviceItem.category} value={serviceItem.category}>
                  <AccordionTrigger className="text-xl font-semibold hover:no-underline">{serviceItem.category}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="list-disc pl-5 space-y-2 mt-2">
                      {serviceItem.items.map((item, index) => (
                        <li key={index} className="text-muted-foreground font-light">{item}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background border-t">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-headline font-semibold text-center mb-12">Why choose our Noise Survey Services?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-card rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold font-headline text-primary mb-3">Experienced Engineers</h3>
                <p className="text-muted-foreground font-light">With years of experience conducting noise surveys for a wide range of projects, from small commercial kitchens to major infrastructure schemes and power generation projects across the UK, Europe, and the Middle East, you can be confident in our ability to deliver accurate and robust acoustic surveys suitable for your project.</p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold font-headline text-primary mb-3">Fast Turnaround</h3>
                <p className="text-muted-foreground font-light">We are a small, nimble company and utilise the latest technologies. Our lead in times are therefore short and our project delivery times are even shorter without impacting upon quality. We can be onsite in less than a week and depending on the availability of project information issue our reports and assessments in an equally short timeframes.</p>
              </div>
              <div className="p-6 bg-card rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold font-headline text-primary mb-3">UK-Wide Coverage</h3>
                <p className="text-muted-foreground font-light">Based in London, we cover all areas of the UK. Contact us now for competitive pricing in your area.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-card border-t">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-semibold">Ready to Discuss Your Project?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground font-light">
            Our experts are ready to provide the insights you need. Contact us today for a no-obligation consultation.
          </p>
          <Button size="lg" asChild className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/contact">
              Request a Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background border-t border-b">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-headline font-semibold text-center mb-8">Frequently Asked Questions</h2>
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

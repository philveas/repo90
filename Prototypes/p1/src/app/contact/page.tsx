import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getPlaceholder } from '@/lib/placeholders';
import { ContactForm } from '@/components/contact/contact-form';

export const metadata = {
  title: 'Contact Us | Veas Acoustics',
  description:
    'Get in touch with Veas Acoustics for noise surveys and impact assessments or building acoustic design consultancy.',
};

const mapImage = getPlaceholder('contact-map');

export default function ContactPage() {
  return (
    <div className="bg-card">
      {/* ---------- HEADER ---------- */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 text-center animate-fade-in-down">
          <h1 className="text-4xl md:text-5xl font-headline text-primary font-semibold">
            Contact Us
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground font-light">
            We’re here to help. Please use the form to send us a message, or contact us using <br />
            the details below or by clicking the Whatsapp icon.
          </p>
        </div>
      </section>

      {/* ---------- CONTACT SECTION ---------- */}
      <section className="container px-4 md:px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-12">
          {/* FORM CARD */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-headline font-semibold">
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          {/* MAP + OVERLAYS */}
          <div className="relative rounded-lg overflow-hidden shadow-lg h-[600px] md:h-auto">
            {/* Base map image */}
            {mapImage ? (
              <Image
                src={mapImage.imageUrl}
                alt={mapImage.description}
                data-ai-hint={mapImage.imageHint}
                fill
                sizes="100vw"
                priority
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted" />
            )}

            {/* Grey tint overlay (now behind both pin and contact info) */}
            <div className="absolute inset-0 bg-black/50 z-0" />

            {/* Transparent Lucide MapPin marker */}
            <div
              className="absolute z-40"
              style={{
                left: '74.5%', // ← adjust these percentages to your exact office location
                top: '81%',
                transform: 'translate(-50%, -100%)', // anchor the tip to the point
              }}
              aria-hidden
            >
              <MapPin
                className="w-9 h-9 text-accent drop-shadow-[0_2px_4px_rgba(0,0,0,.05)]"
                strokeWidth={2.5}
              />
            </div>

            {/* CONTACT INFO OVERLAY (pulled in front of grey background) */}
            <div className="absolute inset-0 z-40 flex flex-col justify-between p-8">
              <div>
                <h2 className="text-2xl font-headline font-semibold mb-6 text-white">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Mail className="w-6 h-6 text-accent drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)]" />
                    <div>
                      <h3 className="font-semibold text-white">Email</h3>
                      <a
                        href="mailto:info@veasacoustics.com"
                        className="text-white hover:text-accent transition-colors font-light"
                      >
                        info@veasacoustics.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                      <Phone className="w-6 h-6 text-accent drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]" />
                    <div>
                      <h3 className="font-semibold text-white">Phone</h3>
                      <a
                        href="tel:+4407721524262"
                        className="text-white hover:text-accent transition-colors font-light"
                      >
                        +44 07721 524262
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-accent drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]" />
                    <div>
                      <h3 className="font-semibold text-white">Office</h3>
                      <p className="text-white font-light">9 Perseverance Works,</p>
                      <p className="text-white font-light">Kingsland Road,</p>
                      <p className="text-white font-light">London, E2 8DD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END CONTACT INFO OVERLAY */}
          </div>
        </div>
      </section>
    </div>
  );
}

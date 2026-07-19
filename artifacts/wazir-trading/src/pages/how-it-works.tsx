import React from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Browse & Select',
      desc: 'Explore our curated inventory of premium Japanese used cars. Use our advanced filters to find the exact make, model, and specification you desire. If you don\'t see what you want, we can source it directly from auction for you.'
    },
    {
      num: '02',
      title: 'Request a Quote',
      desc: 'Once you find a vehicle, click "Enquire". Our sales team will promptly calculate the complete CIF price (Cost, Insurance, and Freight) to your designated destination port, providing a fully transparent breakdown.'
    },
    {
      num: '03',
      title: 'Secure Payment',
      desc: 'Upon agreeing to the price, we will issue a Proforma Invoice. Payments are made securely via Bank Wire Transfer (Telegraphic Transfer) to our corporate bank account in Japan. We will reserve the vehicle upon receiving proof of transfer.'
    },
    {
      num: '04',
      title: 'Shipping & Documentation',
      desc: 'We arrange the earliest available shipping vessel (RoRo or Container). Once the ship departs Japan, we process the Bill of Lading (B/L), Export Certificate, and Invoice, sending them to you via DHL or FedEx.'
    },
    {
      num: '05',
      title: 'Receive Your Vehicle',
      desc: 'Use the provided documents to clear customs at your local port, either personally or through a clearing agent. Once cleared, your premium Japanese vehicle is ready for the road.'
    }
  ];

  return (
    <div className="min-h-screen bg-background pt-20">
      <section className="bg-secondary text-white py-20">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">How to Import</h1>
          <p className="text-white/70 text-lg">A streamlined, transparent process to bring Japanese automotive excellence to your driveway.</p>
        </div>
      </section>

      {/* Steps Timeline */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="space-y-16">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-col md:flex-row gap-6 md:gap-12 items-start"
              >
                <div className="flex-shrink-0 text-7xl font-serif font-bold text-primary/20 leading-none">
                  {step.num}
                </div>
                <div className="pt-2">
                  <h3 className="text-2xl font-serif font-bold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <FaqItem 
              question="What is an Auction Grade?" 
              answer="Japanese auto auctions use a strict grading system from 1 to 5. Grade 5 implies near-new condition, Grade 4.5 is excellent condition with minor blemishes, Grade 4 is good condition, and Grade R denotes a repaired vehicle. We focus on grades 4 and above."
            />
            <FaqItem 
              question="How long does shipping take?" 
              answer="Shipping duration depends on the destination port. Generally, East Africa takes 3-4 weeks, the Caribbean takes 4-5 weeks, and Oceania takes 2-3 weeks from the departure date from Japan."
            />
            <FaqItem 
              question="Do you provide a warranty?" 
              answer="Vehicles are sold on an 'as-is' basis, standard for international vehicle export. However, our thorough pre-purchase inspection and reliance on strict Japanese auction grading ensures you receive a high-quality vehicle that matches its condition report perfectly."
            />
            <FaqItem 
              question="What documents will I receive?" 
              answer="You will receive the original Bill of Lading (B/L), the Export Certificate (both original and English translation), and the Commercial Invoice. These are dispatched via express courier once the ship departs."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-2xl font-serif font-bold mb-6">Ready to start the process?</h2>
        <Link href="/cars" className="inline-block bg-primary text-primary-foreground px-8 py-4 font-medium uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors">
          View Our Inventory
        </Link>
      </section>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border border-border bg-card overflow-hidden">
      <button 
        className="w-full text-left px-6 py-4 font-serif font-bold text-lg flex justify-between items-center hover:bg-muted/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <span className="text-primary text-2xl leading-none">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}

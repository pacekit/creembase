import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
    {
        question: "Can I upgrade or downgrade my plan at any time?",
        answer: "Yes! You can change your plan at any time from your billing dashboard. Changes are processed immediately and prorated accordingly.",
    },
    {
        question: "Is there a free trial for the Startup tier?",
        answer: "We offer a 14-day free trial on our Startup plan so you can test all the premium features before committing.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards, Apple Pay, and Google Pay through our secure payment provider, Creem.",
    },
    {
        question: "Do you offer discounts for educational or non-profit use?",
        answer: "Absolutely! Contact our support team with proof of your status, and we'll provide a 50% discount on any plan.",
    },
    {
        question: "What happens if I exceed my API request limit?",
        answer: "We won't cut you off immediately. We'll notify you when you reach 80% and 100% of your limit, and provide options to upgrade or pay for overages.",
    },
];

export const PricingFaqs = () => {
    return (
        <section className="mt-24 space-y-12">
            <div className="mx-auto flex max-w-232 flex-col items-center space-y-4 text-center">
                <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">FAQs</h2>
                <p className="text-muted-foreground max-w-[85%] sm:text-lg">Got questions? We've got answers.</p>
            </div>

            <div className="mx-auto max-w-232">
                <Accordion className="w-full">
                    {FAQS.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-base">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground text-sm">{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

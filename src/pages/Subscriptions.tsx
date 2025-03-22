
import { MainLayout } from "@/components/layout/MainLayout";
import { BlurPanel } from "@/components/ui-custom/BlurPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Check } from "lucide-react";

const SubscriptionPlans = [
  {
    id: "basic",
    name: "Basic",
    price: "$9.99",
    period: "monthly",
    description: "Essential features for individual users",
    features: [
      "5 wallpaper uploads per month",
      "Access to standard catalog",
      "2 custom interiors",
      "Email support"
    ],
    popular: false
  },
  {
    id: "professional",
    name: "Professional",
    price: "$19.99",
    period: "monthly",
    description: "Complete features for professionals",
    features: [
      "Unlimited wallpaper uploads",
      "Access to premium catalog",
      "10 custom interiors",
      "Priority support",
      "Advanced visualizations",
      "Brand subscriptions included"
    ],
    popular: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$49.99",
    period: "monthly",
    description: "Full access for design studios",
    features: [
      "Unlimited uploads & interiors",
      "Complete catalog access",
      "All manufacturer subscriptions included",
      "Team collaboration",
      "API access",
      "Dedicated support manager"
    ],
    popular: false
  }
];

const Subscriptions = () => {
  const handleSubscribe = (planId: string) => {
    toast({
      title: "Subscription initiated",
      description: `You've selected the ${planId} plan. Redirecting to payment...`,
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)]">Subscriptions</h1>
          <p className="text-muted-foreground mt-1 text-[var(--text-secondary)]">
            Choose a plan that's right for your design needs
          </p>
        </div>

        <BlurPanel className="w-full p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SubscriptionPlans.map((plan) => (
              <Card 
                key={plan.id} 
                className={cn(
                  "border shadow-[var(--shadow-sm)] transition-all duration-300 hover:shadow-[var(--shadow-md)]",
                  plan.popular ? "border-[var(--primary-color)] relative" : ""
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-0 right-0 mx-auto w-max px-3 py-1 bg-[var(--primary-color)] text-white text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-xl text-[var(--text-primary)]">{plan.name}</CardTitle>
                  <CardDescription className="text-[var(--text-secondary)]">{plan.description}</CardDescription>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-[var(--text-primary)]">{plan.price}</span>
                    <span className="text-[var(--text-secondary)] ml-1">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-[var(--primary-color)] mr-2 flex-shrink-0" />
                        <span className="text-[var(--text-secondary)]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSubscribe(plan.id)}
                    className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.popular ? "Subscribe Now" : "Get Started"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </BlurPanel>
        
        <BlurPanel className="w-full p-8">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--text-primary)]">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-[var(--text-primary)]">Can I change plans later?</h3>
              <p className="text-[var(--text-secondary)]">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-[var(--text-primary)]">Is there a free trial?</h3>
              <p className="text-[var(--text-secondary)]">
                We offer a 14-day free trial on all plans. No credit card required to start.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-[var(--text-primary)]">What payment methods do you accept?</h3>
              <p className="text-[var(--text-secondary)]">
                We accept all major credit cards, PayPal, and bank transfers for enterprise plans.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2 text-[var(--text-primary)]">How do refunds work?</h3>
              <p className="text-[var(--text-secondary)]">
                If you're not satisfied, contact us within 30 days of purchase for a full refund.
              </p>
            </div>
          </div>
        </BlurPanel>
      </div>
    </MainLayout>
  );
};

export default Subscriptions;

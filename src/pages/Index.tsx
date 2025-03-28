
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, Sparkles, Wallpaper, Home, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { BlurPanel } from "@/components/ui-custom/BlurPanel";
import { AnimatedButton } from "@/components/ui-custom/AnimatedButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-[var(--secondary-color)]">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-[var(--primary-color)] p-1.5">
            <Wallpaper className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-medium text-[var(--text-primary)]">FloorStyle Pro</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="text-[var(--text-primary)] hover:text-[var(--primary-color)] transition-colors">
            Dashboard
          </Link>
          <Link to="/subscriptions">
            <Button variant="outline" className="border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)]/10">
              Pricing
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto py-16 px-4 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 bg-[var(--primary-color)]/10 px-4 py-2 rounded-full text-sm font-medium text-[var(--primary-color)]">
            <Sparkles className="h-4 w-4" />
            <span>AI-powered solutions for flooring professionals</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[var(--text-primary)]">
            Boost Your <span className="text-[var(--primary-color)]">Flooring Business</span> with Visualization Tools
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl">
            Help your customers visualize flooring and wallpaper products in their space with our AI tools. Close more sales with realistic previews.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/dashboard">
              <AnimatedButton className="bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color)]/90 px-6 py-3 rounded-lg">
                Start Your Free Trial
                <ArrowRight className="h-5 w-5" />
              </AnimatedButton>
            </Link>
            <Link to="/wallpapers">
              <Button variant="outline" className="border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)]/10 px-6 py-3 rounded-lg">
                View Sample Visualizations
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-[var(--primary-color)]/20 blur-3xl"></div>
          <BlurPanel className="w-full max-w-lg mx-auto overflow-hidden rounded-2xl shadow-lg border-[var(--primary-color)]/10">
            <img 
              src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80" 
              alt="Living room with beautiful wallpaper and flooring" 
              className="w-full h-auto rounded-xl object-cover aspect-[4/3]" 
            />
          </BlurPanel>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <h3 className="text-[var(--primary-color)] font-medium mb-3">FEATURES</h3>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Grow Your Flooring Business</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Flooring Visualization",
              description: "Show customers exactly how hardwood, laminate, tile, or carpet will look in their space.",
              icon: <Wallpaper className="h-6 w-6 text-[var(--primary-color)]" />,
            },
            {
              title: "Room Transformations",
              description: "Upload customer room photos and instantly show different flooring and wallpaper options.",
              icon: <Home className="h-6 w-6 text-[var(--primary-color)]" />,
            },
            {
              title: "Business Growth Tools",
              description: "Generate quotes, manage customer projects, and track your flooring installations.",
              icon: <CreditCard className="h-6 w-6 text-[var(--primary-color)]" />,
            }
          ].map((feature, index) => (
            <BlurPanel 
              key={index}
              className="p-6 h-full transition-transform hover:scale-105"
            >
              <div className="rounded-full bg-[var(--primary-color)]/10 p-3 inline-block mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">{feature.title}</h3>
              <p className="text-[var(--text-secondary)]">{feature.description}</p>
            </BlurPanel>
          ))}
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="bg-[var(--secondary-color)]/80 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-[var(--primary-color)] font-medium mb-3">PRICING</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">Plans for Every Flooring Business</h2>
            <p className="mt-4 text-[var(--text-secondary)] max-w-xl mx-auto">
              Whether you're a small contractor or a large flooring retailer, we have plans to fit your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Contractor",
                price: "$49",
                period: "per month",
                features: ["25 Visualization Projects", "Basic Material Library", "Customer Presentation Tools", "Email Support"],
                highlighted: false,
                buttonText: "Get Started",
              },
              {
                name: "Retailer",
                price: "$99",
                period: "per month",
                features: ["Unlimited Projects", "Premium Material Library", "Customer Portal Access", "Sales Team Management", "Priority Support"],
                highlighted: true,
                buttonText: "Try Retailer Plan",
              },
              {
                name: "Enterprise",
                price: "$249",
                period: "per month",
                features: ["Multi-Location Support", "Custom Branding", "API Access", "Dedicated Account Manager", "White Label Options"],
                highlighted: false,
                buttonText: "Contact Sales",
              },
            ].map((plan, index) => (
              <BlurPanel
                key={index}
                className={cn(
                  "p-6 flex flex-col h-full",
                  plan.highlighted && "border-[var(--primary-color)] shadow-lg scale-105 relative"
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--primary-color)] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-[var(--text-primary)]">{plan.price}</span>
                    <span className="text-[var(--text-secondary)]"> {plan.period}</span>
                  </div>
                </div>
                
                <ul className="mb-6 space-y-3 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-[var(--primary-color)]" />
                      <span className="text-[var(--text-secondary)]">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link to="/subscriptions" className="mt-auto">
                  <Button 
                    className={cn(
                      "w-full", 
                      plan.highlighted 
                        ? "bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white" 
                        : "bg-white hover:bg-[var(--primary-color)]/10 text-[var(--text-primary)] border border-[var(--primary-color)]/20"
                    )}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </BlurPanel>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-16 px-4">
        <BlurPanel className="max-w-4xl mx-auto text-center py-12 px-6 relative overflow-hidden">
          <div className="absolute -z-10 top-0 right-0 w-64 h-64 bg-[var(--primary-color)]/20 rounded-full blur-3xl"></div>
          <div className="absolute -z-10 bottom-0 left-0 w-64 h-64 bg-[var(--accent-color)]/10 rounded-full blur-3xl"></div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--text-primary)]">Grow Your Flooring Business Today</h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-8">
            Join hundreds of flooring professionals already using our tools to increase sales conversions by up to 40%.
          </p>
          <Link to="/dashboard">
            <AnimatedButton className="bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color)]/90 px-8 py-3 rounded-lg">
              Start Your 14-Day Free Trial
              <ArrowRight className="h-5 w-5" />
            </AnimatedButton>
          </Link>
        </BlurPanel>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--secondary-color)]/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="rounded-full bg-[var(--primary-color)] p-1.5">
                <Wallpaper className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-medium text-[var(--text-primary)]">FloorStyle Pro</h2>
            </div>
            
            <div className="flex gap-8">
              <Link to="/dashboard" className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                Dashboard
              </Link>
              <Link to="/wallpapers" className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                Samples
              </Link>
              <Link to="/interiors" className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                Visualizer
              </Link>
              <Link to="/subscriptions" className="text-[var(--text-secondary)] hover:text-[var(--primary-color)] transition-colors">
                Pricing
              </Link>
            </div>
          </div>
          
          <div className="border-t border-[var(--text-secondary)]/10 mt-8 pt-8 text-center text-[var(--text-secondary)]">
            © {new Date().getFullYear()} FloorStyle Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

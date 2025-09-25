import { Truck, Headphones, Shield } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "INSTANT DELIVERY",
    description: "From cart to your doorstep, fast.",
  },
  {
    icon: Headphones,
    title: "24/7 CUSTOMER SERVICE",
    description: "Got questions? Someone's always here. Anytime you need us.",
  },
  {
    icon: Shield,
    title: "MONEY BACK GUARANTEE",
    description: "If it's not going well, we'll refund you. Simple.",
  },
];

export function Value() {
  return (
    <section className="py-16 bg-pryColor/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-pryColor/10">
                  <feature.icon className="h-8 w-8 text-pryColor" />
                </div>
              </div>
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

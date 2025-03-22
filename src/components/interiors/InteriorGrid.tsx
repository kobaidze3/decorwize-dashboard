
import { BlurPanel } from "@/components/ui-custom/BlurPanel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Interior } from "@/types";
import { useEffect, useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const InteriorGrid = () => {
  const [interiors, setInteriors] = useState<Interior[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data loading
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: Interior[] = [
        {
          id: "i1",
          name: "Modern Living Room",
          image: "/placeholder.svg",
          isEnabled: true,
          isCustom: false
        },
        {
          id: "i2",
          name: "Minimalist Bedroom",
          image: "/placeholder.svg",
          isEnabled: true,
          isCustom: false
        },
        {
          id: "i3",
          name: "Contemporary Kitchen",
          image: "/placeholder.svg",
          isEnabled: false,
          isCustom: false
        },
        {
          id: "i4",
          name: "Home Office",
          image: "/placeholder.svg",
          isEnabled: true,
          isCustom: true
        }
      ];
      
      setInteriors(mockData);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  const toggleInterior = (id: string) => {
    setInteriors(prev => 
      prev.map(interior => 
        interior.id === id ? { ...interior, isEnabled: !interior.isEnabled } : interior
      )
    );
    
    const interior = interiors.find(i => i.id === id);
    
    toast({
      title: interior?.isEnabled ? "Interior disabled" : "Interior enabled",
      description: `${interior?.name} has been ${interior?.isEnabled ? 'disabled' : 'enabled'}`
    });
  };

  const deleteInterior = (id: string) => {
    const interior = interiors.find(i => i.id === id);
    
    setInteriors(prev => prev.filter(interior => interior.id !== id));
    
    toast({
      title: "Interior deleted",
      description: `${interior?.name} has been deleted`
    });
  };

  if (isLoading) {
    return (
      <BlurPanel className="w-full">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin-slow opacity-50">
            <div className="h-12 w-12 border-t-2 border-primary rounded-full" />
          </div>
        </div>
      </BlurPanel>
    );
  }

  return (
    <BlurPanel className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">Available Interiors</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interiors.map(interior => (
          <Card key={interior.id} className="overflow-hidden group transition-all duration-300 hover:shadow-md">
            <div className="relative aspect-[4/3] bg-muted overflow-hidden">
              <img 
                src={interior.image} 
                alt={interior.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {!interior.isEnabled && (
                <div className="absolute inset-0 bg-background/80 backdrop-blur-xs flex items-center justify-center">
                  <p className="text-sm font-medium text-muted-foreground">Disabled</p>
                </div>
              )}
              {interior.isCustom && (
                <div className="absolute top-2 left-2">
                  <span className="bg-primary/10 text-primary text-xs font-medium py-1 px-2 rounded-full">
                    Custom
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium truncate">{interior.name}</h3>
                <Switch 
                  checked={interior.isEnabled}
                  onCheckedChange={() => toggleInterior(interior.id)}
                />
              </div>
              
              <div className="flex justify-end mt-3 gap-2">
                <Button variant="outline" size="sm" className="h-8 px-2">
                  <Edit className="h-3.5 w-3.5" />
                </Button>
                {interior.isCustom && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-8 px-2 text-destructive hover:text-destructive"
                    onClick={() => deleteInterior(interior.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </BlurPanel>
  );
};

export { InteriorGrid };

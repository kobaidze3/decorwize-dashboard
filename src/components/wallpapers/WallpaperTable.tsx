
import { BlurPanel } from "@/components/ui-custom/BlurPanel";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Manufacturer } from "@/types";
import { StarIcon, ChevronDown, ChevronRight, Check } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

const WallpaperTable = () => {
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [expandedManufacturers, setExpandedManufacturers] = useState<Record<string, boolean>>({});
  const [expandedBrands, setExpandedBrands] = useState<Record<string, boolean>>({});
  const [expandedCollections, setExpandedCollections] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data loading
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: Manufacturer[] = [
        {
          id: "m1",
          name: "Elegant Designs",
          isSubscribed: false,
          brands: [
            {
              id: "b1",
              manufacturerId: "m1",
              name: "Modern Living",
              isSubscribed: true,
              collections: [
                {
                  id: "c1",
                  brandId: "b1",
                  name: "Spring 2023",
                  products: [
                    {
                      id: "p1",
                      collectionId: "c1",
                      name: "Seafoam Trellis",
                      image: "/placeholder.svg"
                    },
                    {
                      id: "p2",
                      collectionId: "c1",
                      name: "Emerald Damask",
                      image: "/placeholder.svg"
                    }
                  ]
                }
              ]
            },
            {
              id: "b2",
              manufacturerId: "m1",
              name: "Vintage Charm",
              isSubscribed: false,
              collections: [
                {
                  id: "c2",
                  brandId: "b2",
                  name: "Heritage Collection",
                  products: [
                    {
                      id: "p3",
                      collectionId: "c2",
                      name: "Victoria Floral",
                      image: "/placeholder.svg"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "m2",
          name: "Luxe Interiors",
          isSubscribed: true,
          brands: [
            {
              id: "b3",
              manufacturerId: "m2",
              name: "Premium Textures",
              isSubscribed: false,
              collections: [
                {
                  id: "c3",
                  brandId: "b3",
                  name: "Metallics",
                  products: [
                    {
                      id: "p4",
                      collectionId: "c3",
                      name: "Gold Leaf",
                      image: "/placeholder.svg"
                    },
                    {
                      id: "p5",
                      collectionId: "c3",
                      name: "Brushed Silver",
                      image: "/placeholder.svg"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ];
      
      setManufacturers(mockData);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  const toggleManufacturer = (id: string) => {
    setExpandedManufacturers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleBrand = (id: string) => {
    setExpandedBrands(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleCollection = (id: string) => {
    setExpandedCollections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleSubscription = (type: 'manufacturer' | 'brand', id: string) => {
    if (type === 'manufacturer') {
      setManufacturers(prev => 
        prev.map(m => 
          m.id === id ? { ...m, isSubscribed: !m.isSubscribed } : m
        )
      );
      
      toast({
        title: "Subscription updated",
        description: `You've ${manufacturers.find(m => m.id === id)?.isSubscribed ? 'unsubscribed from' : 'subscribed to'} a manufacturer`
      });
    } else {
      setManufacturers(prev => 
        prev.map(m => ({
          ...m,
          brands: m.brands.map(b => 
            b.id === id ? { ...b, isSubscribed: !b.isSubscribed } : b
          )
        }))
      );
      
      toast({
        title: "Subscription updated",
        description: `You've ${manufacturers.some(m => m.brands.some(b => b.id === id && b.isSubscribed)) ? 'unsubscribed from' : 'subscribed to'} a brand`
      });
    }
  };

  const selectWallpaper = (productId: string) => {
    toast({
      title: "Wallpaper selected",
      description: "This wallpaper has been added to your visualizer"
    });
  };

  // Function to view all products in a collection directly without expanding
  const viewAllInCollection = (collectionId: string) => {
    // Find all products in this collection and show them
    let productsFound = false;
    
    manufacturers.forEach(manufacturer => {
      manufacturer.brands.forEach(brand => {
        brand.collections.forEach(collection => {
          if (collection.id === collectionId) {
            productsFound = true;
            // Toggle to ensure it's expanded
            setExpandedCollections(prev => ({
              ...prev,
              [collectionId]: true
            }));
            
            // Make sure parent brand is expanded
            setExpandedBrands(prev => ({
              ...prev,
              [brand.id]: true
            }));
            
            // Make sure manufacturer is expanded
            setExpandedManufacturers(prev => ({
              ...prev,
              [manufacturer.id]: true
            }));
            
            toast({
              title: `${collection.name} Products`,
              description: `Showing all ${collection.products.length} products in this collection`
            });
          }
        });
      });
    });
    
    if (!productsFound) {
      toast({
        title: "No products found",
        description: "This collection doesn't have any products yet",
        variant: "destructive"
      });
    }
  };
  
  // Function to view all collections in a brand directly
  const viewAllInBrand = (brandId: string) => {
    // Find the brand and show all its collections
    let brand = null;
    let manufacturer = null;
    
    manufacturers.forEach(m => {
      m.brands.forEach(b => {
        if (b.id === brandId) {
          brand = b;
          manufacturer = m;
        }
      });
    });
    
    if (brand) {
      // Toggle to ensure brand is expanded
      setExpandedBrands(prev => ({
        ...prev,
        [brandId]: true
      }));
      
      // Make sure manufacturer is expanded
      setExpandedManufacturers(prev => ({
        ...prev,
        [manufacturer!.id]: true
      }));
      
      toast({
        title: `${brand.name} Collections`,
        description: `Showing all ${brand.collections.length} collections in this brand`
      });
    } else {
      toast({
        title: "Brand not found",
        description: "This brand doesn't exist or has been removed",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <BlurPanel className="w-full">
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin-slow opacity-50">
            <div className="h-12 w-12 border-t-2 border-[var(--primary-color)] rounded-full" />
          </div>
        </div>
      </BlurPanel>
    );
  }

  return (
    <BlurPanel className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-[var(--text-primary)]">Wallpaper Catalog</h2>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Name</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {manufacturers.map(manufacturer => (
              <>
                <TableRow 
                  key={manufacturer.id} 
                  className="bg-[var(--secondary-color)]/40 cursor-pointer hover:bg-[var(--secondary-color)]"
                  onClick={() => toggleManufacturer(manufacturer.id)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 mr-2 text-[var(--primary-color)]"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleManufacturer(manufacturer.id);
                        }}
                      >
                        {expandedManufacturers[manufacturer.id] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                      <span className="text-[var(--text-primary)]">{manufacturer.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[var(--text-secondary)]">{manufacturer.brands.length} brands</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={manufacturer.isSubscribed ? "default" : "outline"}
                      size="sm"
                      className={manufacturer.isSubscribed ? "bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90" : ""}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSubscription('manufacturer', manufacturer.id);
                      }}
                    >
                      {manufacturer.isSubscribed ? (
                        <><Check className="h-3.5 w-3.5 mr-1" /> Subscribed</>
                      ) : (
                        <><StarIcon className="h-3.5 w-3.5 mr-1" /> Subscribe</>
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
                
                {expandedManufacturers[manufacturer.id] && manufacturer.brands.map(brand => (
                  <>
                    <TableRow 
                      key={brand.id} 
                      className="bg-background cursor-pointer hover:bg-[var(--secondary-color)]/20"
                      onClick={() => viewAllInBrand(brand.id)}
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center pl-8">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 mr-2 text-[var(--primary-color)]"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBrand(brand.id);
                            }}
                          >
                            {expandedBrands[brand.id] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                          <span className="text-[var(--text-primary)]">{brand.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-[var(--text-secondary)]">{brand.collections.length} collections</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant={brand.isSubscribed ? "default" : "outline"}
                          size="sm"
                          className={brand.isSubscribed ? "bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90" : ""}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSubscription('brand', brand.id);
                          }}
                        >
                          {brand.isSubscribed ? (
                            <><Check className="h-3.5 w-3.5 mr-1" /> Subscribed</>
                          ) : (
                            <><StarIcon className="h-3.5 w-3.5 mr-1" /> Subscribe</>
                          )}
                        </Button>
                      </TableCell>
                    </TableRow>
                    
                    {expandedBrands[brand.id] && brand.collections.map(collection => (
                      <>
                        <TableRow 
                          key={collection.id} 
                          className="bg-muted/30 cursor-pointer hover:bg-[var(--secondary-color)]/30"
                          onClick={() => viewAllInCollection(collection.id)}
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center pl-16">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 mr-2 text-[var(--primary-color)]"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleCollection(collection.id);
                                }}
                              >
                                {expandedCollections[collection.id] ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </Button>
                              <span className="text-[var(--text-primary)]">{collection.name}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-[var(--text-secondary)]">{collection.products.length} products</TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                viewAllInCollection(collection.id);
                              }}
                            >
                              View All
                            </Button>
                          </TableCell>
                        </TableRow>
                        
                        {expandedCollections[collection.id] && collection.products.map(product => (
                          <TableRow 
                            key={product.id} 
                            className="bg-background cursor-pointer hover:bg-[var(--secondary-color)]/10"
                            onClick={() => selectWallpaper(product.id)}
                          >
                            <TableCell className="font-medium">
                              <div className="flex items-center pl-24 gap-2">
                                <div className="h-8 w-8 rounded bg-muted flex items-center justify-center overflow-hidden">
                                  <img 
                                    src={product.image} 
                                    alt={product.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <span className="text-[var(--text-primary)]">{product.name}</span>
                              </div>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  selectWallpaper(product.id);
                                }}
                              >
                                Select
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </>
                    ))}
                  </>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
    </BlurPanel>
  );
};

export { WallpaperTable };

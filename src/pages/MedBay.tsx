import { useState } from "react";
import { Search, Camera, MapPin, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const MedBay = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { toast } = useToast();

  const mockStores = [
    {
      id: "1",
      name: "MedPlus Pharmacy",
      address: "123 Main Street, Downtown",
      distance: "1.2 km",
      inStock: true,
      price: 120,
    },
    {
      id: "2",
      name: "Apollo Pharmacy",
      address: "456 Park Avenue, Westside",
      distance: "2.5 km",
      inStock: true,
      price: 115,
    },
    {
      id: "3",
      name: "Wellness Pharmacy",
      address: "789 Health Road, Northend",
      distance: "3.8 km",
      inStock: false,
      price: null,
    },
  ];

  const handleSearch = () => {
    if (!searchQuery) {
      toast({
        title: "Enter medicine name",
        description: "Please enter a medicine to search",
        variant: "destructive",
      });
      return;
    }

    setSearchResults([
      {
        name: searchQuery,
        category: "Medicine",
        stores: mockStores,
      },
    ]);
  };

  const handleImageSearch = () => {
    toast({
      title: "Camera Feature",
      description: "Camera integration coming soon!",
    });
  };

  const handleHomeDelivery = (store: any) => {
    toast({
      title: "Order Placed! 📦",
      description: `Medicine will be delivered from ${store.name}. Delivery fee: ₹30`,
    });
  };

  const handleGetDirections = (store: any) => {
    toast({
      title: "Opening Maps",
      description: `Getting directions to ${store.name}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Med Bay</h1>
          <p className="text-muted-foreground">
            Find medicines and check availability across stores
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  placeholder="Search for medicines..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} className="bg-gradient-medical">
                Search
              </Button>
              <Button variant="outline" size="icon" onClick={handleImageSearch}>
                <Camera className="w-5 h-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-6">
            {searchResults.map((result, idx) => (
              <div key={idx}>
                <div className="mb-4">
                  <h2 className="text-2xl font-bold mb-1">{result.name}</h2>
                  <Badge variant="outline">{result.category}</Badge>
                </div>

                <div className="grid gap-4">
                  {result.stores.map((store: any) => (
                    <Card key={store.id} className="hover:shadow-card-hover transition-all">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-lg">{store.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                              <MapPin className="w-4 h-4" />
                              <span>{store.address}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {store.distance} away
                            </p>
                          </div>
                          <Badge
                            className={
                              store.inStock
                                ? "bg-accent text-accent-foreground"
                                : "bg-muted text-muted-foreground"
                            }
                          >
                            {store.inStock ? "In Stock" : "Out of Stock"}
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      {store.inStock && (
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-muted-foreground">Price</p>
                              <p className="text-2xl font-bold text-primary">
                                ₹{store.price}
                              </p>
                            </div>
                            <div className="text-right text-sm text-muted-foreground">
                              <p>Home Delivery</p>
                              <p className="font-semibold">+ ₹30 delivery fee</p>
                            </div>
                          </div>
                        </CardContent>
                      )}

                      {store.inStock && (
                        <CardFooter className="flex gap-3">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => handleGetDirections(store)}
                          >
                            <MapPin className="w-4 h-4 mr-2" />
                            Directions
                          </Button>
                          <Button
                            className="flex-1 bg-gradient-medical"
                            onClick={() => handleHomeDelivery(store)}
                          >
                            <Truck className="w-4 h-4 mr-2" />
                            Home Delivery
                          </Button>
                        </CardFooter>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {searchResults.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Search for Medicines</h3>
            <p className="text-muted-foreground">
              Enter a medicine name or use the camera to scan
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedBay;

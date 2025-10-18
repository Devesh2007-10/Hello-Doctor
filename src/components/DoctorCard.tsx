import { Star, Clock, Users } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DoctorCardProps {
  id: string;
  name: string;
  specialty: string;
  education: string;
  rating: number;
  availability: "Available" | "Busy" | "Unavailable";
  waitingPatients: number;
  image: string;
  fee: number;
  onClick: () => void;
}

const DoctorCard = ({
  name,
  specialty,
  education,
  rating,
  availability,
  waitingPatients,
  image,
  fee,
  onClick,
}: DoctorCardProps) => {
  const getAvailabilityColor = () => {
    switch (availability) {
      case "Available":
        return "bg-accent text-accent-foreground";
      case "Busy":
        return "bg-secondary text-secondary-foreground";
      case "Unavailable":
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-card-hover transition-all duration-300 cursor-pointer" onClick={onClick}>
      <div className="aspect-square relative overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full"
        />
        <Badge className={`absolute top-3 right-3 ${getAvailabilityColor()}`}>
          {availability}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-sm text-primary font-medium mb-1">{specialty}</p>
        <p className="text-xs text-muted-foreground mb-3">{education}</p>
        
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-medium">{rating}</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{waitingPatients} waiting</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Consultation Fee</p>
          <p className="text-lg font-bold text-primary">₹{fee}</p>
        </div>
        <Button className="bg-gradient-medical">
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;

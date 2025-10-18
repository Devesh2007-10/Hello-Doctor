import { MapPin, Star, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HospitalCardProps {
  name: string;
  address: string;
  distance: string;
  rating: number;
  openStatus: "Open" | "Closing Soon" | "Closed";
  onClick: () => void;
}

const HospitalCard = ({
  name,
  address,
  distance,
  rating,
  openStatus,
  onClick,
}: HospitalCardProps) => {
  const getStatusColor = () => {
    switch (openStatus) {
      case "Open":
        return "bg-accent text-accent-foreground";
      case "Closing Soon":
        return "bg-secondary text-secondary-foreground";
      case "Closed":
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card 
      className="hover:shadow-card-hover transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{name}</h3>
            <div className="flex items-start gap-1 text-sm text-muted-foreground mb-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{address}</span>
            </div>
          </div>
          <Badge className={getStatusColor()}>
            <Clock className="w-3 h-3 mr-1" />
            {openStatus}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="font-medium text-sm">{rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">{distance}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default HospitalCard;

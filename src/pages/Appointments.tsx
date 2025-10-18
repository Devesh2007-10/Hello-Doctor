import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Bell, Navigation } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Appointments = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [reminderOpen, setReminderOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [reminderTime, setReminderTime] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      setAppointments(JSON.parse(stored));
    }
  }, []);

  const handleSetReminder = () => {
    if (!reminderTime) {
      toast({
        title: "Please select a time",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Reminder Set! 🔔",
      description: `You'll be notified ${reminderTime} before your appointment`,
    });
    setReminderOpen(false);
    setReminderTime("");
  };

  const handleGetDirections = (hospital: any) => {
    toast({
      title: "Opening Maps",
      description: `Getting directions to ${hospital.name}`,
    });
    // In production, this would open Google Maps
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Appointments</h1>
          <p className="text-muted-foreground">
            View and manage your upcoming appointments
          </p>
        </div>

        {appointments.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No appointments yet</h3>
              <p className="text-muted-foreground mb-6">
                Book your first appointment to get started
              </p>
              <Button className="bg-gradient-medical">
                <a href="/">Find Doctors</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="overflow-hidden hover:shadow-card-hover transition-all">
                <CardHeader className="bg-gradient-hero pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-1">
                        {appointment.doctor.name}
                      </h3>
                      <p className="text-sm text-primary font-medium">
                        {appointment.doctor.specialty}
                      </p>
                    </div>
                    <Badge className="bg-accent text-accent-foreground">
                      {appointment.status}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Hospital</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.hospital.name}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm">Time Slot</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.timeSlot}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Token Number</p>
                        <p className="text-2xl font-bold text-primary">
                          {appointment.token}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Patient</p>
                        <p className="font-semibold">
                          {appointment.patientName}, {appointment.patientAge}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setReminderOpen(true);
                    }}
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Set Reminder
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-medical"
                    onClick={() => handleGetDirections(appointment.hospital)}
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Reminder Dialog */}
      <Dialog open={reminderOpen} onOpenChange={setReminderOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Reminder</DialogTitle>
            <DialogDescription>
              When would you like to be reminded about your appointment?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={reminderTime} onValueChange={setReminderTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30min">30 minutes before</SelectItem>
                <SelectItem value="1hr">1 hour before</SelectItem>
                <SelectItem value="1hr30min">1 hour 30 minutes before</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setReminderOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={handleSetReminder} className="flex-1 bg-gradient-medical">
              Set Reminder
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Appointments;

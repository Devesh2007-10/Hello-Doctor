import { useState } from "react";
import { Search, MapPin, Filter, Stethoscope } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HospitalCard from "@/components/HospitalCard";
import DoctorCard from "@/components/DoctorCard";
import Header from "@/components/Header";
import heroImage from "@/assets/hero-medical.jpg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const hospitals = [
    {
      id: "1",
      name: "City General Hospital",
      address: "123 Medical Avenue, Downtown",
      distance: "2.5 km",
      rating: 4.5,
      openStatus: "Open" as const,
    },
    {
      id: "2",
      name: "Sunrise Medical Center",
      address: "456 Healthcare Road, Westside",
      distance: "3.8 km",
      rating: 4.7,
      openStatus: "Open" as const,
    },
    {
      id: "3",
      name: "Metro Health Clinic",
      address: "789 Wellness Street, Northend",
      distance: "5.2 km",
      rating: 4.3,
      openStatus: "Closing Soon" as const,
    },
  ];

  const doctors = [
    {
      id: "1",
      name: "Dr. Priya Sharma",
      specialty: "Cardiologist",
      education: "MBBS, MD (Cardiology), AIIMS Delhi",
      rating: 4.8,
      availability: "Available" as const,
      waitingPatients: 3,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      fee: 500,
    },
    {
      id: "2",
      name: "Dr. Rajesh Kumar",
      specialty: "General Physician",
      education: "MBBS, MD (Internal Medicine)",
      rating: 4.6,
      availability: "Available" as const,
      waitingPatients: 5,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      fee: 300,
    },
    {
      id: "3",
      name: "Dr. Anjali Reddy",
      specialty: "Pediatrician",
      education: "MBBS, MD (Pediatrics), CMC Vellore",
      rating: 4.9,
      availability: "Busy" as const,
      waitingPatients: 8,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
      fee: 400,
    },
    {
      id: "4",
      name: "Dr. Vikram Singh",
      specialty: "Orthopedic Surgeon",
      education: "MBBS, MS (Orthopedics), PGI Chandigarh",
      rating: 4.7,
      availability: "Available" as const,
      waitingPatients: 2,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      fee: 600,
    },
  ];

  const handleDoctorClick = (doctor: any) => {
    setSelectedDoctor(doctor);
    setBookingOpen(true);
  };

  const handleBooking = () => {
    if (!patientName || !patientAge || !timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const appointment = {
      id: Date.now().toString(),
      doctor: selectedDoctor,
      hospital: hospitals.find((h) => h.id === selectedHospital),
      patientName,
      patientAge,
      timeSlot,
      date: new Date().toISOString(),
      token: `TKN${Math.floor(Math.random() * 10000)}`,
      status: "confirmed",
    };

    const existingAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    localStorage.setItem(
      "appointments",
      JSON.stringify([...existingAppointments, appointment])
    );

    toast({
      title: "Appointment Booked! 🎉",
      description: `Your token is ${appointment.token}. Total fee: ₹${selectedDoctor.fee + 5}`,
    });

    setBookingOpen(false);
    setPatientName("");
    setPatientAge("");
    setTimeSlot("");
    navigate("/appointments");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-medical opacity-10" />
        <div className="container py-12 md:py-20 relative">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Find Your Doctor,{" "}
                <span className="bg-gradient-medical bg-clip-text text-transparent">
                  Skip The Wait
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Book appointments with top doctors, check real-time availability,
                and manage your health journey - all in one place.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-gradient-medical">
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Find Doctors
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Healthcare professionals"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Search */}
      <section className="container py-12">
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-center mb-6">
            Find Hospitals Near You
          </h2>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search hospitals, clinics..."
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <MapPin className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {hospitals.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              {...hospital}
              onClick={() => setSelectedHospital(hospital.id)}
            />
          ))}
        </div>
      </section>

      {/* Doctors Section */}
      {selectedHospital && (
        <section className="container pb-12">
          <h2 className="text-3xl font-bold mb-6">Available Doctors</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.id}
                {...doctor}
                onClick={() => handleDoctorClick(doctor)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              Book an appointment with {selectedDoctor?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Patient Name</Label>
              <Input
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter patient name"
              />
            </div>
            <div>
              <Label>Patient Age</Label>
              <Input
                type="number"
                value={patientAge}
                onChange={(e) => setPatientAge(e.target.value)}
                placeholder="Enter age"
              />
            </div>
            <div>
              <Label>Preferred Time Slot</Label>
              <Select value={timeSlot} onValueChange={setTimeSlot}>
                <SelectTrigger>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9am">9:00 AM - 10:00 AM</SelectItem>
                  <SelectItem value="10am">10:00 AM - 11:00 AM</SelectItem>
                  <SelectItem value="11am">11:00 AM - 12:00 PM</SelectItem>
                  <SelectItem value="2pm">2:00 PM - 3:00 PM</SelectItem>
                  <SelectItem value="3pm">3:00 PM - 4:00 PM</SelectItem>
                  <SelectItem value="4pm">4:00 PM - 5:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Consultation Fee</span>
                <span className="font-semibold">₹{selectedDoctor?.fee}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Platform Fee</span>
                <span className="font-semibold">₹5</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold text-primary">
                  ₹{selectedDoctor?.fee + 5}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBookingOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBooking} className="bg-gradient-medical">
              Confirm & Pay
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Home;

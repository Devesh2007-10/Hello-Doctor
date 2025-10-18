import { useState } from "react";
import { FileText, Info, Bell, Pill } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const History = () => {
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const mockHistory = [
    {
      id: "1",
      date: "2024-01-15",
      doctor: {
        name: "Dr. Priya Sharma",
        specialty: "Cardiologist",
      },
      hospital: "City General Hospital",
      diagnosis: "Routine Checkup",
      prescription: [
        {
          name: "Aspirin 75mg",
          dosage: "Once daily",
          duration: "30 days",
          timing: "After breakfast",
          info: "Blood thinner used to prevent heart attacks and strokes. Take with food to avoid stomach upset.",
        },
        {
          name: "Atorvastatin 10mg",
          dosage: "Once daily",
          duration: "30 days",
          timing: "Before bedtime",
          info: "Cholesterol-lowering medication. Helps reduce risk of heart disease.",
        },
      ],
      notes: "Patient advised to maintain healthy diet and regular exercise",
    },
    {
      id: "2",
      date: "2023-12-20",
      doctor: {
        name: "Dr. Rajesh Kumar",
        specialty: "General Physician",
      },
      hospital: "Metro Health Clinic",
      diagnosis: "Common Cold",
      prescription: [
        {
          name: "Paracetamol 500mg",
          dosage: "Thrice daily",
          duration: "5 days",
          timing: "After meals",
          info: "Pain reliever and fever reducer. Do not exceed recommended dosage.",
        },
        {
          name: "Cetirizine 10mg",
          dosage: "Once daily",
          duration: "7 days",
          timing: "Before bedtime",
          info: "Antihistamine for allergies and cold symptoms. May cause drowsiness.",
        },
      ],
      notes: "Rest advised. Drink plenty of fluids.",
    },
  ];

  const handleMedicineInfo = (medicine: any) => {
    setSelectedMedicine(medicine);
    setInfoOpen(true);
  };

  const handleCheckAvailability = (medicine: any) => {
    toast({
      title: "Checking availability",
      description: `Searching for ${medicine.name}...`,
    });
    navigate("/medbay");
  };

  const handleSetAlarm = (medicine: any) => {
    toast({
      title: "Alarm Set! ⏰",
      description: `Reminder set for ${medicine.timing}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Medical History</h1>
          <p className="text-muted-foreground">
            View your past appointments and prescriptions
          </p>
        </div>

        {mockHistory.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No history yet</h3>
              <p className="text-muted-foreground">
                Your medical history will appear here after appointments
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {mockHistory.map((record) => (
              <Card key={record.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-hero">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        {record.doctor.name}
                      </h3>
                      <p className="text-sm text-primary font-medium">
                        {record.doctor.specialty}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {record.hospital}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {new Date(record.date).toLocaleDateString()}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-6">
                  <div className="mb-6">
                    <h4 className="font-semibold mb-2">Diagnosis</h4>
                    <p className="text-muted-foreground">{record.diagnosis}</p>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold mb-4">E-Prescription</h4>
                    <div className="space-y-3">
                      {record.prescription.map((medicine, idx) => (
                        <Card key={idx} className="bg-muted/50">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Pill className="w-4 h-4 text-primary" />
                                  <h5 className="font-semibold">{medicine.name}</h5>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {medicine.dosage} • {medicine.duration}
                                </p>
                                {medicine.timing && (
                                  <Badge variant="outline" className="mt-2 text-xs">
                                    {medicine.timing}
                                  </Badge>
                                )}
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleMedicineInfo(medicine)}
                              >
                                <Info className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex-1"
                                onClick={() => handleCheckAvailability(medicine)}
                              >
                                Check Availability
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleSetAlarm(medicine)}
                              >
                                <Bell className="w-4 h-4 mr-1" />
                                Set Alarm
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {record.notes && (
                    <div className="bg-accent/10 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2 text-sm">Doctor's Notes</h4>
                      <p className="text-sm text-muted-foreground">{record.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Medicine Info Dialog */}
      <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedMedicine?.name}</DialogTitle>
            <DialogDescription>Medicine Information</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Dosage</h4>
              <p className="text-sm text-muted-foreground">
                {selectedMedicine?.dosage}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Timing</h4>
              <p className="text-sm text-muted-foreground">
                {selectedMedicine?.timing}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Information</h4>
              <p className="text-sm text-muted-foreground">
                {selectedMedicine?.info}
              </p>
            </div>
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-xs text-muted-foreground italic">
                Note: This information is for reference only and may not be 100% accurate.
                Always consult your doctor for medical advice.
              </p>
            </div>
          </div>
          <Button onClick={() => setInfoOpen(false)} className="w-full">
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default History;

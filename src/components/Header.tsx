import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, User, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/appointments", label: "Appointments" },
    { path: "/medbay", label: "Med Bay" },
    { path: "/history", label: "History" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <Heart className="w-6 h-6 fill-heart text-heart" />
          <span className="bg-gradient-medical bg-clip-text text-transparent">
            Hello Doctor
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(link.path)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[100px] hidden sm:flex">
              <Globe className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="ta">தமிழ்</SelectItem>
              <SelectItem value="te">తెలుగు</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <User className="w-5 h-5" />
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-heart text-heart" />
                  Hello Doctor
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-base font-medium transition-colors hover:text-primary py-2 ${
                      isActive(link.path)
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Globe className="w-4 h-4" />
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">हिंदी</SelectItem>
                        <SelectItem value="ta">தமிழ்</SelectItem>
                        <SelectItem value="te">తెలుగు</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" variant="outline">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

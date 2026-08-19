import {
  Handshake,
  Shield,
  Droplets,
  MapPin,
  Thermometer,
  Wifi,
  Bell,
  History,
  TrendingUp,
  CalendarClock,
  Globe,
  Award,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

// Whitelist icon (kebab-case trong content.config) -> component lucide.
const ICONS: Record<string, LucideIcon> = {
  handshake: Handshake,
  shield: Shield,
  droplet: Droplets,
  "map-pin": MapPin,
  thermometer: Thermometer,
  wifi: Wifi,
  bell: Bell,
  history: History,
  "trending-up": TrendingUp,
  "calendar-clock": CalendarClock,
  globe: Globe,
  award: Award,
  sparkles: Sparkles,
  users: Users,
};

export default function Icon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  if (!name) return null;
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp className={className} aria-hidden="true" />;
}

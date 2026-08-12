import {
  Handshake,
  Shield,
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

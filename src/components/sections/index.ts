import type { ComponentType } from "react";
import type { SectionOf, SectionType } from "@/content/schema";
import Hero from "./Hero";
import ValueHighlights from "./ValueHighlights";
import About from "./About";
import Leadership from "./Leadership";
import Events from "./Events";
import Testimonials from "./Testimonials";
import Faq from "./Faq";
import Cta from "./Cta";
import Contact from "./Contact";
import ContactForm from "./ContactForm";
import StatsBar from "./StatsBar";
import MediaGrid from "./MediaGrid";
import EmbedWall from "./EmbedWall";
import LogoMarquee from "./LogoMarquee";
import ProfileHeader from "./ProfileHeader";
import ContactBar from "./ContactBar";
import SocialLinks from "./SocialLinks";
import QrPanel from "./QrPanel";

// Registry: type section -> component nhận đúng prop { section }.
export const SECTION_COMPONENTS: {
  [K in SectionType]: ComponentType<{ section: SectionOf<K> }>;
} = {
  hero: Hero,
  valueHighlights: ValueHighlights,
  about: About,
  leadership: Leadership,
  events: Events,
  testimonials: Testimonials,
  faq: Faq,
  cta: Cta,
  contact: Contact,
  contactForm: ContactForm,
  statsBar: StatsBar,
  mediaGrid: MediaGrid,
  embedWall: EmbedWall,
  logoMarquee: LogoMarquee,
  profileHeader: ProfileHeader,
  contactBar: ContactBar,
  socialLinks: SocialLinks,
  qrPanel: QrPanel,
};

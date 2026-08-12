import type { ComponentType } from "react";
import type { AnySection } from "@/content/schema";
import { SECTION_COMPONENTS } from "./sections";

export default function SectionRenderer({ section }: { section: AnySection }) {
  // Cast 1 lần: registry đảm bảo type khớp; TS không tự thu hẹp union qua index.
  const Cmp = SECTION_COMPONENTS[section.type] as ComponentType<{
    section: AnySection;
  }>;
  return <Cmp section={section} />;
}

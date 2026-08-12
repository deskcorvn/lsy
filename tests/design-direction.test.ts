import { describe, it, expect } from "vitest";
import { VIBE_GUIDE, coerceVibe } from "@/design/direction";
import { VIBES } from "@/design/profile";

describe("AI design-direction (contract)", () => {
  it("VIBE_GUIDE phủ hết VIBES", () => {
    for (const v of VIBES) expect(VIBE_GUIDE[v]).toBeTruthy();
  });
  it("coerceVibe: hợp lệ giữ nguyên (kể cả HOA), sai → swiss", () => {
    expect(coerceVibe("aurora")).toBe("aurora");
    expect(coerceVibe("AURORA")).toBe("aurora");
    expect(coerceVibe(" Industrial ")).toBe("industrial");
    expect(coerceVibe("cyberpunk")).toBe("swiss");
    expect(coerceVibe("")).toBe("swiss");
  });
});

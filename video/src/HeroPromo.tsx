import { AbsoluteFill, Easing, Interactive, interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600", "700"],
  subsets: ["latin"],
});

// Colors lifted from the pulled-index hero artboard.
const PRIMARY = "#16DB94";
const PRIMARY_DARK = "#0E9B6A";
const ACCENT_LIME = "#C6F135";
const INK = "#1B1B1B";

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

// Every element keeps a reserved slot in the flex column, so the staggered
// reveal never reflows the layout — only opacity and translate change.
const rise = (frame: number, start: number, end: number, distance: number) => ({
  opacity: interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
    easing: EASE,
  }),
  translate: interpolate(frame, [start, end], [`0px ${distance}px`, "0px 0px"], {
    extrapolateLeft: "clamp" as const,
    extrapolateRight: "clamp" as const,
    easing: EASE,
  }),
});

export const HeroPromo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: PRIMARY }}>
      <AbsoluteFill
        style={{
          background: `linear-gradient(120deg, ${PRIMARY} 0%, ${PRIMARY_DARK} 100%)`,
        }}
      />

      {/* Decorative only — sits behind the content, never in a text slot. */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 78% 32%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 55%)",
          scale: interpolate(frame, [0, 210], [1, 1.12], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "178px 142px",
        }}
      >
        <Interactive.Div
          name="Eyebrow label"
          style={{
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
            marginBottom: 40,
            ...rise(frame, 0, 22, 24),
          }}
        >
          Digital marketing experts
        </Interactive.Div>

        <Interactive.Div
          name="Headline line 1"
          style={{
            fontSize: 132,
            fontWeight: 700,
            lineHeight: "140px",
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            ...rise(frame, 12, 44, 44),
          }}
        >
          Create <span style={{ color: ACCENT_LIME }}>Unfair</span>
        </Interactive.Div>

        <Interactive.Div
          name="Headline line 2"
          style={{
            fontSize: 132,
            fontWeight: 700,
            lineHeight: "140px",
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            marginBottom: 44,
            ...rise(frame, 22, 54, 44),
          }}
        >
          Advantages...
        </Interactive.Div>

        <Interactive.Div
          name="Supporting line"
          style={{
            fontSize: 68,
            fontWeight: 400,
            lineHeight: "88px",
            color: "rgba(255,255,255,0.94)",
            maxWidth: 1200,
            marginBottom: 52,
            ...rise(frame, 64, 96, 32),
          }}
        >
          Convert leads into appointments like never before.
        </Interactive.Div>

        <Interactive.Div
          name="Call to action"
          style={{
            backgroundColor: INK,
            color: "#FFFFFF",
            fontSize: 38,
            fontWeight: 600,
            padding: "26px 56px",
            borderRadius: 12,
            ...rise(frame, 104, 134, 24),
          }}
        >
          Get Started
        </Interactive.Div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

import type { SharingCardView } from "../../contracts";

// Inline styles are the ImageResponse rendering surface; colors arrive from the CSS authority.
export function SharingCard({ view }: { readonly view: SharingCardView }) {
  const { palette } = view;
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: palette.ink,
        color: palette.paper,
        fontFamily: "Anton",
        padding: "38px 48px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 26,
        }}
      >
        <span>{view.company}</span>
        <span style={{ color: palette.warm }}>{view.site}</span>
      </div>
      <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 38 }}>
        <div
          style={{
            display: "flex",
            width: 520,
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: view.heading.length > 30 ? 62 : 78,
              lineHeight: 1.1,
              textTransform: "uppercase",
              whiteSpace: "pre-line",
            }}
          >
            {view.heading}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: palette.warm }}>
            {view.price.label}
          </div>
          {view.price.status === "approved" && (
            <div style={{ display: "flex", fontSize: 21 }}>
              {view.price.basis} · {view.price.taxLabel}
            </div>
          )}
        </div>
        {/* ImageResponse consumes the SVG master directly; next/image has no role in this render. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={view.artwork}
          width={495}
          height={380}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 24px",
          background: palette.accent,
          color: palette.ink,
          fontSize: 30,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <span>{view.benefit}</span>
          <span style={{ fontSize: 19 }}>{view.scope}</span>
        </div>
        <span>Hablemos por WhatsApp</span>
      </div>
    </div>
  );
}

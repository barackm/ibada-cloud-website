import { ImageResponse } from "next/og";
import { PLATFORM_LOGO_ICON_URL } from "./lib/brand";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <img
          src={PLATFORM_LOGO_ICON_URL}
          alt="Ibada Cloud"
          width={512}
          height={512}
        />
      </div>
    ),
    size,
  );
}

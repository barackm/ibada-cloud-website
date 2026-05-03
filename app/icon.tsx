import { ImageResponse } from "next/og";
import { PLATFORM_LOGO_ICON_URL, PLATFORM_SITE_URL } from "./lib/brand";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  const iconUrl = new URL(PLATFORM_LOGO_ICON_URL, PLATFORM_SITE_URL).toString();

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
          src={iconUrl}
          alt="Ibada Cloud"
          width={512}
          height={512}
        />
      </div>
    ),
    size,
  );
}

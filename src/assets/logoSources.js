// Pre-downscaled (Lanczos) Number9 logo sizes. Letting the browser shrink the
// 966px master to ~60px in one step softens the thin outline, so we hand it a
// size close to what it actually draws (incl. 2x/3x screens).
import green from "./logoGreen.png";
import green60 from "./logoGreen-60.png";
import green120 from "./logoGreen-120.png";
import green180 from "./logoGreen-180.png";
import green240 from "./logoGreen-240.png";
import white from "./logoWhite.png";
import white60 from "./logoWhite-60.png";
import white120 from "./logoWhite-120.png";
import white180 from "./logoWhite-180.png";
import white240 from "./logoWhite-240.png";

export const logoGreen = green;
export const logoWhite = white;

export const logoGreenSrcSet = `${green60} 60w, ${green120} 120w, ${green180} 180w, ${green240} 240w`;
export const logoWhiteSrcSet = `${white60} 60w, ${white120} 120w, ${white180} 180w, ${white240} 240w`;

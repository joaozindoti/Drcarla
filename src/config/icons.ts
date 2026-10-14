// Ícones Phosphor importados como SVG bruto. Peso "bold" na página toda (combina com o traço dos
// adesivos); "fill" só nas estrelas da nota e no coração do adesivo.
import whatsapp from "@phosphor-icons/core/assets/bold/whatsapp-logo-bold.svg?raw";
import instagram from "@phosphor-icons/core/assets/bold/instagram-logo-bold.svg?raw";
import arrowUpRight from "@phosphor-icons/core/assets/bold/arrow-up-right-bold.svg?raw";
import arrowDown from "@phosphor-icons/core/assets/bold/arrow-down-bold.svg?raw";
import arrowLeft from "@phosphor-icons/core/assets/bold/arrow-left-bold.svg?raw";
import arrowRight from "@phosphor-icons/core/assets/bold/arrow-right-bold.svg?raw";
import arrowsLeftRight from "@phosphor-icons/core/assets/bold/arrows-left-right-bold.svg?raw";
import mapPin from "@phosphor-icons/core/assets/bold/map-pin-bold.svg?raw";
import clock from "@phosphor-icons/core/assets/bold/clock-bold.svg?raw";
import speaker from "@phosphor-icons/core/assets/bold/speaker-high-bold.svg?raw";
import speakerOff from "@phosphor-icons/core/assets/bold/speaker-slash-bold.svg?raw";
import pause from "@phosphor-icons/core/assets/bold/pause-bold.svg?raw";
import play from "@phosphor-icons/core/assets/bold/play-bold.svg?raw";
import star from "@phosphor-icons/core/assets/fill/star-fill.svg?raw";
import heart from "@phosphor-icons/core/assets/fill/heart-fill.svg?raw";
import tooth from "@phosphor-icons/core/assets/bold/tooth-bold.svg?raw";
import sparkle from "@phosphor-icons/core/assets/bold/sparkle-bold.svg?raw";
import smiley from "@phosphor-icons/core/assets/bold/smiley-bold.svg?raw";
import baby from "@phosphor-icons/core/assets/bold/baby-bold.svg?raw";
import sun from "@phosphor-icons/core/assets/bold/sun-bold.svg?raw";
import drop from "@phosphor-icons/core/assets/bold/drop-bold.svg?raw";
import puzzle from "@phosphor-icons/core/assets/bold/puzzle-piece-bold.svg?raw";
import paintBrush from "@phosphor-icons/core/assets/bold/paint-brush-bold.svg?raw";
import firstAid from "@phosphor-icons/core/assets/bold/first-aid-bold.svg?raw";
import stethoscope from "@phosphor-icons/core/assets/bold/stethoscope-bold.svg?raw";
import anchor from "@phosphor-icons/core/assets/bold/anchor-simple-bold.svg?raw";
import chats from "@phosphor-icons/core/assets/bold/chats-circle-bold.svg?raw";
import clipboard from "@phosphor-icons/core/assets/bold/clipboard-text-bold.svg?raw";
import calendarCheck from "@phosphor-icons/core/assets/bold/calendar-check-bold.svg?raw";
import graduation from "@phosphor-icons/core/assets/bold/graduation-cap-bold.svg?raw";
import badge from "@phosphor-icons/core/assets/bold/identification-badge-bold.svg?raw";
import users from "@phosphor-icons/core/assets/bold/users-three-bold.svg?raw";
import sealCheck from "@phosphor-icons/core/assets/bold/seal-check-bold.svg?raw";

export const ICONS = {
  whatsapp,
  instagram,
  arrowUpRight,
  arrowDown,
  arrowLeft,
  arrowRight,
  arrowsLeftRight,
  mapPin,
  clock,
  speaker,
  speakerOff,
  pause,
  play,
  star,
  heart,
  tooth,
  sparkle,
  smiley,
  baby,
  sun,
  drop,
  puzzle,
  paintBrush,
  firstAid,
  stethoscope,
  anchor,
  chats,
  clipboard,
  calendarCheck,
  graduation,
  badge,
  users,
  sealCheck,
} as const;

export type IconName = keyof typeof ICONS;

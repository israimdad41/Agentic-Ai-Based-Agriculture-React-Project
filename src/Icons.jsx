// Minimal line-icon set for CropGen AI.
// Hand-drawn to match a single stroke weight and corner radius so the
// dashboard reads as one considered system instead of mixed emoji.
const base = {
  width: "1em",
  height: "1em",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const IconLeaf = (p) => (
  <svg {...base} {...p}>
    <path d="M5 20c0-8 4-14 14-15-1 10-7 14-15 15Z" />
    <path d="M6.5 17.5 15 9" />
  </svg>
);

export const IconHome = (p) => (
  <svg {...base} {...p}>
    <path d="M4 11 12 4l8 7" />
    <path d="M6 9.5V20h12V9.5" />
    <path d="M10 20v-6h4v6" />
  </svg>
);

export const IconScale = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3v18M8 21h8" />
    <path d="M4.5 7 12 5l7.5 2" />
    <path d="M4.5 7 2 12.5a2.7 2.7 0 0 0 5 0Z" />
    <path d="M19.5 7 17 12.5a2.7 2.7 0 0 0 5 0Z" />
  </svg>
);

export const IconChat = (p) => (
  <svg {...base} {...p}>
    <path d="M4 5.5h16v11H9l-4 3.5v-3.5H4Z" />
  </svg>
);

export const IconSparkle = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3.5c.5 3 2 4.5 5 5-3 .5-4.5 2-5 5-.5-3-2-4.5-5-5 3-.5 4.5-2 5-5Z" />
    <path d="M19 15c.25 1.3.9 2 2.2 2.3-1.3.25-2 .9-2.2 2.2-.25-1.3-.9-2-2.2-2.2 1.3-.3 2-1 2.2-2.3Z" />
  </svg>
);

export const IconGrid = (p) => (
  <svg {...base} {...p}>
    <rect x="4" y="4" width="7" height="7" rx="1.2" />
    <rect x="13" y="4" width="7" height="7" rx="1.2" />
    <rect x="4" y="13" width="7" height="7" rx="1.2" />
    <rect x="13" y="13" width="7" height="7" rx="1.2" />
  </svg>
);

export const IconCloud = (p) => (
  <svg {...base} {...p}>
    <path d="M7 18.5a4 4 0 0 1-.5-7.97A5 5 0 0 1 16.2 9.1 4.2 4.2 0 0 1 17.5 18.5Z" />
  </svg>
);

export const IconChart = (p) => (
  <svg {...base} {...p}>
    <path d="M4 20V10M11 20V4M18 20v-7" />
    <path d="M3 20h18" />
  </svg>
);

export const IconTarget = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3.4" />
  </svg>
);

export const IconBell = (p) => (
  <svg {...base} {...p}>
    <path d="M6 17h12l-1.6-2.3a5 5 0 0 1-.9-2.9V10a5.5 5.5 0 0 0-11 0v1.8c0 1.05-.31 2.07-.9 2.9L6 17Z" />
    <path d="M10 20a2 2 0 0 0 4 0" />
  </svg>
);

export const IconSearch = (p) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4-4" />
  </svg>
);

export const IconClock = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4.5l3 2" />
  </svg>
);

export const IconGrain = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21V6" />
    <path d="M12 8c-2-1-3-2.5-3-4.5C11 4 12 5.5 12 8Z" />
    <path d="M12 8c2-1 3-2.5 3-4.5C13 4 12 5.5 12 8Z" />
    <path d="M12 11c-2-1-3-2.5-3-4.5C11 7 12 8.5 12 11Z" />
    <path d="M12 11c2-1 3-2.5 3-4.5C13 7 12 8.5 12 11Z" />
    <path d="M12 14c-2-1-3-2.5-3-4.5C11 10 12 11.5 12 14Z" />
    <path d="M12 14c2-1 3-2.5 3-4.5C13 10 12 11.5 12 14Z" />
  </svg>
);

export const IconDrop = (p) => (
  <svg {...base} {...p}>
    <path d="M12 3.5s6 6.6 6 11a6 6 0 0 1-12 0c0-4.4 6-11 6-11Z" />
  </svg>
);

export const IconPin = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.3" />
  </svg>
);

export const IconCalendar = (p) => (
  <svg {...base} {...p}>
    <rect x="4" y="5.5" width="16" height="15" rx="2" />
    <path d="M4 10h16M8 3.5v4M16 3.5v4" />
  </svg>
);

export const IconFlask = (p) => (
  <svg {...base} {...p}>
    <path d="M10 3.5h4M10 3.5v6L5.5 18a2 2 0 0 0 1.8 3h9.4a2 2 0 0 0 1.8-3L14 9.5v-6" />
    <path d="M8.5 15h7" />
  </svg>
);

export const IconImages = (p) => (
  <svg {...base} {...p}>
    <rect x="3.5" y="5.5" width="14" height="13" rx="1.6" />
    <circle cx="8" cy="10" r="1.4" />
    <path d="m5 16 3.5-3.5L11 15l3-3.5 3.5 4" />
    <path d="M20.5 8.5v9a1.6 1.6 0 0 1-1.6 1.6H9" />
  </svg>
);

export const IconArrow = (p) => (
  <svg {...base} {...p}>
    <path d="M4.5 12h15M13 5.5 19.5 12 13 18.5" />
  </svg>
);

export const IconSend = (p) => (
  <svg {...base} {...p}>
    <path d="M4.5 11.8 19.5 4l-6 15.5-2.7-6.7Z" />
    <path d="m10.8 12.8 2 2" />
  </svg>
);

export const IconChevronDown = (p) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconArrowLeft = (p) => (
  <svg {...base} {...p}>
    <path d="M19.5 12h-15M11 5.5 4.5 12 11 18.5" />
  </svg>
);

export const IconCheck = (p) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </svg>
);

export const IconUser = (p) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="8.2" r="3.2" />
    <path d="M5 19.5c1.2-3.6 3.8-5.5 7-5.5s5.8 1.9 7 5.5" />
  </svg>
);
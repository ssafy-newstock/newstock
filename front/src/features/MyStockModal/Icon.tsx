const OverflowIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1rem"
    height="1.5rem"
    viewBox="0 0 30 32"
  >
    <circle cx="16" cy="6" r="3" fill="currentColor" />
    <circle cx="16" cy="17" r="3" fill="currentColor" />
    <circle cx="16" cy="28" r="3" fill="currentColor" />
  </svg>
);

const MyStockIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2rem"
    height="2rem"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M4.58 8.60696L2 8.45396C3.849 3.70396 9.158 0.999958 14.333 2.34396C19.846 3.77696 23.121 9.26196 21.647 14.594C20.428 19.005 16.343 21.931 11.847 22"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22C6.5 22 2 17 2 11M13.604 9.72202C13.252 9.35202 12.391 8.48502 11.029 9.10202C9.668 9.71702 9.452 11.698 11.511 11.909C12.441 12.004 13.048 11.799 13.604 12.379C14.16 12.961 14.263 14.577 12.843 15.013C11.423 15.449 10.502 14.729 10.255 14.504M11.908 8.02002V8.81002M11.908 15.147V16.02"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HistoryIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2rem"
    height="2rem"
    viewBox="0 0 24 24"
  >
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M5.636 18.364A9 9 0 1 0 3 12.004V14" />
      <path d="m1 12l2 2l2-2m6-4v5h5" />
    </g>
  </svg>
);

const HeartIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2rem"
    height="2rem"
    viewBox="0 0 256 256"
  >
    <path
      fill="currentColor"
      d="M240 102c0 70-103.79 126.66-108.21 129a8 8 0 0 1-7.58 0C119.79 228.66 16 172 16 102a62.07 62.07 0 0 1 62-62c20.65 0 38.73 8.88 50 23.89C139.27 48.88 157.35 40 178 40a62.07 62.07 0 0 1 62 62"
    />
  </svg>
);

const StarIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2rem"
    height="2rem"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="m12 15.39l-3.76 2.27l.99-4.28l-3.32-2.88l4.38-.37L12 6.09l1.71 4.04l4.38.37l-3.32 2.88l.99 4.28M22 9.24l-7.19-.61L12 2L9.19 8.63L2 9.24l5.45 4.73L5.82 21L12 17.27L18.18 21l-1.64-7.03z"
    />
  </svg>
);

const RankIcon: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="2rem"
    height="2rem"
    viewBox="0 0 48 48"
  >
    <g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="4">
      <path strokeLinecap="round" d="M17 18H4v24h13z" />
      <path d="M30 6H17v36h13z" />
      <path strokeLinecap="round" d="M43 26H30v16h13z" />
    </g>
  </svg>
);

export {
  OverflowIcon,
  MyStockIcon,
  HistoryIcon,
  HeartIcon,
  RankIcon,
  StarIcon,
};

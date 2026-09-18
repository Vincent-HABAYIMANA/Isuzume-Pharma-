/**
 * Simple line drawing of the dosage form (tablet, syrup, cream ...).
 * Drawing the icons here keeps the application free of image downloads and
 * makes every product card load instantly.
 */
const paths = {
  tablet: (
    <>
      <circle cx="24" cy="24" r="14" />
      <line x1="14" y1="14" x2="34" y2="34" />
    </>
  ),
  capsule: (
    <>
      <rect x="9" y="17" width="30" height="14" rx="7" />
      <line x1="24" y1="17" x2="24" y2="31" />
    </>
  ),
  syrup: (
    <>
      <path d="M19 10h10v6l4 6v16a2 2 0 0 1-2 2H17a2 2 0 0 1-2-2V22l4-6z" />
      <line x1="16" y1="28" x2="32" y2="28" />
    </>
  ),
  sachet: (
    <>
      <rect x="13" y="11" width="22" height="26" rx="2" />
      <line x1="13" y1="17" x2="35" y2="17" />
      <line x1="19" y1="26" x2="29" y2="26" />
    </>
  ),
  cream: (
    <>
      <rect x="17" y="16" width="14" height="22" rx="2" />
      <path d="M21 16v-4h6v4" />
      <line x1="17" y1="38" x2="31" y2="38" />
    </>
  ),
  solution: (
    <>
      <path d="M20 11h8v7l3 5v15a2 2 0 0 1-2 2H19a2 2 0 0 1-2-2V23l3-5z" />
      <path d="M17 31h14" />
    </>
  ),
  device: (
    <>
      <rect x="11" y="15" width="26" height="18" rx="3" />
      <path d="M15 24h5l2-4 3 8 2-4h6" />
    </>
  )
};

const DosageIcon = ({ form }) => (
  <svg viewBox="0 0 48 48" className="dosage-icon" role="img" aria-label={`${form} icon`}>
    <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[form] ?? paths.tablet}
    </g>
  </svg>
);

export default DosageIcon;

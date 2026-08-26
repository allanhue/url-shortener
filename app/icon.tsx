import { SVGProps } from "react";

export default function Icon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <rect width="64" height="64" rx="16" fill="#0f172a" />
      <path
        d="m25.5 38.5 13-13"
        stroke="#34d399"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M21.5 28.5 18 32a8.5 8.5 0 0 0 12 12l3.5-3.5M42.5 35.5 46 32a8.5 8.5 0 0 0-12-12L30.5 23.5"
        stroke="#fff"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M42 45h8M46 41v8"
        stroke="#34d399"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
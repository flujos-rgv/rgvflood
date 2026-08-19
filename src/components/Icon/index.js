export function VisibleIcon({ size = "1.5rem", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={{ width: size, height: size }}
      {...props}
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 100-6 3 3 0 000 6z" />
    </svg>
  )
}

export function InvisibleIcon({ size = "1.5rem", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={{ width: size, height: size }}
      {...props}
    >
      <path d="M16 13a3 3 0 01-3 3m-5-5a3 3 0 013-3 M15.187 4.57A9.242 9.242 0 0012 4C5 4 1 12 1 12s.98 1.96 2.818 3.94m4.996 3.49c.979.356 2.042.57 3.186.57 7 0 11-8 11-8s-.98-1.96-2.818-3.94 M21 3L3 21" />
    </svg>
  )
}

export function QuestionIcon({ size = "1.5rem", ...props }) {
  return (
    <svg
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={{ width: size, height: size }}
      {...props}
    >
      <path d="M12,12m10,0a10,10 0 1, 0 -20,0a10,10 0 1,0 20,0 M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12,17L12.01,17" />
    </svg>
  )
}

export function CheckIcon({ size = "1.5rem", ...props }) {
  return (
    <svg
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={{ width: size, height: size }}
      {...props}
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  )
}

export function ChevronDownIcon({ size = "1.5rem", ...props }) {
  return (
    <svg
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={{ width: size, height: size }}
      {...props}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

export function ChevronLeftIcon({ size = "1.5rem", ...props }) {
  return (
    <svg
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={{ width: size, height: size }}
      {...props}
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}

export function ChevronRightIcon({ size = "1.5rem", ...props }) {
  return (
    <svg
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={{ width: size, height: size }}
      {...props}
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}

export function WorldIcon({ size = "1.5rem", ...props }) {
  return (
    <svg
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={{ width: size, height: size }}
      {...props}
    >
      <path d="M5.11 3.425L6.722 4.75l1.645 1.756-.404 2.74-2.594 1.312L4 11.726l.667 1.138 1.307 1.4.706 2.473-1.963 1.647-.359 1.528M20.32 4.805l-1.477.838-3 .357-2.284-1.838-.62-1.813L12.127 1 M19.007 12.903l-.928 2.098-.954 2.151-1.763 1.641-2.34.15-1.393-1.69.468-2.17-.403-2.143 1.593-1.997 2.227-.782 2.358.564 1.135 2.178z M12 23c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z" />
    </svg>
  )
}

export function GlobeIcon({ size = "1.5rem", ...props }) {
  return (
    <svg
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={{ width: size, height: size }}
      {...props}
    >
      <path d="M22 12H2M12 22c5.714-5.442 5.714-14.558 0-20M12 22C6.286 16.558 6.286 7.442 12 2 M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    </svg>
  )
}

export function CloseIcon({ size = "1.5rem", ...props }) {
  return (
    <svg
      as="svg"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentcolor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={{ width: size, height: size }}
      {...props}
    >
      <path d="M4,4L20,20M4,20L20,4" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

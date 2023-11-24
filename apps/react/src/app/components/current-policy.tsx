import { usePolicyState } from '@can-it/react'

export function CurrentPolicy() {
  const { policy } = usePolicyState();
  return (<div>
    <div className="summary">
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
        Current Policy
    </div>
    <pre>
      {JSON.stringify(policy, null, 2)}
    </pre>
  </div>)
}

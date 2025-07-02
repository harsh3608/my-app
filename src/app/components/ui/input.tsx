import * as React from "react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={`border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className || ""}`}
      {...props}
    />
  )
})
Input.displayName = "Input"

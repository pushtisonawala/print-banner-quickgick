"use client"
 
import { useEffect, useState } from "react"

interface Toast {
  title: string
  description?: string
}

interface ToastContextValue {
  toast: (props: Toast) => void
}

export function useToast(): ToastContextValue {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Toast) => {
    setToasts((prev) => [...prev, toast])
  }

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prev) => prev.slice(1))
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [toasts])

  return {
    toast: addToast,
  }
}

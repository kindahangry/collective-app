'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface ModalProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
}

export function Modal({ open, onClose, children, title }: ModalProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100]">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="glass-panel w-full max-w-lg animate-in fade-in zoom-in-95 duration-200">
          {title && (
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <h2 className="font-press text-sm text-white">{title}</h2>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import React, { KeyboardEvent, forwardRef, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TagInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string[]
  onChange: (value: string[]) => void
  onBlur?: () => void
  error?: string
  helperText?: string
}

const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  ({ value, onChange, onBlur, error, helperText, className, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log(value)
      setInputValue(e.target.value)
    }

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ';') {
        e.preventDefault()
        addTag()
      }
    }

    const addTag = () => {
      const trimmedValue = inputValue.trim()
      if (trimmedValue && !value.includes(trimmedValue)) {
        onChange([...value, trimmedValue])
        setInputValue('')
      }
    }

    const removeTag = (tagToRemove: string) => {
      onChange(value.filter(tag => tag !== tagToRemove))
    }

    useEffect(() => {
      // This effect ensures that the component re-renders when the value prop changes
      // It's especially useful when the form resets or initializes the field
    }, [value])

    return (
      <div className="w-full space-y-2">
        <div className="space-y-2">
          <Input
            ref={ref}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            onBlur={() => {
              addTag()
              onBlur?.()
            }}
            className={cn("w-full", className)}
            aria-invalid={!!error}
            aria-describedby={error ? 'error-message' : helperText ? 'helper-text' : undefined}
            {...props}
          />
          <div className="flex flex-wrap gap-2">
            {value.map((tag, index) => (
              <span key={`${tag}-${index}`} className="flex items-center bg-primary/80 text-primary-foreground px-2 py-1 rounded-2xl text-sm">
                {tag}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="ml-1 h-auto p-0 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  onClick={() => removeTag(tag)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {tag}</span>
                </Button>
              </span>
            ))}
          </div>
        </div>
        {error && (
          <p id="error-message" className="text-sm text-destructive">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p id="helper-text" className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

TagInput.displayName = 'TagInput'

export default TagInput

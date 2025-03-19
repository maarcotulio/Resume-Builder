import { cn } from "@/utils/cn";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { ChangeEvent } from "react";

interface InputProps {
  type?: string;
  className?: string;
  placeholder?: string;
  icon?: React.ElementType;
  error?: string;
  value?: string | number;
  min?: number;
  handleChange(e: ChangeEvent<HTMLInputElement>): void;
}

export function Input({
  type,
  className,
  icon: Icon,
  placeholder,
  error,
  value,
  handleChange,
  min,
  ...props
}: InputProps) {
  return (
    <div>
      <div className="flex relative w-full p-2 text-black bg-gray-200 border-gray-200 rounded-md border-2 items-center gap-2 focus-within:border-gray-400">
        {Icon && <Icon width={24} height={24} />}
        <input
          {...props}
          type={type}
          className={cn("outline-none w-full h-full bg-transparent", className)}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          min={min}
        />
      </div>
      {error && (
        <div className="flex gap-2 items-center mt-2 !text-red-400">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}

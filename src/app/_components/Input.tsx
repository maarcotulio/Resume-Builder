import { cn } from "@/utils/cn";
import { CrossCircledIcon } from "@radix-ui/react-icons";

interface InputProps {
  type?: string;
  className?: string;
  placeholder?: string;
  icon?: React.ElementType;
  error?: string;
}

export function Input({
  type,
  className,
  icon: Icon,
  placeholder,
  error,
  ...props
}: InputProps) {
  return (
    <div>
      <div className="flex relative w-full p-2 text-white rounded-md border-2 bg-black border-gray-400 items-center gap-2 focus-within:border-white">
        {Icon && <Icon width={24} height={24} />}
        <input
          {...props}
          type={type}
          className={cn("outline-none w-full h-full bg-transparent", className)}
          placeholder={placeholder}
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

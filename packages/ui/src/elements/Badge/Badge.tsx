import { XIcon } from "@heroicons/react/outline";
import { useState } from "react";
import ReactTooltip from "react-tooltip";

export interface BadgeProps {
  colorRGB?: string;
  text: string;
  className?: string;
  closeButton?: boolean;
  onClose?: () => void;
}
export const Badge = ({
  colorRGB,
  text,
  className = "",
  closeButton = false,
  onClose,
}: BadgeProps) => {
  const [isHover, setIsHover] = useState("");

  if (!text) return null;

  const textShort = text?.length > 10 ? text.substring(0, 8) + "..." : text;

  return (
    <>
      <div
        data-tip={isHover}
        data-for={`badgeTip-${text}`}
        className={`mr-2 mb-1 inline-block cursor-default rounded-full ${className}`}
        style={{ background: `rgba(${colorRGB})` }}
        onMouseEnter={() => {
          setIsHover(`${text}`);
        }}
        onMouseLeave={() => {
          setIsHover("");
        }}
      >
        <div className="flex h-full w-full items-center justify-between px-3">
          <>
            <span className="mb-px">{textShort}</span>
            {closeButton && (
              <button className={`ml-2 -mt-1`} onClick={onClose}>
                <XIcon
                  className="inline-block h-4 w-4 cursor-pointer text-gray-900 hover:text-slate-400"
                  aria-hidden="true"
                />
              </button>
            )}
          </>
        </div>
      </div>
      <ReactTooltip id={`badgeTip-${text}`} place="top" effect="solid">
        {isHover}
      </ReactTooltip>
    </>
  );
};

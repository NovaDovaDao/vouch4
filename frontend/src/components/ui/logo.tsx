import clsx from "clsx";
import { ComponentProps } from "react";

export default function Logo({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={clsx(className, "relative")} {...props}>
      <svg
        version="1.1"
        id="_x32_"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
        className="w-full h-full"
      >
        <g>
          <polygon
            className="fill-current"
            points="321.712,109.148 183.198,309.846 156.432,291.372 217.618,202.718 177.236,144.312 0,402.852 512,402.852"
          />
        </g>
      </svg>
      <div className="bg-primary text-primary-foreground rounded-full absolute inset-0 -z-10"></div>
    </div>
  );
}

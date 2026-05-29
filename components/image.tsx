import type React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    width?: number;
    height?: number;
};

export default function Image({ fill, src, className, style, ...props }: ImageProps) {
    const normalizedSrc = typeof src === "string" && !src.startsWith("/") ? `/${src}` : src;

    return (
        <img
            src={normalizedSrc}
            className={className}
            style={{
                ...(fill
                    ? {
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                      }
                    : undefined),
                ...style,
            }}
            {...props}
        />
    );
}

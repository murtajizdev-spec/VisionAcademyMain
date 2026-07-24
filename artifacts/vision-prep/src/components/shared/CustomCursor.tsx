import React from "react";

export function CustomCursor() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  React.useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mouseover", updateHoverState);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mouseover", updateHoverState);
    };
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-screen transition-transform duration-100 ease-out ${
          isHovering ? "scale-[2] bg-secondary" : "scale-100"
        }`}
        style={{ transform: `translate3d(${position.x - 8}px, ${position.y - 8}px, 0)` }}
      />
      <div
        className={`fixed top-0 left-0 w-10 h-10 border border-primary/50 rounded-full pointer-events-none z-[9998] transition-all duration-300 ease-out ${
          isHovering ? "scale-150 border-secondary opacity-0" : "scale-100 opacity-100"
        }`}
        style={{ transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0)` }}
      />
    </>
  );
}

import { ReactNode } from "react";

interface AboutCardProps {
  children: ReactNode;
  className?: string;
}

const AboutCard = ({ children, className = "" }: AboutCardProps) => {
  return (
    <div
      className={`bg-white rounded-3xl border border-gray-200 p-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default AboutCard;

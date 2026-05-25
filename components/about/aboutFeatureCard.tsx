import { ReactNode } from "react";
import AboutCard from "./aboutCard";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

const AboutFeatureCard = ({
  icon,
  title,
  description,
  className = "",
}: Props) => {
  return (
    <AboutCard className={className}>
      <div className="flex items-start gap-3 mb-4 text-gray-700">
        {icon}
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      </div>

      <p className="text-gray-600 leading-relaxed">{description}</p>
    </AboutCard>
  );
};

export default AboutFeatureCard;

import AboutCTA from "./aboutCTA";
import AboutFeatureCard from "./aboutFeatureCard";
import { IconCapture, IconCopy, IconPrivacy, IconSteps } from "./icons";


const AboutSection = () => {
  return (
    <section className="w-full py-20 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900">
            About Trace
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

          <AboutFeatureCard
            className="md:col-span-5"
            title="Capture the flow"
            description="Trace records clicks, navigation, and timing exactly as it happens."
            icon={<IconCapture />}
          />

          <AboutFeatureCard
            className="md:col-span-7"
            title="Structured steps, automatically"
            description="Sessions are converted into ordered steps with timestamps and context."
            icon={<IconSteps />}
          />

          <AboutCTA />

          <AboutFeatureCard
            className="md:col-span-4"
            title="Copy it anywhere"
            description="Export plain text directly into GitHub, Jira, Linear, or any tracker."
            icon={<IconCopy />}
          />

          <AboutFeatureCard
            className="md:col-span-12"
            title="Privacy-first recording"
            description="Everything stays on your device unless you export."
            icon={<IconPrivacy />}
          />

        </div>
      </div>
    </section>
  );
};

export default AboutSection;

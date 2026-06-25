"use client";

import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const AboutCTA = ({ handleStartRecording }: { handleStartRecording?: () => void }) => {
  const router = useRouter();

  return (
    <div className="md:col-span-8 rounded-2xl bg-black p-8 flex flex-col justify-between relative overflow-hidden">
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">
          Designed for open-source and internal bug reporting
        </h3>

        <p className="text-gray-100 leading-relaxed mb-8">
          For <span className="font-bold">open source</span> contributors,
          internal QA, managers, and clients, Trace turns recordings into clear,
          text-based reports.
        </p>

        <Button
          size="lg"
          className="bg-white text-black hover:bg-gray-100 font-semibold cursor-pointer z-10 relative"
          onClick={() => {
            if (handleStartRecording) {
              handleStartRecording();
            } else {
              router.push("/record");
            }
          }}
        >
          Start Recording
        </Button>
      </div>
    </div>
  );
};

export default AboutCTA;

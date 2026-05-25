"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function GitHubIcon({
  className = "w-5 h-5",
  link,
}: {
  className?: string;
  link?: string;
}) {
  return (
    <Link
      href={"https://github.com/MohdFaizan097"}
      target="_blank"
      rel="noopener noreferrer"
    >
      <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    </Link>
  );
}

const HomeSection = () => {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recordingURL, setRecordingURL] = useState<string | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const stepsRef = useRef<[{}]>([{}]);
    

  const displayMediaOptions = {
    video: {
      displaySurface: "window",
    },
    audio: {
      echoCancellation: true,
      noiseSuppression: true,
      sampleRate: 44100,
      suppressLocalAudioPlayback: true,
    },
  };

  const handleRoute = (pageLink: string) => {
    router.push(pageLink);
  };

  const startRecording = async () => {
    const stream =
      await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);

    if (!stream) return;
    streamRef.current = stream;

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      chunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      const videoURL = URL.createObjectURL(blob);
      setRecordingURL(videoURL);
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();

    streamRef.current?.getTracks().forEach((track) => track.stop());

    mediaRecorderRef.current = null;
    setIsRecording(false);
  };

  return (
    <div className="min-h-screen">
      <header className="fixed left-0 right-0 z-50 top-4">
        <nav className="mx-auto max-w-4xl px-4">
          <div className="bg-black shadow-2xl rounded-xl px-4 py-4">
            <div className="flex items-center justify-between text-white">
              <div className="text-white">
                <Image
                  draggable={false}
                  src={"/svg/logo3.svg"}
                  alt="logo"
                  width={120}
                  height={120}
                  onClick={() => handleRoute("/")}
                  className="text-white"
                />
              </div>
              <GitHubIcon className="w-7 h-7" />
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section className="w-full flex flex-col items-center justify-center overflow-hidden relative py-6 min-h-[85vh] sm:min-h-[88vh] md:min-h-[92vh]">
          <div className="flex flex-col items-center justify-center gap-8">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-semibold text-center px-4 max-w-5xl mx-auto capitalize">
              {" "}
              <sup>
                <span className="relative inline-block mx-2">
                  <Image
                    src="/svg/quotes.svg"
                    alt=""
                    aria-hidden
                    width={24}
                    height={24}
                    className="inline-block align-middle opacity-30"
                  />
                </span>
              </sup>
              Bugs are hard, explaining them shouldn't be.{" "}
              <sup>
                <span className="relative inline-block mx-2">
                  <Image
                    src="/svg/quotes.svg"
                    alt=""
                    aria-hidden
                    width={24}
                    height={24}
                    className="inline-block align-middle rotate-180 opacity-30"
                  />
                </span>
              </sup>
            </h1>

            <p className="mx-auto text-sm px-3 sm:px-4 text-center text-gray-500 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl lg:text-[18px]">
              Trace is a privacy-first tool that records exactly what happens on
              your screen and turns it into clear, reproducible bug reports.
            </p>

            <Button
              onClick={() => startRecording()}
              className="inline-flex items-center justify-center rounded-xl  px-6 py-6 text-base font-medium mt-8"
            >
              Start Recording
            </Button>
          </div>
        </section>



        {/* {recordingURL && (
  <video
    src={recordingURL} 
    controls 
    autoPlay
    width={400}
  />
)} */}
      </main>
    </div>
  );
};

export default HomeSection;

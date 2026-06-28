"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useRef, useState, MutableRefObject } from "react";
import { Download, Trash2, Video } from "lucide-react";
import AboutSection from "./about/aboutSection";

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

const InitialStateView = ({ handleStartRecording }: { handleStartRecording: () => void }) => (
  <>
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
          onClick={handleStartRecording}
          className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold mt-8 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
        >
          Start Recording
        </Button>
      </div>
    </section>
    <AboutSection handleStartRecording={handleStartRecording} />
  </>
);

const RecordingStateView = ({ stopRecording }: { stopRecording: () => void }) => (
  <section className="w-full flex flex-col items-center justify-center min-h-[85vh] sm:min-h-[88vh] md:min-h-[92vh]">
    <div className="w-full max-w-lg animate-in fade-in zoom-in duration-500">
      <div className="flex flex-col items-center gap-8 bg-background border border-border/50 rounded-[2rem] shadow-2xl p-10 sm:p-12 relative overflow-hidden">
        {/* Subtle gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none"></div>

        <div className="flex items-center gap-3 px-6 py-3 bg-red-50/80 backdrop-blur-md text-red-600 rounded-full border border-red-100 shadow-sm relative z-10">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </div>
          <span className="font-semibold text-sm tracking-wide">Recording in progress</span>
        </div>

        <div className="text-center relative z-10">
          <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">Capturing your screen</h2>
          <p className="text-muted-foreground text-sm max-w-[260px] mx-auto">
            Reproduce the issue or bug now. Everything is being recorded securely.
          </p>
        </div>

        <Button
          onClick={stopRecording}
          className="inline-flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 relative z-10"
        >
          Stop Recording
        </Button>
      </div>
    </div>
  </section>
);

const PreviewStateView = ({ 
  recordingURL, 
  setRecordingURL, 
  chunksRef 
}: { 
  recordingURL: string; 
  setRecordingURL: (url: string | null) => void; 
  chunksRef: MutableRefObject<Blob[]> 
}) => (
  <section className="w-full flex flex-col items-center justify-start pt-24 sm:pt-32 min-h-[85vh] pb-12">
    <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-12 duration-700 px-4">
      <div className="relative group rounded-[2.5rem] overflow-hidden shadow-2xl bg-background/60 border border-border/60 backdrop-blur-2xl p-3 sm:p-5">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-70 pointer-events-none"></div>
        
        <div className="relative rounded-[2rem] overflow-hidden bg-black/95 shadow-inner ring-1 ring-white/10">
          <video
            src={recordingURL}
            controls
            autoPlay
            className="w-full h-auto max-h-[65vh] object-contain rounded-[2rem]"
          />
        </div>
        
        <div className="relative mt-6 flex flex-col sm:flex-row items-center justify-between px-4 pb-2 gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg">Recording Ready</h3>
              <p className="text-sm text-muted-foreground font-medium">Review your recording before downloading.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setRecordingURL(null);
                chunksRef.current = [];
              }}
              className="rounded-xl border-border bg-background hover:bg-secondary text-foreground px-5 py-6 font-semibold shadow-sm hover:shadow transition-all"
            >
              <Trash2 className="w-5 h-5 mr-2" />
              Discard
            </Button>
            <Button
              onClick={() => {
                const a = document.createElement("a");
                a.href = recordingURL;
                a.download = `trace-recording-${new Date().toISOString().slice(0,10)}.webm`;
                a.click();
              }}
              className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 font-semibold"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Video
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

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

  const handleStartRecording = async () => {
    chunksRef.current = [];
    try {
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
    } catch (error) {
      console.error("Error starting recording:", error);
      setIsRecording(false);
    }
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
          <div className="bg-primary shadow-2xl rounded-xl px-4 py-4">
            <div className="flex items-center justify-between text-primary-foreground">
              <div className="text-primary-foreground">
                <Image
                  draggable={false}
                  src={"/svg/logo3.svg"}
                  alt="logo"
                  width={120}
                  height={120}
                  onClick={() => handleRoute("/")}
                  className="text-primary-foreground cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-5">
                {isRecording && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/10 rounded-full border border-white-500/20" title="Recording in progress">
                    <div className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </div>
                    <span className="text-xs font-semibold tracking-wide uppercase text-white-500">Rec</span>
                  </div>
                )}
                <GitHubIcon className="w-7 h-7" />
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        {!isRecording && !recordingURL && (
          <InitialStateView handleStartRecording={handleStartRecording} />
        )}
        
        {isRecording && (
          <RecordingStateView stopRecording={stopRecording} />
        )}

        {recordingURL && (
          <PreviewStateView 
            recordingURL={recordingURL} 
            setRecordingURL={setRecordingURL} 
            chunksRef={chunksRef} 
          />
        )}
      </main>
    </div>
  );
};

export default HomeSection;

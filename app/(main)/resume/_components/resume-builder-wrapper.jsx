"use client";

import dynamic from "next/dynamic";

// Dynamically import ResumeBuilder with SSR disabled
const ResumeBuilder = dynamic(() => import("./resume-builder"), {
  ssr: false,
});

export default function ResumeBuilderWrapper({ initialContent }) {
  return <ResumeBuilder initialContent={initialContent} />;
}

import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="px-5">
      <Suspense
        fallback={<div className="animate-pulse mt-4 w-full h-1 bg-gray-300 rounded" />}
      >
        {children}
      </Suspense>
    </div>
  );
}
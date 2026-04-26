"use client";

import { ProjectsGrid } from "@/components/organisms/projects-grid";

export default function Projects() {
  return (
    <main className="min-h-screen bg-background p-4 text-text">
      <div className="mx-auto w-full max-w-7xl">
        <div>
          <ProjectsGrid />
        </div>
      </div>
    </main>
  );
}

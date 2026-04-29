"use client";

import Link from "next/link";
import type { ModelsProject } from "@/apis/data-contracts";
import { Skeleton } from "@/components/atoms/ui/skeleton";
import { useMemo, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useQuery } from "@tanstack/react-query";
import { projectQuery } from "@/request/project/query";
import { Frown } from "lucide-react";
import { Input } from "@/components/atoms/ui/input";

interface ProjectWithIterations extends ModelsProject {
  iterations_count?: number;
}

function ProjectCard({ project }: { project: ProjectWithIterations }) {
  if (!project.id) return null;

  return (
    <Link href={`/projects/${project.id}`}>
      <article className="rounded-xl border-3 border-dark bg-primary p-4 shadow-[6px_6px_0px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-1">
        <div
          className="rounded-[12px] border-[3px] border-dark px-6 py-10 text-text"
          style={{ backgroundColor: project.color || "var(--ok)" }}
        >
          <p className="text-xl font-semibold">{project.name || "Sem nome"}</p>
          <p className="mt-1 text-sm font-semibold uppercase text-disabled">
            {project.iterations_count || 0} iterações
          </p>
        </div>
      </article>
    </Link>
  );
}

export function ProjectsGrid() {
  const [search, setSearch] = useState("");
  const { user } = useAuth();
  const userId = user?.id;

  const {
    data: memberDetail,
    isLoading,
    error,
    isFetched,
  } = useQuery({
    queryKey: ["memberDetail", userId],
    queryFn: () => {
      if (!userId) {
        throw new Error("User ID is required");
      }
      return projectQuery.memberDetail({
        userId: userId,
        page: 1,
        page_size: 20,
      });
    },
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  const projects =
    memberDetail?.data ||
    memberDetail?.projects ||
    (Array.isArray(memberDetail) ? memberDetail : []);

  const filteredProjects = useMemo(() => {
    if (!search.trim()) return projects;

    const searchLower = search.toLowerCase();
    return projects.filter(
      (project: any) =>
        project.name?.toLowerCase().includes(searchLower) ||
        project.description?.toLowerCase().includes(searchLower)
    );
  }, [projects, search]);

  if (isLoading || !isFetched) {
    return (
      <>
        <div className="my-3 flex justify-center">
          <Skeleton className="h-10 w-full max-w-xs rounded-20 mb-2 bg-divider" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
            <div key={i} className="flex flex-col space-y-2">
              <Skeleton className="h-40 w-full rounded-xl bg-divider border-3 border-disabled p-4 shadow-[6px_6px_0px_rgba(0,0,0,0.35)] transition-transform hover:-translate-y-1" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-center">
        <div className="flex-col p-5 border-3 bg-critic rounded-md shadow-[6px_6px_0px_rgba(0,0,0,0.35)]">
          <div className="flex items-center gap-2">
            <Frown className="text-primary" />
            <p className="text-primary font-bold">Erro ao carregar projetos</p>
          </div>
          <div className="items-center mt-2">
            <p className="text-primary text-sm">Tente novamente em breve</p>
          </div>
        </div>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-disabled">Nenhum projeto encontrado</p>
      </div>
    );
  }

  return (
    <>
      <div className="my-3 flex justify-center">
        <Input
          placeholder="Buscar projeto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs rounded-20 border-3 border-dark px-5 py-2 text-left text-sm font-semibold outline-none"
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project: ProjectWithIterations) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}

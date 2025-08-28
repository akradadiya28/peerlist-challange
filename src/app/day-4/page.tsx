"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  FolderOpen,
  FolderClosed,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  Archive,
  Trash2,
  Star,
  MoreVertical,
  Grid as GridIcon,
  Rows as RowsIcon,
} from "lucide-react";

type FileKind = "document" | "image" | "video" | "audio" | "archive";

interface FileItem {
  id: string;
  name: string;
  type: FileKind;
  size: string;
  modified: string;
  starred: boolean;
}

export default function InteractiveFolderPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full-bleed background */}
      <div className="absolute inset-0 bg-zinc-950" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          opacity: 0.18,
        }}
      />
      <div className="absolute left-1/5 top-1/4 h-[22rem] w-[22rem] rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute bottom-1/5 right-1/6 h-[22rem] w-[22rem] rounded-full bg-teal-500/10 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 60%, transparent 100%)",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 60%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl p-6 md:p-10">
        <Header />
        <InteractiveFolder />
      </div>
    </div>
  );
}

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10 text-center"
    >
      <h1 className="mb-3 bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-5xl">
        Interactive Folder
      </h1>
      <p className="mx-auto max-w-2xl text-base text-zinc-400 md:text-lg">
        Open, browse, and organize with smooth motion and clear feedback.
      </p>
    </motion.div>
  );
}

function InteractiveFolder() {
  const prefersReduced = useReducedMotion();

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const files: FileItem[] = useMemo(
    () => [
      { id: "1", name: "Project Proposal.pdf", type: "document", size: "2.4 MB", modified: "2 hours ago", starred: true },
      { id: "2", name: "Design Mockups", type: "image", size: "15.7 MB", modified: "1 day ago", starred: false },
      { id: "3", name: "Product Demo.mp4", type: "video", size: "45.2 MB", modified: "3 days ago", starred: true },
      { id: "4", name: "Background Music.wav", type: "audio", size: "8.9 MB", modified: "1 week ago", starred: false },
      { id: "5", name: "Source Code.zip", type: "archive", size: "12.1 MB", modified: "2 weeks ago", starred: false },
      { id: "6", name: "Meeting Notes.txt", type: "document", size: "0.1 MB", modified: "1 hour ago", starred: false },
    ],
    []
  );

  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => (prev.includes(fileId) ? prev.filter((id) => id !== fileId) : [...prev, fileId]));
  };

  const toggleStar = (fileId: string) => {
    console.log("Toggling star", fileId);
  };

  const getFileIcon = (type: FileKind) => {
    const cls = "h-5 w-5";
    switch (type) {
      case "document":
        return <FileText className={cls} />;
      case "image":
        return <ImageIcon className={cls} />;
      case "video":
        return <Video className={cls} />;
      case "audio":
        return <Music className={cls} />;
      case "archive":
        return <Archive className={cls} />;
    }
  };

  const getFileColor = (type: FileKind) => {
    switch (type) {
      case "document":
        return "text-emerald-400";
      case "image":
        return "text-green-400";
      case "video":
        return "text-teal-400";
      case "audio":
        return "text-emerald-300";
      case "archive":
        return "text-green-3 00";
    }
  };

  // Keyboard shortcuts: g/l, Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "g") setViewMode("grid");
      if (e.key.toLowerCase() === "l") setViewMode("list");
      if (e.key === "Escape") setSelectedFiles([]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="mb-10 flex justify-center">
      <motion.div className="relative" whileHover={!prefersReduced ? { scale: 1.02 } : undefined} whileTap={!prefersReduced ? { scale: 0.98 } : undefined}>
        {/* Folder shell */}
        <motion.div
          role="region"
          aria-label="Interactive folder"
          className="relative overflow-hidden rounded-2xl border border-slate-700/40"
          style={{
            background: "linear-gradient(180deg, rgba(2,6,23,.9), rgba(2,6,23,.82))",
            backdropFilter: "blur(10px)",
            boxShadow: isOpen ? "0 30px 80px rgba(0,0,0,.45), inset 0 1px 0 rgba(255,255,255,.04)" : "0 12px 40px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.03)",
            width: isOpen ? "880px" : "320px",
            height: isOpen ? "640px" : "220px",
          }}
          animate={{ width: isOpen ? "880px" : "320px", height: isOpen ? "640px" : "220px" }}
          transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.9 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Header */}
          <motion.div
            className="relative flex h-20 items-center justify-between overflow-hidden p-6"
            style={{ background: "linear-gradient(90deg, #065f46, #16a34a, #0f766e)" }}
            animate={{ background: isHovered ? "linear-gradient(90deg, #059669, #22c55e, #14b8a6)" : "linear-gradient(90deg, #065f46, #16a34a, #0f766e)" }}
            transition={{ duration: 0.4 }}
          >

            {/* moving sheen */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-0"
              initial={false}
              animate={{ background: "linear-gradient(120deg, transparent 20%, rgba(255,255,255,.08) 50%, transparent 80%)", backgroundPosition: isHovered ? ["-200% 0", "200% 0"] : "0% 0", backgroundSize: "200% 100%" }}
              transition={{ duration: 2, repeat: isHovered ? Infinity : 0, ease: "linear" }}
            />

            <div className="relative z-10 flex items-center gap-4">
              <motion.div animate={!prefersReduced ? { rotate: isOpen ? 0 : -15 } : undefined} transition={{ type: "spring", stiffness: 300, damping: 20 }} aria-hidden>
                {isOpen ? <FolderOpen className="h-8 w-8 text-white" /> : <FolderClosed className="h-8 w-8 text-white" />}
              </motion.div>
              <div className="ml-1 flex flex-col">
                <h2 className="text-xl font-bold text-white drop-shadow-[0_1px_0_rgba(0,0,0,0.4)]">Creative Projects</h2>
                <p className="text-sm font-medium text-white/90">6 items</p>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-2">
              <button type="button" onClick={() => setIsOpen((v) => !v)} className="rounded-lg bg-white/20 px-4 py-2 text-white transition-colors hover:bg-white/30" aria-pressed={isOpen} aria-label={isOpen ? "Close folder" : "Open folder"}>
                {isOpen ? "Close" : "Open"}
              </button>
            </div>
          </motion.div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {isOpen && (
              <motion.div key="content" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: prefersReduced ? 0.1 : 0.35, delay: 0.1 }} className="p-6">
                {/* Toolbar */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ToggleButton active={viewMode === "grid"} onClick={() => setViewMode("grid")} label="Grid" icon={<GridIcon className="h-4 w-4" />} />
                    <ToggleButton active={viewMode === "list"} onClick={() => setViewMode("list")} label="List" icon={<RowsIcon className="h-4 w-4" />} />
                  </div>

                  <div className="flex items-center gap-3 text-sm text-zinc-400">
                    {selectedFiles.length > 0 && <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-emerald-300">{selectedFiles.length} selected</span>}
                    <button type="button" disabled={!selectedFiles.length} className={`rounded-lg p-2 transition-colors ${selectedFiles.length ? "bg-red-600 text-white hover:bg-red-700" : "cursor-not-allowed bg-slate-700/60 text-slate-400"}`} aria-disabled={!selectedFiles.length} title={selectedFiles.length ? "Delete" : "Select files to delete"}>
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Files */}
                <div role="list" aria-label="Files" className={viewMode === "grid" ? "grid grid-cols-2 gap-4" : "flex flex-col gap-2"}>
                  {files.map((file, index) => (
                    <FileTile
                      key={file.id}
                      file={file}
                      index={index}
                      viewMode={viewMode}
                      selected={selectedFiles.includes(file.id)}
                      onToggleSelect={() => toggleFileSelection(file.id)}
                      onToggleStar={() => toggleStar(file.id)}
                      getFileColor={getFileColor}
                      getFileIcon={getFileIcon}
                      prefersReduced={prefersReduced ?? false}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Particles */}
        <AnimatePresence>
          {!prefersReduced && isHovered && (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-2 w-2 rounded-full bg-emerald-400"
                  initial={{ opacity: 0, scale: 0, x: 150, y: 100 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                    x: [150, 150 + Math.sin(i * 60) * 100, 150 + Math.sin(i * 60) * 150],
                    y: [100, 100 + Math.cos(i * 60) * 100, 100 + Math.cos(i * 60) * 150],
                  }}
                  transition={{ duration: 2, delay: i * 0.1, repeat: Infinity, ease: "easeOut" }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function ToggleButton({ active, onClick, label, icon }: { active: boolean; onClick: () => void; label: string; icon: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${active ? "bg-emerald-600 text-white" : "bg-slate-700 text-gray-300 hover:bg-slate-600"}`}
      title={label}
    >
      {icon}
      {label}
    </button>
  );
}

function FileTile({
  file,
  index,
  viewMode,
  selected,
  onToggleSelect,
  onToggleStar,
  getFileColor,
  getFileIcon,
  prefersReduced,
}: {
  file: FileItem;
  index: number;
  viewMode: "grid" | "list";
  selected: boolean;
  onToggleSelect: () => void;
  onToggleStar: () => void;
  getFileColor: (t: FileKind) => string;
  getFileIcon: (t: FileKind) => React.ReactNode;
  prefersReduced: boolean;
}) {
  const baseClass =
    viewMode === "grid"
      ? "rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 hover:bg-slate-700/70"
      : "rounded-lg border border-slate-700/30 bg-slate-800/30 p-3 hover:bg-slate-700/50";

  return (
    <motion.div
      role="listitem"
      tabIndex={0}
      aria-pressed={selected}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: prefersReduced ? 0.1 : 0.28, delay: 0.18 + index * 0.08, type: "spring", stiffness: 300 }}
      className={`relative cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 ${baseClass} ${selected ? "ring-2 ring-emerald-500 bg-emerald-900/20" : ""}`}
      onClick={onToggleSelect}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onToggleSelect();
        }
      }}
      whileHover={!prefersReduced ? { scale: 1.02, y: -2 } : undefined}
      whileTap={!prefersReduced ? { scale: 0.98 } : undefined}
    >
      {/* type badge */}
      <div className="pointer-events-none absolute right-2 top-2 text-xs text-zinc-400">
        {file.type === "image" && <span className="rounded bg-white/10 px-1.5 py-0.5">IMG</span>}
        {file.type === "video" && <span className="rounded bg-white/10 px-1.5 py-0.5">MP4</span>}
      </div>

      {/* selected ring overlay for clarity */}
      {selected && <div className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-emerald-500/80" />}

      <div className={`flex items-center ${viewMode === "grid" ? "flex-col gap-2 text-center" : "gap-3"}`}>
        <div className={`${getFileColor(file.type)} ${viewMode === "grid" ? "" : ""}`}>{getFileIcon(file.type)}</div>

        <div className={`${viewMode === "grid" ? "text-center" : "flex-1 min-w-0"}`}>
          <h3 className="truncate font-medium text-white transition-colors group-hover:text-emerald-300">{file.name}</h3>
          <div className={`text-sm text-gray-400 ${viewMode === "grid" ? "mt-1" : ""}`}>{file.size} • {file.modified}</div>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            className={`rounded p-1 transition-colors ${file.starred ? "text-yellow-400 hover:text-yellow-300" : "text-gray-400 hover:text-yellow-400"}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar();
            }}
            title={file.starred ? "Unstar" : "Star"}
          >
            <Star className={`h-4 w-4 ${file.starred ? "fill-current" : ""}`} />
          </button>

          <button type="button" className="rounded p-1 text-gray-400 transition-colors hover:text-white" onClick={(e) => e.stopPropagation()} title="More actions">
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

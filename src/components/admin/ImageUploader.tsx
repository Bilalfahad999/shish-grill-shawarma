"use client";

import { useState, useRef } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  label?: string;
  hint?: string;
}

export function ImageUploader({ value, onChange, onRemove, label = "Image", hint }: ImageUploaderProps) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    // TODO UploadThing: upload file and get back URL
    // For now, create a local object URL as preview placeholder
    const url = URL.createObjectURL(file);
    onChange(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-700 mb-1.5" style={{ fontFamily: "var(--font-inter)" }}>
        {label}
      </label>

      {value ? (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50 group">
          <Image src={value} alt="Uploaded image" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
            <button
              type="button"
              onClick={onRemove ?? (() => onChange(""))}
              className="opacity-0 group-hover:opacity-100 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center text-red-500 hover:bg-white transition-all cursor-pointer"
              aria-label="Remove image"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={`w-full h-40 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer ${
            dragging
              ? "border-[#B54E32] bg-[#B54E32]/5"
              : "border-neutral-200 bg-neutral-50 hover:border-[#B54E32]/50 hover:bg-neutral-100"
          }`}
          aria-label="Upload image"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${dragging ? "bg-[#B54E32]/10 text-[#B54E32]" : "bg-neutral-200 text-neutral-400"}`}>
            {dragging ? <Upload size={18} /> : <ImageIcon size={18} />}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-neutral-700" style={{ fontFamily: "var(--font-inter)" }}>
              {dragging ? "Drop to upload" : "Click or drag to upload"}
            </p>
            {hint && (
              <p className="text-xs text-neutral-400 mt-0.5" style={{ fontFamily: "var(--font-inter)" }}>{hint}</p>
            )}
          </div>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        aria-hidden="true"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
      />
    </div>
  );
}

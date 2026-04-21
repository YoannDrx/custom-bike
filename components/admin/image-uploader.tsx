"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

export type UploadedImage = { url: string; alt?: string };

export function ImageUploader({
  value,
  onChange,
  max = 8,
  label = "Images",
}: {
  value: UploadedImage[];
  onChange: (next: UploadedImage[]) => void;
  max?: number;
  label?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const uploadFile = useCallback(
    async (file: File) => {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Upload échoué");
      }
      const data = (await res.json()) as { url: string };
      return data.url;
    },
    [],
  );

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    if (value.length + files.length > max) {
      toast.error(`Maximum ${max} images.`);
      return;
    }
    setUploading(true);
    try {
      const results: UploadedImage[] = [];
      for (const file of Array.from(files)) {
        const url = await uploadFile(file);
        results.push({ url });
      }
      onChange([...value, ...results]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload échoué");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return;
    const next = [...value];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  };

  return (
    <div className="admin-field">
      <label className="admin-field-label">{label}</label>
      <div className="admin-image-grid">
        {value.map((img, index) => (
          <div key={img.url + index} className="admin-image-tile">
            <Image src={img.url} alt={img.alt ?? ""} fill sizes="200px" />
            <button
              type="button"
              className="admin-image-remove"
              aria-label="Supprimer"
              onClick={() => remove(index)}
            >
              ×
            </button>
            <div
              style={{
                position: "absolute",
                bottom: 4,
                left: 4,
                display: "flex",
                gap: 4,
              }}
            >
              <button
                type="button"
                className="admin-image-remove"
                style={{ width: "1.6rem", height: "1.6rem" }}
                onClick={() => move(index, index - 1)}
                aria-label="Monter"
              >
                ↑
              </button>
              <button
                type="button"
                className="admin-image-remove"
                style={{ width: "1.6rem", height: "1.6rem" }}
                onClick={() => move(index, index + 1)}
                aria-label="Descendre"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>
      <label className="admin-upload-zone" style={{ cursor: "pointer", display: "block" }}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? "Téléversement en cours…" : "Cliquer pour ajouter des images (max 10 Mo)"}
      </label>
      <p className="admin-field-hint">
        {value.length}/{max} images · la première image sert de couverture
      </p>
    </div>
  );
}

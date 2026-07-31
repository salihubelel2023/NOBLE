"use client";

import { Plus, Trash2, GripVertical } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface ImageEntry {
  url: string;
  alt: string;
}

interface ImageUrlRepeaterProps {
  images: ImageEntry[];
  onChange: (images: ImageEntry[]) => void;
}

/**
 * v1 uses a URL field rather than real upload — a real drag-and-drop
 * upload needs a storage provider (Vercel Blob, Cloudinary, S3...) with
 * its own account and credentials, which can't be provisioned from this
 * environment. This is identical to how images already worked in the
 * mock data, so nothing regresses; swapping this for a real upload button
 * later is a contained addition. See ADMIN_SETUP.md.
 */
export function ImageUrlRepeater({ images, onChange }: ImageUrlRepeaterProps) {
  function updateImage(index: number, field: keyof ImageEntry, value: string) {
    const next = images.map((image, i) => (i === index ? { ...image, [field]: value } : image));
    onChange(next);
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  function addImage() {
    onChange([...images, { url: "", alt: "" }]);
  }

  return (
    <div className="flex flex-col gap-3">
      {images.map((image, index) => (
        <div key={index} className="flex items-start gap-2">
          <GripVertical className="mt-2.5 h-4 w-4 shrink-0 text-noble-line" />
          <div className="grid flex-1 gap-2 sm:grid-cols-2">
            <Input
              placeholder="Image URL"
              value={image.url}
              onChange={(e) => updateImage(index, "url", e.target.value)}
            />
            <Input
              placeholder="Alt text (for accessibility & SEO)"
              value={image.alt}
              onChange={(e) => updateImage(index, "alt", e.target.value)}
            />
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={() => removeImage(index)} aria-label="Remove image">
            <Trash2 className="h-4 w-4 text-noble-error" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addImage} className="w-fit gap-2">
        <Plus className="h-4 w-4" />
        Add Image
      </Button>
    </div>
  );
}

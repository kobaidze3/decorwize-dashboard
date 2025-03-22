
import { AnimatedButton } from "@/components/ui-custom/AnimatedButton";
import { BlurPanel } from "@/components/ui-custom/BlurPanel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { ChangeEvent, useState } from "react";
import { Upload, Image as ImageIcon, File } from "lucide-react";

const WallpaperUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.match('image.*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (!file) return;
    
    // Simulating upload
    toast({
      title: "Upload started",
      description: "Your wallpaper is being uploaded"
    });

    // Mock upload success after 2s
    setTimeout(() => {
      toast({
        title: "Upload successful",
        description: "Your wallpaper has been uploaded"
      });
      setFile(null);
      setPreview(null);
    }, 2000);
  };

  return (
    <BlurPanel className="w-full">
      <div className="flex flex-col space-y-4">
        <h2 className="text-lg font-medium">Upload New Wallpaper</h2>
        
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-lg p-8 transition-all duration-200 ease-in-out flex flex-col items-center justify-center ${
            isDragging ? 'border-primary/70 bg-primary/5' : 'border-border'
          }`}
        >
          <input
            type="file"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            accept="image/*"
          />
          
          {preview ? (
            <div className="w-full max-h-60 overflow-hidden rounded-md">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-contain" 
              />
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto h-12 w-12 text-muted-foreground mb-3 bg-muted/50 rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-medium mb-1">Drag wallpaper here or click to upload</h3>
              <p className="text-xs text-muted-foreground">
                Support for JPG, PNG, WebP
              </p>
            </div>
          )}
        </div>

        {preview && (
          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={() => {
                setFile(null);
                setPreview(null);
              }}
            >
              Cancel
            </Button>
            <AnimatedButton onClick={handleUpload}>
              Upload Wallpaper
            </AnimatedButton>
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-sm font-medium mb-3">Import from library</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="group cursor-pointer overflow-hidden relative aspect-square">
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-10">
                  <Button variant="secondary" size="sm" className="text-xs">
                    <ImageIcon className="h-3 w-3 mr-1" />
                    Select
                  </Button>
                </div>
                <div className="h-full w-full bg-muted/50 flex items-center justify-center">
                  <File className="h-6 w-6 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </BlurPanel>
  );
};

export { WallpaperUpload };


import { AnimatedButton } from "@/components/ui-custom/AnimatedButton";
import { BlurPanel } from "@/components/ui-custom/BlurPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { ChangeEvent, useState } from "react";
import { Upload, Image as ImageIcon } from "lucide-react";

const InteriorUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");

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

    // Extract filename without extension as default name
    const fileName = file.name.replace(/\.[^/.]+$/, "");
    setName(fileName);
    
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    if (!file || !name.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide a name for your interior",
        variant: "destructive"
      });
      return;
    }
    
    // Simulating upload
    toast({
      title: "Upload started",
      description: "Your interior is being uploaded"
    });

    // Mock upload success after 2s
    setTimeout(() => {
      toast({
        title: "Upload successful",
        description: "Your interior has been uploaded"
      });
      setFile(null);
      setPreview(null);
      setName("");
    }, 2000);
  };

  return (
    <BlurPanel className="w-full">
      <div className="flex flex-col space-y-4">
        <h2 className="text-lg font-medium">Upload Custom Interior</h2>
        
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
            <div className="w-full max-h-80 overflow-hidden rounded-md">
              <img 
                src={preview} 
                alt="Preview" 
                className="w-full h-full object-contain" 
              />
            </div>
          ) : (
            <div className="text-center py-10">
              <div className="mx-auto h-12 w-12 text-muted-foreground mb-3 bg-muted/50 rounded-full flex items-center justify-center">
                <Upload className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-medium mb-1">Drag interior image here or click to upload</h3>
              <p className="text-xs text-muted-foreground">
                Support for JPG, PNG, WebP. Recommend high resolution images.
              </p>
            </div>
          )}
        </div>

        {preview && (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Interior Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="E.g., My Living Room"
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setName("");
                }}
              >
                Cancel
              </Button>
              <AnimatedButton onClick={handleUpload}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Upload Interior
              </AnimatedButton>
            </div>
          </>
        )}
      </div>
    </BlurPanel>
  );
};

export { InteriorUpload };


import { MainLayout } from "@/components/layout/MainLayout";
import { InteriorGrid } from "@/components/interiors/InteriorGrid";
import { InteriorUpload } from "@/components/interiors/InteriorUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, Upload } from "lucide-react";

const Interiors = () => {
  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Interiors</h1>
          <p className="text-muted-foreground mt-1">
            Manage interior scenes for your wallpaper visualizer
          </p>
        </div>

        <Tabs defaultValue="gallery" className="w-full">
          <TabsList>
            <TabsTrigger value="gallery" className="flex items-center">
              <Grid className="h-4 w-4 mr-2" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </TabsTrigger>
          </TabsList>
          <TabsContent value="gallery" className="mt-4">
            <InteriorGrid />
          </TabsContent>
          <TabsContent value="upload" className="mt-4">
            <InteriorUpload />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Interiors;

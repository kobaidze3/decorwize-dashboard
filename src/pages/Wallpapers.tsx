
import { MainLayout } from "@/components/layout/MainLayout";
import { WallpaperTable } from "@/components/wallpapers/WallpaperTable";
import { WallpaperUpload } from "@/components/wallpapers/WallpaperUpload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PanelTop, Upload } from "lucide-react";

const Wallpapers = () => {
  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Wallpapers</h1>
          <p className="text-muted-foreground mt-1">
            Browse catalog or upload your custom wallpapers
          </p>
        </div>

        <Tabs defaultValue="catalog" className="w-full">
          <TabsList>
            <TabsTrigger value="catalog" className="flex items-center">
              <PanelTop className="h-4 w-4 mr-2" />
              Catalog
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center">
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </TabsTrigger>
          </TabsList>
          <TabsContent value="catalog" className="mt-4">
            <WallpaperTable />
          </TabsContent>
          <TabsContent value="upload" className="mt-4">
            <WallpaperUpload />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Wallpapers;

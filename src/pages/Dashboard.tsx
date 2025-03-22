
import { AnimatedButton } from "@/components/ui-custom/AnimatedButton";
import { BlurPanel } from "@/components/ui-custom/BlurPanel";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightIcon, ImageIcon, Wallpaper, Home, Upload, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    {
      title: "Wallpapers",
      value: "24",
      description: "From catalog",
      icon: <Wallpaper className="h-5 w-5" />,
      color: "bg-sky-500/10 text-sky-600",
      link: "/wallpapers"
    },
    {
      title: "Custom Wallpapers",
      value: "3",
      description: "Uploaded",
      icon: <Upload className="h-5 w-5" />,
      color: "bg-amber-500/10 text-amber-600",
      link: "/wallpapers"
    },
    {
      title: "Interiors",
      value: "8",
      description: "Available",
      icon: <Home className="h-5 w-5" />,
      color: "bg-emerald-500/10 text-emerald-600",
      link: "/interiors"
    },
    {
      title: "Subscriptions",
      value: "2",
      description: "Active",
      icon: <Star className="h-5 w-5" />,
      color: "bg-purple-500/10 text-purple-600",
      link: "/wallpapers"
    }
  ];

  return (
    <MainLayout>
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your wallpapers and visualize them in interiors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Link to={stat.link} key={index}>
              <Card className="hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="flex p-6 h-full">
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className={`w-10 h-10 rounded-full ${stat.color} flex items-center justify-center mb-3`}>
                        {stat.icon}
                      </div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        {stat.title}
                      </p>
                      <h3 className="text-2xl font-semibold">{stat.value}</h3>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground mt-2">
                      <span>{stat.description}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Tabs defaultValue="recent" className="w-full">
          <TabsList>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="visualizer">Visualizer</TabsTrigger>
          </TabsList>
          <TabsContent value="recent" className="mt-4">
            <BlurPanel>
              <div className="flex flex-col space-y-6">
                <h2 className="text-lg font-medium">Recent Activity</h2>
                
                <div className="space-y-4">
                  {[
                    { title: "Uploaded new wallpaper", time: "2 hours ago", icon: <Upload className="h-4 w-4" /> },
                    { title: "Subscribed to Luxe Interiors", time: "Yesterday", icon: <Star className="h-4 w-4" /> },
                    { title: "Visualized Gold Leaf in Modern Living Room", time: "3 days ago", icon: <ImageIcon className="h-4 w-4" /> }
                  ].map((activity, i) => (
                    <div key={i} className="flex items-start">
                      <div className="bg-muted/50 rounded-full p-2 mr-3">
                        {activity.icon}
                      </div>
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </BlurPanel>
          </TabsContent>
          <TabsContent value="visualizer" className="mt-4">
            <BlurPanel>
              <div className="flex flex-col space-y-6">
                <h2 className="text-lg font-medium">Visualizer</h2>
                
                <div className="py-10 text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                    <ImageIcon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Ready to visualize?</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                    See how your wallpapers will look in real interiors with our visualizer tool.
                  </p>
                  <AnimatedButton className="mx-auto">
                    Launch Visualizer
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </div>
              </div>
            </BlurPanel>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

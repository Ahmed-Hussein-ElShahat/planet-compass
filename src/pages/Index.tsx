import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Telescope, Sparkles, TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <div className="relative">
          {/* Animated background elements */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute top-20 right-1/4 w-72 h-72 bg-accent/15 rounded-full blur-3xl animate-float" />
          
          <div className="relative text-center max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Powered by Advanced Neural Networks
              </span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Discover New Worlds
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Advanced exoplanet detection system combining neural networks and random forest models
              to identify distant worlds beyond our solar system.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link to="/prediction">
                <Button size="lg" className="shadow-glow-primary group">
                  <Telescope className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  Start Detection
                </Button>
              </Link>
              
              <Link to="/research">
                <Button variant="outline" size="lg">
                  Research Assistant
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-32">
          <Link to="/prediction" className="group">
            <div className="h-full p-8 rounded-2xl bg-card border border-border/40 hover:border-primary/50 transition-all hover:shadow-glow-primary">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Telescope className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Single Point Prediction</h3>
              <p className="text-muted-foreground leading-relaxed">
                Input stellar parameters and get instant exoplanet detection predictions with confidence scores.
              </p>
            </div>
          </Link>

          <Link to="/weights" className="group">
            <div className="h-full p-8 rounded-2xl bg-card border border-border/40 hover:border-accent/50 transition-all hover:shadow-glow-accent">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-7 w-7 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Adjust Model Weights</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fine-tune the voting balance between neural network and random forest models for optimal results.
              </p>
            </div>
          </Link>

          <Link to="/training" className="group">
            <div className="h-full p-8 rounded-2xl bg-card border border-border/40 hover:border-success/50 transition-all hover:shadow-glow-success">
              <div className="w-14 h-14 rounded-xl bg-success/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="h-7 w-7 text-success" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Custom Training</h3>
              <p className="text-muted-foreground leading-relaxed">
                Upload your own datasets to train and improve the detection models with new astronomical data.
              </p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Index;

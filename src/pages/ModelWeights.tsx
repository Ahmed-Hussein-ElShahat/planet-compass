import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Brain, TreeDeciduous, TrendingUp } from "lucide-react";
import { toast } from "sonner";

const ModelWeights = () => {
  const [nnWeight, setNnWeight] = useState(50);
  const rfWeight = 100 - nnWeight;

  const handleSaveWeights = () => {
    // Here you would send the weights to your backend
    toast.success("Model weights updated successfully", {
      description: `Neural Network: ${nnWeight}% | Random Forest: ${rfWeight}%`,
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Model Weight Configuration
            </h1>
            <p className="text-xl text-muted-foreground">
              Fine-tune the voting balance between detection models
            </p>
          </div>

          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Ensemble Voting Weights
              </CardTitle>
              <CardDescription>
                Adjust the influence of each model in the final prediction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Neural Network Weight */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-lg">
                    <Brain className="h-5 w-5 text-primary" />
                    Neural Network
                  </Label>
                  <span className="text-2xl font-bold text-primary">{nnWeight}%</span>
                </div>
                <Slider
                  value={[nnWeight]}
                  onValueChange={(value) => setNnWeight(value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  Deep learning model trained on millions of stellar observations. 
                  Excels at detecting subtle patterns in complex data.
                </p>
              </div>

              {/* Random Forest Weight */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2 text-lg">
                    <TreeDeciduous className="h-5 w-5 text-accent" />
                    Random Forest
                  </Label>
                  <span className="text-2xl font-bold text-accent">{rfWeight}%</span>
                </div>
                <Slider
                  value={[rfWeight]}
                  onValueChange={(value) => setNnWeight(100 - value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  Ensemble learning model with high interpretability. 
                  Strong performance on structured astronomical features.
                </p>
              </div>

              {/* Voting Visualization */}
              <div className="pt-6 space-y-4">
                <Label className="text-lg">Voting Distribution</Label>
                <div className="h-8 flex rounded-lg overflow-hidden">
                  <div 
                    className="bg-primary flex items-center justify-center text-xs font-semibold transition-all duration-300"
                    style={{ width: `${nnWeight}%` }}
                  >
                    {nnWeight > 15 && "Neural Network"}
                  </div>
                  <div 
                    className="bg-accent flex items-center justify-center text-xs font-semibold transition-all duration-300"
                    style={{ width: `${rfWeight}%` }}
                  >
                    {rfWeight > 15 && "Random Forest"}
                  </div>
                </div>
              </div>

              {/* Model Performance Stats */}
              <div className="grid md:grid-cols-2 gap-4 pt-4">
                <Card className="bg-secondary/50">
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Neural Network Stats</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Accuracy:</span>
                          <span className="font-semibold">94.2%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Precision:</span>
                          <span className="font-semibold">92.8%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Recall:</span>
                          <span className="font-semibold">95.1%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-secondary/50">
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Random Forest Stats</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Accuracy:</span>
                          <span className="font-semibold">91.7%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Precision:</span>
                          <span className="font-semibold">93.4%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Recall:</span>
                          <span className="font-semibold">89.8%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button 
                onClick={handleSaveWeights} 
                className="w-full shadow-glow-primary"
              >
                Save Configuration
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ModelWeights;

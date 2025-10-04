import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import PlanetScene from "@/components/PlanetScene";

const Prediction = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ prediction: boolean; confidence: number } | null>(null);
  const [formData, setFormData] = useState({
    orbitalPeriod: "",
    transitDepth: "",
    stellarMass: "",
    planetRadius: "",
    equilibriumTemp: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call to backend model
    setTimeout(() => {
      const randomPrediction = Math.random() > 0.5;
      const randomConfidence = 0.7 + Math.random() * 0.25;
      
      setResult({
        prediction: randomPrediction,
        confidence: randomConfidence,
      });
      
      setLoading(false);
      
      toast.success(
        randomPrediction 
          ? "Exoplanet Detected!" 
          : "No Exoplanet Detected",
        { description: `Confidence: ${(randomConfidence * 100).toFixed(1)}%` }
      );
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Exoplanet Detection
            </h1>
            <p className="text-xl text-muted-foreground">
              Enter stellar and planetary parameters for real-time prediction
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Input Parameters
                </CardTitle>
                <CardDescription>
                  Provide the stellar system measurements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="orbitalPeriod">Orbital Period (days)</Label>
                    <Input
                      id="orbitalPeriod"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 365.25"
                      value={formData.orbitalPeriod}
                      onChange={(e) => handleInputChange("orbitalPeriod", e.target.value)}
                      required
                      className="bg-secondary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transitDepth">Transit Depth (ppm)</Label>
                    <Input
                      id="transitDepth"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 84.0"
                      value={formData.transitDepth}
                      onChange={(e) => handleInputChange("transitDepth", e.target.value)}
                      required
                      className="bg-secondary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="stellarMass">Stellar Mass (solar masses)</Label>
                    <Input
                      id="stellarMass"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 1.0"
                      value={formData.stellarMass}
                      onChange={(e) => handleInputChange("stellarMass", e.target.value)}
                      required
                      className="bg-secondary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="planetRadius">Planet Radius (Earth radii)</Label>
                    <Input
                      id="planetRadius"
                      type="number"
                      step="0.01"
                      placeholder="e.g., 1.0"
                      value={formData.planetRadius}
                      onChange={(e) => handleInputChange("planetRadius", e.target.value)}
                      required
                      className="bg-secondary/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="equilibriumTemp">Equilibrium Temperature (K)</Label>
                    <Input
                      id="equilibriumTemp"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 288"
                      value={formData.equilibriumTemp}
                      onChange={(e) => handleInputChange("equilibriumTemp", e.target.value)}
                      required
                      className="bg-secondary/50"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full shadow-glow-primary"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Run Detection"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <div className="space-y-6">
              {result && (
                <Card className={`border-2 ${result.prediction ? 'border-success' : 'border-destructive'} bg-card/50 backdrop-blur-sm shadow-2xl`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {result.prediction ? (
                        <span className="text-success">✓ Exoplanet Detected</span>
                      ) : (
                        <span className="text-destructive">✗ No Exoplanet</span>
                      )}
                    </CardTitle>
                    <CardDescription>
                      Confidence: {(result.confidence * 100).toFixed(1)}%
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${
                            result.prediction ? 'bg-success' : 'bg-destructive'
                          }`}
                          style={{ width: `${result.confidence * 100}%` }}
                        />
                      </div>
                      
                      <div className="pt-4 text-sm text-muted-foreground">
                        <p className="mb-2 font-semibold text-foreground">Model Output:</p>
                        <ul className="space-y-1 pl-4">
                          <li>• Neural Network: {(Math.random() * 100).toFixed(1)}%</li>
                          <li>• Random Forest: {(Math.random() * 100).toFixed(1)}%</li>
                          <li>• Final Prediction: {result.prediction ? "Positive" : "Negative"}</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 3D Visualization */}
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="h-96">
                    <PlanetScene isExoplanet={result?.prediction || false} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Prediction;

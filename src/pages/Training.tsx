import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, FileSpreadsheet, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Training = () => {
  const [file, setFile] = useState<File | null>(null);
  const [training, setTraining] = useState(false);
  const [trainingComplete, setTrainingComplete] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === "text/csv" || selectedFile.name.endsWith('.csv')) {
        setFile(selectedFile);
        toast.success("CSV file uploaded successfully");
      } else {
        toast.error("Please upload a CSV file");
      }
    }
  };

  const handleTraining = async () => {
    if (!file) {
      toast.error("Please upload a CSV file first");
      return;
    }

    setTraining(true);
    setTrainingComplete(false);

    // Simulate training process
    setTimeout(() => {
      setTraining(false);
      setTrainingComplete(true);
      toast.success("Model training completed successfully", {
        description: "Your models have been updated with the new dataset"
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              Model Training
            </h1>
            <p className="text-xl text-muted-foreground">
              Upload custom datasets to enhance detection accuracy
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload Training Data
                </CardTitle>
                <CardDescription>
                  Provide a CSV file with labeled exoplanet observations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="csv-upload">Dataset File (CSV)</Label>
                  <div className="relative">
                    <input
                      id="csv-upload"
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <label
                      htmlFor="csv-upload"
                      className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-xl cursor-pointer bg-secondary/20 hover:bg-secondary/40 transition-colors"
                    >
                      {file ? (
                        <div className="flex flex-col items-center gap-2">
                          <FileSpreadsheet className="h-12 w-12 text-success" />
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Upload className="h-12 w-12 text-muted-foreground" />
                          <p className="text-sm font-medium">Click to upload CSV</p>
                          <p className="text-xs text-muted-foreground">
                            or drag and drop
                          </p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="font-semibold text-foreground">Required CSV Columns:</p>
                  <ul className="space-y-1 pl-4">
                    <li>• orbital_period (days)</li>
                    <li>• transit_depth (ppm)</li>
                    <li>• stellar_mass (solar masses)</li>
                    <li>• planet_radius (Earth radii)</li>
                    <li>• equilibrium_temperature (K)</li>
                    <li>• is_exoplanet (0 or 1)</li>
                  </ul>
                </div>

                <Button 
                  onClick={handleTraining}
                  disabled={!file || training}
                  className="w-full shadow-glow-primary"
                >
                  {training ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Training Models...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Start Training
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Training Progress */}
            <div className="space-y-6">
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Training Status</CardTitle>
                  <CardDescription>
                    Monitor the model training progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!training && !trainingComplete && (
                    <div className="text-center py-12 text-muted-foreground">
                      <FileSpreadsheet className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p>Upload a dataset to begin training</p>
                    </div>
                  )}

                  {training && (
                    <div className="space-y-6 py-8">
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Preprocessing data...</span>
                          <span className="text-success">✓</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Training Neural Network...</span>
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Training Random Forest...</span>
                          <span>Pending</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Validating models...</span>
                          <span>Pending</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {trainingComplete && (
                    <div className="text-center py-8 space-y-4">
                      <div className="flex items-center justify-center">
                        <CheckCircle className="h-16 w-16 text-success animate-pulse-glow" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-success mb-2">
                          Training Complete!
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Your models have been successfully updated
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="p-4 rounded-lg bg-secondary/50">
                          <p className="text-xs text-muted-foreground mb-1">Neural Network</p>
                          <p className="text-lg font-bold text-primary">96.3%</p>
                          <p className="text-xs text-muted-foreground">Accuracy</p>
                        </div>
                        <div className="p-4 rounded-lg bg-secondary/50">
                          <p className="text-xs text-muted-foreground mb-1">Random Forest</p>
                          <p className="text-lg font-bold text-accent">94.8%</p>
                          <p className="text-xs text-muted-foreground">Accuracy</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base">Training Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Larger datasets (10,000+ samples) yield better results</p>
                  <p>• Ensure balanced classes (similar number of exoplanets vs non-exoplanets)</p>
                  <p>• Clean data with proper handling of missing values</p>
                  <p>• Training typically takes 3-10 minutes depending on dataset size</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Training;

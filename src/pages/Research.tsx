import { useState, useRef, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Research = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm your research assistant for exoplanet detection. I can help answer questions about stellar parameters, detection methods, model performance, and astronomical concepts. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("transit") || lowerMessage.includes("method")) {
      return "The transit method detects exoplanets by measuring the slight dimming of a star's light when a planet passes in front of it. This dip in brightness, called transit depth, is typically measured in parts per million (ppm). The method has discovered over 3,000 exoplanets and is particularly effective for finding close-in planets.";
    } else if (lowerMessage.includes("neural network") || lowerMessage.includes("model")) {
      return "Our neural network model uses deep learning to analyze stellar parameters. It's trained on millions of observations from the Kepler and TESS missions. The model achieves 94.2% accuracy and excels at detecting subtle patterns in complex astronomical data that traditional methods might miss.";
    } else if (lowerMessage.includes("habitable") || lowerMessage.includes("goldilocks")) {
      return "The habitable zone, or 'Goldilocks zone,' is the orbital region around a star where liquid water could exist on a planet's surface. For Sun-like stars, this zone extends from about 0.95 to 1.37 AU. However, habitability also depends on atmospheric composition, planetary mass, and stellar activity.";
    } else if (lowerMessage.includes("false positive")) {
      return "False positives in exoplanet detection occur when signals mimic planetary transits but are caused by other phenomena like eclipsing binary stars, stellar variability, or instrumental artifacts. Our ensemble model helps reduce false positives by combining neural network and random forest predictions, achieving a false positive rate below 6%.";
    } else {
      return `That's an interesting question about ${userMessage}. In exoplanet research, we analyze various stellar and planetary parameters including orbital periods, transit depths, stellar masses, and equilibrium temperatures. Our dual-model approach combines neural networks for pattern recognition with random forests for interpretability. Would you like to know more about any specific aspect?`;
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: simulateResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Research Assistant
            </h1>
            <p className="text-xl text-muted-foreground">
              Ask questions about exoplanet detection and astronomical research
            </p>
          </div>

          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                AI Research Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ScrollArea ref={scrollRef} className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                            <Bot className="h-5 w-5 text-primary" />
                          </div>
                        )}
                        
                        <div
                          className={`max-w-[80%] p-4 rounded-2xl ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className="text-xs opacity-60 mt-2">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>

                        {message.role === "user" && (
                          <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 text-accent" />
                          </div>
                        )}
                      </div>
                    ))}

                    {isTyping && (
                      <div className="flex gap-3 justify-start">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-5 w-5 text-primary" />
                        </div>
                        <div className="bg-secondary p-4 rounded-2xl">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about exoplanet detection methods, models, or astronomical concepts..."
                    className="flex-1 bg-secondary/50"
                  />
                  <Button 
                    onClick={handleSend}
                    disabled={!input.trim() || isTyping}
                    className="shadow-glow-primary"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInput("What is the transit method?")}
                  >
                    Transit method?
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInput("How accurate is the neural network model?")}
                  >
                    Model accuracy?
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInput("What is the habitable zone?")}
                  >
                    Habitable zone?
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Research;

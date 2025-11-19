
import React, { useState, useRef } from 'react';
import { Upload, X, ScanEye, Loader2, Image as ImageIcon } from 'lucide-react';
import { analyzeImage } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

export const ImageAnalyzer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysis(null); // Reset previous analysis
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    try {
      // Extract base64 data and mime type
      const base64Data = selectedImage.split(',')[1];
      const mimeType = selectedImage.split(';')[0].split(':')[1];

      const result = await analyzeImage(base64Data, mimeType, "Analyze this image carefully. What details can you see?");
      setAnalysis(result);
    } catch (error) {
      setAnalysis("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setAnalysis(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-20 right-6 z-40 bg-black text-white p-4 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.8)] transition-all ${isOpen ? 'hidden' : 'block'}`}
      >
        <div className="flex items-center gap-2 uppercase font-bold tracking-wider">
            <ScanEye size={20} />
            <span>Analyze</span>
        </div>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 overflow-y-auto backdrop-blur-sm">
          <div className="bg-[#0a0a0a] w-full max-w-3xl border-4 border-white shadow-2xl min-h-[600px] flex flex-col text-white">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b-4 border-white bg-white text-black">
              <h2 className="text-2xl font-black uppercase tracking-tight">Visual Analysis</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black">
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row gap-8">
              
              {/* Left Col: Image Upload */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="flex-1 border-4 border-dashed border-gray-700 min-h-[300px] flex flex-col items-center justify-center relative bg-[#111] group hover:border-white transition-colors">
                  {selectedImage ? (
                    <>
                        <img src={selectedImage} alt="Upload" className="absolute inset-0 w-full h-full object-contain p-4" />
                        <button 
                            onClick={reset} 
                            className="absolute top-2 right-2 bg-white text-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X size={16} />
                        </button>
                    </>
                  ) : (
                    <div className="text-center p-6 pointer-events-none">
                      <ImageIcon className="mx-auto w-12 h-12 text-gray-600 mb-4 group-hover:text-white transition-colors" />
                      <p className="text-lg font-bold uppercase text-gray-500 group-hover:text-white">Drag & Drop</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={!!selectedImage}
                  />
                </div>

                <button 
                    onClick={handleAnalyze}
                    disabled={!selectedImage || isAnalyzing}
                    className="w-full py-4 bg-white text-black uppercase font-black tracking-widest border-2 border-white hover:bg-black hover:text-white disabled:bg-gray-800 disabled:text-gray-500 disabled:border-gray-800 disabled:cursor-not-allowed transition-all"
                >
                    {isAnalyzing ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin" /> Processing...
                        </div>
                    ) : (
                        "Start Analysis"
                    )}
                </button>
              </div>

              {/* Right Col: Results */}
              <div className="flex-1 border-4 border-white p-6 bg-black overflow-y-auto max-h-[500px] shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)]">
                <h3 className="text-lg font-bold uppercase border-b-2 border-white pb-2 mb-4 text-white">Result</h3>
                {analysis ? (
                  <div className="prose prose-sm prose-invert font-mono text-gray-300">
                    <ReactMarkdown>{analysis}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-gray-600 font-mono text-sm">
                    Upload an image to analyze visual aesthetics using Gemini Vision.
                  </p>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

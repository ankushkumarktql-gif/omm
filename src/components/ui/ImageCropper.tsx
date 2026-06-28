import React, { useState, useRef, useEffect } from 'react';
import { Upload, RotateCw, ZoomIn, ZoomOut, Check, X, ShieldAlert } from 'lucide-react';

interface ImageCropperProps {
  onCropSave: (base64Image: string) => void;
  onClose: () => void;
  initialShape?: 'circle' | 'square';
}

export const ImageCropper: React.FC<ImageCropperProps> = ({ onCropSave, onClose, initialShape = 'circle' }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cropShape, setCropShape] = useState<'circle' | 'square'>(initialShape);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0); // 0, 90, 180, 270
  
  // Translation offsets
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(0);
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setZoom(1);
        setRotation(0);
        setOffsetX(0);
        setOffsetY(0);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag handles for canvas panning
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageSrc) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setOffsetX(dragOffset.x + dx);
    setOffsetY(dragOffset.y + dy);
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  // Touch support for mobile panning
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!imageSrc || e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    setDragOffset({ x: offsetX, y: offsetY });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStart.x;
    const dy = e.touches[0].clientY - dragStart.y;
    setOffsetX(dragOffset.x + dx);
    setOffsetY(dragOffset.y + dy);
  };

  // Re-draw Canvas Preview
  useEffect(() => {
    if (!imageSrc || !canvasRef.current || !imageRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imageRef.current;

    // Canvas size is 300x300
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    // Draw mask boundary preview in modal
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);
    
    // Draw centered image with offsets
    const drawWidth = img.width;
    const drawHeight = img.height;
    
    // Scale image to fit inside 300x300 canvas bounding box initially
    const scaleFactor = Math.min(220 / drawWidth, 220 / drawHeight);
    const w = drawWidth * scaleFactor;
    const h = drawHeight * scaleFactor;

    // Apply translation offset taking rotation into account
    // Panning helper offsets
    ctx.drawImage(img, -w / 2 + offsetX / zoom, -h / 2 + offsetY / zoom, w, h);
    ctx.restore();
  }, [imageSrc, zoom, rotation, offsetX, offsetY, cropShape]);

  // Export cropped base64 result
  const handleSaveCrop = () => {
    if (!imageSrc) return;
    
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = 250;
    exportCanvas.height = 250;
    const ctx = exportCanvas.getContext('2d');
    if (!ctx) return;

    // Mask shape for final crop drawing
    ctx.save();
    if (cropShape === 'circle') {
      ctx.beginPath();
      ctx.arc(125, 125, 125, 0, Math.PI * 2);
      ctx.clip();
    }

    // Draw image inside clip mask
    const img = imageRef.current!;
    ctx.translate(125, 125);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.scale(zoom, zoom);

    const scaleFactor = Math.min(220 / img.width, 220 / img.height);
    const w = img.width * scaleFactor;
    const h = img.height * scaleFactor;

    ctx.drawImage(img, -w / 2 + offsetX / zoom, -h / 2 + offsetY / zoom, w, h);
    ctx.restore();

    const resultBase64 = exportCanvas.toDataURL('image/jpeg', 0.9);
    onCropSave(resultBase64);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-950/40">
          <h3 className="font-semibold text-white text-base">Edit Profile Image</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-850 transition">
            <X size={18} />
          </button>
        </div>

        {/* Workspace Body */}
        <div className="p-6 flex flex-col items-center justify-center flex-1">
          {!imageSrc ? (
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-square max-w-[280px] border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-2xl flex flex-col items-center justify-center text-center p-6 cursor-pointer hover:bg-slate-850/50 transition group"
            >
              <Upload size={32} className="text-slate-500 group-hover:text-indigo-400 mb-3 transition" />
              <p className="text-xs text-slate-300 font-medium">Drag & Drop Image Here</p>
              <p className="text-[10px] text-slate-500 mt-1">Supports PNG, JPG, or WEBP</p>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-4">
              {/* Canvas viewport container */}
              <div 
                className="relative cursor-move aspect-square max-w-[280px] border border-slate-800 bg-slate-950 overflow-hidden rounded-2xl"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUpOrLeave}
              >
                {/* Canvas renderer */}
                <canvas 
                  ref={canvasRef} 
                  width={300} 
                  height={300} 
                  className="w-full h-full object-contain"
                />

                {/* Mask overlay helper visualizer */}
                <div 
                  className={`absolute inset-0 border-2 border-indigo-500/80 pointer-events-none ${
                    cropShape === 'circle' ? 'rounded-full' : 'rounded-none'
                  }`}
                  style={{
                    boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.65)',
                    margin: '35px'
                  }}
                />
                
                {/* Hidden image element loader */}
                <img 
                  ref={imageRef} 
                  src={imageSrc} 
                  alt="Original source" 
                  className="hidden" 
                  onLoad={() => {
                    // Force refresh coordinates when image loads
                    setZoom(1);
                  }}
                />
              </div>

              {/* Crop Controls */}
              <div className="w-full space-y-4">
                {/* Zoom Control */}
                <div className="flex items-center gap-3">
                  <ZoomOut size={16} className="text-slate-400" />
                  <input 
                    type="range" 
                    min={1} 
                    max={3.5} 
                    step={0.05} 
                    value={zoom} 
                    onChange={(e) => setZoom(parseFloat(e.target.value))}
                    className="flex-1 accent-indigo-500 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <ZoomIn size={16} className="text-slate-400" />
                </div>

                {/* Adjustments row */}
                <div className="flex justify-between items-center gap-4">
                  {/* Shape Switcher */}
                  <div className="flex bg-slate-950 rounded-lg p-0.5 border border-slate-800">
                    <button 
                      onClick={() => setCropShape('circle')} 
                      className={`text-xs font-semibold px-3 py-1.5 rounded-md transition ${
                        cropShape === 'circle' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Circle
                    </button>
                    <button 
                      onClick={() => setCropShape('square')} 
                      className={`text-xs font-semibold px-3 py-1.5 rounded-md transition ${
                        cropShape === 'square' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Square
                    </button>
                  </div>

                  {/* Rotation control */}
                  <button 
                    onClick={() => setRotation((prev) => (prev + 90) % 360)}
                    className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 px-3 py-1.5 rounded-lg border border-slate-700 transition"
                  >
                    <RotateCw size={14} /> Rotate
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-slate-950/40 border-t border-slate-800 flex justify-end gap-3">
          <button 
            onClick={onClose} 
            className="text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 px-4 py-2 rounded-lg transition"
          >
            Cancel
          </button>
          <button 
            disabled={!imageSrc}
            onClick={handleSaveCrop} 
            className={`text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition ${
              imageSrc 
                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Check size={14} /> Apply Crop
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CarouselImage, getImages, addImage as apiAddImage, removeImage as apiRemoveImage, updateImageOrder } from '../services/carouselService';

const SortableImage: React.FC<{ image: CarouselImage; onRemove: (id: number) => void }> = ({ image, onRemove }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="border rounded-lg overflow-hidden relative group touch-none bg-gray-200">
      <img src={image.src} alt={image.caption} className="w-full h-48 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex flex-col justify-between p-4">
        <p className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-semibold drop-shadow-md">{image.caption}</p>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove(image.id);
          }}
          className="btn-danger-text bg-white rounded-full p-1 self-end opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-red-500"
          title="Remove Image"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

const CarouselManager: React.FC = () => {
  const [images, setImages] = useState<CarouselImage[]>([]);
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [newCaption, setNewCaption] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [errors, setErrors] = useState<{ file?: string; caption?: string }>({});

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getImages();
        setImages(fetchedImages);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  const validate = () => {
    const newErrors: { file?: string; caption?: string } = {};
    if (!newImageFile) newErrors.file = 'Please select an image file.';
    if (!newCaption.trim()) newErrors.caption = 'Please enter a caption.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddImage = async () => {
    if (!validate()) return;

    setIsUploading(true);
    try {
      // In a real app, you'd upload the file and get a URL.
      // Here, we'll use a local object URL for simulation.
      const newImage = await apiAddImage({
        src: URL.createObjectURL(newImageFile!),
        caption: newCaption,
      });
      setImages(prev => [...prev, newImage]);
      setNewImageFile(null);
      setNewCaption('');
      setErrors({});
    } catch (error) {
      console.error('Failed to add image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async (id: number) => {
    try {
      await apiRemoveImage(id);
      setImages(prev => prev.filter(image => image.id !== id));
    } catch (error) {
      console.error('Failed to remove image:', error);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = images.findIndex(item => item.id === active.id);
      const newIndex = images.findIndex(item => item.id === over.id);
      const reorderedImages = arrayMove(images, oldIndex, newIndex);
      setImages(reorderedImages);

      try {
        await updateImageOrder(reorderedImages.map((img: CarouselImage) => img.id));
      } catch (error) {
        console.error('Failed to update image order:', error);
        // Optionally revert state on failure
        setImages(images);
      }
    }
  };

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      setNewImageFile(file);
      if (errors.file) setErrors(prev => ({...prev, file: undefined}));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4">Manage Carousel Images</h2>
      
      <div className="card mb-4">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 transition-colors ${
            isDragOver ? 'border-primary-color' : 'border-border-color'
          }`}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <p className="text-text-color-secondary">Drag & drop an image here, or click to select</p>
            {newImageFile && <p className="text-accent-color mt-2">Selected: {newImageFile.name}</p>}
          </label>
        </div>
        {errors.file && <p className="error-text mb-2">{errors.file}</p>}

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Image Caption"
              value={newCaption}
              onChange={(e) => {
                setNewCaption(e.target.value);
                if (errors.caption) setErrors(prev => ({...prev, caption: undefined}));
              }}
              className="input-field w-full"
            />
            {errors.caption && <p className="error-text">{errors.caption}</p>}
          </div>
          <button onClick={handleAddImage} className={`btn btn-primary ${isUploading ? 'is-loading' : ''}`} disabled={isUploading}>
            Add Image
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">Loading images...</div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={images.map(i => i.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map(image => (
                <SortableImage key={image.id} image={image} onRemove={handleRemoveImage} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default CarouselManager;

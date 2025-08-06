import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FlashCard, getFlashCards, addFlashCard as apiAddFlashCard, removeFlashCard as apiRemoveFlashCard, updateFlashCard as apiUpdateFlashCard } from '../services/flashCardService';

interface FlashCardUI extends FlashCard {
  id: number;
  frontContent: string;
  backContent: string;
  isActive: boolean;
  scheduledDate: string | null;
  isNew?: boolean;
}

const FlashCardManager: React.FC = () => {
  const [flashCards, setFlashCards] = useState<FlashCardUI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [frontContent, setFrontContent] = useState('');
    const [backContent, setBackContent] = useState('');
    const [newScheduledDate, setNewScheduledDate] = useState<Date | null>(null);
  const [previewingCard, setPreviewingCard] = useState<FlashCard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [errors, setErrors] = useState<{ frontContent?: string; backContent?: string }>({});

  useEffect(() => {
    const loadFlashCards = async () => {
      try {
        const cards = await getFlashCards();
        setFlashCards(cards);
      } catch (error) {
        console.error('Failed to fetch flash cards:', error);
        // Here you might want to set an error state to show a message in the UI
      } finally {
        setIsLoading(false);
      }
    };

    loadFlashCards();
  }, []);

  const handleAddFlashCard = async () => {
    const newErrors: { frontContent?: string; backContent?: string } = {};
    if (!frontContent.replace(/<[^>]*>/g, '').trim()) {
      newErrors.frontContent = 'Front content cannot be empty.';
    }
    if (!backContent.replace(/<[^>]*>/g, '').trim()) {
      newErrors.backContent = 'Back content cannot be empty.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && !isAdding) {
      setIsAdding(true);
      try {
        const newCard = await apiAddFlashCard({ 
          frontContent, 
          backContent, 
          scheduledDate: newScheduledDate ? newScheduledDate.toISOString() : null 
        });
        // Add isNew flag for UI animation
        setFlashCards(prevCards => [{ ...newCard, isNew: true }, ...prevCards]);
        
        // Reset form
        setFrontContent('');
        setBackContent('');
        setNewScheduledDate(null);
        setErrors({});

        // Remove the isNew flag after animation
        setTimeout(() => {
          setFlashCards(currentCards =>
            currentCards.map(card =>
              card.id === newCard.id ? { ...card, isNew: false } : card
            )
          );
        }, 500);
      } catch (error) {
        console.error('Failed to add flash card:', error);
        // Handle error in UI
      } finally {
        setIsAdding(false);
      }
      
    }
  };

    const handleRemoveFlashCard = async (id: number) => {
    try {
      await apiRemoveFlashCard(id);
      setFlashCards(flashCards.filter(card => card.id !== id));
    } catch (error) {
      console.error('Failed to remove flash card:', error);
    }
  };

    const handleToggleActivation = async (id: number) => {
    const cardToUpdate = flashCards.find(card => card.id === id);
    if (!cardToUpdate) return;

    try {
      const updatedCard = await apiUpdateFlashCard(id, { isActive: !cardToUpdate.isActive });
      setFlashCards(flashCards.map(card => (card.id === id ? updatedCard : card)));
    } catch (error) {
      console.error('Failed to update flash card activation:', error);
    }
  };

    const handleUpdateScheduledDate = async (id: number, date: Date | null) => {
    try {
      const updatedCard = await apiUpdateFlashCard(id, { scheduledDate: date ? date.toISOString() : null });
      setFlashCards(flashCards.map(card => (card.id === id ? updatedCard : card)));
    } catch (error) {
      console.error('Failed to update scheduled date:', error);
    }
  };

  const openPreview = (card: FlashCardUI) => {
    setPreviewingCard(card);
    setIsFlipped(false);
  };

  const closePreview = () => {
    setPreviewingCard(null);
  };

  return (
    <>
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Manage Flash Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <ReactQuill
              theme="snow"
              value={frontContent}
              onChange={(value: string) => {
                setFrontContent(value);
                if (errors.frontContent) setErrors(prev => ({...prev, frontContent: undefined}));
              }}
              placeholder="Front Content"
            />
            {errors.frontContent && <p className="error-text">{errors.frontContent}</p>}
          </div>
          <div>
            <ReactQuill
              theme="snow"
              value={backContent}
              onChange={(value: string) => {
                setBackContent(value);
                if (errors.backContent) setErrors(prev => ({...prev, backContent: undefined}));
              }}
              placeholder="Back Content"
            />
            {errors.backContent && <p className="error-text">{errors.backContent}</p>}
          </div>
        </div>
        <div className="mb-4">
          <DatePicker
            selected={newScheduledDate}
            onChange={(date: Date | null) => setNewScheduledDate(date)}
            showTimeSelect
            dateFormat="Pp"
            placeholderText="Schedule activation (optional)"
            className="input-field w-full"
          />
        </div>
        <button onClick={handleAddFlashCard} className={`btn btn-primary mb-4 ${isAdding ? 'is-loading' : ''}`} disabled={isAdding}>
          Add Flash Card
        </button>
        <div className="space-y-4">
          {isLoading ? (
          <div className="loading-spinner">Loading flash cards...</div>
        ) : (
          flashCards.map(card => (
            <div key={card.id} className={`card ${card.isNew ? 'new-item-animation' : ''} mb-4`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Front</h3>
                  <div dangerouslySetInnerHTML={{ __html: card.frontContent }} />
                </div>
                <div>
                  <h3 className="font-semibold">Back</h3>
                  <div dangerouslySetInnerHTML={{ __html: card.backContent }} />
                </div>
              </div>
              <div className="mt-2">
                <p className="text-sm font-semibold mb-1">Schedule</p>
                <DatePicker
                  selected={card.scheduledDate ? new Date(card.scheduledDate) : null}
                  onChange={(date: Date | null) => handleUpdateScheduledDate(card.id, date)}
                  showTimeSelect
                  isClearable
                  dateFormat="Pp"
                  placeholderText="Set a date and time"
                  className="input-field w-full"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button 
                  onClick={() => handleToggleActivation(card.id)}
                  className={`btn text-xs ${card.isActive ? 'bg-green-200 text-green-800 hover:bg-green-300' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                  {card.isActive ? 'Active' : 'Inactive'}
                </button>
                
                <button onClick={() => openPreview(card)} className="link">
                  Preview
                </button>
                <button onClick={() => handleRemoveFlashCard(card.id)} className="btn-danger-text">
                  Remove
                </button>
              </div>
            </div>
          )))
        } 
        </div>
      </div>

      {previewingCard && (
        <div className="flashcard-modal-backdrop" onClick={closePreview}>
          <div className="flashcard-modal-content" onClick={(e) => e.stopPropagation()}>
            <div 
              className={`flashcard-container ${isFlipped ? 'flipped' : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className="flashcard-face flashcard-front">
                <div dangerouslySetInnerHTML={{ __html: previewingCard.frontContent }} />
              </div>
              <div className="flashcard-face flashcard-back">
                <div dangerouslySetInnerHTML={{ __html: previewingCard.backContent }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FlashCardManager;

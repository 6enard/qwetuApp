import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  max = Infinity,
}) => {
  return (
    <div className="flex items-center border rounded-lg overflow-hidden w-32">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className={`flex-1 p-2 flex justify-center items-center ${
          quantity <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        <Minus size={16} />
      </button>
      <span className="flex-1 text-center py-2 font-medium">{quantity}</span>
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className={`flex-1 p-2 flex justify-center items-center ${
          quantity >= max ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'
        }`}
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantitySelector;
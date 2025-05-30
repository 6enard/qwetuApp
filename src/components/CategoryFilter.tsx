import React from 'react';
import { ShoppingBasket, Cookie, Coffee, SprayCan, Pencil } from 'lucide-react';
import { Category } from '../types';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  // Map category icons to Lucide icons
  const getCategoryIcon = (iconName: string, size = 20) => {
    switch (iconName) {
      case 'shopping-basket':
        return <ShoppingBasket size={size} />;
      case 'cookie':
        return <Cookie size={size} />;
      case 'coffee':
        return <Coffee size={size} />;
      case 'spray-can':
        return <SprayCan size={size} />;
      case 'pencil':
        return <Pencil size={size} />;
      default:
        return <ShoppingBasket size={size} />;
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium mb-3">Categories</h2>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
            selectedCategory === null
              ? 'bg-blue-100 text-blue-700 font-medium'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-100 text-blue-700 font-medium'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {getCategoryIcon(category.icon)}
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
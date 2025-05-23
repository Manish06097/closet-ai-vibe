
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const FilterPanel = () => {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [brandSearchQuery, setBrandSearchQuery] = useState("");
  
  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#0000FF" },
    { name: "Green", value: "#00FF00" },
    { name: "Yellow", value: "#FFFF00" },
    { name: "Purple", value: "#800080" },
    { name: "Pink", value: "#FFC0CB" }
  ];

  const categories = [
    { name: "T-Shirts", count: 42 },
    { name: "Dresses", count: 28 },
    { name: "Jeans", count: 36 },
    { name: "Jackets", count: 19 },
    { name: "Shoes", count: 54 }
  ];

  const brands = [
    { name: "Nike", count: 32 },
    { name: "Adidas", count: 28 },
    { name: "Puma", count: 16 },
    { name: "Reebok", count: 14 },
    { name: "New Balance", count: 10 },
  ];

  const handleColorToggle = (colorName: string) => {
    setSelectedColors(prev => 
      prev.includes(colorName) 
        ? prev.filter(c => c !== colorName) 
        : [...prev, colorName]
    );
  };

  const handleCategoryToggle = (categoryName: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryName) 
        ? prev.filter(c => c !== categoryName) 
        : [...prev, categoryName]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([0, 200]);
    setSelectedColors([]);
    setSelectedCategories([]);
    setInStockOnly(false);
    setBrandSearchQuery("");
  };

  const applyFilters = () => {
    // In a real app, you would construct a query string with all the filters
    // For now, we'll just go back to the results page
    navigate(-1);
  };

  const filteredBrands = brandSearchQuery
    ? brands.filter(b => b.name.toLowerCase().includes(brandSearchQuery.toLowerCase()))
    : brands;

  return (
    <div className="fixed inset-0 bg-gradient-dark flex flex-col z-50">
      {/* Header */}
      <div className="h-14 bg-[#131A2B] flex items-center justify-between px-4 shadow-md">
        <h2 className="font-poppins font-semibold text-xl text-white">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate(-1)}
          className="text-white hover:text-neon-aqua"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Price range */}
        <div>
          <h3 className="font-inter font-semibold text-base text-white mb-4">Price</h3>
          <div className="px-2">
            <div className="flex justify-between mb-1">
              <span className="font-inter text-sm text-white/70">${priceRange[0]}</span>
              <span className="font-inter text-sm text-white/70">${priceRange[1]}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="200"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-1 bg-[#2A3245] rounded-lg appearance-none cursor-pointer accent-neon-aqua"
            />
          </div>
        </div>

        {/* Color */}
        <div>
          <h3 className="font-inter font-semibold text-base text-white mb-4">Color</h3>
          <div className="flex flex-wrap gap-3">
            {colors.map((color) => (
              <button
                key={color.name}
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  selectedColors.includes(color.name) 
                    ? 'ring-2 ring-neon-aqua' 
                    : ''
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => handleColorToggle(color.name)}
                aria-label={`Select ${color.name} color`}
              />
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-inter font-semibold text-base text-white">Category</h3>
            {selectedCategories.length > 0 && (
              <button 
                className="text-white/60 text-sm font-inter"
                onClick={() => setSelectedCategories([])}
              >
                Clear (×)
              </button>
            )}
          </div>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox 
                    id={`category-${category.name}`}
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={() => handleCategoryToggle(category.name)}
                    className="mr-2 data-[state=checked]:bg-neon-aqua data-[state=checked]:border-neon-aqua"
                  />
                  <Label 
                    htmlFor={`category-${category.name}`}
                    className="font-inter text-base text-white"
                  >
                    {category.name}
                  </Label>
                </div>
                <span className="text-white/60 text-sm font-inter">{category.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div>
          <h3 className="font-inter font-semibold text-base text-white mb-4">Brand</h3>
          <Input
            type="search"
            placeholder="Search brands..."
            value={brandSearchQuery}
            onChange={(e) => setBrandSearchQuery(e.target.value)}
            className="mb-3 bg-[#1C2436] border-[#2A3245] text-white h-8 rounded-full"
          />
          <div className="space-y-2 mt-2">
            {filteredBrands.map((brand) => (
              <div key={brand.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox 
                    id={`brand-${brand.name}`}
                    className="mr-2 data-[state=checked]:bg-neon-aqua data-[state=checked]:border-neon-aqua"
                  />
                  <Label 
                    htmlFor={`brand-${brand.name}`}
                    className="font-inter text-base text-white"
                  >
                    {brand.name}
                  </Label>
                </div>
                <span className="text-white/60 text-sm font-inter">{brand.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center justify-between">
          <h3 className="font-inter font-semibold text-base text-white">In Stock Only</h3>
          <div className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={inStockOnly}
              onChange={() => setInStockOnly(!inStockOnly)}
              className="sr-only peer"
              id="availability-toggle"
            />
            <div className="w-11 h-6 bg-[#2A3245] rounded-full peer peer-checked:bg-neon-aqua peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
          </div>
        </div>
      </div>

      {/* Footer with buttons */}
      <div className="h-18 bg-[#131A2B] border-t border-[#2A3245] flex items-center justify-between px-4 py-3">
        <Button 
          variant="ghost" 
          onClick={clearAllFilters}
          className="text-white/70 font-inter text-sm hover:text-white"
        >
          Clear All
        </Button>
        <Button 
          onClick={applyFilters}
          className="bg-neon-magenta hover:bg-neon-magenta/90 text-white font-inter font-semibold rounded-full px-6 py-3 h-12 transition-all duration-150 hover:shadow-lg active:scale-95"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;

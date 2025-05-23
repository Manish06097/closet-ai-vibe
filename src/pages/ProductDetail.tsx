
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  
  // Mock product data - in a real app this would be fetched from an API
  const product = {
    id,
    name: "Premium Cotton T-Shirt",
    price: "$39.99",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&auto=format&fit=crop"
    ],
    description: "This premium cotton t-shirt features a relaxed fit and soft-touch fabric. Perfect for everyday wear, it's both comfortable and stylish.",
    sizes: ["XS", "S", "M", "L", "XL"],
    sizeGuide: "Regular fit. Select your usual size.",
    materials: "100% Organic Cotton",
    care: "Machine wash cold, tumble dry low",
    reviews: [
      { user: "Alex", rating: 5, comment: "Fantastic quality and fit!" },
      { user: "Jordan", rating: 4, comment: "Great shirt, slightly big." }
    ]
  };

  // Mock related products for "Complete the look" section
  const relatedProducts = [
    { id: 101, name: "Slim Jeans", price: "$49.99", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&auto=format&fit=crop" },
    { id: 102, name: "Canvas Shoes", price: "$59.99", image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&auto=format&fit=crop" },
    { id: 103, name: "Casual Watch", price: "$79.99", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&auto=format&fit=crop" },
  ];

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-gradient-dark pb-20 mb-16">
      {/* Product images carousel */}
      <div className="relative">
        <Carousel>
          <CarouselContent>
            {product.images.map((image, index) => (
              <CarouselItem key={index} className="w-full">
                <div className="aspect-[16/9] w-full">
                  <img 
                    src={image} 
                    alt={`${product.name} - view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {product.images.map((_, index) => (
              <div 
                key={index} 
                className="w-2 h-2 rounded-full bg-white/50 cursor-pointer"
              ></div>
            ))}
          </div>
        </Carousel>

        {/* Floating buttons */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-11 h-11 rounded-full bg-[#131A2B]/70 text-white border-transparent hover:bg-[#131A2B] hover:border-neon-aqua focus:border-2 focus:border-neon-aqua"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFavorite}
          className="absolute top-4 right-4 w-11 h-11 rounded-full bg-[#131A2B]/70 text-white border-transparent hover:bg-[#131A2B] hover:border-neon-aqua focus:border-2 focus:border-neon-aqua"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-neon-magenta text-neon-magenta' : 'text-white'}`} />
        </Button>
      </div>

      {/* Product info */}
      <div className="p-4">
        <h1 className="font-poppins font-bold text-2xl text-white mb-2">{product.name}</h1>
        <p className="font-poppins font-semibold text-xl text-neon-magenta">{product.price}</p>
        
        {/* CTA buttons */}
        <div className="flex space-x-3 mt-6">
          <Button
            className="flex-1 bg-neon-magenta hover:bg-neon-magenta/90 text-white font-inter font-semibold rounded-full h-12 transition-all duration-150 hover:shadow-lg active:scale-95"
            onClick={() => setShowSizeSelector(true)}
          >
            Buy Now
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-neon-aqua text-neon-aqua hover:bg-neon-aqua/10 font-inter font-semibold rounded-full h-12"
          >
            Add to Wardrobe
          </Button>
        </div>
        
        {/* Details tabs */}
        <div className="mt-6">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full bg-[#131A2B] rounded-xl h-12">
              <TabsTrigger 
                value="description" 
                className="flex-1 font-inter font-semibold data-[state=active]:text-neon-aqua data-[state=active]:border-b-2 data-[state=active]:border-neon-aqua rounded-none"
              >
                Details
              </TabsTrigger>
              <TabsTrigger 
                value="sizing" 
                className="flex-1 font-inter font-semibold data-[state=active]:text-neon-aqua data-[state=active]:border-b-2 data-[state=active]:border-neon-aqua rounded-none"
              >
                Size & Fit
              </TabsTrigger>
              <TabsTrigger 
                value="reviews" 
                className="flex-1 font-inter font-semibold data-[state=active]:text-neon-aqua data-[state=active]:border-b-2 data-[state=active]:border-neon-aqua rounded-none"
              >
                Reviews
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4 text-white font-inter">
              <p>{product.description}</p>
              <div className="mt-4">
                <p className="mb-2"><strong>Material:</strong> {product.materials}</p>
                <p><strong>Care:</strong> {product.care}</p>
              </div>
            </TabsContent>
            <TabsContent value="sizing" className="mt-4 text-white font-inter">
              <p className="mb-3">{product.sizeGuide}</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <div 
                    key={size} 
                    className="flex items-center space-x-2"
                  >
                    <div className={`w-2 h-2 rounded-full ${size === 'M' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                    <span>{size}</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-white/70">
                <span className="inline-block mr-3"><span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-1"></span> In Stock</span>
                <span className="inline-block"><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block mr-1"></span> Low Stock</span>
              </p>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4 text-white font-inter">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {"★★★★☆".split("").map((star, i) => (
                    <span key={i} className="text-neon-orange text-lg">{star}</span>
                  ))}
                </div>
                <span className="ml-2">4.5 (2 reviews)</span>
              </div>
              {product.reviews.map((review, index) => (
                <div key={index} className="border-t border-[#2A3245] py-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">{review.user}</span>
                    <div className="flex">
                      {"★".repeat(review.rating).split("").map((star, i) => (
                        <span key={i} className="text-neon-orange text-sm">{star}</span>
                      ))}
                    </div>
                  </div>
                  <p className="mt-1 text-white/80">{review.comment}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Complete the look */}
        <div className="mt-8">
          <h2 className="font-poppins font-semibold text-xl text-white mb-4">Complete The Look</h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {relatedProducts.map((item) => (
              <div 
                key={item.id} 
                className="flex-shrink-0 w-[100px] cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <div className="w-[100px] h-[140px] bg-[#1C2436] rounded-xl overflow-hidden mb-2">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-inter font-medium text-white text-sm truncate">{item.name}</h3>
                <p className="font-inter text-neon-aqua text-xs">{item.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Sticky shop bar */}
      <div className={`fixed bottom-0 left-0 right-0 bg-[#1C2436] border-t border-[#2A3245] p-4 flex items-center justify-between transition-all duration-300 ${showSizeSelector ? 'h-40' : 'h-[60px]'}`}>
        {showSizeSelector && (
          <div className="absolute top-0 left-0 w-full transform -translate-y-full bg-[#1C2436] border-t border-[#2A3245] p-4">
            <h3 className="font-inter font-medium text-white mb-3">Select Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant="outline"
                  className={`w-12 h-12 rounded-md font-inter ${
                    selectedSize === size 
                      ? 'bg-neon-aqua text-white border-none' 
                      : 'border-[#2A3245] text-white hover:bg-[#2A3245]'
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="font-inter font-semibold text-base text-white">
          {product.price}
        </div>
        <Button
          className="bg-neon-aqua hover:bg-neon-aqua/90 text-white font-inter font-semibold rounded-full h-10 px-6 transition-all duration-150 hover:shadow-lg active:scale-95"
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default ProductDetail;

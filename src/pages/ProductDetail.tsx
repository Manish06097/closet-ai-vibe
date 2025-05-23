import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/types/product"; // Import the Product interface

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [showSizeSelector, setShowSizeSelector] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://127.0.0.1:8000/products/${id}`); // Changed API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Product = await response.json(); // Expect a single Product object
        setProduct(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  // Mock related products for "Complete the look" section (can be replaced with real data later)


  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return <div className="min-h-screen bg-gradient-dark text-white text-center p-8">Loading product details...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gradient-dark text-red-500 text-center p-8">Error: {error}</div>;
  }

  if (!product) {
    return <div className="min-h-screen bg-gradient-dark text-white text-center p-8">Product data incomplete or not found.</div>;
  }

  // Determine price to display
  const displayPrice = product.offers_schema?.[0]?.price || "N/A";

  return (
    <div className="min-h-screen bg-gradient-dark pb-20 mb-16">
      {/* Product images carousel */}
      <div className="relative">
        <Carousel>
          <CarouselContent>
            {product.image_variants?.map((image, index) => ( // Removed .product
              <CarouselItem key={index} className="w-full">
                <div className="aspect-[16/9] w-full">
                  <img 
                    src={image.url || "/placeholder.svg"} 
                    alt={`${product.product_name_display} - view ${index + 1}`} // Removed .product
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {product.image_variants?.map((_, index) => ( // Removed .product
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
        <h1 className="font-poppins font-bold text-2xl text-white mb-2">{product.product_name_display}</h1> {/* Removed .product */}
        <p className="font-poppins font-semibold text-xl text-neon-magenta">Rs. {displayPrice}</p> {/* Used displayPrice */}
        
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
              <p className="mb-4 text-base leading-relaxed">{product.description_schema}</p>
              <div className="space-y-4">
                {product.description_and_fit?.details && 
                  Object.entries(product.description_and_fit.details).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex justify-between items-center py-2">
                        <span className="font-semibold text-white text-lg capitalize">{key.replace(/_/g, ' ')}</span>
                        <span className="text-white/80 text-base">{Array.isArray(value) ? value.join(', ') : value}</span>
                      </div>
                      <Separator className="bg-[#2A3245]" />
                    </div>
                  ))
                }
              </div>
            </TabsContent>
            <TabsContent value="sizing" className="mt-4 text-white font-inter">
              <p className="mb-3">{product.description_and_fit?.general_description}</p> {/* Removed .product */}
              <div className="flex flex-wrap gap-2">
                {product.sizes_display?.map((sizeObj) => ( // Removed .product
                  <div 
                    key={sizeObj.size} 
                    className="flex items-center space-x-2"
                  >
                    <div className={`w-2 h-2 rounded-full ${sizeObj.availability_text === 'Few pieces left' ? 'bg-yellow-500' : sizeObj.availability_text === 'Out of stock' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                    <span>{sizeObj.size} ({sizeObj.availability_text})</span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-white/70">
                <span className="inline-block mr-3"><span className="w-2 h-2 rounded-full bg-green-500 inline-block mr-1"></span> In Stock</span>
                <span className="inline-block"><span className="w-2 h-2 rounded-full bg-yellow-500 inline-block mr-1"></span> Low Stock</span>
                <span className="inline-block ml-3"><span className="w-2 h-2 rounded-full bg-red-500 inline-block mr-1"></span> Out of Stock</span>
              </p>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4 text-white font-inter">
              <div className="flex items-center mb-4">
                <div className="flex">
                  {"★".repeat(Math.floor(product.aggregate_rating_schema?.rating_value || 0)).split("").map((star, i) => ( // Removed .product
                    <span key={i} className="text-neon-orange text-lg">{star}</span>
                  ))}
                  {"☆".repeat(5 - Math.floor(product.aggregate_rating_schema?.rating_value || 0)).split("").map((star, i) => ( // Removed .product
                    <span key={i} className="text-neon-orange text-lg">{star}</span>
                  ))}
                </div>
                <span className="ml-2">{product.aggregate_rating_schema?.rating_value || 0} ({product.aggregate_rating_schema?.review_count || 0} reviews)</span> {/* Removed .product */}
              </div>
              {/* No actual reviews data in the provided JSON, so keeping mock or empty */}
              <p className="mt-1 text-white/80">No reviews available for this product.</p>
            </TabsContent>
          </Tabs>
        </div>
        
       
       
      </div>
      
      {/* Sticky shop bar */}
      <div className={`fixed bottom-0 left-0 right-0 bg-[#1C2436] border-t border-[#2A3245] p-4 flex items-center justify-between transition-all duration-300 ${showSizeSelector ? 'h-40' : 'h-[60px]'}`}>
        {showSizeSelector && (
          <div className="absolute top-0 left-0 w-full transform -translate-y-full bg-[#1C2436] border-t border-[#2A3245] p-4">
            <h3 className="font-inter font-medium text-white mb-3">Select Size</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes_display?.map((sizeObj) => ( // Removed .product
                <Button
                  key={sizeObj.size}
                  variant="outline"
                  className={`w-12 h-12 rounded-md font-inter ${
                    selectedSize === sizeObj.size 
                      ? 'bg-neon-aqua text-white border-none' 
                      : 'border-[#2A3245] text-white hover:bg-[#2A3245]'
                  }`}
                  onClick={() => setSelectedSize(sizeObj.size)}
                >
                  {sizeObj.size}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        <div className="font-inter font-semibold text-base text-white">
          Rs. {displayPrice}
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

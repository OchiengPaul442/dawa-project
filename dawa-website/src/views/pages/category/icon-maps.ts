import {
  Truck,
  Home as LucideHome,
  Phone,
  Tv,
  Sofa,
  Palette,
  Wrench,
  ShoppingBag,
  Activity,
  Briefcase as LucideBriefcase,
  Heart,
} from 'lucide-react';

// Import icons from react-icons/fa with replacements where needed:
import {
  FaTshirt,
  FaMobileAlt,
  FaTabletAlt,
  FaHeadphones,
  FaCar,
  FaMotorcycle,
  FaBus,
  FaBuilding,
  FaDoorOpen,
  FaTree,
  FaSeedling,
  FaWarehouse,
  FaKeyboard,
  FaGamepad,
  FaPlug,
  FaCouch,
  FaUtensils,
  FaLightbulb,
  FaShoePrints,
  FaGem,
  FaClock,
  FaEllipsisH,
  FaBriefcase as FaBriefcaseIcon,
  FaChild,
  FaPuzzlePiece,
  FaDog,
  FaCat,
  FaDove,
  FaFish,
  FaBone,
  FaIndustry,
  FaStore,
  FaFire,
  FaPrint,
  FaBoxOpen,
  FaBolt,
  FaTint,
  FaHammer,
  FaShieldAlt,
  FaCarSide,
  FaCameraRetro,
  FaMusic,
  FaPaintBrush,
  FaBicycle,
  FaCoffee,
} from 'react-icons/fa';

// Import icons from react-icons/md (Material Design)
import {
  MdClearAll,
  MdLiveTv,
  MdLocalShipping,
  MdKitchen,
  MdBuild,
  MdLocationCity,
  MdLocalBar,
  MdWeekend,
  MdMoreHoriz,
  MdHome as MdHomeIcon,
} from 'react-icons/md';

// Import icons from react-icons/gi (Game Icons) with corrected names:
import {
  GiCampingTent,
  GiTroll,
  GiReactor,
  GiChickenLeg,
  GiPlantRoots,
  GiVacuumCleaner,
  GiWrench,
  GiOfficeChair,
  GiBabyBottle,
} from 'react-icons/gi';

//
// Universal fallback icon in case any icon does not load:
//
export const UniversalFallbackIcon = ShoppingBag;

// ----------------------------------------------------------------
// Category Icon Map
// (Each category is given a unique icon.)
//
export const categoryIconMap: Record<string, React.ElementType> = {
  Vehicles: Truck,
  Property: LucideHome,
  'Phones & Tablets': Phone,
  Electronics: Tv,
  'Home, Appliances & Furniture': Sofa,
  'Health & Beauty': Palette,
  Fashion: FaTshirt,
  'Sports, Arts & Outdoors': Activity,
  'Seeking Work CVs': LucideBriefcase,
  Services: Wrench,
  Jobs: MdClearAll, // Using MdClearAll as a replacement for an unavailable icon.
  'Babies & Kids': FaChild,
  Pets: Heart,
  'Agriculture & Food': GiReactor,
  'Commercial Equipment & Tools': FaIndustry,
  'Repair & Construction': GiWrench,
};

// ----------------------------------------------------------------
// Subcategory Icon Map
// (Each subcategory is given its own unique icon.)
//
export const subcategoryIconMap: Record<string, React.ElementType> = {
  // Vehicles
  Cars: FaCar,
  'Motorcycles & Scooters': FaMotorcycle,
  'Trucks & Trailers': MdLocalShipping,
  Buses: FaBus,
  'Vehicle Parts & Accessories': GiWrench,
  'Other Vehicles': FaBuilding,

  // Property
  'Houses & Apartments for Sale': MdHomeIcon,
  'Houses & Apartments for Rent': FaDoorOpen,
  'Land & Plots for Sale': FaTree,
  'Land & Plots for Rent': FaSeedling,
  'Commercial Property for Sale': FaBuilding,
  'Commercial Property for Rent': MdLocationCity,
  'Other Property': FaWarehouse,

  // Phones & Tablets
  'Mobile Phones': FaMobileAlt,
  Tablets: FaTabletAlt,
  'Accessories for Mobile Phones & Tablets': FaHeadphones,
  'Other Phones & Tablets': FaEllipsisH,

  // Electronics
  TVs: MdLiveTv,
  'Audio & Music Equipment': FaPlug,
  'Cameras, Video Cameras & Accessories': FaCameraRetro,
  'Computer Accessories': FaKeyboard,
  Headphones: FaHeadphones,
  'Video Games & Consoles': FaGamepad,
  'Other Electronics': FaPlug,

  // Home, Appliances & Furniture
  Furniture: FaCouch,
  'Home Appliances': MdKitchen,
  'Kitchen & Dining': FaUtensils,
  'Home Accessories': FaLightbulb,
  Garden: FaShoePrints,
  'Other Home, Appliances & Furniture': FaBoxOpen,

  // Health & Beauty
  Makeup: FaGem,
  'Tools & Accessories': GiWrench,
  Fragrance: FaClock,
  'Hair Beauty': FaShoePrints,
  'Skin Care': FaLightbulb,
  'Other Health & Beauty': FaEllipsisH,

  // Fashion
  Clothing: FaTshirt,
  Shoes: FaShoePrints,
  Bags: ShoppingBag,
  Jewelry: FaGem,
  Watches: FaClock,
  'Other Fashion': FaEllipsisH,

  // Sports, Arts & Outdoors
  'Sports Equipment': FaIndustry,
  'Musical Instruments': FaMusic,
  'Arts & Crafts': FaPaintBrush,
  'Camping Gear': GiCampingTent,
  Bicycles: FaBicycle,
  'Other Sports, Arts & Outdoors': MdMoreHoriz,

  // Seeking Work CVs
  "Job Seekers' CVs": FaBriefcaseIcon,
  'Other Seeking Work CVs': MdMoreHoriz,

  // Services
  'Repair Services': MdBuild,
  'Event Planning & Services': MdClearAll,
  'Health & Beauty Services': MdLocalBar,
  'Automotive Services': FaCarSide,
  'Cleaning Services': GiVacuumCleaner,
  'Other Services': MdMoreHoriz,

  // Jobs
  'Job Vacancies': FaBriefcaseIcon,
  'Other Jobs': MdClearAll,

  // Babies & Kids
  "Children's Clothing": FaChild,
  Toys: FaPuzzlePiece,
  'Baby & Child Care': GiBabyBottle,
  'Prams & Strollers': GiTroll, // Using GiTroll as the alternative to GiStroller.
  "Children's Furniture": MdWeekend,
  'Other Babies & Kids': MdMoreHoriz,

  // Pets
  'Dogs & Puppies': FaDog,
  'Cats & Kittens': FaCat,
  Birds: FaDove,
  Fish: FaFish,
  'Pet Accessories': FaBone,
  'Other Pets': FaEllipsisH,

  // Agriculture & Food
  'Farm Machinery & Equipment': GiReactor,
  'Livestock & Poultry': GiChickenLeg,
  'Crops & Seeds': GiPlantRoots,
  'Feeds, Supplements & Seeds': FaUtensils,
  'Meals & Drinks': FaCoffee,
  'Other Agriculture & Food': MdMoreHoriz,

  // Commercial Equipment & Tools
  'Manufacturing Equipment': FaIndustry,
  'Restaurant & Catering Equipment': GiOfficeChair, // Using GiOfficeChair as an alternative.
  'Store Equipment': FaStore,
  'Industrial Ovens': FaFire,
  'Printing Equipment': FaPrint,
  'Other Commercial Equipment & Tools': MdMoreHoriz,

  // Repair & Construction
  'Building Materials': FaBoxOpen,
  'Electrical Equipment': FaBolt,
  'Plumbing & Water Supply': FaTint,
  'Hand Tools': FaHammer,
  'Safety Equipment': FaShieldAlt,
  'Other Repair & Construction': MdMoreHoriz,
};

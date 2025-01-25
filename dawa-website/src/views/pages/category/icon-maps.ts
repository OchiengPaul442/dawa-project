import {
  Truck,
  Home,
  Phone,
  Tv,
  Sofa,
  Palette,
  Wrench,
  ShoppingBag,
  Activity,
  Briefcase,
  Heart,
} from 'lucide-react';

export const DefaultIcon = ShoppingBag;

export const categoryIconMap: Record<string, React.ElementType> = {
  Vehicles: Truck,
  Property: Home,
  'Phones & Tablets': Phone,
  Electronics: Tv,
  'Home, Appliances & Furniture': Sofa,
  'Health & Beauty': Palette,
  Fashion: ShoppingBag,
  'Sports, Arts & Outdoors': Activity,
  'Seeking Work CVs': Briefcase,
  Services: Wrench,
  Jobs: Briefcase,
  'Babies & Kids': ShoppingBag,
  Pets: Heart,
  'Agriculture & Food': Wrench,
  'Commercial Equipment & Tools': Wrench,
  'Repair & Construction': Wrench,
};

export const subcategoryIconMap: Record<string, React.ElementType> = {
  Cars: Truck,
  'Motorcycles & Scooters': Truck,
  'Trucks & Trailers': Truck,
  'Houses & Apartments for Sale': Home,
  'Houses & Apartments for Rent': Home,
  'Land & Plots for Sale': Home,
  'Land & Plots for Rent': Home,
  'Mobile Phones': Phone,
  Tablets: Phone,
  TVs: Tv,
  Furniture: Sofa,
  Makeup: Palette,
  'Repair Services': Wrench,
  'Other Services': Wrench,
};

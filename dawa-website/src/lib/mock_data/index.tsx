import {
  FcAutomotive,
  FcHome,
  FcPhoneAndroid,
  FcElectronics,
  FcCamcorderPro,
  FcBusiness,
  FcSportsMode,
  FcCollaboration,
  FcFinePrint,
  FcShop,
  FcLandscape,
  FcBriefcase,
  FcCustomerSupport,
} from 'react-icons/fc';

export const categories: any[] = [
  {
    name: 'Vehicles',
    count: 30141,
    icon: <FcAutomotive />,
    subcategories: [
      { name: 'Cars', count: 22863, icon: <FcAutomotive /> },
      { name: 'Buses & Microbuses', count: 898, icon: <FcAutomotive /> },
      { name: 'Heavy Equipment', count: 338, icon: <FcBusiness /> },
      { name: 'Motorbikes & Scooters', count: 2539, icon: <FcSportsMode /> },
      { name: 'Trucks & Trailers', count: 1308, icon: <FcAutomotive /> },
      {
        name: 'Vehicle Parts & Accessories',
        count: 2161,
        icon: <FcCollaboration />,
      },
      { name: 'Watercraft & Boats', count: 34, icon: <FcFinePrint /> },
    ],
  },
  {
    name: 'Property',
    count: 29771,
    icon: <FcHome />,
    subcategories: [
      { name: 'Houses & Apartments', count: 15000, icon: <FcHome /> },
      { name: 'Land & Plots', count: 8000, icon: <FcLandscape /> },
      { name: 'Commercial Property', count: 6771, icon: <FcBriefcase /> },
    ],
  },
  {
    name: 'Phones & Tablets',
    count: 27766,
    icon: <FcPhoneAndroid />,
    subcategories: [
      { name: 'Mobile Phones', count: 20000, icon: <FcPhoneAndroid /> },
      { name: 'Tablets', count: 5000, icon: <FcElectronics /> },
      { name: 'Accessories', count: 2766, icon: <FcCollaboration /> },
    ],
  },
  {
    name: 'Electronics',
    count: 40091,
    icon: <FcElectronics />,
    subcategories: [
      { name: 'Computers', count: 15000, icon: <FcElectronics /> },
      { name: 'TV & Audio', count: 12000, icon: <FcCamcorderPro /> },
      { name: 'Cameras', count: 8000, icon: <FcCamcorderPro /> },
      { name: 'Gaming', count: 5091, icon: <FcShop /> },
    ],
  },
  {
    name: 'Home, Appliances & Furniture',
    count: 51021,
    icon: <FcShop />,
    subcategories: [
      { name: 'Furniture', count: 20000, icon: <FcShop /> },
      { name: 'Kitchen Appliances', count: 15000, icon: <FcCollaboration /> },
      { name: 'Home Decor', count: 16021, icon: <FcFinePrint /> },
    ],
  },
  {
    name: 'Health & Beauty',
    count: 6737,
    icon: <FcCustomerSupport />,
    subcategories: [
      { name: 'Skincare', count: 2000, icon: <FcCustomerSupport /> },
      { name: 'Haircare', count: 1500, icon: <FcCustomerSupport /> },
      { name: 'Makeup', count: 2237, icon: <FcCustomerSupport /> },
      { name: 'Medical Equipment', count: 1000, icon: <FcBusiness /> },
    ],
  },
  {
    name: 'Fashion',
    count: 24914,
    icon: <FcShop />,
    subcategories: [
      { name: 'Clothing', count: 15000, icon: <FcShop /> },
      { name: 'Shoes', count: 5000, icon: <FcShop /> },
      { name: 'Accessories', count: 4914, icon: <FcCollaboration /> },
    ],
  },
  {
    name: 'Sports, Arts & Outdoors',
    count: 3355,
    icon: <FcSportsMode />,
    subcategories: [
      { name: 'Sports Equipment', count: 2000, icon: <FcSportsMode /> },
      { name: 'Art Supplies', count: 855, icon: <FcFinePrint /> },
      { name: 'Outdoor Gear', count: 500, icon: <FcLandscape /> },
    ],
  },
];

export const productsData: any[] = [
  {
    id: 1,
    name: 'MacBook Pro M2',
    price: 1499999,
    originalPrice: 1799999,
    rating: 4.8,
    reviews: 245,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    sku: 'MBA2023001',
    location: 'Kampala',
    color: 'Space Gray',
    features: ['M2 Chip', 'Retina Display', '16GB RAM', '512GB SSD'],
    category: 'Laptop',
  },
  {
    id: 2,
    name: 'iPhone 15 Pro Max',
    price: 1299999,
    originalPrice: 1399999,
    rating: 4.9,
    reviews: 189,
    imageUrl: 'https://images.unsplash.com/photo-1696446701796-da61225697cc',
    sku: 'IPH15PM001',
    location: 'Entebbe',
    color: 'Titanium',
    features: ['A17 Pro', 'Triple Camera', '8GB RAM', '512GB Storage'],
    category: 'Smartphone',
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5',
    price: 349999,
    originalPrice: 399999,
    rating: 4.7,
    reviews: 156,
    imageUrl: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b',
    sku: 'SNYWH5001',
    location: 'Gulu',
    color: 'Black',
    features: ['ANC', '30hr Battery', 'LDAC', 'Touch Controls'],
    category: 'Headphones',
  },
  {
    id: 4,
    name: 'Samsung Galaxy S24 Ultra',
    price: 1199999,
    originalPrice: 1299999,
    rating: 4.8,
    reviews: 167,
    imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf',
    sku: 'SAMS24U001',
    location: 'Mbarara',
    color: 'Phantom Black',
    features: ['200MP Camera', 'S Pen', '12GB RAM', '1TB Storage'],
    category: 'Smartphone',
  },
  {
    id: 5,
    name: 'Dell XPS 17',
    price: 1899999,
    originalPrice: 2099999,
    rating: 4.6,
    reviews: 98,
    imageUrl: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45',
    sku: 'DXPS17001',
    location: 'Jinja',
    color: 'Platinum',
    features: ['i9 Processor', 'RTX 4080', '32GB RAM', '2TB SSD'],
    category: 'Laptop',
  },
  {
    id: 6,
    name: 'Canon EOS R5',
    price: 3799999,
    originalPrice: 3999999,
    rating: 4.9,
    reviews: 78,
    imageUrl: 'https://images.unsplash.com/photo-1621520291095-aa6c7137f048',
    sku: 'CNEOS5001',
    location: 'Masaka',
    color: 'Black',
    features: ['45MP Sensor', '8K Video', 'IBIS', 'Dual Card Slots'],
    category: 'Camera',
  },
  {
    id: 7,
    name: 'Apple Watch Ultra 2',
    price: 799999,
    originalPrice: 899999,
    rating: 4.7,
    reviews: 145,
    imageUrl: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9',
    sku: 'AWU2001',
    location: 'Mbale',
    color: 'Titanium',
    features: [
      'Always-On Display',
      'GPS + Cellular',
      '36hr Battery',
      'Action Button',
    ],
    category: 'Smartwatch',
  },
  {
    id: 8,
    name: 'iPad Pro 12.9',
    price: 1099999,
    originalPrice: 1199999,
    rating: 4.8,
    reviews: 167,
    imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0',
    sku: 'IPDP12001',
    location: 'Soroti',
    color: 'Space Gray',
    features: ['M2 Chip', 'Mini-LED', '16GB RAM', '1TB Storage'],
    category: 'Tablet',
  },
  {
    id: 9,
    name: 'Sony A7IV',
    price: 2499999,
    originalPrice: 2699999,
    rating: 4.8,
    reviews: 89,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    sku: 'SNA7IV001',
    location: 'Arua',
    color: 'Black',
    features: ['33MP Sensor', '4K60p', '10fps', 'IBIS'],
    category: 'Camera',
  },
  {
    id: 10,
    name: 'Samsung Galaxy Book 3 Ultra',
    price: 1799999,
    originalPrice: 1999999,
    rating: 4.6,
    reviews: 56,
    imageUrl: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5',
    sku: 'SGB3U001',
    location: 'Hoima',
    color: 'Graphite',
    features: ['i9-13900H', 'RTX 4070', '32GB RAM', '1TB SSD'],
    category: 'Laptop',
  },
  {
    id: 11,
    name: 'Google Pixel 8 Pro',
    price: 999999,
    originalPrice: 1099999,
    rating: 4.7,
    reviews: 134,
    imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97',
    sku: 'GP8P001',
    location: 'Lira',
    color: 'Bay Blue',
    features: ['Tensor G3', '50MP Camera', '12GB RAM', '512GB Storage'],
    category: 'Smartphone',
  },
  {
    id: 12,
    name: 'Bose QuietComfort Ultra',
    price: 429999,
    originalPrice: 479999,
    rating: 4.6,
    reviews: 98,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    sku: 'BQCU001',
    location: 'Kasese',
    color: 'Black',
    features: ['Immersive Audio', 'ANC', '24hr Battery', 'Multipoint'],
    category: 'Headphones',
  },
  {
    id: 13,
    name: 'ASUS ROG Zephyrus G14',
    price: 1599999,
    originalPrice: 1799999,
    rating: 4.5,
    reviews: 78,
    imageUrl: 'https://images.unsplash.com/photo-1595327656903-2f54e37ce09b',
    sku: 'ARGZ14001',
    location: 'Tororo',
    color: 'Moonlight White',
    features: ['Ryzen 9', 'RTX 4070', '32GB RAM', '1TB SSD'],
    category: 'Laptop',
  },
  {
    id: 14,
    name: 'DJI Air 3',
    price: 1099999,
    originalPrice: 1199999,
    rating: 4.8,
    reviews: 45,
    imageUrl: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f',
    sku: 'DJIA3001',
    location: 'Kabale',
    color: 'Gray',
    features: ['4K60fps', '3-Axis Gimbal', '46min Flight', 'O4 Video'],
    category: 'Drone',
  },
  {
    id: 15,
    name: 'Samsung Galaxy Tab S9 Ultra',
    price: 1199999,
    originalPrice: 1299999,
    rating: 4.7,
    reviews: 67,
    imageUrl: 'https://images.unsplash.com/photo-1561154464-82e9adf32764',
    sku: 'SGTS9U001',
    location: 'Moroto',
    color: 'Graphite',
    features: ['14.6" AMOLED', 'S Pen', '16GB RAM', '1TB Storage'],
    category: 'Tablet',
  },
  // Items 16-50
  {
    id: 16,
    name: 'HP Spectre x360',
    price: 1299999,
    originalPrice: 1499999,
    rating: 4.7,
    reviews: 112,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
    sku: 'HPSX360001',
    location: 'Mukono',
    color: 'Nightfall Black',
    features: ['Intel i7', 'Touchscreen', '16GB RAM', '1TB SSD'],
    category: 'Laptop',
  },
  {
    id: 17,
    name: 'OnePlus 11 Pro',
    price: 899999,
    originalPrice: 999999,
    rating: 4.6,
    reviews: 123,
    imageUrl: 'https://images.unsplash.com/photo-1523475496153-3d6ccf3c8ba7',
    sku: 'OP11P001',
    location: 'Fort Portal',
    color: 'Lunar Silver',
    features: [
      'Snapdragon 8 Gen 2',
      '50MP Camera',
      '12GB RAM',
      '256GB Storage',
    ],
    category: 'Smartphone',
  },
  {
    id: 18,
    name: 'Microsoft Surface Headphones 5',
    price: 299999,
    originalPrice: 349999,
    rating: 4.5,
    reviews: 85,
    imageUrl: 'https://images.unsplash.com/photo-1581276879432-15a53e32e8a5',
    sku: 'MSH5001',
    location: 'Arua',
    color: 'Matte Black',
    features: [
      'Active Noise Cancellation',
      '20hr Battery',
      'Bluetooth 5.0',
      'Touch Controls',
    ],
    category: 'Headphones',
  },
  {
    id: 19,
    name: 'Nikon Z9',
    price: 4999999,
    originalPrice: 5299999,
    rating: 4.9,
    reviews: 65,
    imageUrl: 'https://images.unsplash.com/photo-1533048976840-7f31fa91b470',
    sku: 'NZ9001',
    location: 'Lira',
    color: 'Silver',
    features: ['45.7MP', '8K Video', '120fps', 'Weather Sealed'],
    category: 'Camera',
  },
  {
    id: 20,
    name: 'Fitbit Versa 4',
    price: 199999,
    originalPrice: 249999,
    rating: 4.4,
    reviews: 150,
    imageUrl: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
    sku: 'FBV4001',
    location: 'Mbale',
    color: 'Electric Blue',
    features: [
      'Heart Rate Monitor',
      'GPS',
      'Sleep Tracking',
      'Water Resistant',
    ],
    category: 'Smartwatch',
  },
  {
    id: 21,
    name: 'Lenovo Yoga Tab 13',
    price: 799999,
    originalPrice: 899999,
    rating: 4.5,
    reviews: 123,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    sku: 'LYT13001',
    location: 'Soroti',
    color: 'Storm Gray',
    features: ['13" OLED', 'Stylus Support', '8GB RAM', '512GB Storage'],
    category: 'Tablet',
  },
  {
    id: 22,
    name: 'Parrot Anafi',
    price: 699999,
    originalPrice: 749999,
    rating: 4.3,
    reviews: 52,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    sku: 'PA2001',
    location: 'Kasese',
    color: 'White',
    features: ['4K Video', '180° Tilt', 'Compact Design', '3-Axis Gimbal'],
    category: 'Drone',
  },
  {
    id: 23,
    name: 'Apple Mac Mini M2',
    price: 599999,
    originalPrice: 649999,
    rating: 4.6,
    reviews: 89,
    imageUrl: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a',
    sku: 'AMM2001',
    location: 'Gulu',
    color: 'Silver',
    features: ['M2 Chip', '8GB RAM', '256GB SSD', 'Wi-Fi 6'],
    category: 'Desktop',
  },
  {
    id: 24,
    name: 'Samsung Galaxy Watch 6',
    price: 299999,
    originalPrice: 349999,
    rating: 4.5,
    reviews: 112,
    imageUrl: 'https://images.unsplash.com/photo-1549924231-f129b911e442',
    sku: 'SGW6001',
    location: 'Mbarara',
    color: 'Black',
    features: ['ECG', 'Blood Oxygen', 'GPS', 'Water Resistant'],
    category: 'Smartwatch',
  },
  {
    id: 25,
    name: 'Canon PowerShot G7 X Mark III',
    price: 499999,
    originalPrice: 549999,
    rating: 4.7,
    reviews: 76,
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
    sku: 'CPG7X301',
    location: 'Jinja',
    color: 'Red',
    features: ['20.1MP', '4K Video', 'Flip Screen', 'Wi-Fi'],
    category: 'Camera',
  },
  {
    id: 26,
    name: 'Sony Xperia 1 V',
    price: 1199999,
    originalPrice: 1299999,
    rating: 4.6,
    reviews: 95,
    imageUrl: 'https://images.unsplash.com/photo-1614696223929-54b0c8d7b233',
    sku: 'SX1V001',
    location: 'Kampala',
    color: 'Purple',
    features: ['120Hz Display', 'Triple Camera', '12GB RAM', '256GB Storage'],
    category: 'Smartphone',
  },
  {
    id: 27,
    name: 'Bose SoundLink Revolve+',
    price: 199999,
    originalPrice: 229999,
    rating: 4.4,
    reviews: 63,
    imageUrl: 'https://images.unsplash.com/photo-1581276879432-15a53e32e8a5',
    sku: 'BSR+001',
    location: 'Tororo',
    color: 'Silver',
    features: [
      '360° Sound',
      'Water Resistant',
      '12hr Battery',
      'Bluetooth 5.0',
    ],
    category: 'Speaker',
  },
  {
    id: 28,
    name: 'DJI Mavic 3',
    price: 2999999,
    originalPrice: 3299999,
    rating: 4.9,
    reviews: 34,
    imageUrl: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a',
    sku: 'DJIM3001',
    location: 'Kabale',
    color: 'Black',
    features: ['4K Video', 'OcuSync 3.0', 'Fly More Combo', 'Obstacle Sensing'],
    category: 'Drone',
  },
  {
    id: 29,
    name: 'Microsoft Surface Pro 9',
    price: 999999,
    originalPrice: 1099999,
    rating: 4.5,
    reviews: 88,
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
    sku: 'MSP9001',
    location: 'Moroto',
    color: 'Platinum',
    features: ['Intel i5', '13" Touchscreen', '8GB RAM', '512GB SSD'],
    category: 'Tablet',
  },
  {
    id: 30,
    name: 'GoPro HERO11 Black',
    price: 399999,
    originalPrice: 449999,
    rating: 4.8,
    reviews: 102,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    sku: 'GPH11B001',
    location: 'Hoima',
    color: 'Black',
    features: ['5.3K Video', 'HyperSmooth 5.0', 'Waterproof', 'Voice Control'],
    category: 'Camera',
  },
  {
    id: 31,
    name: 'Dell Alienware m15 R7',
    price: 2499999,
    originalPrice: 2799999,
    rating: 4.7,
    reviews: 74,
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-5cb4aaef93e7',
    sku: 'DAWM15R7001',
    location: 'Lira',
    color: 'Dark Side of the Moon',
    features: ['Intel i7', 'RTX 3080', '16GB RAM', '1TB SSD'],
    category: 'Laptop',
  },
  {
    id: 32,
    name: 'Apple AirPods Pro 2',
    price: 349999,
    originalPrice: 399999,
    rating: 4.6,
    reviews: 210,
    imageUrl: 'https://images.unsplash.com/photo-1606813903487-7a3d49c5aef4',
    sku: 'AAP2001',
    location: 'Kasese',
    color: 'White',
    features: [
      'Active Noise Cancellation',
      'Transparency Mode',
      'H1 Chip',
      'Wireless Charging',
    ],
    category: 'Accessories',
  },
  {
    id: 33,
    name: 'Samsung Odyssey G9',
    price: 1499999,
    originalPrice: 1699999,
    rating: 4.8,
    reviews: 58,
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-5cb4aaef93e7',
    sku: 'SOG9001',
    location: 'Mukono',
    color: 'Black',
    features: ['49" QLED', '240Hz', 'Dual QHD', 'HDR1000'],
    category: 'Monitor',
  },
  {
    id: 34,
    name: 'Canon Pixma TR8620',
    price: 249999,
    originalPrice: 299999,
    rating: 4.5,
    reviews: 111,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    sku: 'CPT8620',
    location: 'Arua',
    color: 'White',
    features: [
      'All-in-One',
      'Wireless',
      'Auto Document Feeder',
      'Duplex Printing',
    ],
    category: 'Printer',
  },
  {
    id: 35,
    name: 'LG UltraFine 5K Display',
    price: 1999999,
    originalPrice: 2199999,
    rating: 4.7,
    reviews: 63,
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
    sku: 'LGU5K001',
    location: 'Gulu',
    color: 'Silver',
    features: ['27" Display', 'Thunderbolt 3', 'P3 Color', 'Nano IPS'],
    category: 'Monitor',
  },
  {
    id: 36,
    name: 'Apple iMac 24"',
    price: 1799999,
    originalPrice: 1999999,
    rating: 4.6,
    reviews: 95,
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-5cb4aaef93e7',
    sku: 'AIM24',
    location: 'Soroti',
    color: 'Blue',
    features: ['M1 Chip', '4.5K Retina', '8GB RAM', '256GB SSD'],
    category: 'Desktop',
  },
  {
    id: 37,
    name: 'Lenovo Legion 5 Pro',
    price: 1499999,
    originalPrice: 1699999,
    rating: 4.7,
    reviews: 80,
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-5cb4aaef93e7',
    sku: 'LL5P001',
    location: 'Mbale',
    color: 'Shadow Grey',
    features: ['AMD Ryzen 7', 'RTX 3070', '16GB RAM', '1TB SSD'],
    category: 'Laptop',
  },
  {
    id: 38,
    name: 'Sony SRS-RA5000',
    price: 299999,
    originalPrice: 349999,
    rating: 4.5,
    reviews: 47,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    sku: 'SSRA5000',
    location: 'Mbarara',
    color: 'Black',
    features: ['360° Sound', 'Wireless', 'Bluetooth 5.0', 'Water Resistant'],
    category: 'Speaker',
  },
  {
    id: 39,
    name: 'HP Envy 6055 Printer',
    price: 149999,
    originalPrice: 179999,
    rating: 4.3,
    reviews: 70,
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-5cb4aaef93e7',
    sku: 'HPE6055',
    location: 'Kabale',
    color: 'White',
    features: [
      'All-in-One',
      'Wireless',
      'Auto Document Feeder',
      'Duplex Printing',
    ],
    category: 'Printer',
  },
  {
    id: 40,
    name: 'Apple Mac Studio M1',
    price: 2399999,
    originalPrice: 2599999,
    rating: 4.9,
    reviews: 40,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    sku: 'AMSM1',
    location: 'Lira',
    color: 'Space Gray',
    features: ['M1 Chip', '16GB RAM', '512GB SSD', 'Thunderbolt 4'],
    category: 'Desktop',
  },
  {
    id: 41,
    name: 'Samsung QN90A Neo QLED TV',
    price: 3499999,
    originalPrice: 3999999,
    rating: 4.8,
    reviews: 90,
    imageUrl: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5',
    sku: 'SQN90A',
    location: 'Moroto',
    color: 'Black',
    features: ['4K UHD', 'Quantum HDR', 'Neo Quantum Processor', 'Smart TV'],
    category: 'Television',
  },
  {
    id: 42,
    name: 'Garmin Fenix 7',
    price: 499999,
    originalPrice: 549999,
    rating: 4.7,
    reviews: 88,
    imageUrl: 'https://images.unsplash.com/photo-1523475496153-3d6ccf3c8ba7',
    sku: 'GFEN7',
    location: 'Hoima',
    color: 'Graphite',
    features: [
      'GPS',
      'Heart Rate Monitor',
      'Battery Life',
      'Multi-Sport Modes',
    ],
    category: 'Smartwatch',
  },
  {
    id: 43,
    name: 'Razer BlackWidow V3',
    price: 249999,
    originalPrice: 299999,
    rating: 4.6,
    reviews: 120,
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-5cb4aaef93e7',
    sku: 'RBWV3',
    location: 'Arua',
    color: 'Black',
    features: [
      'Mechanical Switches',
      'RGB Lighting',
      'Programmable Keys',
      'Detachable Wrist Rest',
    ],
    category: 'Accessories',
  },
  {
    id: 44,
    name: 'Canon EOS Rebel T8i',
    price: 649999,
    originalPrice: 699999,
    rating: 4.5,
    reviews: 67,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
    sku: 'CET8I',
    location: 'Jinja',
    color: 'Black',
    features: ['24.1MP', '4K Video', 'Dual Pixel AF', 'Wi-Fi Connectivity'],
    category: 'Camera',
  },
  {
    id: 45,
    name: 'Samsung Portable SSD T7',
    price: 159999,
    originalPrice: 179999,
    rating: 4.8,
    reviews: 140,
    imageUrl: 'https://images.unsplash.com/photo-1587202372775-5cb4aaef93e7',
    sku: 'SPSST7',
    location: 'Mukono',
    color: 'Black',
    features: [
      '1TB Storage',
      'USB 3.2',
      'Compact Design',
      'AES 256-bit Encryption',
    ],
    category: 'Storage',
  },
  {
    id: 46,
    name: 'Nintendo Switch OLED',
    price: 399999,
    originalPrice: 449999,
    rating: 4.9,
    reviews: 150,
    imageUrl: 'https://images.unsplash.com/photo-1593642634367-d91a135587b5',
    sku: 'NSOLED',
    location: 'Kampala',
    color: 'White',
    features: [
      'OLED Display',
      'Enhanced Audio',
      '64GB Storage',
      'Adjustable Stand',
    ],
    category: 'Gaming',
  },
  {
    id: 47,
    name: 'Jabra Elite 85t',
    price: 299999,
    originalPrice: 349999,
    rating: 4.6,
    reviews: 23,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    sku: 'JE85T',
    location: 'Fort Portal',
    color: 'Black',
    features: ['ANC', 'Comfort Fit', '12hr Battery', 'Wireless Charging'],
    category: 'Headphones',
  },
  {
    id: 48,
    name: 'Apple TV 4K',
    price: 499999,
    originalPrice: 549999,
    rating: 4.7,
    reviews: 80,
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
    sku: 'ATV4K',
    location: 'Tororo',
    color: 'Silver',
    features: ['4K HDR', 'Siri Remote', 'Dolby Vision', 'App Store'],
    category: 'Streaming',
  },
  {
    id: 49,
    name: 'Logitech MX Master 3',
    price: 199999,
    originalPrice: 229999,
    rating: 4.8,
    reviews: 175,
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    sku: 'LMM3',
    location: 'Kasese',
    color: 'Graphite',
    features: [
      'Wireless',
      'Ergonomic Design',
      'Programmable Buttons',
      'Fast Scrolling',
    ],
    category: 'Accessories',
  },
  {
    id: 50,
    name: 'Sony PlayStation 5',
    price: 4999999,
    originalPrice: 5499999,
    rating: 4.9,
    reviews: 300,
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
    sku: 'PS5',
    location: 'Moroto',
    color: 'White/Black',
    features: ['Ultra HD', 'Ray Tracing', '3D Audio', 'SSD Storage'],
    category: 'Gaming',
  },
];

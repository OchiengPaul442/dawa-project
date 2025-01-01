export const sampleProducts = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: 1,
      name: 'Professional Gaming Headset with Noise Cancelling Mic - 7.1 Surround Sound',
      description:
        'High-quality gaming headset featuring 7.1 surround sound, memory foam ear cups, and RGB lighting. Perfect for long gaming sessions.',
      price: 'UGX 89,000',
      originalPrice: 'UGX 178,000',
      discount: 50,
      image:
        'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDJ8fFByb2Zlc3Npb25hbCUyMEdhbWluZyUyMEhlYWRzZXQlMjB3aXRoJTIwTm9pc2UlMjBDYW5jZWxsaW5nJTIwTWljJTIwJTIwJTIwNy4xJTIwU3Vycm91bmQlMjBTb3VuZHxlbnwwfHwwfHx8MA%3D%3D',
      rating: 4.8,
      orders: 2536,
      dateAdded: '2024-03-15',
      shipping: 'Free Shipping',
      store: 'GamingGear Pro',
    },
    {
      id: 2,
      name: 'Wireless Bluetooth Speaker with Deep Bass and Long Battery Life',
      description:
        'Portable Bluetooth speaker with impressive sound quality, deep bass, and up to 12 hours of playtime. Ideal for outdoor gatherings.',
      price: 'UGX 45,000',
      originalPrice: 'UGX 90,000',
      discount: 50,
      image:
        'https://images.unsplash.com/photo-1531104985437-603d6490e6d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fFdpcmVsZXNzJTIwQmx1ZXRvb3RoJTIwU3BlYWtlciUyMHdpdGglMjBEZWVwJTIwQmFzcyUyMGFuZCUyMExvbmclMjBCYXR0ZXJ5JTIwTGlmZXxlbnwwfHwwfHx8MA%3D%3D',
      rating: 4.5,
      orders: 1800,
      dateAdded: '2024-04-10',
      shipping: 'UGX 5,000 Shipping',
      store: 'AudioTech Solutions',
    },
    {
      id: 3,
      name: 'Smart Fitness Watch with Heart Rate Monitor and GPS',
      description:
        'Track your fitness goals with this smart watch featuring heart rate monitoring, built-in GPS, and multiple sport modes.',
      price: 'UGX 120,000',
      originalPrice: 'UGX 240,000',
      discount: 50,
      image:
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFNtYXJ0JTIwRml0bmVzcyUyMFdhdGNoJTIwd2l0aCUyMEhlYXJ0JTIwUmF0ZSUyME1vbml0b3IlMjBhbmQlMjBHUFN8ZW58MHx8MHx8fDA%3D',
      rating: 4.7,
      orders: 3200,
      dateAdded: '2024-02-20',
      shipping: 'Free Shipping',
      store: 'FitTech Gadgets',
    },
  ];
};

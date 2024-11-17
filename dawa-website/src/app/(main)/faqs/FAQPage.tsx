'use client';
import React, { useState } from 'react';
import Button from '@/components/common/Button';
import { FaQuestionCircle, FaBoxOpen, FaBook } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { IoMail } from 'react-icons/io5';
import { FaHeadset } from 'react-icons/fa';

const FAQPage = () => {
  // Set the first category as the default selected category
  const categories = [
    {
      id: 'questions',
      icon: FaQuestionCircle,
      title: 'Answer Question',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 'products',
      icon: FaBoxOpen,
      title: 'Product Stock',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      id: 'manuals',
      icon: FaBook,
      title: 'Manual Guide',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
  ];

  // Initialize selectedCategory with the id of the first category
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].id,
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      category: 'questions',
      question: 'How to Shopping at Dawa?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      category: 'questions',
      question: 'How to return product in Dawa?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      category: 'products',
      question: 'How to pay in Dawa?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    },
    {
      category: 'manuals',
      question: 'How to cancel order in Dawa?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel eros eget felis fringilla rutrum.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Filter FAQs based on the selected category
  const filteredFAQs = faqs.filter((faq) => faq.category === selectedCategory);

  return (
    <div>
      {/* Header Section */}
      <div className="bg-primary_1 py-12 lg:py-16 relative lg:h-[268px] lg:mb-24">
        {/* FAQ Title and Description */}
        <div className="text-center text-white max-w-xl mx-auto">
          <h1 className="text-4xl font-bold">FAQ</h1>
          <p className="mt-4 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore e.
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full flex justify-center relative">
          <div className="lg:bg-white lg:absolute lg:-bottom-40 px-6 py-10 lg:rounded-xl lg:shadow-xl max-w-6xl w-full mx-auto">
            <div className="flex md:grid md:grid-cols-5 gap-4 items-center">
              {/* Input Field */}
              <div className="w-full sm:col-span-4">
                <input
                  type="text"
                  placeholder="Haven't found anything? Try find here"
                  className="w-full py-4 pl-6 pr-4 text-sm text-gray-700 border h-12 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary_1"
                />
              </div>

              {/* Button */}
              <div className="sm:col-span-1">
                <Button className="w-full bg-primary_1 h-12 border border-gray-200 lg:border-none text-white px-6 py-4 rounded-lg font-semibold hover:bg-primary_1-dark transition">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 max-w-6xl mx-auto px-4 lg:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`cursor-pointer p-6 rounded-xl flex flex-col items-center text-center hover:shadow-lg transition-shadow ${
              selectedCategory === category.id
                ? 'border-2 border-primary_1'
                : ''
            }`}
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary_1 text-white mb-4">
              <category.icon className="text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {category.title}
            </h3>
            <p className="text-gray-600 mt-2">{category.description}</p>
          </div>
        ))}
      </div>

      {/* Basic Guide Section */}
      <div className="py-16 max-w-6xl mx-auto px-4 lg:px-0 border-y border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Guide</h2>
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <div
              key={index}
              className={`border border-gray-200 rounded-xl overflow-hidden
                      ${activeIndex === index ? 'bg-gray-100' : ''}
                `}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex justify-between items-center p-4 text-left"
              >
                <span className="text-lg font-medium text-gray-900">
                  {item.question}
                </span>
                <span
                  className={`text-xl transform transition-transform duration-200 ${
                    activeIndex === index
                      ? 'bg-primary_2 text-primary_1 rounded-full p-1 rotate-180'
                      : 'bg-primary_1 text-white rounded-full p-1'
                  }`}
                >
                  {activeIndex === index ? (
                    <IoIosArrowDown />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              </button>
              {activeIndex === index && (
                <div className="p-4 text-gray-600 transition-all duration-300">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#565656] lg:rounded-2xl py-6 px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-white max-w-6xl mx-auto mt-40">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Icon */}
          <div className="p-4 rounded-full flex items-center justify-center">
            <FaHeadset className="text-5xl text-gray-400" />
          </div>
          {/* Text */}
          <div>
            <h3 className="text-lg font-bold">Still not found anything?</h3>
            <p className="text-sm text-gray-400">
              Try asking us through email or live chat
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="mt-4 sm:mt-0">
          <Button
            icon={IoMail}
            className="flex items-center h-12 bg-primary_1 text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary_1 transition"
          >
            CONTACT US
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

'use client';

import * as React from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FAQCategory } from '@/lib/mock_data';
import { FAQ_Category, Question } from '@/types/faq';

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(
    FAQCategory[0]?.id || '',
  );
  const [selectedQuestionId, setSelectedQuestionId] = React.useState<
    string | null
  >(null);
  const [isCategorySheetOpen, setIsCategorySheetOpen] = React.useState(false);

  const answerRef = React.useRef<HTMLDivElement>(null);

  const filteredCategories = React.useMemo(() => {
    return FAQCategory.map((category) => ({
      ...category,
      questions: category.questions.filter((question) =>
        question.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }));
  }, [searchQuery]);

  const currentCategory = React.useMemo(() => {
    return (
      filteredCategories.find(
        (category) => category.id === selectedCategoryId,
      ) || filteredCategories[0]
    );
  }, [filteredCategories, selectedCategoryId]);

  const selectedQuestion = React.useMemo(() => {
    return (
      currentCategory?.questions.find(
        (question) => question.id === selectedQuestionId,
      ) || null
    );
  }, [currentCategory, selectedQuestionId]);

  React.useEffect(() => {
    if (currentCategory && currentCategory.questions.length > 0) {
      setSelectedQuestionId(currentCategory.questions[0].id);
    } else {
      setSelectedQuestionId(null);
    }
  }, [currentCategory]);

  const handleQuestionClick = (questionId: string) => {
    setSelectedQuestionId(questionId);
    if (answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative">
      <div className="bg-primary_1">
        <div className="relative mx-auto max-w-7xl px-4 py-12">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white">FAQ</h1>
            <p className="mt-3 text-lg md:text-xl text-white/90">
              Find answers to common questions about our platform.
            </p>
          </div>
          <div className="relative -mb-24">
            <div className="mx-auto max-w-3xl rounded-lg bg-white p-4 shadow-lg">
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Haven't found anything? Try find here"
                    className="pl-10 py-6 text-base md:text-lg border-0 shadow-none focus-visible:ring-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button className="bg-primary_1 px-8 hover:bg-primary_1/80 h-10 hidden md:block">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-24 bg-white" />
      <div className="relative mx-auto max-w-7xl px-4 py-12">
        <Sheet open={isCategorySheetOpen} onOpenChange={setIsCategorySheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="w-full mb-6 h-10 border-orange-200 hover:bg-orange-50 text-primary_1"
            >
              <span className="flex-1 text-left">Browse categories</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 sm:max-w-md">
            <SheetTitle className="text-center text-2xl font-bold mb-4">
              Categories
            </SheetTitle>
            <CategoryNav
              categories={filteredCategories}
              selectedCategoryId={selectedCategoryId}
              onSelectCategory={(categoryId) => {
                setSelectedCategoryId(categoryId);
                setIsCategorySheetOpen(false);
              }}
            />
          </SheetContent>
        </Sheet>
        <main>
          <div className="grid gap-4 lg:grid-cols-[2fr_4fr]">
            <div className="lg:max-w-md">
              <ScrollArea className="h-[300px] lg:h-[calc(100vh-300px)] rounded-lg border border-slate-200">
                <div className="space-y-2 p-4">
                  {currentCategory?.questions.map((question) => (
                    <QuestionButton
                      key={question.id}
                      question={question}
                      isSelected={selectedQuestionId === question.id}
                      onClick={() => handleQuestionClick(question.id)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div
              ref={answerRef}
              className="rounded-lg border border-slate-200 bg-white p-6 lg:p-8"
            >
              <AnimatePresence mode="wait">
                {selectedQuestion ? (
                  <motion.div
                    key={selectedQuestion.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <h2 className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6 text-primary_1">
                      {selectedQuestion.title}
                    </h2>
                    <div className="prose prose-sm lg:prose-base prose-slate max-w-none">
                      {selectedQuestion.content}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex h-[300px] lg:h-[calc(100vh-300px)] items-center justify-center text-slate-500"
                  >
                    Select a question to view the answer
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function CategoryNav({
  categories,
  selectedCategoryId,
  onSelectCategory,
}: {
  categories: FAQ_Category[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}) {
  return (
    <nav className="flex flex-col space-y-2">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={cn(
            'w-full rounded-lg px-4 py-2.5 text-left transition-all duration-200',
            selectedCategoryId === category.id
              ? 'bg-primary_1 text-white'
              : 'text-slate-600 hover:bg-orange-100',
          )}
        >
          {category.title}
        </button>
      ))}
    </nav>
  );
}

function QuestionButton({
  question,
  isSelected,
  onClick,
}: {
  question: Question;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full rounded-lg px-4 py-3 text-left transition-all duration-200',
        isSelected ? 'bg-primary_1 text-white' : 'bg-white hover:bg-orange-100',
      )}
    >
      <h3 className="font-medium">{question.title}</h3>
    </button>
  );
}

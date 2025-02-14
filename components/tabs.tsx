"use client";


interface TabProps {
  categories: string[];
  currentCategory: string;
  setCurrentCategory: (category: string) => void;
}

const Tabs: React.FC<TabProps> = ({ categories, currentCategory, setCurrentCategory }) => {
  return (
    <div className="flex space-x-4 mb-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setCurrentCategory(category)}
          className={`px-4 py-2 rounded ${currentCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
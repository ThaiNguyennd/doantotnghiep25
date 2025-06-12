import React from 'react';
import Hero from '../components/Hero';
import FeaturedBooks from '../components/FeaturedBooks';
import Categories from '../components/Categories';

const HomePage: React.FC = () => {
  return (
    <main className="flex-grow">
      <Hero />
      <FeaturedBooks />
      <Categories />
    </main>
  );
};

export default HomePage; 
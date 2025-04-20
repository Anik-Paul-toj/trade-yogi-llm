'use client';

import {StockRecommendation} from '@/components/stock-recommendation';
import {UserCategoryDisplay} from '@/components/user-category-display';
import {UserInputForm} from '@/components/user-input-form';
import {categorizeUser} from '@/lib/utils/categorize-user';
import {recommendStocks} from '@/lib/utils/recommend-stocks';
import {useState} from 'react';
import {cn} from '@/lib/utils';

export default function Home() {
  const [userCategory, setUserCategory] = useState<string | null>(null);
  const [stockRecommendations, setStockRecommendations] = useState<
    {ticker: string; status: string}[] | null
  >(null);

  const handleFormSubmit = async (userVector: number[]) => {
    const category = categorizeUser(userVector);
    setUserCategory(category);
    const recommendations = await recommendStocks(category);
    setStockRecommendations(recommendations);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-12 bg-muted">
      <section className="mb-8 text-center">
        <h1 className="text-3xl font-semibold text-primary mb-4">
          TrendWise Investor
        </h1>
        <p className="text-muted-foreground text-center">
          Answer the questions below to get personalized stock recommendations.
        </p>
      </section>

      <section className="w-full max-w-lg mb-8 p-6 bg-card rounded-lg shadow-md">
        <UserInputForm onSubmit={handleFormSubmit} />
      </section>

      {userCategory && (
        <section
          className={cn(
            'w-full max-w-lg mb-8 p-6 bg-card rounded-lg shadow-md',
            stockRecommendations ? 'border-accent' : ''
          )}
        >
          <UserCategoryDisplay category={userCategory} />
        </section>
      )}

      {stockRecommendations && (
        <section className="w-full max-w-lg p-6 bg-card rounded-lg shadow-md items-center">
          <StockRecommendation recommendations={stockRecommendations} />
        </section>
      )}

      <section className="mt-8 text-center text-muted-foreground">
        <p>
          Disclaimer: This is not financial advice. Invest at your own risk.
        </p>
      </section>
    </main>
  );
}

import { FunctionComponent, ReactNode } from 'react';

interface HeroProps {
  title: string;
  subTitle?: string;
  addon?: ReactNode;
}

export const Hero: FunctionComponent<HeroProps> = ({ title, subTitle, addon }) => {
  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-lg mb-8">{subTitle}</p>
        {addon && <div className="max-w-md mx-auto">{addon}</div>}
      </div>
    </section>
  );
};

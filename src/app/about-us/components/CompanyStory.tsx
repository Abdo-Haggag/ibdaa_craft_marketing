import React from 'react';

import Icon from '@/components/ui/AppIcon';

interface StoryPoint {
  year: string;
  title: string;
  description: string;
  icon: string;
}

interface CompanyStoryProps {
  storyPoints: StoryPoint[];
  mainStory: string;
  foundingPrinciples: string[];
}

const CompanyStory = ({
  storyPoints,
  mainStory,
  foundingPrinciples,
}: CompanyStoryProps) => {
  return (
    <section className="bg-background py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-amiri">
            قصتنا
          </h2>
          <p className="text-lg text-foreground max-w-3xl mx-auto leading-relaxed">
            {mainStory}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {storyPoints.map((point, index) => (
            <div
              key={index}
              className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-premium"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon
                    name={point.icon as any}
                    size={20}
                    className="text-accent"
                  />
                </div>
                <span className="text-2xl font-bold text-accent font-amiri">
                  {point.year}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 font-amiri">
                {point.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
          <h3 className="text-2xl font-bold text-primary mb-6 font-amiri text-center">
            مبادئنا التأسيسية
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {foundingPrinciples.map((principle, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Icon
                    name="CheckCircleIcon"
                    size={16}
                    className="text-success"
                  />
                </div>
                <p className="text-foreground leading-relaxed">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;
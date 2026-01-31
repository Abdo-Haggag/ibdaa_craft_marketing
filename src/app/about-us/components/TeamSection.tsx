import React from 'react';
import AppImage from '@/components/ui/AppImage';


interface TeamMember {
  name: string;
  position: string;
  image: string;
  alt: string;
  bio: string;
  expertise: string[];
}

interface TeamSectionProps {
  teamMembers: TeamMember[];
}

const TeamSection = ({ teamMembers }: TeamSectionProps) => {
  return (
    <section className="bg-background py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-amiri">
            فريق القيادة
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            خبراء متخصصون في مجال التسويق والشراكات التجارية
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-card rounded-lg shadow-sm border border-border overflow-hidden hover:shadow-md transition-premium"
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                <AppImage
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-1 font-amiri">
                  {member.name}
                </h3>
                <p className="text-accent font-medium mb-3">{member.position}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
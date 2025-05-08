import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase';

const About = () => {
  const [content, setContent] = useState<any>(null);
  const [team, setTeam] = useState<any[]>([]);

  useEffect(() => {
    fetchAboutContent();
  }, []);

  const fetchAboutContent = async () => {
    const [contentResponse, teamResponse] = await Promise.all([
      supabase.from('content').select('*').eq('type', 'about').single(),
      supabase.from('team_members').select('*').order('order', { ascending: true })
    ]);

    setContent(contentResponse.data);
    setTeam(teamResponse.data || []);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="prose prose-lg mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About Mara Ripoi</h1>
        <div className="mb-12" dangerouslySetInnerHTML={{ __html: content?.content || '' }} />
        
        <h2 className="text-3xl font-semibold mb-8">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.id} className="text-center">
              <img 
                src={member.image_url} 
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="font-semibold text-xl">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';

const ContentManager = () => {
  const [pages, setPages] = useState<any[]>([]);
  const [selectedPage, setSelectedPage] = useState<any>(null);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const { data } = await supabase
      .from('content')
      .select('*')
      .order('type');
    setPages(data || []);
  };

  const handleSave = async () => {
    if (selectedPage) {
      await supabase
        .from('content')
        .update({ content })
        .eq('id', selectedPage.id);
    }
    fetchPages();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Content Management</h1>
      
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-1 bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-4">Pages</h2>
          <ul className="space-y-2">
            {pages.map(page => (
              <li 
                key={page.id}
                className={`cursor-pointer p-2 rounded ${
                  selectedPage?.id === page.id ? 'bg-green-100' : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  setSelectedPage(page);
                  setContent(page.content);
                }}
              >
                {page.type}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-3 bg-white rounded-lg shadow p-4">
          {selectedPage ? (
            <>
              <h2 className="font-semibold mb-4">Edit {selectedPage.type}</h2>
              <textarea
                className="w-full h-64 p-2 border rounded mb-4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button
                className="bg-green-600 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </>
          ) : (
            <p>Select a page to edit</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentManager;
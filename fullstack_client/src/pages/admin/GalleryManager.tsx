import { useState, useEffect } from 'react';
import { supabase } from '../../services/supabase';

const GalleryManager = () => {
  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    setImages(data || []);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `gallery/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('gallery')
        .insert({
          url: filePath,
          title: file.name,
          type: 'image'
        });

      if (dbError) throw dbError;

      fetchGalleryImages();
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase
      .from('gallery')
      .delete()
      .eq('id', id);
    fetchGalleryImages();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Gallery Management</h1>
        <label className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer">
          Upload Image
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map(image => (
          <div key={image.id} className="bg-white rounded-lg shadow overflow-hidden">
            <img
              src={`${supabase.storage.from('media').getPublicUrl(image.url).data.publicUrl}`}
              alt={image.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium truncate">{image.title}</h3>
              <button
                className="text-red-600 text-sm mt-2"
                onClick={() => handleDelete(image.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryManager;
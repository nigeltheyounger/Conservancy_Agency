import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

const SinglePostPage = () => {
  const { slug } = useParams();
  const { data: post, isLoading } = useQuery(['post', slug], () => fetchPost(slug));

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={post?.image} alt={post?.title} className="w-full h-96 object-cover" />
        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{post?.title}</h1>
          <div className="text-gray-500 mb-6">
            {new Date(post?.date).toLocaleDateString()}
          </div>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post?.content }} />
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
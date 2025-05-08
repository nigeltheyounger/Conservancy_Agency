import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const wildlifeCategories = [
  {
    id: 'mammals',
    title: 'Mammals',
    description: 'Discover the diverse mammal species that call the Mara home',
    species: [
      {
        name: 'African Lion',
        scientificName: 'Panthera leo',
        image: '/images/lion.jpg',
        description: 'The iconic apex predator of the Mara, known for their social prides and impressive manes.',
        status: 'Vulnerable',
        habitat: 'Savanna grasslands',
        population: '20,000-30,000',
      },
      {
        name: 'African Elephant',
        scientificName: 'Loxodonta africana',
        image: '/images/elephant.jpg',
        description: 'The largest land mammal, these gentle giants are crucial to the ecosystem.',
        status: 'Endangered',
        habitat: 'Savanna and forests',
        population: '415,000',
      },
      {
        name: 'Cheetah',
        scientificName: 'Acinonyx jubatus',
        image: '/images/cheetah.jpg',
        description: 'The fastest land animal, known for their incredible speed and hunting prowess.',
        status: 'Vulnerable',
        habitat: 'Open grasslands',
        population: '7,000',
      },
    ],
  },
  {
    id: 'birds',
    title: 'Birds',
    description: 'Explore the rich avian diversity of the Mara ecosystem',
    species: [
      {
        name: 'African Fish Eagle',
        scientificName: 'Haliaeetus vocifer',
        image: '/images/fish-eagle.jpg',
        description: 'Known for their distinctive call and impressive fishing skills.',
        status: 'Least Concern',
        habitat: 'Near water bodies',
        population: '300,000',
      },
      {
        name: 'Secretary Bird',
        scientificName: 'Sagittarius serpentarius',
        image: '/images/secretary-bird.jpg',
        description: 'A unique bird of prey that hunts on foot, known for its distinctive crest.',
        status: 'Vulnerable',
        habitat: 'Open grasslands',
        population: '6,700-67,000',
      },
    ],
  },
  {
    id: 'reptiles',
    title: 'Reptiles',
    description: 'Learn about the fascinating reptiles of the Mara',
    species: [
      {
        name: 'Nile Crocodile',
        scientificName: 'Crocodylus niloticus',
        image: '/images/crocodile.jpg',
        description: 'A powerful predator that plays a crucial role in the ecosystem.',
        status: 'Least Concern',
        habitat: 'Rivers and lakes',
        population: '50,000-70,000',
      },
    ],
  },
];

const WildlifePage = () => {
  const [activeCategory, setActiveCategory] = useState('mammals');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gradient-to-b from-green-50 to-white">
        <div className="absolute inset-0">
          <img
            src="/images/wildlife-hero.jpg"
            alt="Wildlife in the Mara"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-6">
              Wildlife of the Mara
            </h1>
            <p className="text-xl md:text-2xl text-gray-600">
              Discover the incredible biodiversity of the Mara ecosystem
            </p>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center py-4">
            {wildlifeCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    activeCategory === category.id
                      ? 'bg-green-600 text-white shadow-md'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Species Display */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {wildlifeCategories
          .filter((category) => category.id === activeCategory)
          .map((category) => (
            <div key={category.id}>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-green-800 mb-4">
                  {category.title}
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {category.species.map((species) => (
                  <div
                    key={species.name}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      <div className="relative h-64 md:h-full">
                        <img
                          src={species.image}
                          alt={species.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <span
                            className={`px-3 py-1 text-sm font-medium rounded-full
                              ${
                                species.status === 'Endangered'
                                  ? 'bg-red-100 text-red-800'
                                  : species.status === 'Vulnerable'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-green-100 text-green-800'
                              }`}
                          >
                            {species.status}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {species.name}
                        </h3>
                        <p className="text-sm text-gray-500 italic mb-4">
                          {species.scientificName}
                        </p>
                        <p className="text-gray-600 mb-6">{species.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium w-24">Habitat:</span>
                            <span>{species.habitat}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <span className="font-medium w-24">Population:</span>
                            <span>{species.population}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </section>

      {/* Conservation Message */}
      <section className="bg-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-4">
              Help Protect These Species
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Your support helps us continue our vital conservation work and protect these magnificent creatures
            </p>
            <a
              href="/donate"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
            >
              Support Conservation
              <ChevronRightIcon className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WildlifePage;
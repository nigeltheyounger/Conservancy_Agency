import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="/images/hero-lion.jpg"
            alt="Lion in the Mara"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Preserving the Wild Heart of Africa
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Join us in protecting the Mara ecosystem and its magnificent wildlife
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/visit"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                Plan Your Visit
                <ArrowRightIcon className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/donate"
                className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-green-600"
              >
                Support Our Cause
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Wildlife Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Meet Our Wildlife
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Big Cats',
                image: '/images/lion.jpg',
                description: 'Home to lions, leopards, and cheetahs',
              },
              {
                title: 'Elephants',
                image: '/images/elephant.jpg',
                description: 'Protecting these gentle giants',
              },
              {
                title: 'Bird Life',
                image: '/images/birds.jpg',
                description: 'Over 450 species of birds',
              },
            ].map((item) => (
              <div key={item.title} className="relative group">
                <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conservation Impact Section */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Conservation Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Through dedicated conservation efforts, we're making a difference in protecting the Mara ecosystem
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: '1000+', label: 'Wildlife Protected' },
              { number: '50+', label: 'Conservation Projects' },
              { number: '100+', label: 'Local Communities Supported' },
              { number: '10000+', label: 'Acres Preserved' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Join Us in Protecting Wildlife
          </h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Your support helps us continue our vital conservation work in the Mara ecosystem
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-green-600 bg-white hover:bg-gray-50"
            >
              Make a Donation
            </Link>
            <Link
              to="/visit"
              className="inline-flex items-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-green-700"
            >
              Plan Your Visit
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
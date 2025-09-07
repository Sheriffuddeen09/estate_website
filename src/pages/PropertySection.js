import React, { useEffect, useState } from "react";
import { ArrowRight, MapPin, Star } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PropertySection() {
  const [featured, setFeatured] = useState([]);
  const [forSale, setForSale] = useState([]);
  const [forRent, setForRent] = useState([]);

  // track visible items per section
  const [visibleFeatured, setVisibleFeatured] = useState(4);
  const [visibleForSale, setVisibleForSale] = useState(4);
  const [visibleRent, setVisibleRent] = useState(4);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    fetch(
      "https://68b826bcb715405043274639.mockapi.io/api/properties/PropertyListing"
    )
      .then((res) => res.json())
      .then((data) => {
        setFeatured(data.slice(0, 50));
        setForSale(data.slice().reverse().slice(0, 50));
        setForRent(shuffleArray(data).slice(0, 50));
      });
  }, []);

  function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const getImage = (item) =>
    item.image ?? item.avatar ?? "https://picsum.photos/seed/1YBox4aRmY/3854/1668";

  return (
    <div className="p-6 space-y-12">
      {/* Featured Property */}
      <section data-aos="fade-up">
        <div className="flex justify-between flex-wrap items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-900">Featured Property</h2>
          {visibleFeatured < featured.length && (
            <button
              onClick={() => setVisibleFeatured((prev) => prev + 4)}
              className="flex items-center gap-2 bg-white border border-blue-600 text-blue-900 text-sm px-6 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              See More New Projects <ArrowRight size={18} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 hover:shadow-xl gap-4">
          {Array.from({ length: Math.ceil(visibleFeatured / 4) }).map(
            (_, groupIndex) => {
              const group = featured.slice(groupIndex * 4, groupIndex * 4 + 4);
              if (group.length < 4) return null;

              return (
                <React.Fragment key={groupIndex}>
                  <div
                    className="md:col-span-2 md:row-span-2 relative rounded-2xl overflow-hidden h-[350px]"
                    data-aos="zoom-in"
                  >
                    <img
                      src={getImage(group[0])}
                      alt={group[0].name ?? "property"}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 p-4 bg-gradient-to-t from-black/60 to-transparent w-full">
                      <h3 className="text-white font-semibold">
                        By {group[0].name}
                      </h3>
                      <p className="text-sm text-gray-200">{group[0].ownerName}</p>
                    </div>
                  </div>

                  <div
                    className="md:col-span-1 md:row-span-2 rounded-2xl overflow-hidden h-[350px]"
                    data-aos="fade-up"
                  >
                    <img
                      src={getImage(group[1])}
                      alt={group[1].name ?? "property"}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    className="flex flex-col gap-4 h-[400px]"
                    data-aos="fade-left"
                  >
                    <div className="flex-1 rounded-2xl overflow-hidden">
                      <img
                        src={getImage(group[2])}
                        alt={group[2].name ?? "property"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 rounded-2xl overflow-hidden">
                      <img
                        src={getImage(group[3])}
                        alt={group[3].name ?? "property"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </React.Fragment>
              );
            }
          )}
        </div>
      </section>

      {/* Best Properties For Sale */}
      <section data-aos="fade-up">
        <div className="flex justify-between flex-wrap gap-2 items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">
              Best Properties Available For Sale
            </h2>
            <p className="text-sm text-gray-900 w-[300px] md:w-[500px] mt-2">
              Browse our top-rated properties for sale, featuring premium
              listings tailored to your needs. Find your dream home today!
            </p>
          </div>

          {visibleForSale < forSale.length && (
            <button
              onClick={() => setVisibleForSale((prev) => prev + 4)}
              className="bg-blue-600 text-white text-sm px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              View More Properties
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 hover:shadow-xl gap-4">
          {forSale.slice(0, visibleForSale).map((item, index) => (
            <div
              key={item.id}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="rounded-2xl overflow-hidden shadow-lg bg-gray-100"
            >
              <img
                src={getImage(item)}
                alt={item.name ?? "property"}
                className="h-48 w-full rounded-2xl p-2"
              />
              <div className="p-4">
                <div className="flex flex-row justify-between items-center">
                  <p className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {item.city}, {item.state}
                  </p>
                  <p className="text-sm font-semibold text-gray-500 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    4.5/5
                  </p>
                </div>
                <p className="text-[12px] font-bold text-black mt-2">
                  {item.buildingNumber}, {item.cardinalDirection},{" "}
                  {item.country}, {item.countryCode}, {item.latitude},{" "}
                  {item.longitude}, {item.contactNumber}
                </p>
                <div className="flex flex-row justify-between items-center">
                  <button className="mt-2 w-28 bg-blue-900 text-white py-2 text-sm font-bold rounded-full hover:bg-blue-700 transition">
                    Buy Now
                  </button>
                  <p className="text-lg text-black font-bold mt-2">$450,000</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rental Properties */}
      <section data-aos="fade-up">
        <div className="flex justify-between flex-wrap gap-2 items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">
              Find The Perfect Rental Home
            </h2>
            <p className="text-sm text-gray-900 w-[300px] md:w-[500px] mt-2">
              Browse our top-rated properties for rent, featuring premium
              listings tailored to your needs. Find your dream home today!
            </p>
          </div>
          {visibleRent < forRent.length && (
            <button
              onClick={() => setVisibleRent((prev) => prev + 4)}
              className="bg-blue-600 text-white text-sm px-6 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              View All Rentals
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 hover:shadow-xl gap-4">
          {forRent.slice(0, visibleRent).map((item, index) => (
            <div
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="rounded-2xl overflow-hidden shadow-lg bg-gray-100"
            >
              <img
                src={getImage(item)}
                alt={item.name ?? "property"}
                className="h-48 w-full rounded-2xl p-2"
              />
              <div className="p-4">
                <div className="flex flex-row justify-between items-center">
                  <p className="text-xs font-semibold text-gray-500 flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {item.city}, {item.state}
                  </p>
                  <p className="text-sm font-semibold text-gray-500 flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    4.5/5
                  </p>
                </div>
                <p className="text-[12px] font-bold text-black mt-2">
                  {item.buildingNumber}, {item.cardinalDirection},{" "}
                  {item.country}, {item.countryCode}, {item.latitude},{" "}
                  {item.longitude}, {item.contactNumber}
                </p>
                <div className="flex flex-row justify-between items-center">
                  <button className="mt-2 w-28 bg-blue-900 text-white py-2 text-sm font-bold rounded-full hover:bg-blue-700 transition">
                    Buy Now
                  </button>
                  <p className="text-lg text-black font-bold mt-2">$450,000</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

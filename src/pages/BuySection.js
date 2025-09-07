import { useEffect, useState } from "react";
import { MapPin, Bookmark, ArrowRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function PropertySection() {
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState("all"); // sale | rent | all
  const [visible, setVisible] = useState(2); // 👈 default now 2 items

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    fetch(
      "https://68b826bcb715405043274639.mockapi.io/api/properties/PropertyListing"
    )
      .then((res) => res.json())
      .then((data) => {
        setProperties(data); // full dataset
      });
  }, []);

  const getImage = (item) =>
    item.image ?? item.avatar ?? "https://picsum.photos/seed/1YBox4aRmY/800/600";

  // Filter logic
  const filteredProperties =
    filter === "all"
      ? properties
      : properties.filter((item) =>
          filter === "sale"
            ? item.type?.toLowerCase() === "sale"
            : item.type?.toLowerCase() === "rent"
        );

  return (
    <div className="py-16 px-6 space-y-12">
      {/* Header with filter */}
      <section data-aos="fade-up">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
          <h2 className="text-2xl font-bold text-blue-900">
            Featured Property
          </h2>

          <div className="flex items-center gap-3">
            {/* Filter buttons */}
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border text-black border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>

            {visible < filteredProperties.length && (
              <button
                onClick={() => setVisible((prev) => prev + 2)} 
                 className="flex items-center gap-2 bg-white border border-blue-600 text-blue-900 text-sm px-6 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              See More New Projects <ArrowRight size={18} />
            </button>
            )}
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProperties.slice(0, visible).map((item, index) => (
            <div
              key={item.id}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
              className="rounded-2xl overflow-hidden shadow-lg bg-white"
            >
              <img
                src={getImage(item)}
                alt={item.name ?? "property"}
                className="h-64 w-full object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <p className="text-[15px] font-semibold text-black flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-blue-900" />
                    {item.city}, {item.state}
                  </p>
                  {/* add a bookmark */}
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <Bookmark className="w-5 h-5 text-blue-900 hover:text-blue-600" />
                  </button>
                </div>

                <p className="text-xs text-gray-500">
                  Spacious 3BHK apartment in a prime location with modern
                  amenities.
                </p>

                {/* add a line */}
                <hr className="my-2 border-gray-200" />

                <div className="flex justify-between items-center mt-3">
                  <p className="text-lg text-black font-bold">$450,000</p>
                  <button className="bg-blue-900 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700 transition">
                    Know More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

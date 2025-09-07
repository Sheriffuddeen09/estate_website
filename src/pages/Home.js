
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { MapPin, Search, Home, Building2, Globe, Shield } from "lucide-react";
import PropertySection from "./PropertySection";
import Journey from "./Journey";

export default function HomePage() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    // Fetch API data
    fetch(
      "https://68b826bcb715405043274639.mockapi.io/api/properties/PropertyListing"
    )
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setFiltered(data);
      })
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    const results = properties.filter(
      (item) =>
        item.city.toLowerCase().includes(value) ||
        item.state.toLowerCase().includes(value) ||
        item.country.toLowerCase().includes(value)
    );
    setFiltered(results);
  };

  const content = (
    <div className="font-sans lg:rounded-2xl text-gray-800">
     
      {/* Hero Section */}
      <section
  className="relative h-[400px] w-full max-w-[850px] mx-auto lg:rounded-2xl flex flex-col justify-center items-center text-center text-white"
  style={{
    backgroundImage: "url('image/Rectangle 1.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
        <div className="absolute inset-0 bg-black/50 lg:rounded-2xl "></div>

        <div className="relative z-10 max-w-3xl mx-auto px-6">
        <div className="relative translate-y-10 lg:translate-y-14 md::translate-y-0">
         {/* text rent */}
          <h1 className="text-sm md:text-4xl font-bold mb-4" data-aos="fade-up">
            Find Your Dream Home in One Click!
          </h1>
          <p className="mb-6 text-xs text-gray-400 relative bottom-3" data-aos="fade-up" data-aos-delay="200">
            Discover, Buy, or Rent Verified Properties with Ease.
          </p>
        </div>
         {/* 🔎 API Search Bar */}
<div className="relative mt-10 lg:mt-20 md:mt-56 flex flex-col items-center w-full">
  <div
    className="flex flex-col md:flex-row justify-center items-center gap-4 lg:gap-40 mt-0 lg:mt-40"
    data-aos="fade-up"
    data-aos-delay="400"
  >
    {/* Search Bar */}
    <div className="bg-white rounded-lg shadow-lg p-2 flex items-center gap-2 w-72 md:w-96 mx-auto">
      <MapPin className="w-5 h-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search Location..."
        value={query}
        onChange={handleSearch}
        className="flex-1 outline-none text-gray-600"
      />
      <Search className="w-5 h-5 text-gray-400" />
    </div>

    {/* CTA Button */}
    <button className="bg-blue-700 text-white px-4 py-2 rounded-full hover:bg-blue-800">
      List Your Property
    </button>
  </div>

  {/* 🔎 Search Results */}
  {query && (
    <div className="bg-white mt-4 rounded-lg shadow-lg max-h-60 overflow-y-auto p-3 text-left w-72 md:w-96 mx-auto">
      {filtered.length > 0 ? (
        filtered.map((property) => (
          <div
            key={property.id}
            className="p-2 border-b last:border-none cursor-pointer hover:bg-gray-100"
          >
            <p className="font-semibold text-gray-800">
              {property.city}, {property.state}
            </p>
            <p className="text-sm text-gray-600">{property.country}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No properties found.</p>
      )}
    </div>
  )}

  {/* Filters */}
  <div
    className="mt-10 bg-white py-4 w-full lg:w-full md:w-[700px] px-6 shadow-2xl items-center mx-auto rounded-lg md:rounded-full flex flex-col md:flex-row gap-4 justify-center"
    data-aos="fade-up"
    data-aos-delay="600"
  >
    {/* For Rent */}
    <div className="flex items-center gap-2 border border-gray-500 px-3 py-2 rounded-full w-60 md:w-44">
      <Home className="w-4 h-4 text-gray-500" />
      <select className="flex-1 outline-none text-black text-sm bg-transparent"
      defaultValue="For Rent">
            <option value="For Rent">For Rent</option>
            <option value="House">House</option>
            <option value="Rent">Rent</option>
      </select>
    </div>

    {/* House */}
    <div className="flex items-center gap-2 border border-gray-500 px-3 py-2 rounded-full w-60 md:w-44">
      <Building2 className="w-4 h-4 text-gray-500" />
      <select className="flex-1 text-black outline-none text-sm bg-transparent" 
      defaultValue="House">
        <option>House</option>
        <option>Storey Building</option>
        <option>Bungalow</option>
      </select>
    </div>

    {/* Location */}
    <div className="flex items-center gap-2 border border-gray-500 px-3 py-2 rounded-full w-60 md:w-44">
      <Globe className="w-4 h-4 text-gray-500" />
      <select className="flex-1 text-black outline-none text-sm bg-transparent " defaultValue="Indonesia">
        <option>Indonesia</option>
        <option>India</option>
        <option>City</option>
      </select>
    </div>

    {/* Find Property */}
    <button className="px-6 py-2 bg-blue-700 w-60 md:w-44 text-sm text-white rounded-full hover:bg-blue-800">
      Find Property
    </button>
  </div>
</div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 px-6 md:px-12 text-center">
        <h2 className="text-3xl font-bold text-blue-800 mb-4" data-aos="fade-up">
          What We Do?
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto" data-aos="fade-up">
          Helping you find, buy, and rent the perfect property with ease.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Building2,
              title: "Buy & Sell Properties",
              text: "Find verified homes for sale or list your property with ease.",
            },
            {
              icon: Home,
              title: "Find Rental Homes",
              text: "Browse through thousands of rental options suited to your needs.",
            },
            {
              icon: Search,
              title: "Smart AI Property Search",
              text: "Get instant recommendations based on your budget & location.",
            },
            {
              icon: Shield,
              title: "Safe & Secure Transactions",
              text: "Verified listings & secure deals to ensure a smooth experience.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-2xl shadow-md p-6 hover:shadow-xl hover:scale-105 transition"
              data-aos="fade-up"
              data-aos-delay={i * 200}
            >
              <item.icon className="w-12 h-12 mx-auto bg-gray-300 rounded-full p-1 text-blue-700 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  return (
    <div>
      <Header />
      {content}
      <PropertySection />
      <Journey />
      <Footer />

    </div>
  )
}

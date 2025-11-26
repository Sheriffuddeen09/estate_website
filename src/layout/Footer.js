import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";
export default function Footer() {

    const [email, setEmail] = useState("");
  

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration
      once: true,     // whether animation should happen only once
    });
  }, []);

  return (
    <div className="font-sans bg-blue-900 overflow-hidden">
      {/* Newsletter Section */}
      <section
        className="bg-blue-900 text-center py-12 md:px-6"
        data-aos="zoom-in"
      >
        <h3 className="text-xl md:text-4xl font-bold text-white">
          Get in Touch with Us
        </h3>
        <p className="text-gray-200 md:text-2xl mx-auto text-lg mb-10 mt-8 w-[300px]">
          Subscribe now for exclusive property insights and deals!
        </p>

        <div
  className="mt-20 flex flex-col md:flex-row items-center justify-center gap-4 relative"
  data-aos="fade-up"
  data-aos-delay="300"
>
  {/* Input wrapper */}
  <div className="relative w-f[300px] md:w-[550px]">
    <input
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full border border-gray-300 rounded-full px-4 py-2 pr-28 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    {/* Button placed inside relative container */}
    <button className="absolute top-1/2 right-2 -translate-y-1/2 bg-blue-900 text-white font-semibold px-6 py-2 rounded-full hover:bg-gray-200 hover:text-blue-900 transition">
      Submit
    </button>
  </div>
</div>

      </section>
      {/* Footer */}
      <footer className="text-center py-6 text-white text-sm">
        <div
          className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16"
          
        >
          <p
            className="font-bold text-blue-200 flex items-center gap-3"
            
          >
            <Home /> PropBot
          </p>

          <div
            className="flex gap-6 mt-4 flex-wrap mx-auto text-center items-center justify-center md:mt-0"
          >
            <Link to={'/sale'} className="hover:text-blue-700 whitespace-nowrap">
              For Sale
            </Link>
            <Link to={'/rent'} className="hover:text-blue-700 whitespace-nowrap">
              Rentals
            </Link>
            <Link to={'/project'} className="hover:text-blue-700 whitespace-nowrap">
              New Projects
            </Link>
            <Link to={'/property'} className="hover:text-blue-700 whitespace-nowrap">
              Property News
            </Link>
          </div>

          <p className="mt-4 md:mt-0">
            @2025 PropBot. All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

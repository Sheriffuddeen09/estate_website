import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import imagerec from "../image/Rectangle 20.png";
import imagerecs from "../image/Rectangle 19.png";
import logo1 from "../image/Vector.png";
import logo2 from "../image/codicon_workspace-trusted.png";
import logo3 from "../image/et_map.png";

export default function Journey() {

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="py-10 px-6 md:px-16" data-aos="fade-up">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900">
          Start Your Journey Today!
        </h2>
        <p className="text-gray-600 mt-1">
          Create a profile in seconds and find your ideal home.
        </p>

        {/* Search Inputs */}
        <div
          className="mt-6 flex flex-col md:flex-row gap-4 md:gap-2"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <input
            type="text"
            placeholder="Enter Your Name"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Select User Type</option>
            <option>Buyer</option>
            <option>Seller</option>
            <option>Agent</option>
          </select>
          <input
            type="text"
            placeholder="Enter Your Location"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg hover:bg-blue-800 transition">
            Continue
          </button>
        </div>
      </section>

      {/* Properties Features Section */}
      <section className="pb-6 md:pt-16 md:pb-28 px-6 md:px-16 flex-wrap grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left Images */}
        <div
          className="relative flex flex-wrap justify-center"
          data-aos="fade-right"
        >
          <img
            src={imagerec}
            alt="House 1"
            className="shadow-lg w-72 md:w-96 object-cover"
          />
          <img
            src={imagerecs}
            alt="House 2"
            className="md:absolute md:bottom-[-64px] md:left-44 w-72 md:w-80 shadow-lg border-4 border-white"
          />
        </div>

        {/* Right Text Content */}
        <div data-aos="fade-left">
          <h3 className="text-xl md:text-3xl md:w-[460px] text-center font-bold text-blue-900 mb-6">
            We Provide Latest Properties For Our Valuable Clients
          </h3>

          <div className="space-y-6">
            {/* Feature 1 */}
            <div className="flex items-start gap-4 md:w-[300px]">
              <img src={logo1} alt="Budget Friendly" className="w-10 h-10 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-blue-900">
                  Budget Friendly
                </h4>
                <p className="text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet consectetur. Venenatis sed ac ornare
                  tempus. Lectus quis pretium varius iaculis sed.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              className="flex items-start gap-4 md:w-[300px]"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                src={logo2}
                alt="Trusted By Thousand"
                className="w-10 h-10 mt-1"
              />
              <div>
                <h4 className="text-lg font-semibold text-blue-900">
                  Trusted By Thousand
                </h4>
                <p className="text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet consectetur. Venenatis sed ac ornare
                  tempus. Lectus quis pretium varius iaculis sed.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div
              className="flex items-start gap-4 md:w-[300px]"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <img
                src={logo3}
                alt="Prime Location"
                className="w-10 h-10 mt-1"
              />
              <div>
                <h4 className="text-lg font-semibold text-blue-900">
                  Prime Location
                </h4>
                <p className="text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet consectetur. Venenatis sed ac ornare
                  tempus. Lectus quis pretium varius iaculis sed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
}

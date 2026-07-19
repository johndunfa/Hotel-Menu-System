import { FaPhone, FaEnvelope, FaMapMarker } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Boku Grand Hotel</h3>
            <p className="text-gray-300">Experience the best dining in town</p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <FaPhone className="mr-2" /> +251 911 234 567
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-2" /> info@bokugrand.com
              </p>
              <p className="flex items-center">
                <FaMapMarker className="mr-2" /> Addis Ababa, Ethiopia
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Hours</h3>
            <div className="text-gray-300">
              <p>Mon - Fri: 7:00 AM - 10:00 PM</p>
              <p>Sat - Sun: 8:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
          <p>&copy; 2024 Boku Grand Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
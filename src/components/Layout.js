import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";

const Layout = ({ children }) => {
  return (
    <>
      <SEOHead />
      <main className="bg-gray-900 flex flex-col">
        <Navbar />
        <div className="text-white px-3 min-h-[90vh]">{children}</div>
        <Footer />
      </main>
    </>
  );
};
export default Layout;

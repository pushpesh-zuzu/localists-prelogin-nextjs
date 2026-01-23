import HamburgerIcon from "./HumbergeIcon";

function SellerMobileMenu({
  isSeller,
  sellerLinks = [],
  mobileMenuOpen,
  setMobileMenuOpen,
  pathname,
  handleNavigation,
}) {
  return (
    <>
      {/* Mobile Hamburger Menu Button - Only for Sellers */}
      {isSeller && (
        <button
          className=" block lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
         <HamburgerIcon/>
        </button>
      )}
      {mobileMenuOpen && isSeller && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg absolute right-[10%] w-[150px] top-[70%]">
          <div className="px-4 py-3">
            {sellerLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavigation(link.href)}
                className={`block whitespace-nowrap w-full text-center py-2.5 rounded transition-colors ${
                  pathname === link.href
                    ? "text-[#00aef3] bg-blue-50"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default SellerMobileMenu;

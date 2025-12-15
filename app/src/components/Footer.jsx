import React from "react";
// You can optionally import badge images here
// import NewBadge from "@/assets/new-badge.svg";
import image from "../assets/logo.png";
const footerNavList = [
  {
    label: "Product",
    items: [
      { label: "Overview", href: "#" },
      { label: "Features", href: "#" },
      { label: "Solutions", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "Pricing", href: "#" },
      { label: "Releases", href: "#" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "News", href: "#" },
      { label: "Media kit", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Blog", href: "#" },
      { label: "Newsletter", href: "#" },
      { label: "Events", href: "#" },
      { label: "Help centre", href: "#" },
      { label: "Tutorials", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
  {
    label: "Use cases",
    items: [
      { label: "Startups", href: "#" },
      { label: "Enterprise", href: "#" },
      { label: "Government", href: "#" },
      { label: "SaaS centre", href: "#" },
      { label: "Marketplaces", href: "#" },
      { label: "Ecommerce", href: "#" },
    ],
  },
  {
    label: "Social",
    items: [
      { label: "Twitter", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "Facebook", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "AngelList", href: "#" },
      { label: "Dribbble", href: "#" },
    ],
  },
  {
    label: "Legal",
    items: [
      { label: "Terms", href: "#" },
      { label: "Privacy", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "Licenses", href: "#" },
      { label: "Settings", href: "#" },
      { label: "Contact", href: "#" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="text-white">
  {/* Top green section */}
  <div className="bg-[#006400] py-12 md:py-16 text-white">
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <nav>
        <ul className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {footerNavList.map((category) => (
            <li key={category.label}>
              <h4 className="text-sm font-semibold">{category.label}</h4>
              <ul className="mt-4 flex flex-col gap-2">
                {category.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-white hover:text-gray-300 transition"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </div>

  {/* Bottom orange section */}
  <div className="bg-[#FFA500] w-full py-6 flex flex-col md:flex-row items-center justify-between px-4 md:px-8">
    <div>
    <img src={image} alt="Logo" className="h-10 w-auto " />
    <span className="text-black font-serif text-lg font-bold">Kikapuu kuu</span>
    </div>
    <p className="text-gray-900 text-md mt-4 md:mt-0">
      © 2077 Your Company. All rights reserved.
    </p>
  </div>
</footer>

  );
};

export default Footer;

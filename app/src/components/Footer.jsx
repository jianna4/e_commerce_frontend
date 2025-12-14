import React from "react";
// You can optionally import badge images here
// import NewBadge from "@/assets/new-badge.svg";

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
    <footer className="bg-gray-100 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <nav>
          <ul className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {footerNavList.map((category) => (
              <li key={category.label}>
                <h4 className="text-sm font-semibold text-gray-800">
                  {category.label}
                </h4>
                <ul className="mt-4 flex flex-col gap-2">
                  {category.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="text-gray-600 hover:text-gray-900 transition"
                      >
                        {item.label}
                        {/* Example for badge if you want */}
                        {/* {item.badge && (
                          <img
                            src={item.badge}
                            alt="New"
                            className="inline-block h-4 w-auto ml-1"
                          />
                        )} */}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 flex flex-col justify-between gap-6 border-t border-gray-300 pt-8 md:mt-16 md:flex-row md:items-center">
          {/* Optional logo or brand name */}
          <p className="text-md text-gray-600">
            © 2077 Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useEffect, useState } from "react";
import api from '../apis/axiosInstance'; //for global axios instance with auth headers
import ProductCard from "./category components/product";

const OffersSection = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    api.get("/products/offersby_campaign/")
      .then(res => {
        // keep only active campaigns
        const active = res.data.filter(
          item => item.campaign.is_active
        );
        setCampaigns(active);
      })
      .catch(err => console.error(err));
  }, []);

  if (!campaigns.length) return null;

  return (
    <section className="space-y-12">
      {campaigns.map(campaignBlock => (
        <div key={campaignBlock.campaign.id}>
          {/* Campaign title */}
          <h2 className="text-2xl font-heading font-bold mb-4">
            {campaignBlock.campaign.title}
          </h2>

          {/* Products */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {campaignBlock.offers.map(offer => (
              <ProductCard
                key={offer.id}
                product={{
                  ...offer.product,
                  active_offer: {
                    old_price: offer.old_price,
                    new_price: offer.new_price,
                    percentage_off: offer.percentage_off
                  }
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
};

export default OffersSection;

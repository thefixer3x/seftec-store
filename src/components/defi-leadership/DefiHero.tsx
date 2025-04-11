
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const DefiHero = () => {
  return (
    <section className="bg-gradient-to-r from-seftec-navy to-blue-900 text-white py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <Badge className="mb-4 bg-blue-600 hover:bg-blue-700" variant="default">DeFi Leadership</Badge>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 max-w-3xl">Pioneering Enterprise DeFi Solutions</h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">Seftec is revolutionizing how businesses access and utilize decentralized finance with our secure, compliant, and scalable platform.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg">
              <Link to="/contact">Request Demo</Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-900">
              <Link to="#roadmap">View Roadmap</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DefiHero;

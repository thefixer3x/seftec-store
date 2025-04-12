
import React from 'react';
import { ArrowRight, Shield, Award, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';

const DefiHero = () => {
  return (
    <div className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background gradient with subtle pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-800">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2"/>
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      
      {/* Glowing orbs for visual interest */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full filter blur-[100px] opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500 rounded-full filter blur-[120px] opacity-20"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center justify-center mb-4 px-4 py-1.5 rounded-full bg-indigo-500/20 backdrop-blur-sm border border-indigo-500/30">
            <Award className="h-4 w-4 text-indigo-300 mr-2" />
            <span className="text-sm font-medium text-indigo-200">Industry-Leading DeFi Solutions</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6 leading-tight">
            Enterprise DeFi <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Leadership</span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            Seftec is revolutionizing enterprise finance with secure, compliant DeFi solutions that bridge traditional banking with blockchain innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-4 mt-10">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-500 hover:to-blue-400 text-white border-none w-full sm:w-auto"
              onClick={() => document.getElementById('market-leadership')?.scrollIntoView({behavior: 'smooth'})}
            >
              Explore Our Vision
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-indigo-400/30 text-indigo-200 hover:bg-indigo-950/30 w-full sm:w-auto"
              onClick={() => document.getElementById('technical-solution')?.scrollIntoView({behavior: 'smooth'})}
            >
              Technical Solutions <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-6 flex flex-col items-center text-center">
            <Shield className="h-10 w-10 text-indigo-300 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">ISO 20022 Compliant</h3>
            <p className="text-indigo-100/70 text-sm">Seamless integration with banking systems while maintaining full regulatory compliance</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-6 flex flex-col items-center text-center">
            <Link className="h-10 w-10 text-indigo-300 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Cross-Chain Interoperability</h3>
            <p className="text-indigo-100/70 text-sm">Connect and transact across multiple blockchain networks with enterprise-grade security</p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-indigo-500/20 rounded-xl p-6 flex flex-col items-center text-center">
            <Award className="h-10 w-10 text-indigo-300 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Industry Recognition</h3>
            <p className="text-indigo-100/70 text-sm">Named Leader in the Forrester Wave™ for Enterprise Blockchain Solutions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefiHero;

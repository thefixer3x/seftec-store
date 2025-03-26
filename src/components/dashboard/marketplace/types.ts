
export interface Order {
  id: string;
  product: string;
  value: string;
  distance: string;
  timePosted: string;
  status?: 'pending' | 'complete' | 'cancelled';
}

export interface MarketplaceTabProps {
  initialTab?: 'received' | 'bids' | 'offers';
}

// Mock data with improved structure
export const orderData: Order[] = [
  { 
    id: "INV - 17", 
    product: "Electronics", 
    value: "$325", 
    distance: "3.2 km", 
    timePosted: "19.4 days",
    status: 'pending'
  },
  { 
    id: "INV - 13", 
    product: "Office Supplies", 
    value: "$125", 
    distance: "5.7 km", 
    timePosted: "43.9 days",
    status: 'complete'
  },
  { 
    id: "INV - 12", 
    product: "Furniture", 
    value: "$850", 
    distance: "1.5 km", 
    timePosted: "43.9 days",
    status: 'pending'
  },
  { 
    id: "INV - 11", 
    product: "American...", 
    value: "$525", 
    distance: "8.3 km", 
    timePosted: "50.5 days",
    status: 'cancelled'
  },
  { 
    id: "INV - 5", 
    product: "ACE ROOT...", 
    value: "$50", 
    distance: "4.2 km", 
    timePosted: "51.6 days",
    status: 'pending'
  },
];

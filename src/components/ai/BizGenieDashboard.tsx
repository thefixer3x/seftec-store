
import React from 'react';
import BizGenieDashboardContainer from './dashboard/BizGenieDashboardContainer';

interface BizGenieDashboardProps {
  userId?: string;
}

const BizGenieDashboard: React.FC<BizGenieDashboardProps> = ({ userId }) => {
  return <BizGenieDashboardContainer userId={userId} />;
};

export default BizGenieDashboard;


import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldAlert, Eye, CreditCard, Users } from 'lucide-react';

const DevLayout: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // Check if user is authenticated
  React.useEffect(() => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to access this page.",
        variant: "destructive"
      });
      navigate("/login", { state: { from: location.pathname } });
    }
  }, [user, navigate, location.pathname, toast]);

  // Get current tab based on path
  const getCurrentTab = () => {
    if (currentPath === '/dev/routes') return 'routes';
    if (currentPath === '/dev/auth-test') return 'auth-test';
    if (currentPath === '/dev/social-login') return 'social-login';
    if (currentPath === '/dev/edge-function') return 'edge-function';
    return 'routes';
  };

  // Handle tab change
  const handleTabChange = (value: string) => {
    switch (value) {
      case 'routes':
        navigate('/dev/routes');
        break;
      case 'auth-test':
        navigate('/dev/auth-test');
        break;
      case 'social-login':
        navigate('/dev/social-login');
        break;
      case 'edge-function':
        navigate('/dev/edge-function');
        break;
      default:
        navigate('/dev/routes');
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-seftec-navy dark:text-white">
            SefTec Dev Portal
          </h1>
          <p className="text-muted-foreground">
            Development and testing tools for administrators
          </p>
        </div>
        <Link 
          to="/profile/dashboard" 
          className="mt-4 md:mt-0 px-4 py-2 text-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-md transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>

      <div className="border-b mb-6">
        <Tabs value={getCurrentTab()} onValueChange={handleTabChange}>
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="routes" className="gap-2">
              <Eye className="h-4 w-4" />
              <span>Application Routes</span>
            </TabsTrigger>
            <TabsTrigger value="auth-test" className="gap-2">
              <ShieldAlert className="h-4 w-4" />
              <span>Auth Test</span>
            </TabsTrigger>
            <TabsTrigger value="social-login" className="gap-2">
              <Users className="h-4 w-4" />
              <span>Social Login Test</span>
            </TabsTrigger>
            <TabsTrigger value="edge-function" className="gap-2">
              <CreditCard className="h-4 w-4" />
              <span>Edge Function Test</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="min-h-[500px]">
        <Outlet />
      </div>
    </div>
  );
};

export default DevLayout;

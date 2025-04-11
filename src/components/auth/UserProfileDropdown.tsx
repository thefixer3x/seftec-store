
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User, Settings, LogOut, ShoppingCart, LayoutDashboard, CreditCard, Store, Users, ShoppingBag, ListOrdered } from 'lucide-react';
import { AuthModal } from './AuthModal';
import { Link } from 'react-router-dom';

export function UserProfileDropdown() {
  const { user, profile, signOut } = useAuth();
  
  const getInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'U';
  };

  if (!user) {
    return (
      <AuthModal>
        <Button variant="outline" size="sm">
          Sign In
        </Button>
      </AuthModal>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 border border-slate-200">
            <AvatarImage src="" alt="Profile" />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile?.first_name && profile?.last_name 
                ? `${profile.first_name} ${profile.last_name}` 
                : user.email}
            </p>
            {profile?.company_name && (
              <p className="text-xs leading-none text-muted-foreground">
                {profile.company_name}
              </p>
            )}
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile/dashboard" className="cursor-pointer flex items-center w-full">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        
        {/* Shop-related menu items */}
        <DropdownMenuItem asChild>
          <Link to="/shop" className="cursor-pointer flex items-center w-full">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>Shop</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/cart" className="cursor-pointer flex items-center w-full">
            <ShoppingCart className="mr-2 h-4 w-4" />
            <span>My Cart</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/orders" className="cursor-pointer flex items-center w-full">
            <ListOrdered className="mr-2 h-4 w-4" />
            <span>My Orders</span>
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link to="/profile/wallet" className="cursor-pointer flex items-center w-full">
            <CreditCard className="mr-2 h-4 w-4" />
            <span>My Wallet</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile/stores" className="cursor-pointer flex items-center w-full">
            <Store className="mr-2 h-4 w-4" />
            <span>My Stores</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile/account" className="cursor-pointer flex items-center w-full">
            <User className="mr-2 h-4 w-4" />
            <span>Account Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile/customers" className="cursor-pointer flex items-center w-full">
            <Users className="mr-2 h-4 w-4" />
            <span>Customers</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/profile/settings" className="cursor-pointer flex items-center w-full">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

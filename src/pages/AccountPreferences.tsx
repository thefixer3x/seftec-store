
import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Helmet } from "react-helmet";
import { Separator } from "@/components/ui/separator";
import AccountLayout from "@/components/account/AccountLayout";
import UserPreferencesSettings from "@/components/account/UserPreferencesSettings";

const AccountPreferences = () => {
  return (
    <>
      <Helmet>
        <title>Personalization Settings - SefTec</title>
      </Helmet>
      
      <AccountLayout>
        <div className="space-y-6">
          <div>
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Link to="/account" className="hover:underline">Account</Link>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span>Personalization</span>
            </div>
          
            <h2 className="text-2xl font-bold">Personalization Settings</h2>
            <p className="text-muted-foreground">
              Customize how SefTec tailors services to your specific needs and preferences.
            </p>
          </div>
          
          <Separator />
          
          <UserPreferencesSettings />
        </div>
      </AccountLayout>
    </>
  );
};

export default AccountPreferences;

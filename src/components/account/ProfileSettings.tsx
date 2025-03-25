
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const ProfileSettings = () => {
  const { profile } = useAuth();
  
  return (
    <Card className="border border-seftec-navy/10 dark:border-white/10 bg-white/70 dark:bg-white/5 shadow-sm">
      <CardContent className="p-8">
        <div className="border-l-4 border-seftec-gold dark:border-seftec-teal pl-4 mb-6 py-2 bg-seftec-slate/50 dark:bg-seftec-darkNavy/50 rounded-r">
          <h2 className="text-2xl font-bold text-seftec-navy dark:text-white">Personal Profile</h2>
          <p className="text-seftec-navy/70 dark:text-white/70 mt-1">Manage your personal information</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2 text-seftec-navy/80 dark:text-white/80">
                <User className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
                First Name
              </Label>
              <Input defaultValue={profile?.first_name || "John"} className="mt-1 border-seftec-navy/10 dark:border-white/10 bg-white dark:bg-seftec-darkNavy/30" />
            </div>
            <div>
              <Label className="flex items-center gap-2 text-seftec-navy/80 dark:text-white/80">
                <Mail className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
                Email Address
              </Label>
              <Input defaultValue="john.doe@example.com" className="mt-1 border-seftec-navy/10 dark:border-white/10 bg-white dark:bg-seftec-darkNavy/30" />
            </div>
            <div>
              <Label className="flex items-center gap-2 text-seftec-navy/80 dark:text-white/80">
                <Phone className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
                Phone Number
              </Label>
              <Input defaultValue="+1234567890" className="mt-1 border-seftec-navy/10 dark:border-white/10 bg-white dark:bg-seftec-darkNavy/30" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="flex items-center gap-2 text-seftec-navy/80 dark:text-white/80">
                <User className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
                Last Name
              </Label>
              <Input defaultValue={profile?.last_name || "Doe"} className="mt-1 border-seftec-navy/10 dark:border-white/10 bg-white dark:bg-seftec-darkNavy/30" />
            </div>
            <div>
              <Label className="flex items-center gap-2 text-seftec-navy/80 dark:text-white/80">
                <MapPin className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
                Address
              </Label>
              <Input defaultValue="123 Main St, City" className="mt-1 border-seftec-navy/10 dark:border-white/10 bg-white dark:bg-seftec-darkNavy/30" />
            </div>
            <div>
              <Label className="flex items-center gap-2 text-seftec-navy/80 dark:text-white/80">
                <Globe className="h-4 w-4 text-seftec-gold dark:text-seftec-teal" />
                Country
              </Label>
              <Input defaultValue="United States" className="mt-1 border-seftec-navy/10 dark:border-white/10 bg-white dark:bg-seftec-darkNavy/30" />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-8 pt-4 border-t border-seftec-navy/10 dark:border-white/10">
          <Button className="bg-seftec-gold hover:bg-seftec-gold/90 dark:bg-seftec-teal dark:hover:bg-seftec-teal/90 text-white">
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;

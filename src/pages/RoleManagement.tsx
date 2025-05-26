
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface User {
  id: string;
  email: string;
  created_at: string;
  first_name?: string;
  last_name?: string;
}

interface UserRole {
  id: string;
  user_id: string;
  role: 'admin' | 'moderator' | 'user';
  created_at: string;
  updated_at: string;
}

const RoleManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);
  const { hasRole } = useAuth();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchData = async () => {
      if (!hasRole('admin')) {
        toast({
          title: "Access Denied",
          description: "You do not have permission to manage roles.",
          variant: "destructive"
        });
        return;
      }
      
      try {
        // Fetch users from auth.users via RPC or use profiles table
        // Since we can't directly access auth.users, we'll get users who have profiles
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, first_name, last_name, created_at');
          
        if (profilesError) throw profilesError;
        
        // Get user emails from auth metadata (this is a workaround since we can't directly query auth.users)
        const usersWithEmails = await Promise.all(
          (profilesData || []).map(async (profile) => {
            // For demo purposes, we'll use a placeholder email
            // In a real app, you'd need to store email in profiles or use a different approach
            return {
              id: profile.id,
              email: `user-${profile.id.slice(0, 8)}@example.com`, // Placeholder
              created_at: profile.created_at || '',
              first_name: profile.first_name,
              last_name: profile.last_name
            };
          })
        );
        
        // Fetch roles
        const { data: rolesData, error: rolesError } = await supabase
          .from('user_roles')
          .select('*');
          
        if (rolesError) throw rolesError;
        
        setUsers(usersWithEmails);
        setUserRoles(rolesData || []);
      } catch (error: any) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: error.message || "Failed to load users and roles",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [hasRole, toast]);
  
  const getUserRoles = (userId: string) => {
    return userRoles
      .filter(ur => ur.user_id === userId)
      .map(ur => ur.role);
  };
  
  const handleAddRole = async (userId: string, role: 'admin' | 'moderator' | 'user') => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: role });
        
      if (error) throw error;
      
      // Refetch roles
      const { data, error: fetchError } = await supabase
        .from('user_roles')
        .select('*');
        
      if (fetchError) throw fetchError;
      
      setUserRoles(data || []);
      
      toast({
        title: "Role Added",
        description: `Role ${role} added successfully.`
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add role",
        variant: "destructive"
      });
    }
  };
  
  const handleRemoveRole = async (roleId: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('id', roleId);
        
      if (error) throw error;
      
      // Update local state
      setUserRoles(userRoles.filter(r => r.id !== roleId));
      
      toast({
        title: "Role Removed",
        description: "Role removed successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove role",
        variant: "destructive"
      });
    }
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-10">
          <p>Loading...</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Role Management</CardTitle>
            <CardDescription>Manage user roles and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">
                          {user.first_name && user.last_name ? 
                            `${user.first_name} ${user.last_name}` : 
                            user.email
                          }
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getUserRoles(user.id).map(role => (
                        <span key={role} className="inline-flex items-center px-2.5 py-0.5 mr-2 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {role}
                        </span>
                      ))}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddRole(user.id, 'admin')}
                        >
                          Add Admin
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddRole(user.id, 'moderator')}
                        >
                          Add Moderator
                        </Button>
                        {userRoles
                          .filter(ur => ur.user_id === user.id)
                          .map(userRole => (
                            <Button
                              key={userRole.id}
                              variant="outline"
                              size="sm"
                              onClick={() => handleRemoveRole(userRole.id)}
                            >
                              Remove {userRole.role}
                            </Button>
                          ))
                        }
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default RoleManagement;

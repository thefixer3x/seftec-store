
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Users, UserPlus } from 'lucide-react';

// Define a type for user with role
interface UserWithRole {
  id: string;
  email: string;
  full_name?: string;
  role: string;
  created_at: string;
}

const RoleManagement = () => {
  const { hasRole } = useAuth();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [newRole, setNewRole] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  // Check if current user is admin
  useEffect(() => {
    setIsAdmin(hasRole('admin'));
  }, [hasRole]);

  // Fetch users if the current user is an admin
  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Get users with their roles
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .select(`
          id,
          first_name,
          last_name,
          created_at
        `);

      if (userError) throw userError;

      // Get auth users to get emails
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      if (authError) throw authError;

      // Get roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Combine data
      const combinedUsers = userData.map(user => {
        const authUser = authData.users.find(au => au.id === user.id);
        const roleData = rolesData.find(r => r.user_id === user.id);
        
        return {
          id: user.id,
          email: authUser?.email || 'Unknown email',
          full_name: `${user.first_name || ''} ${user.last_name || ''}`.trim(),
          role: roleData?.role || 'user',
          created_at: user.created_at
        };
      });

      setUsers(combinedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        variant: "destructive",
        title: "Failed to load users",
        description: "There was an error fetching users and roles.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    const user = users.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      setNewRole(newRole);
    }
  };

  const updateUserRole = async () => {
    if (!selectedUser || !newRole) return;
    
    try {
      // First check if the role exists for this user
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', selectedUser.id)
        .eq('role', newRole)
        .single();
      
      if (existingRole) {
        toast({
          variant: "default",
          title: "Role unchanged",
          description: `User already has the ${newRole} role.`,
        });
        return;
      }
      
      // Remove existing roles
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', selectedUser.id);
      
      if (deleteError) throw deleteError;
      
      // Insert new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({ user_id: selectedUser.id, role: newRole });
      
      if (insertError) throw insertError;
      
      // Update local state
      setUsers(users.map(user => 
        user.id === selectedUser.id ? { ...user, role: newRole } : user
      ));
      
      toast({
        title: "Role updated",
        description: `User role has been updated to ${newRole}.`,
      });
      
      setSelectedUser(null);
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        variant: "destructive",
        title: "Failed to update role",
        description: "There was an error updating the user role.",
      });
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'default';
      case 'moderator':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  if (!isAdmin) {
    return (
      <MainLayout>
        <div className="container mx-auto py-10 px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Access Restricted
              </CardTitle>
              <CardDescription>
                You need administrator privileges to access this page
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-10">
              <Shield className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-medium mb-2">Administrator Access Required</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                This area is restricted to administrators only. Please contact your system administrator if you need access.
              </p>
              <Button asChild>
                <a href="/">Return to Homepage</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Role Management</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Manage user roles and permissions
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button onClick={fetchUsers} variant="outline" disabled={loading}>
                {loading ? "Loading..." : "Refresh Users"}
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3 space-y-0">
              <div>
                <CardTitle className="text-xl flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  User Roles
                </CardTitle>
                <CardDescription>
                  Assign and manage user roles to control access permissions
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="py-20 text-center">
                  <div className="inline-block animate-spin rounded-full border-2 border-current border-t-transparent h-8 w-8 text-primary"></div>
                  <p className="mt-2 text-sm text-gray-500">Loading users and roles...</p>
                </div>
              ) : users.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Current Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">
                          {user.full_name || 'Unknown user'}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={getRoleBadgeVariant(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                Change Role
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Change User Role</DialogTitle>
                                <DialogDescription>
                                  Update the role for {user.full_name || user.email}
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="py-4">
                                <p className="text-sm font-medium mb-2">Select new role:</p>
                                <Select 
                                  defaultValue={user.role} 
                                  onValueChange={(value) => handleRoleChange(user.id, value)}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select role" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="moderator">Moderator</SelectItem>
                                    <SelectItem value="admin">Administrator</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setSelectedUser(null)}>
                                  Cancel
                                </Button>
                                <Button onClick={updateUserRole}>
                                  Update Role
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-20 text-center">
                  <UserPlus className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium mb-1">No users found</h3>
                  <p className="text-gray-500 text-sm">
                    There are currently no users in the system
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Overview of permissions for each role
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center">
                  <Badge variant="default" className="mr-2">admin</Badge>
                  <p className="font-medium">Administrator</p>
                </div>
                <p className="text-sm text-gray-500">
                  Full access to all system features, including user management and role assignments.
                </p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center">
                  <Badge variant="secondary" className="mr-2">moderator</Badge>
                  <p className="font-medium">Moderator</p>
                </div>
                <p className="text-sm text-gray-500">
                  Can manage content and moderate user activities, but cannot change system settings.
                </p>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">user</Badge>
                  <p className="font-medium">User</p>
                </div>
                <p className="text-sm text-gray-500">
                  Basic access to platform features. Can manage their own content and profile.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default RoleManagement;

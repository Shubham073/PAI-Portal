import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';

/**
 * Dashboard page - Basic placeholder
 * TODO: Add actual dashboard content when backend is ready
 */
const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Paper sx={{ p: 4, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Welcome to PAI Portal, {user?.firstName || 'User'}!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          This is the Procurement Management Portal for SCM.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Dashboard content will be added here once the backend API is connected.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;

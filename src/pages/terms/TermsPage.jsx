import { Box, Stack, Grid, Card, CardContent, Typography, CircularProgress, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { TitleBar } from '../../components'
import { Add, Edit, Delete } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAndSetCurrentYear } from '../../store/yearSlice'
import TermDetailsDialog from '../../components/dialog/TermDetailsDialog';
import { ConfirmationDialoge } from '../../components';
import { useTerms, useAddTerm, useUpdateTerm, useDeleteTerm } from '../../hooks/useTerms';
import { toast } from 'react-toastify';


const TermsPage = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { year_id, loading: yearLoading } = useSelector(state => state.year);
  const { data: terms = [], isLoading, isError, error } = useTerms(year_id);
  const addTermMutation = useAddTerm(year_id);
  const editTermMutation = useUpdateTerm(year_id);
  const deleteTermMutation = useDeleteTerm(year_id);

  // Dialog state
  const [termDialogConfig, setTermDialogConfig] = useState({
    open: false,
    onClose: closeDialogs,
    onConfirm: () => {},
    title: 'Term Details',
    data: {},
    confirmText: 'Save',
    cancelText: 'Cancel',
    confirmColor: 'primary',
    loading: false,
  });
  const [confirmationDialogConfig, setConfirmationDialogConfig] = useState({
    open: false,
    onClose: closeDialogs,
    onConfirm: () => {},
    title: 'Confirm Message',
    description: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    confirmColor: 'primary',
    loading: false,
  });

  function closeDialogs() {
    setTermDialogConfig(prev => ({ ...prev, open: false }));
    setConfirmationDialogConfig(prev => ({ ...prev, open: false }));
  }

  // Add term
  const handleAddTerm = (data) => {
    addTermMutation.mutate(
      { data },
      {
        onSuccess: () => {
          toast.success('Term created successfully!');
          closeDialogs();
        },
      }
    );
  };
  const handleDialogAddTerm = () => {
    setTermDialogConfig(prev => ({
      ...prev,
      open: true,
      onConfirm: (data) => handleAddTerm(data),
      confirmText: 'Save',
      confirmColor: 'info',
      loading: addTermMutation.isPending,
      data: {},
    }));
  };

  // Edit term
  const handleEditTerm = (termId, data) => {
    editTermMutation.mutate(
      { termId, data },
      {
        onSuccess: () => {
          toast.success('Term updated successfully!');
          closeDialogs();
        },
      }
    );
  };
  const handleDialogEditTerm = (term) => {
    setTermDialogConfig(prev => ({
      ...prev,
      open: true,
      data: term,
      onConfirm: (data) => handleEditTerm(term.id, data),
      confirmText: 'Update',
      confirmColor: 'info',
      loading: editTermMutation.isPending,
    }));
  };

  // Delete term
  const handleDeleteTerm = (term) => {
    deleteTermMutation.mutate(
      { termId: term.id },
      {
        onSuccess: () => {
          toast.success('Term deleted successfully!');
          closeDialogs();
        },
      }
    );
  };
  const handleDialogDeleteTerm = (term) => {
    setConfirmationDialogConfig(prev => ({
      ...prev,
      open: true,
      onConfirm: () => handleDeleteTerm(term),
      title: 'Delete Term?',
      description: `Are you sure you want to delete term "${term.name}"?`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      confirmColor: 'error',
      loading: deleteTermMutation.isPending,
    }));
  };

  useEffect(() => {
    if (!year_id && !yearLoading) {
      dispatch(fetchAndSetCurrentYear());
    }
  }, [year_id, yearLoading, dispatch]);

  useEffect(() => {
    const fetchTerms = async () => {
      if (year_id) {
        // setLoading(true); // This state is now managed by useTerms
        // setError(null); // This state is now managed by useTerms
        try {
          // const response = await indexTerms(year_id); // This call is now handled by useTerms
          // setTerms(response.data); // This state is now managed by useTerms
        } catch (err) {
          // setError('Failed to fetch terms'); // This state is now managed by useTerms
        } finally {
          // setLoading(false); // This state is now managed by useTerms
        }
      }
    };
    fetchTerms();
  }, [year_id]);

  return (
    <Box p={3}>
      <Stack spacing={3}>
        <TitleBar title="Academic Terms" button="Add Terms" buttonIcon={<Add />} buttonColor='info' onClick={handleDialogAddTerm} />
        <Box>
          {yearLoading || isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
              <CircularProgress />
            </Box>
          ) : isError ? (
            <Typography color="error">{error?.message || 'Error loading terms'}</Typography>
          ) : (
            <Grid container spacing={2} justifyContent="flex-start">
              {terms.map(term => (
                <Grid item key={term.id} xs={12} sm={12} md={6} lg={4} sx={{minWidth: '30%', flexGrow: 1}}>
                  <Card
                    sx={{
                      minHeight: 210,
                      borderRadius: 3,
                      border: '1.5px solid #e0e0e0',
                      background: theme.palette.mode === 'dark' 
                        ? 'linear-gradient(135deg,rgb(1, 16, 30) 60%, #34495e 100%)'
                        : 'linear-gradient(135deg, #f8fafc 60%, #e3e9f7 100%)',
                      boxShadow: 4,
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'box-shadow 0.2s',
                      '&:hover': { boxShadow: 8, borderColor: '#90caf9' },
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography 
                        variant="h5" 
                        align="center" 
                        fontWeight="bold" 
                        gutterBottom
                        sx={{ 
                          fontFamily: 'Almarai, sans-serif',
                          fontSize: '1rem',
                          color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000'
                        }}
                      >
                        {term.name}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        align="center"
                        sx={{ 
                          fontFamily: 'Almarai, sans-serif',
                          fontSize: '0.9rem',
                          color: theme.palette.mode === 'dark' ? '#bdc3c7' : '#666666'
                        }}
                      >
                        Start: {term.start_date || '-'}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        color="text.secondary" 
                        align="center"
                        sx={{ 
                          fontFamily: 'Almarai, sans-serif',
                          fontSize: '0.9rem',
                          color: theme.palette.mode === 'dark' ? '#bdc3c7' : '#666666'
                        }}
                      >
                        End: {term.end_date || '-'}
                      </Typography>
                      <Typography
                        variant="body1"
                        align="center"
                        display="block"
                        sx={{ 
                          mt: 1, 
                          color: term.is_current ? 'success.main' : 'text.disabled', 
                          fontWeight: 'bold',
                          fontFamily: 'Almarai, sans-serif',
                          fontSize: '1rem'
                        }}
                      >
                        {term.is_current ? 'Current Term' : ''}
                      </Typography>
                    </CardContent>
                    <Box display="flex" justifyContent="center" gap={2} pb={1}>
                      <Box
                        component="button"
                        sx={{
                          border: 'none',
                          background: '#1976d2',
                          color: '#fff',
                          borderRadius: 2,
                          px: 1.5,
                          py: 1,
                          cursor: 'pointer',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          boxShadow: 1,
                          transition: 'background 0.2s',
                          '&:hover': { background: '#1565c0' },
                          fontFamily: 'Almarai, sans-serif',
                          fontSize: '0.9rem'
                        }}
                        onClick={() => handleDialogEditTerm(term)}
                      >
                        <Edit fontSize="small" /> Edit
                      </Box>
                      <Box
                        component="button"
                        sx={{
                          border: 'none',
                          background: '#e53935',
                          color: '#fff',
                          borderRadius: 2,
                          px: 1.5,
                          py: 1,
                          cursor: 'pointer',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          boxShadow: 1,
                          transition: 'background 0.2s',
                          '&:hover': { background: '#b71c1c' },
                          fontFamily: 'Almarai, sans-serif',
                          fontSize: '0.9rem'
                        }}
                        onClick={() => handleDialogDeleteTerm(term)}
                      >
                        <Delete fontSize="small" /> Delete
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
        <TermDetailsDialog
          open={termDialogConfig.open}
          onClose={termDialogConfig.onClose}
          onConfirm={termDialogConfig.onConfirm}
          data={termDialogConfig.data}
          title={termDialogConfig.title}
          confirmText={termDialogConfig.confirmText}
          cancelText={termDialogConfig.cancelText}
          confirmColor={termDialogConfig.confirmColor}
          loading={termDialogConfig.loading}
        />
        <ConfirmationDialoge
          open={confirmationDialogConfig.open}
          onClose={confirmationDialogConfig.onClose}
          onConfirm={confirmationDialogConfig.onConfirm}
          title={confirmationDialogConfig.title}
          description={confirmationDialogConfig.description}
          confirmText={confirmationDialogConfig.confirmText}
          cancelText={confirmationDialogConfig.cancelText}
          confirmColor={confirmationDialogConfig.confirmColor}
          loading={confirmationDialogConfig.loading}
        />
      </Stack>
    </Box>
  );
}

export default TermsPage;
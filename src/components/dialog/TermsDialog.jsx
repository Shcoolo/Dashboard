import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  CircularProgress,
  Typography,
  Box,
  Tooltip
} from '@mui/material';
import { Add, Delete, Edit, ToggleOff, ToggleOn } from '@mui/icons-material';
import { useState } from 'react';
import { useTerms, useAddTerm, useUpdateTerm, useDeleteTerm } from '../../hooks/useTerms';
import { toast } from 'react-toastify';
import TermDetailsDialog from './TermDetailsDialog';
import  ConfirmationDialoge from './ConfirmationDialoge';
import PropTypes from 'prop-types';

const TermsDialog = ({
  open,
  onClose,
  yearId,
  yearName,
  yearStatus
}) => {
  const { data: terms, isLoading, isError, error } = useTerms(yearId);
  const addTermMutation = useAddTerm(yearId);
  const deleteTermMutation = useDeleteTerm(yearId);
  const editTermMutation = useUpdateTerm(yearId);

  const [termDialogConfig, setTermDialogConfig] = useState({
    open: false,
    onClose: closeDialogs,
    onConfirm: () => {},
    title: "Term Details",
    data: {},
    confirmText: "Save",
    cancelText: "Cancel",
    confirmColor: "primary",
    loading: false,
  });

  const [confirmationDialogConfig, setConfirmationDialogConfig] = useState({
    open: false,
    onClose: closeDialogs,
    onConfirm: () => {},
    title: "Confirm Message",
    description: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    confirmColor: "primary",
    loading: false,
  });

  function closeDialogs() {
    setTermDialogConfig(prev => ({ ...prev, open: false }));
    setConfirmationDialogConfig(prev => ({ ...prev, open: false }));
  }

  // Add term operations
  const handleAddTerm = (data) => {
    addTermMutation.mutate(
      { data: data },
      {
        onSuccess: () => {
          toast.success("Term created successfully!");
          closeDialogs();
        }
      }
    );
  };

  const handleDialogAddTerm = () => {
    setTermDialogConfig(prev => ({
      ...prev,
      open: true,
      onConfirm: (data) => handleAddTerm(data),
      confirmText: "Save",
      confirmColor: 'info',
      loading: addTermMutation.isPending,
      data: {},
    }));
  };

  // Edit term operations
  const handleEditTerm = (termId, data) => {
    editTermMutation.mutate(
      {
        termId: termId,
        data: data
      },
      {
        onSuccess: () => {
          toast.success("Term updated successfully!");
          closeDialogs();
        }
      }
    );
  };

  const handleDialogEditTerm = (term) => {
    setTermDialogConfig(prev => ({
      ...prev,
      open: true,
      data: term,
      onConfirm: (data) => handleEditTerm(term.id, data),
      confirmText: "Update",
      confirmColor: 'info',
      loading: editTermMutation.isPending,
    }));
  };

  // Delete term operations
  const handleDeleteTerm = (term) => {
    deleteTermMutation.mutate(
      { termId: term.id },
      {
        onSuccess: () => {
          toast.success("Term deleted successfully!");
          closeDialogs();
        }
      }
    );
  };

  const handleDialogDeleteTerm = (term) => {
    setConfirmationDialogConfig(prev => ({
      ...prev,
      open: true,
      onConfirm: () => handleDeleteTerm(term),
      title: "Delete Term?",
      description: `Are you sure you want to delete term "${term.name}"?`,
      confirmText: "Delete",
      cancelText: "Cancel",
      confirmColor: "error",
      loading: deleteTermMutation.isPending,
    }));
  };

  // Active operations
  const handleActiveTerm = (term) => {
    editTermMutation.mutate(
      {
        termId: term.id,
        data: { ...term, is_current: !term.is_current }
      },
      {
        onSuccess: () => {
          toast.success("Term status updated successfully!");
          closeDialogs();
        }
      }
    );
  };

  const handleDialogActiveTerm = (term) => {
    setConfirmationDialogConfig(prev => ({
      ...prev,
      open: true,
      onConfirm: () => handleActiveTerm(term),
      title: term.is_current ? "Confirm Deactivation" : "Confirm Activation",
      description: `Are you sure you want to ${term.is_current ? "deactivate" : "activate"} the term "${term.name}"?`,
      loading: editTermMutation.isPending
    }));
  };

  if (isLoading) return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogContent>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress color="error" />
        </Box>
      </DialogContent>
    </Dialog>
  );

  if (isError) {
    console.error(error);
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogContent>
          <Typography color="error">Error loading terms: {error?.message}</Typography>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Terms for {yearName}
            </Typography>
            <Button
              variant="contained"
              color="info"
              startIcon={<Add />}
              onClick={handleDialogAddTerm}
              disabled={!yearStatus}
            >
              Add Term
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <TableContainer >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Term Name</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {terms?.map((term) => (
                  <TableRow key={term.id}>
                    <TableCell>
                      <Typography variant="h6">{term.name}</Typography>
                    </TableCell>
                    <TableCell>{term.start_date}</TableCell>
                    <TableCell>{term.end_date}</TableCell>
                    <TableCell>
                      {term.is_current ? (
                        <Chip 
                          label="Current" 
                          sx={{color: '#00ff00', borderColor: '#00ff00'}} 
                          color="success" 
                          variant="outlined"
                        />
                      ) : (
                        <Chip 
                          label="Inactive" 
                          sx={{color: '#ff0000', borderColor: '#ff0000'}} 
                          variant="outlined" 
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Toggle term status" arrow>
                        <IconButton 
                          style={{ 
                            color: term.is_current ? 'green' : 'gray', 
                            margin: '0 5px'
                          }} 
                          onClick={() => handleDialogActiveTerm(term)}
                        >
                          {term.is_current ? <ToggleOn fontSize="large" /> : <ToggleOff fontSize="large" />}
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit term" arrow>
                        <IconButton 
                          style={{ 
                            color: 'blue', 
                            border: '2px solid blue', 
                            margin: '0 5px', 
                            padding: '5px' 
                          }} 
                          onClick={() => handleDialogEditTerm(term)}
                        >
                          <Edit fontSize="small"/>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete term" arrow>
                        <IconButton 
                          style={{ 
                            color: 'red', 
                            border: '2px solid red', 
                            margin: '0 5px', 
                            padding: '5px'
                          }} 
                          onClick={() => handleDialogDeleteTerm(term)}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
                {(!terms || terms.length === 0) && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography variant="body1" color="textSecondary">
                        No terms found for this academic year
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

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
    </>
  );
};

TermsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  yearId: PropTypes.number.isRequired,
  yearName: PropTypes.string.isRequired,
};

export default TermsDialog; 
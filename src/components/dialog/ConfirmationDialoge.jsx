
import { CircularProgress, LinearProgress, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';

const ConfirmationDialoge = ({
  open,
  onClose,
  onConfirm,
  title="تأكيد",
  description,
  confirmText="تأكيد",
  cancelText="إلغاء الأمر",
  confirmColor="primary",
  loading,
}) => {

  return (
      <Dialog
        open={open}
        onClose={!loading? onClose: undefined}
        aria-labelledby="confirmation-dialog"
      >
         {loading && <LinearProgress color="info" />}
        <DialogTitle style={{ cursor: 'move' }} color={confirmColor} id="draggable-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            autoFocus 
            onClick={onClose}
            disabled={loading}
          >
            { cancelText }
          </Button>
          <Button 
            onClick={onConfirm}
            color={confirmColor}
            variant='contained'
            sx={{ boxShadow: 'none', mx: '4px'}}
            disabled={loading}
          >{confirmText}</Button>
        </DialogActions>
      </Dialog>
  );
}

ConfirmationDialoge.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string,
  description: PropTypes.node,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmColor: PropTypes.oneOf(["primary", "error", "secondary", "success", "warning"]),
  loading: PropTypes.bool,
};

export default ConfirmationDialoge;
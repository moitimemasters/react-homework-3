
import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogActions, Button, Typography } from '@mui/material';
import { CardProps } from '../types';

interface Props extends CardProps {
  open: boolean;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({ imageUrl, name, description, category, count, units, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        <img
          src={imageUrl ?? "static/no-image.svg"}
          alt={name}
          style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
        />
        <Typography variant="body1" style={{ margin: '20px 0' }}>
          {description}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Category: {category}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Count: {count} {units}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;

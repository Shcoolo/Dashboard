import { Button, Paper, Toolbar, Typography, useTheme } from '@mui/material'
import PropTypes from 'prop-types';
import { tokens } from '../theme';

const TitleBar = ({title, subTitle = null, button = null, buttonType = 'contained', buttonColor = '', buttonIcon = null,  onClick}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Paper elevation={1} >
      <Toolbar sx={{ display: 'flex', justifyContent:"space-between", alignItems:'center'}}>
        <div>
          <Typography variant="h3">{title}</Typography>
          <Typography variant="h5" mx={2} color={colors.greenAccent[400]}>
            {subTitle}
          </Typography>
        </div>
        {button && <Button 
          variant={buttonType} 
          color={buttonColor} 
          onClick={onClick}
          startIcon={buttonIcon}
          >{button}</Button>}
      </Toolbar>
    </Paper>
  );
}

TitleBar.propTypes = {
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    button: PropTypes.string, 
    buttonType: PropTypes.oneOf(['contained', 'outlined', 'text', 'string']),
    buttonColor: PropTypes.string,
    clickFun: PropTypes.func,
};

export default TitleBar
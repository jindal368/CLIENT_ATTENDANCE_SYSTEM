import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  head:{
    fontWeight:'500',
    width:'50%',
    fontSize : '20px',
    height: '64px',
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    marginBottom: theme.spacing(2),
  },
}));

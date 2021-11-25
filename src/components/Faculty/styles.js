import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  heading: {
    color: 'rgba(0,0,171, 1)',
    textDecoration: 'none',
    fontSize: '2em',
  },

  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',

    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
  logout: {
    marginLeft: '20px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '0 0 15px 15px',
    backgroundColor: 'aliceblue',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  // root: {
  //   display:'flexbox',
  //   alignItems: 'center',
  //   marginLeft: '25%',
  //   marginRight:'25%'
  // },
  
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    display : 'flex',
    flexWrap : 'wrap',
    flexDirection: 'column',
    padding:'20px 0 20px 0',
    alignItems:'center',
  },

  head: {
    display: 'flex',
    flexDirection:'column',
    height: '60px',
    justifyContent: 'center',
    backgroundColor: 'aliceblue',
    fontWeight: '500',
  },
  root: {
    maxWidth: 345,
    boxShadow: '0 2px 8px 0',
    marginBottom: '15px',
  },
  media: {
    height: 250,
  },
  formControl: {
    margin: theme.spacing(1),
    // minWidth: 120,
    width:'80%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  contain: {
    display: 'flex',
    flexDirection:'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  }
}));

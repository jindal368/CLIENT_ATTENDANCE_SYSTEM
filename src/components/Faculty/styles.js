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
    padding:'20px 0 0 0',
    alignItems:'center',
  },

  top: {
    display: 'flex',
    flexDirection:'column',
    height: '60px',
    justifyContent: 'center',
    backgroundColor: 'aliceblue',
    fontWeight: '500',
  },
  root: {
    // maxWidth: 345,
    boxShadow: '0 2px 8px 0',
    marginBottom: '30px',
    marginRight: '30px',
    // width: '392px',
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
  },


  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    width: '328px',
    marginBottom: '30px',
    marginRight: '30px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  head:{
    fontWeight:'500',
    width:'50%',
    fontSize : '20px',
    height: '64px',
  },
  list: {
    width: '90%',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  // list: `
  //   width: 90%;
  //   position: relative;
  //   overflow: auto;
  //   max-height: 300px;
  //   ms-overflow-style: none;
  // `,
  purple: {
    marginRight: '10px',
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  }
}));

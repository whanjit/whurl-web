import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Loading from '../../components/Loading'
import { dialog } from '../../utils/dialog'



const styles = theme => ({
  link: {
    margin: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  margin: {
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
});


class Home extends Component {
  constructor() {
    super()
    this.state = {
      originalUrl: '',
      customAlias: '',
      loading: false,
      valid: {
        url: true,
      },
    }

    this.onChange = this.onChange.bind(this)
    this.onCreate = this.onCreate.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  //componentDidMount() {
  //  this.props.user.loadFromStorage()
  //}
  
  async onLogout() {
    this.setState({ loading: true })
    await this.props.user.logout()
    this.setState({ loading: false })
  }

  async onCreate() {
    let { originalUrl, customAlias } = this.state
    originalUrl = originalUrl || ''
    customAlias = customAlias || ''
    if ( originalUrl === '') {
      dialog.warning({ title: 'Alert!!!', text: 'A URL was not entered, please try again.'})
      return
    }

    this.setState({ loading: true })
    await this.props.shorturl.create({ originalUrl, customAlias })
    this.setState({ loading: false })
  }

  onChange(evt) {
    let name = evt.target.name
    let value = evt.target.value

    let state = this.state
    state[name] = value
    this.setState(state)
  }

  render() {
    let { classes } = this.props;
    let { originalUrl, customAlias, loading } = this.state
    let shorturl = this.props.shorturl.toJS()
    let user = this.props.user.toJS()
    let doc = shorturl.created
    let content
    if (doc._id !== undefined) {
      let path = `http://localhost:3008/api/v1/shurl/${doc.urlCode}`
      content = (
        <Typography gutterBottom align="center">
          <Link href={path} className={classes.link}>
            {path}
          </Link>
        </Typography>
      )
    } else if (shorturl.message !== '') {
      content = (
        <Typography variant="h5" gutterBottom>
          <p style={{color: 'red'}}>{shorturl.message}</p>
        </Typography>
      )
    }

   
    let loginOrLogout = <Link href="/login" className={classes.link}>Login</Link>
    //if (this.props.user.isLogin()){
    if(user.user._id !== ''){
      loginOrLogout = (<Button 
          variant="contained" 
          color="primary" 
          className={classes.button} 
          onClick={this.onLogout}
        >
          logout
        </Button>)
    }//*/

    return (
      <div>
        <br />
        {loginOrLogout}
        <Typography variant="h4" gutterBottom align="center">
          Welcome to ShortURL!
        </Typography>
        
        <div className={classes.container}>
          <TextField
            id="url"
            label="URL"
            name="originalUrl"
            value={ originalUrl }
            onChange={this.onChange}
            style={{ margin: 8 }}
            placeholder="https://www.sample.com/xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            helperText="Enter a long URL to make shorter"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="custom-alias"
            label="Custom Alias (option)"
            name="customAlias"
            value={ customAlias }
            onChange={this.onChange}
            style={{ margin: 8 }}
            placeholder="https://localhost:3000/[Custom Alias]"
            helperText="May contain letters, numbers, and dashes."
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Loading loading={loading} >
            <Button 
              variant="contained" 
              color="primary" 
              className={classes.button} 
              fullWidth
              onClick={this.onCreate}
            >
              Make Short-URL
            </Button>
          </Loading>
          
          {content}
         

        </div>
      </div>
    )
  }
}
;
export default inject('user', 'shorturl')(observer(withStyles(styles)(Home)))



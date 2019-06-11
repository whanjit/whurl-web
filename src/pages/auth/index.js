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


class Auth extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      loading: false,
      valid: {
        url: true,
      },
    }

    this.onChange = this.onChange.bind(this)
    this.onSignin = this.onSignin.bind(this)
  }

  async onSignin() {
    let { email, password } = this.state
    email = email || ''
    password = password || ''
    if ( email === '' || password === '') {
      dialog.warning({ title: 'Alert!!!', text: 'email and password is required.'})
      return
    }

    this.setState({ loading: true })
    await this.props.user.login({ email, password })
    let user = this.props.user.toJS()
    let doc = user.user
    
    if(doc.token !== '')
      this.props.history.replace('/')
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
    let { email, password, loading } = this.state
    let user = this.props.user.toJS()
    let doc = user.user

    let content
    if (user.message !== '') {
      content = (
        <Typography variant="h5" gutterBottom>
          <p style={{color: 'red'}}>{user.message}</p>
        </Typography>
      )
    }
    console.log(doc);
    //if(doc.token !== '')
    //  this.props.history.replace('/')

    return (
      <div>
        <br />
        <Typography variant="h4" gutterBottom align="center">
          Welcome to ShortURL!
        </Typography>
        
        <div className={classes.container}>
          <TextField
            id="email"
            label="Email"
            name="email"
            value={ email }
            onChange={this.onChange}
            style={{ margin: 8 }}
            placeholder="sample@example.com"
            helperText="Enter an email"
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <TextField
            id="password"
            label="Password"
            name="password"
            value={ password }
            onChange={this.onChange}
            style={{ margin: 8 }}
            placeholder=""
            helperText="password"
            fullWidth
            margin="normal"
            variant="outlined"
            type="password"
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
              onClick={this.onSignin}
            >
              login
            </Button>
          </Loading>
          
          {content}
         

        </div>
      </div>
    )
  }
}
;
export default inject('user')(observer(withStyles(styles)(Auth)))



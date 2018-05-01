import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {withStyles} from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import {read} from './api-media.js'
import Media from './Media'

const styles = theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  }
})

class PlayMedia extends Component {
  constructor({match}) {
    super()
    this.state = {
      media: {postedBy: {}},
    }
    this.match = match
  }
  loadMedia = (mediaId) => {
    read({mediaId: mediaId}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({media: data})
      }
    })
  }
  componentDidMount = () => {
    this.loadMedia(this.match.params.mediaId)
  }
  componentWillReceiveProps = (props) => {
    this.loadMedia(props.match.params.mediaId)
  }
  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={8} sm={8}>
            <Media media={this.state.media}/>
          </Grid>
        </Grid>
      </div>)
  }
}

PlayMedia.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PlayMedia)
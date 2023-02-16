import { Grid, Paper, makeStyles } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: '0px',
  },
  pageHeader: {
    padding: theme.spacing(2),
    display: 'flex',
  },
  heading: {
    fontWeight: 'bolder',
  },
}))

const TableHeader = ({ title, buttons }) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Paper elevation={0} square className={classes.root}>
        <div className={classes.pageHeader}>
          <Grid
            container
          >
            <Grid item className="full-cont text-center position-relative">
              {buttons.map((button, idx) => {
                return <span key={idx}>{button}</span>
              })}
            </Grid>
          </Grid>
        </div>
      </Paper>
    </React.Fragment>
  )
}

export default TableHeader

TableHeader.propTypes = {
  title: PropTypes.string,
  buttons: PropTypes.array,
}

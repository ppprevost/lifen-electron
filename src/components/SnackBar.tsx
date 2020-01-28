import React from "react";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import classnames from "classnames";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import green from "@material-ui/core/colors/green";
import withStyles from "@material-ui/core/styles/withStyles";
import { Theme } from "@material-ui/core";

const styles = (theme: Theme) => ({
  success: {
    backgroundColor: green[600]
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

const SnackBar = (props: any) => {
  const { classes, className, message, onClose, ...other } = props;
  const Icon = CheckCircleIcon;

  return (
    <SnackbarContent
      className={classnames(classes.info, className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classnames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      {...other}
    />
  );
};

export default withStyles(styles)(SnackBar);

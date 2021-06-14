import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 20,
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
};
export default class User extends Component {
  state = {};
  render() {
    console.log("====================================");
    console.log("user loaded");
    console.log("====================================");
    const { classes } = this.props;
    return (
      <>
        <Grid xs={4} sm={4} md={4} lg={4} style={{ height: "inherit" }}>
          <Paper
            
            elevation={3}
            style={{
              padding: "20px 0",
              position: "relative",
              height: `calc(100% - 80px)`,
              margin: "40px 0",
            }}
          >
            <p>lorem ipUSERSSSSsum</p>
          </Paper>
        </Grid>
      </>
    );
  }
}
// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//   };
// };
// function mapDispatchToProps(dispatch) {
//   return {
//     userLogout: (user) => dispatch(userLogout(user)),
//     loginUser: (user) => dispatch(loginUser(user)),
//   };
// }
// export default compose(
//   withStyles(styles, {
//     name: "User",
//   }),
//   withRouter,
//   connect(mapStateToProps, mapDispatchToProps)
// )(User);

import React, {Component} from 'react';
import MUIDataTable from 'mui-datatables';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {GrEdit} from 'react-icons/gr';
import {AiOutlineDelete} from 'react-icons/ai';

const classes = {};
const styles = {};
const columns = [
  'Name',
  'Company',
  'City',
  'State',
  {
    name: 'Actions',
    options: {
      filter: false,
      sort: false,
    },
  },
];

const data = [
  ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
  ['John Walsh', 'Test Corp', 'Hartford', 'CT'],
  ['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
  ['James Houston', 'Test Corp', 'Dallas', 'TX'],
];
const options = {
  filterType: 'textField',
  responsive: 'scroll',
};
// Choice of filtering view. enum('checkbox', 'dropdown', 'multiselect', 'textField', 'custom')
// https://codesandbox.io/s/wno91qwk98?file=/index.js
class DataTable extends Component {
  state = {};

  render() {
    const {classes} = this.props;
    return (
      <div style={{maxWidth: '100%'}}>
        <MUIDataTable
          title={'Employee List'}
          data={data.map((d) => {
            const f = [
              ...d,
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                style={{
                  color: '#000',
                  height: '100%',
                }}
                spacing={5}>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={() => console.log(d[0])}>
                    <GrEdit color="primary" />
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={() => console.log(d[0])}>
                    <AiOutlineDelete color="primary" />
                  </Button>
                </Grid>
              </Grid>,
            ];
            return f;
          })}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

export default DataTable;

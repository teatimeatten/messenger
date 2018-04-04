import React from 'react';

export default class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      querystring: '',
    };
  }
  render() {
    let { list, filter } = this.props;
    let { addItem } = this.props;
    let { querystring } = this.state;

    let filtered_list = Object.values(list).filter(filter(querystring));

    return (
      <div>
        <div className="form-group">
          <input type="text" className="form-control"
            placeholder="Search"
            value={querystring}
            onChange={(e) => this.setState({querystring: e.target.value})} />
        </div>
        <div className="form-group">
          <div className="list-group">
          {Object.values(filtered_list).map(item =>
            <button className="list-group-item" key={item.id} onClick={() => addItem(item.id)}>
              {item.display_name}
            </button>
          )}
          </div>
        </div>
      </div>
    );

  }
}
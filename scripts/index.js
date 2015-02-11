'use strict';

var React = require('react');

Object.assign = Object.assign || require('object.assign');

var FixedDataTable = require('fixed-data-table');

var Table = FixedDataTable.Table;

var Column = FixedDataTable.Column;

require('fixed-data-table/dist/fixed-data-table.css');

var isColumnResizing;

var Container = React.createClass({
    getInitialState: function() {
      return {
          columns: [
              {id: 1, title: 'last updated', isVisible: true, lookupKey: 'last_updated', width: 150},
              {id: 2, title: 'merchant name', isVisible: false, lookupKey: 'merchant_name', width: 150},
              {id: 3, title: 'search values', isVisible: false, lookupKey: 'search_values', width: 150},
              {id: 4, title: 'product name', isVisible: true, lookupKey: 'product_name', width: 400},
              {id: 5, title: 'UOM', isVisible: false, lookupKey: 'unit_type', width: 40},
              {id: 6, title: 'cost price', isVisible: true, lookupKey: 'cost_price', width: 100},
              {id: 7, title: 'trade price', isVisible: false, lookupKey: 'trade_price', width: 100},
              {id: 8, title: 'retail price', isVisible: false, lookupKey: 'retail_price', width: 100},
              {id: 9, title: 'tax', isVisible: false, lookupKey: 'tax', width: 100},
          ]
      }
    },
    render: function() {
        var priceBookItems = [
            {
                id:1,
                price_book_id:5,
                product_code:"1",
                unit_type:"EA",
                product_name:"Tom's Product",
                cost_price:100,
                retail_price:125,
                is_labour:false,
                merchant_name:"Tom Merchant",
                search_values:""
            }
        ];

        return <FixedDataTablePriceBookEditor columnWidthChanged={this.columnWidthChanged} priceBookItems={priceBookItems} columns={this.state.columns} />
    },
    columnWidthChanged: function(newColumnWidth, lookupKey) {
        var columns = this.state.columns;

        for(columnIndex in columns) {
            if(columns[columnIndex].lookupKey == lookupKey) {
                columns[columnIndex].width = newColumnWidth;
            }
        }

        this.setState({columns: columns});
    },
});

var FixedDataTablePriceBookEditor = React.createClass({

    getInitialProps: function() {
      return {
          top: 0,
          left: 0,
          columns: [],
          priceBookItems: []
      };
    },

    getRow: function(rowIndex) {
        var priceBookItem = this.props.priceBookItems[rowIndex];
        return priceBookItem;
    },

    _onColumnResizeEndCallback(newColumnWidth, dataKey) {
        isColumnResizing = false;
        this.props.columnWidthChanged(newColumnWidth, dataKey);
    },

    render: function() {
        var controlledScrolling =
            this.props.left !== undefined || this.props.top !== undefined;
            console.log(this.props.priceBookItems);

        return (
            <Table
                maxHeight={300}
                width={600}
                rowsCount={this.props.priceBookItems.length}
                rowHeight={50}
                headerHeight={40}
                rowGetter={this.getRow}
                overflowX={controlledScrolling ? "hidden" : "auto"}
                overflowY={controlledScrolling ? "hidden" : "auto"}
                isColumnResizing={isColumnResizing}
                onColumnResizeEndCallback={this._onColumnResizeEndCallback}>
            {this.renderVisibleColumns()}
            </Table>
        );
    },
    renderVisibleColumns: function() {
        var visibleColumns = this.props.columns.filter(column => column.isVisible == true);

        return visibleColumns.map(column => {
            var isFixed = column.title == 'product name';

            return (
                <Column
                    key="product_name"
                    dataKey={column.lookupKey}
                    width={parseInt(column.width)}
                    isResizable={true}
                    fixed={isFixed}
                    label={column.title} />
            );
        });
    }

});

React.render(<Container />, document.body);


'use strict';

var React = require('react');

Object.assign = Object.assign || require('object.assign');
require('array.prototype.find');

// es6 destructuring
var {Table,Column,ColumnGroup} = require('fixed-data-table');

require('fixed-data-table/dist/fixed-data-table.css');

var isColumnResizing;

var Container = React.createClass({
    getInitialState: function() {
      return {
          columns: [
              {id: 1, title: 'last updated', isFixed: false, isVisible: true, lookupKey: 'last_updated', width: 150},
              {id: 2, title: 'merchant name', isFixed: false, isVisible: false, lookupKey: 'merchant_name', width: 150},
              {id: 3, title: 'search values', isFixed: false, isVisible: false, lookupKey: 'search_values', width: 150},
              {id: 4, title: 'product name', isFixed: true, isVisible: true, lookupKey: 'product_name', width: 400},
              {id: 5, title: 'UOM', isFixed: false, isVisible: false, lookupKey: 'unit_type', width: 40},
              {id: 6, title: 'cost price', isFixed: false, isVisible: true, lookupKey: 'cost_price', width: 100},
              {id: 7, title: 'trade price', isFixed: false, isVisible: false, lookupKey: 'trade_price', width: 100},
              {id: 8, title: 'retail price', isFixed: false, isVisible: true, lookupKey: 'retail_price', width: 100},
              {id: 9, title: 'tax', isFixed: false, isVisible: false, lookupKey: 'tax', width: 100},
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
            },
            {
                id:1,
                price_book_id:7,
                product_code:"5",
                unit_type:"EA",
                product_name:"Dan's Product",
                cost_price:140,
                retail_price:125,
                is_labour:false,
                merchant_name:"Dan Merchant",
                search_values:""
            }
        ];

        return <FixedDataTablePriceBookEditor columnWidthChanged={this.columnWidthChanged} priceBookItems={priceBookItems} columns={this.state.columns} />
    },
    columnWidthChanged: function(newColumnWidth, lookupKey) {
        var columns = this.state.columns;
        var columnToUpdate = columns.find(c => c.lookupKey == lookupKey);
        columnToUpdate.width = newColumnWidth;
        // es6 object shorthand
        this.setState({columns});
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
      var controlledScrolling = this.props.left !== undefined || this.props.top !== undefined;
      var productNameCellRenderer = (cellData, cellDataKey, rowData,rowIndex, columnData, width) => {
        var name = rowData['product_name'];
        return `¡${name}!`;
      };

      var productNameHeaderRenderer = (cellData, cellDataKey, rowData, columnData) => {
        return 'Overidden Name Header';
      };

      var columnGroupHeaderRender = () => 'BE OVERIDDEN';

      return (
        <Table
          height={1000}
          width={600}
          rowsCount={this.props.priceBookItems.length}
          rowHeight={50}
          groupHeaderHeight={40}
          headerHeight={40}
          rowGetter={this.getRow}
          overflowX={controlledScrolling ? "hidden" : "auto"}
          overflowY={controlledScrolling ? "hidden" : "auto"}
          isColumnResizing={isColumnResizing}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}>
          <ColumnGroup 
            groupHeaderRenderer={columnGroupHeaderRender}
            key={0} 
            label="First ColumnGroup">
            <Column
              label="Product Name"
              dataKey={"product_name"}
              width={this.props.columns.find(c => c.lookupKey == 'product_name').width}
              isResizable={true}
              headerRenderer={productNameHeaderRenderer}
              cellRenderer={productNameCellRenderer}/>
            <Column
              label="Cost"
              dataKey={"cost_price"}
              width={100}/>
            </ColumnGroup>
            <ColumnGroup key={1} label="Second ColumnGroup">
              <Column
                label="Retail Price"
                dataKey={"retail_price"}
                width={100}/>
            </ColumnGroup>
        </Table>
      );
    }
});

React.render(<Container />, document.body);


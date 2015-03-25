# fixeddatatable

Git clone https://github.com/TomClarkson/fixeddatatable.git

npm i && npm start

visit localhost:3000

change node_modules/fixed-data-table/internal/FixedDataTable.react.js

add cellRenderer: columnGroups[i].props.groupHeaderRenderer || renderToString, to line 847
_createGroupHeaderColumns should now look like this
```javascript
  _createGroupHeaderColumns:function(/*array*/ columnGroups) /*array*/  {
    console.log('got here');
    var newColumnGroups = [];
    for (var i = 0; i < columnGroups.length; ++i) {
      newColumnGroups[i] = cloneWithProps(
        columnGroups[i],
        {
          dataKey: i,
          children: undefined,
          columnData: columnGroups[i].props.columnGroupData,
          cellRenderer: columnGroups[i].props.groupHeaderRenderer || renderToString,
          isHeaderCell: true,
        }
      );
    }
    return newColumnGroups;
  },
  ```
observe ColumnGroupHeader can now be overridden


import {autoinject} from "aurelia-framework";
import {DialogService} from "aurelia-dialog";
import {SaveDataSource} from "../../modals/save-data-source";

interface DataSourceItem {
  name: string;
  image: string;
  connector?: string;
}

@autoinject()
export class AddDataSource {

  files: DataSourceItem[] = [
    {
      name: 'Delimited Files - CSV, TSV',
      image: 'csv-file.png'
    },
    {
      name: 'Excel Workbooks',
      image: 'ms-excel.png'
    },
    {
      name: 'SQLite',
      image: 'sqlite.png'
    },
    {
      name: 'XML',
      image: 'xml-file.png'
    },
  ];
  databases: DataSourceItem[] = [
    {
      name: 'MySQL',
      image: 'mysql.png',
      connector: 'mysql'
    },
    {
      name: 'MariaDB',
      image: 'maria-db.png'
    },
    {
      name: 'Postgre SQL',
      image: 'postgre-sql.png'
    },
    {
      name: 'Amazon Redshift',
      image: 'amazon-redshift.png'
    },
    {
      name: 'Elastic Search',
      image: 'elastic-search.png'
    },
    {
      name: 'MS SQL',
      image: 'ms-sql-server.png'
    },
    {
      name: 'Amazon S3',
      image: 'amazon-s3.png'
    },
    {
      name: 'Apache Drill',
      image: 'apache_drill.png'
    }
  ];

  dialogService: DialogService;

  selectedDataSource: DataSourceItem;

  constructor(dialogService: DialogService) {
    this.dialogService = dialogService;
  }

  saveDataSourceModal(dataSource: DataSourceItem) {
    this.selectedDataSource = <DataSourceItem>{};
    this.dialogService.open({
      viewModel: SaveDataSource,
      model: {
        name: dataSource.name,
        connector: dataSource.connector
      }
    })
  }

}

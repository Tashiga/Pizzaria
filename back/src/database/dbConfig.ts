import mysql, { Connection, OkPacket, ResultSetHeader, RowDataPacket } from 'mysql2';

class DbConnection {
  private connection: Connection;

  constructor(private config: any) {
    this.connection = mysql.createConnection(config);
  }

  connect(callback: (error: Error | null) => void): void {
    this.connection.connect((error) => {
      if (error) {
        console.error('Erreur de connexion à la base de données :', error);
        callback(error);
      } else {
        console.log('Connecté à la base de données MySQL');
        callback(null);
      }
    });
  }

  query(sql: string, values: any[], callback: (error: Error | null, results?: RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader) => void): void {
    this.connection.query(sql, values, (error, results: RowDataPacket[]) => {
        if (error) {
        console.error('Erreur lors de l\'exécution de la requête :', error);
        callback(error);
      } else {
        callback(null, results);
      }
    });
  }
  

  close(callback: (error: Error | null) => void): void {
    this.connection.end((error) => {
      if (error) {
        console.error('Erreur lors de la déconnexion de la base de données :', error);
        callback(error);
      } else {
        console.log('Déconnexion de la base de données MySQL');
        callback(null);
      }
    });
  }
}

export default DbConnection;

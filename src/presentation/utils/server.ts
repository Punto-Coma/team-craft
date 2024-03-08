import path from 'path';
import http from 'http';
import express from 'express';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

interface Options {
  port: number;
  routes: express.Router;
  public_path?: string;
}

export class Server {
  public readonly app = express();
  private serverListener?: http.Server;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: express.Router;

  constructor(options: Options) {
    const { port, routes, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
  }

  async start() {
    // Middlewares
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* Routes
    this.app.use('/api/v1', this.routes);
    //* Swagger
    this.app.use('/api-docs', serve, setup(swaggerSpec));

    //* SPA
    this.app.get('*', (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`);
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}

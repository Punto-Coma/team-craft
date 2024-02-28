import { envs } from './common/config/envs';
import { AppRoutes } from './common/routes';
import { Server } from './common/utils/server';

(async () => {
  main();
})();

async function main() {
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}

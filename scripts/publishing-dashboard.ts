import { GrowthStore } from "./growth/store";
import { createDashboard } from "./growth/dashboard";

const store = new GrowthStore(process.env.GROWTH_DATA_DIR);
if (process.argv.includes("--check")) {
  console.log(
    JSON.stringify(
      {
        localOnly: true,
        queueCount: store.list().length,
        jobs: store.jobs(),
        privateStorage: "outside repository and cloud storage",
        publishing: "disabled",
      },
      null,
      2,
    ),
  );
  store.close();
} else {
  const port = Number(process.env.DASHBOARD_PORT ?? 4323);
  if (!Number.isInteger(port) || port < 1024 || port > 65535) throw Error("Invalid local port");
  const { server, token, origin } = createDashboard(store, port);
  server.listen(port, "127.0.0.1", () =>
    console.log(
      `Private growth desk: ${origin}\nOwner token (this session only): ${token}\nNothing is uploaded, sent or published.`,
    ),
  );
  const close = () =>
    server.close(() => {
      store.close();
      process.exit(0);
    });
  process.on("SIGINT", close);
  process.on("SIGTERM", close);
}

module.exports = {
  apps: [
    {
      name: "FE - SS - MUSINSA",
      script: "yarn && yarn run build:production && yarn start:production",
      max_memory_restart: "256M",
      env: {
        // 앱의 env를 설정
        NODE_ENV: "development",
        PORT: 5000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 5000,
      },
      log_date_format: "YYYY-MM-DD HH:mm Z",
      out_file: "logs/out.log",
      instances: 1,
      autorestart: true,
      watch: true,
      // merge_logs: true,
      // vizion: true,
      // pmx: true,
      // automation: true,
      // treekill: true,
      // username: "react",
      // windowsHide: true,
      // kill_retry_time: 100,
      // write: true,
    },
  ],
};

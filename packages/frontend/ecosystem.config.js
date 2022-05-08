module.exports = {
  apps: [
    {
      name: "FE - SS - MUSINSA",
      script: "yarn build:production && yarn start:production",
      namespace: "default",
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
      instances: 2,
      merge_logs: true,
      vizion: true,
      autorestart: true,
      watch: false,
      pmx: true,
      automation: true,
      treekill: true,
      username: "react",
      windowsHide: true,
      kill_retry_time: 100,
      write: true,
    },
  ],
};

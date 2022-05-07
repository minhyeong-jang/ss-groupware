module.exports = {
  apps: [
    {
      script: "yarn start:production",
      name: "FE - SS - MUSINSA",
      namespace: "default",
      env: {
        PORT: 5000,
      },
      instances: 0,
      merge_logs: true,
      vizion: true,
      autorestart: true,
      watch: false,
      instance_var: "NODE_APP_INSTANCE",
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

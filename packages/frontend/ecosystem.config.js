module.exports = {
  apps: [
    {
      name: "FE - SS - MUSINSA",
      script: "yarn start:production",
      max_memory_restart: "512M",
      exec_mode: "fork",
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
      watch: false, // 폴더 내의 파일에 변경이 있을때, 앱이 리로딩 여부
    },
  ],
};

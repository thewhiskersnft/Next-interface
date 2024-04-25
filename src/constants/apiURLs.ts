export enum AUTH_API_PATH {
  LOGIN_MESSAGE = "/user/api/signin-data",
  LOGIN = "/user/api/signin",
  REFRESH_ACCESS_TOKEN = "/refreshTokens/createOrUpdateToken",
}

export enum REWARD_API_PATH {
  FETCH_REWARDS = "/points/user/",
  FETCH_LEADERBOARD = "/points/leader/board",
  UPDATE_USER_POINTS = "/points/ergptu",
}

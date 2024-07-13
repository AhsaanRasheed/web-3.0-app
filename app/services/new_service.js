"use client";
import { apiUrl } from "../apiUrl";
import { http_post, http_get, http_put, http_delete } from "../lib/http";
import secureLocalStorage from "react-secure-storage";

// GET- http://{{base_uri}}/api/v1/coins/info?network=Polygon Amoy

// GET http request's.

export const update_current_pwd = async (old_password, new_password) => {
  const resp = await http_put(apiUrl + `/api/v1/users/change-password`, {
    old_password,
    new_password,
  });
  return resp;
};

export const get_coin_info = async () => {
  const resp = await http_get(
    apiUrl + `/api/v1/coins/info?network=Polygon Amoy`
  );
  // console.log(resp);
  return resp;
};

export const get_bln_info = async (token_adr) => {
  const resp = await http_get(
    apiUrl + `/api/v1/wallet/balance?token=${token_adr}`
  );
  // console.log(resp);
  return resp;
};
export const get_staking_info_user = async () => {
  const resp = await http_get(
    apiUrl + `/api/v1/staking/info?network=Polygon Amoy`
  );
  // console.log(resp);
  return resp;
};
export const post_stake_user_amount = async (amount) => {
  const resp = await http_post(apiUrl + `/api/v1/staking/stake`, {
    amount: amount + "",
  });
  // console.log(resp);
  return resp;
};

export const post_unstake_user_amount = async (amount) => {
  const resp = await http_post(apiUrl + `/api/v1/staking/unstake`, {
    amount: amount + "",
  });
  // console.log(resp);
  return resp;
};

export const post_claim_user = async () => {
  const resp = await http_post(apiUrl + `/api/v1/staking/claim`, {});
  // console.log(resp);
  return resp;
};

export const get_user_profile = async () => {
  const resp = await http_get(apiUrl + `/api/v1/profile`);
  // console.log(resp);
  return resp;
};

export const put_allow_login_username = async (allow) => {
  const resp = await http_put(apiUrl + `/api/v1/users/login-username`, {
    login_with_username: allow,
  });
  // console.log(resp);
  return resp;
};

export const claim_virtuals = async (amount) => {
  const resp = await http_post(apiUrl + `/api/v1/wallet/claim-virtuals`);
  // console.log(resp);
  return resp;
};
export const get_graph = async () => {
  const resp = await http_get(apiUrl + `/api/v1/coins/claims-graph`);
  // console.log(resp);
  return resp;
};

export const put_user_profile = async (body) => {
  const resp = await http_put(apiUrl + `/api/v1/profile`, body);
  // console.log(resp);
  return resp;
};

export const get_stake_history = async (page, pageSize, filter) => {
  filter = filter == "Action" ? "" : filter;
  const resp = await http_get(
    apiUrl +
      `/api/v1/wallet/stake-unstakes?pageNumber=${page}&pageSize=${pageSize}&filter=${filter.toLowerCase()}`
  );
  // console.log(resp);
  return resp;
};

export const get_quiz_limit = async () => {
  const resp = await http_get(apiUrl + `/api/v1/users/quiz-limit`);
  // console.log(resp);
  return resp;
};

export const get_referal_Code = async () => {
  const resp = await http_get(apiUrl + `/api/v1/users/referral-code`);
  // console.log(resp);
  return resp;
};

export const post_users_invitation = async (
  subject,
  message,
  signature,
  emailLst
) => {
  if (subject == null) {
    subject = "You’ve been invited to PrimeTrader";
  }
  if (signature == null) {
    signature = "A Warm Welcome From PrimeTrader";
  }
  console.log(subject, message, signature, emailLst);
  const resp = await http_post(apiUrl + `/api/v1/users/invitation`, {
    invitation_type: "email",
    message: message,
    signature: signature,
    subject: subject,
    targets: emailLst,
  });
  // console.log(resp);
  return resp;
};
export const delete_invites = async (emails) => {
  const resp = await http_delete(apiUrl + `/api/v1/users/invitation`, {
    emails: emails,
  });
  // console.log(resp);
  return resp;
};

export const get_invitation_data = async (page, size, orderBy, orderType) => {
  const resp = await http_get(
    apiUrl +
      `/api/v1/users/invitation?pg=${page}&size=${size}&order_by=${orderBy}&order_type=${orderType}`
  );
  // console.log(resp);
  return resp;
};

export const get_earning_data = async (page, size, orderBy, orderType) => {
  const resp = await http_get(
    apiUrl +
      `/api/v1/users/earnings?pg=${page}&size=${size}&order_by=${orderBy}&order_type=${orderType}`
  );
  // console.log(resp);
  return resp;
};
// /users/earnings

// Ranking
// https://tempapi.primetrader.com/api/v1/users/earnings/leaderboards?pg=1&size=20
export const get_ranking_Affiliates = async (page, size) => {
  const resp = await http_get(
    apiUrl + `/api/v1/users/earnings/leaderboards?pg=${page}&size=${size}`
  );
  return resp;
};

export const get_ranking_QuizMaster = async (page, size, firstday, lastday) => {
  const resp = await http_get(
    apiUrl +
      `/api/v1/quiz/leaderboards?pg=${page}&size=${size}&from_date=${firstday}&to_date=${lastday}`
  );
  return resp;
};

// Prediction Game

export const post_bet_pred_game = async (epoch, value, prediction) => {
  const resp = await http_post(apiUrl + `/api/v1/game/prediction/bet`, {
    epoch,
    value,
    prediction,
  });
  return resp;
};

export const get_prediction_list = async () => {
  const resp = await http_get(apiUrl + `/api/v1/game/prediction/list`);
  return resp;
};

export const get_prediction_history = async () => {
  const resp = await http_get(apiUrl + `/api/v1/game/prediction/history`);
  return resp;
};

export const post_collect_all_history = async () => {
  const resp = await http_post(
    apiUrl + `/api/v1/game/prediction/claim-all`,
    {}
  );
  return resp;
};

export const post_collect_claim = async (epoch) => {
  const resp = await http_post(
    apiUrl + `/api/v1/game/prediction/claim?epoch_id=${epoch}`,
    {}
  );
  return resp;
};

/* Rewards Center APIs */
/* List of all apis regarding rewards center */
///users/account/level

export const get_rewards_accountLevel = async () => {
  const resp = await http_get(apiUrl + `/api/v1/users/account/level`);
  return resp;
};

// Prediction Game End
export const get_rewards_activityStreaks = async () => {
  const resp = await http_get(apiUrl + `/api/v1/users/activity-streaks`);
  return resp;
};

export const get_rewards_tasksOneTime = async () => {
  const resp = await http_get(apiUrl + `/api/v1/users/tasks/one-time`);
  return resp;
};

export const get_rewards_tasksDaily = async (date) => {
  const resp = await http_get(
    apiUrl + `/api/v1/users/tasks/daily?date=${date}`
  );
  return resp;
};

export const get_rewards_tasksWeekly = async (from_date, to_date) => {
  const resp = await http_get(
    apiUrl +
      `/api/v1/users/tasks/weekly?from_date=${from_date}&to_date=${to_date}`
  );
  return resp;
};

export const get_rewards_claimReward = async (
  task_id,
  task_type,
  from_date,
  to_date
) => {
  let url = `${apiUrl}/api/v1/users/tasks/claim-reward?task_id=${task_id}&task_type=${task_type}`;

  if (from_date) {
    url += `&from_date=${from_date}`;
  }
  if (to_date) {
    url += `&to_date=${to_date}`;
  }

  const resp = await http_get(url);
  return resp;
};
export const update_email_pwd_X = async (email, password) => {
  const resp = await http_put(apiUrl + `/api/v1/users/x/credentials`, {
    email,
    password,
  });
  return resp;
};
export const update_email_resent_X = async () => {
  const resp = await http_post(apiUrl + `/api/v1/users/x/credentials/resend`, {
   
  });
  return resp;
};
export const update_email_verify_otp_X = async (uid, otp) => {
  const resp = await http_post(
    apiUrl + `/api/v1/users/x/credentials/verify?userid=${uid}&code=${otp}`,
    {}
  );
  return resp;
};

"use client";
import { apiUrl } from "../apiUrl";
import { http_post, http_get, http_put } from "../lib/http";
import secureLocalStorage from "react-secure-storage";

// GET http request's.
export const get_balance_api = async () => {
  const resp = await http_get(apiUrl + `/api/v1/get_user_balance`);

  return resp;
};

export const get_reward_time = async () => {
  const resp = await http_get(
    apiUrl + `/api/v1/wallet/claim-virtuals-timestamp`
  );

  return resp;
};

export const get_invest_pool_api = async () => {
  const resp = await http_get(apiUrl + `/api/v1/get_invest_pool_balance`);
  return resp;
};

// Profile setting
export const get_user_info_api = async () => {
  const resp = await http_get(apiUrl + `/api/v1/get_user_info`);
  return resp;
};

export const get_user_transactions_api = async () => {
  const resp = await http_get(apiUrl + "/api/v1/get_user_transactions");
  return resp;
};

export const get_user_referrals_api = async () => {
  const resp = await http_get(apiUrl + "/api/v1/get_user_referrals");
  return resp;
};

export const get_user_referral_code_api = async () => {
  const resp = await http_get(apiUrl + "/api/v1/get_user_referral_code");
  return resp;
};

export const username_exist_api = async () => {
  const resp = await http_get(apiUrl + "/api/v1/username_exist");
  return resp;
};

// POST http request's.
export const signup_api = async (
  payload,
  referralCode = "",
  recaptchaToken
) => {
  // var recaptchaHeaderHeaders = {
  //   "X-Recaptcha-Token": `${recaptchaToken}`,
  // };

  // console.log(recaptchaHeaderHeaders['X-Recaptcha-Token']);
  const resp = await http_post(
    apiUrl + `/api/v1/signup/email?rc=${referralCode}`,
    payload
    // recaptchaHeaderHeaders
  );
  return resp;
};

export const login_api = async (credentials, recaptchaToken) => {
  // var recaptchaHeaderHeaders = {
  //   "X-Recaptcha-Token": `${recaptchaToken}`,
  // };
  const systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const resp = await http_post(
    apiUrl + `/api/v1/login/email?timezone=${systemTimeZone}`,
    credentials
    // recaptchaHeaderHeaders
  );
  // Save tokens to secureLocalStorage
  if (resp?.data?.access_token) {
    secureLocalStorage.setItem("loginFlag", false);
    localStorage.setItem("token", resp?.data?.access_token);
    secureLocalStorage.setItem("refresh_token", resp?.data?.refresh_token);
    secureLocalStorage.setItem("username", resp?.data?.username);
    localStorage.setItem("username", resp?.data?.username);
    secureLocalStorage.setItem("expires", resp?.data?.expires);
  }

  return resp;
};

export const verify_captcha_api = async (recaptchaToken) => {
  var recaptchaHeaderHeaders = {
    "X-Recaptcha-Token": `${recaptchaToken}`,
  };
  const resp = await http_post(
    apiUrl + `/api/v1/verify_captcha`,
    {},
    recaptchaHeaderHeaders
  );
  return resp;
};
export const logout_api = async () => {
  const resp = await http_post(apiUrl + `/api/v1/logout`, {});
  return resp;
};
export const resend_invite = async (user_id) => {
  const resp = await http_post(apiUrl + `/api/v1/signup/email/resend`, {
    user_id: user_id,
  });
  return resp;
};
export const verify_api = async (uuid, ref) => {
  const resp = await http_post(
    apiUrl + "/api/v1/signup_verify?u=" + uuid + "&rc=" + ref,
    {}
  );
  return resp;
};
export const verify_signup_api = async (code, uid) => {
  const resp = await http_get(
    apiUrl + "/api/v1/signup/email/verify?code=" + code + "&userid=" + uid,
    {}
  );
  return resp;
};
// Profile Setting Update
export const update_user_info_api = async (userData) => {
  const resp = await http_post(apiUrl + `/api/v1/update_user_info`, userData);
  return resp;
};
export const update_pw = async (old_password, new_password) => {
  const resp = await http_post(apiUrl + `/api/v1/update_pw`, {
    old_password,
    new_password,
  });
  return resp;
};

export const change_pw_api = async (payload) => {
  const resp = await http_put(apiUrl + `/api/v1/users/reset-password`, payload);
  return resp;
};

export const reset_pw_api = async (email) => {
  const resp = await http_post(apiUrl + `/api/v1/users/forget-password`, {
    email,
  });
  return resp;
};

export const invite_api = async (invitationData) => {
  const resp = await http_post(apiUrl + `/api/v1/send_invite`, invitationData);
  return resp;
};

export const ban_user_api = async (userId) => {
  const resp = await http_post(apiUrl + `/api/v1/${userId}/ban_user`, {});
  return resp;
};

// Earn
export const get_user_referrals = async (page, size, orderBy, orderType) => {
  const resp = await http_get(
    apiUrl +
      `/api/v1/get_user_referrals?pg=${page}&size=${size}&order_by=${orderBy}&order_type=${orderType}`
  );
  return resp;
};

export const get_user_invitees = async (page, size, orderBy, orderType) => {
  const resp = await http_get(
    apiUrl + `/api/v1/get_user_invitees?pg=${page}&size=${size}`
  );
  return resp;
};

// port
export const get_user_transactions = async (page, size, orderBy, orderType) => {
  const resp = await http_get(
    apiUrl +
      `/api/v1/get_user_transactions?pg=${page}&size=${size}&order=${orderBy}&order_type=${orderType}`
  );
  return resp;
};

export const get_portfolio_graph = async (pool) => {
  const resp = await http_get(
    apiUrl + `/api/v1/get_portfolio_graph?pool=${pool}`
  );
  return resp;
};
export const get_ranking_whales = async (page, size) => {
  const resp = await http_get(
    apiUrl + `/api/v1/get_rankings?pg=${page}&size=${size}`
  );
  return resp;
};
export const get_ranking_affiliates = async (page, size) => {
  const resp = await http_get(
    apiUrl + `/api/v1/get_referral_ranking?pg=${page}&size=${size}`
  );
  return resp;
};
export const get_ranking_xp = async (page, size) => {
  // alert('13');
  const resp = await http_get(
    apiUrl + `/api/v1/get_xp_rankings?pg=${page}&size=${size}`
  );
  return resp;
};
export const get_staking_history = async (page, size, orderBy, orderType) => {
  const resp = await http_get(
    apiUrl +
      `/api/v1/get_staking_history?pg=${page}&size=${size}&order_by=${orderBy}&order_type=${orderType}`
  );
  return resp;
};
export const get_staking = async () => {
  const resp = await http_get(apiUrl + `/api/v1/get_rewards_info`);
  return resp;
};

export const allow_login_with_username = async (flag) => {
  const resp = await http_post(apiUrl + `/api/v1/allow_login_with_username`, {
    login_with_username: JSON.stringify(flag),
  });
  return resp;
};

// Staking
export const create_stake = async (amount, pool) => {
  const resp = await http_post(apiUrl + `/api/v1/create_stake`, {
    amount: amount,
    pool: pool,
  });
  return resp;
};
export const get_stakes = async (page, size) => {
  const resp = await http_get(
    apiUrl + `/api/v1/get_stakes?pg=${page}&size=${size}`
  );
  return resp;
};

export const get_stake_contract_info = async () => {
  const resp = await http_get(apiUrl + `/api/v1/get_stake_contract_info`);
  return resp;
};
// Dashboard

export const get_user_dashboard = async () => {
  const resp = await http_get(apiUrl + `/api/v1/get_user_dashboard`);
  return resp;
};

// Claim

export const create_claim = async (selectedPool) => {
  const resp = await http_post(apiUrl + `/api/v1/create_claim`, {
    is_silver: selectedPool == "silver",
    is_gold: selectedPool == "gold",
    is_diamond: selectedPool == "diamond",
  });
  return resp;
};

export const get_claim_graph = async (pool) => {
  let url;
  if (pool) {
    url = apiUrl + `/api/v1/get_claim_graph?pool=${pool}`;
  } else {
    url = apiUrl + `/api/v1/get_claim_graph`;
  }
  console.log(url);
  const resp = await http_get(url);
  return resp;
};

export const get_stake_graph = async () => {
  const resp = await http_get(apiUrl + `/api/v1/get_stake_graph`);
  return resp;
};

// News

export const get_news_categories = async () => {
  const resp = await http_get(apiUrl + `/api/v1/news/get_categories`);
  return resp;
};
export const get_all_news = async (
  page,
  selectedCategories,
  itemPerPage,
  order_by,
  order_type,
  audio,
  unread,
  unattempted
) => {
  const resp = await http_get(
    apiUrl +
      `/api/v1/news/get_all?pg=${page}&size=${itemPerPage}&category=${selectedCategories}&order_by=${order_by}&order_type=${order_type}&audio=${audio}&status=${unread}&quiz_attempted=${unattempted}`
  );
  return resp;
};

export const get_news_detail = async (id) => {
  const resp = await http_get(apiUrl + `/api/v1/news/detail?news_id=${id}`);
  return resp;
};
export const get_news_quiz = async (id) => {
  const resp = await http_get(apiUrl + `/api/v1/news/quiz?news_id=${id}`);
  return resp;
};
export const submit_quiz = async (quiz_id, selected_option) => {
  const resp = await http_post(apiUrl + `/api/v1/quiz/submit`, {
    quiz_id,
    selected_option,
  });
  return resp;
};
export const news_like_update = async (id) => {
  const resp = await http_put(
    apiUrl + `/api/v1/news/like_update?news_id=${id}`,
    {
      news_id: id,
    }
  );
  return resp;
};

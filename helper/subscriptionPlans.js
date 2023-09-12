export const PLANS = {
  BASIC: 'Basic Plan',
  INTERMEDIATE: 'Intermediate Plan',
  ENTERPRISE: 'Enterprise Plan',
};

const PLAN_LIMITS = {
  [PLANS.BASIC]: {
    minFileSize: 100 * 1024, // 100 KB in bytes
    maxFileSize: 25 * 1024 * 1024, // 25 MB in bytes
    maxStorageSpace: 100 * 1024 * 1024, // 100 MB in bytes
    maxUsers: 2,
  },
  [PLANS.INTERMEDIATE]: {
      minFileSize: 50 * 1024, // 50 KB in bytes
      maxFileSize: 50 * 1024 * 1024, // 50 MB in bytes
      maxStorageSpace: 300 * 1024 * 1024, // 300 MB in bytes
      maxUsers: 5,
  },
  [PLANS.ENTERPRISE]: {
      minFileSize: 10 * 1024, // 10 KB in bytes
      maxFileSize: 80 * 1024 * 1024, // 80 MB in bytes
      maxStorageSpace: 500 * 1024 * 1024, // 500 MB in bytes
      maxUsers: 10,
  },
};

export function getPlanLimits(plan) {
  return PLAN_LIMITS[plan] || PLAN_LIMITS[PLANS.BASIC];
}


